const AuthenticationsRepository = require('../../../Domains/authentications/AuthenticationsRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');

describe('RefreshAuthenticationUseCase', () => {
    it('should throw error if use case payload not contain refresh token', async () => {
        // Arrange
        const useCasePayload = {};
        const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

        // Action & Assert
        await expect(refreshAuthenticationUseCase.execute(useCasePayload))
            .rejects
            .toThrow('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    });

    it('should throw error if refresh token not string', async () => {
        // Arrange
        const useCasePayload = { refreshToken: 12345 };
        const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

        // Action & Assert
        await expect(refreshAuthenticationUseCase.execute(useCasePayload))
            .rejects
            .toThrow('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should orchestrating the refresh authentication action correctly', async () => {
        // Arrange
        const useCasePayload = { refreshToken: 'valid-refresh-token' };
        const mockAuthenticationRepository = new AuthenticationsRepository();
        const mockAuthenticationTokenManager = new AuthenticationTokenManager();

        // Mocking
        mockAuthenticationTokenManager.verifyRefreshToken = jest.fn()
            .mockResolvedValue();
        mockAuthenticationRepository.checkAvailabilityToken = jest.fn()
            .mockResolvedValue();
        mockAuthenticationTokenManager.decodePayload = jest.fn()
            .mockResolvedValue({ username: 'dicoding', id: 'user-123' });
        mockAuthenticationTokenManager.createAccessToken = jest.fn()
            .mockResolvedValue('new-access-token');

        const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
            authenticationRepository: mockAuthenticationRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
        });

        // Action
        const newAccessToken = await refreshAuthenticationUseCase.execute(useCasePayload);

        // Assert
        expect(mockAuthenticationTokenManager.verifyRefreshToken)
            .toHaveBeenCalledWith(useCasePayload.refreshToken);
        expect(mockAuthenticationRepository.checkAvailabilityToken)
            .toHaveBeenCalledWith(useCasePayload.refreshToken);
        expect(mockAuthenticationTokenManager.decodePayload)
            .toHaveBeenCalledWith(useCasePayload.refreshToken);
        expect(mockAuthenticationTokenManager.createAccessToken)
            .toHaveBeenCalledWith({ username: 'dicoding', id: 'user-123' });
        expect(newAccessToken).toEqual('new-access-token');
    });
});