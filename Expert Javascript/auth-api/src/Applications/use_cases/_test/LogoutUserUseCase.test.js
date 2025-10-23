const AuthenticationsRepository = require('../../../Domains/authentications/AuthenticationsRepository');
const LogoutUserUseCase = require('../LogoutUserUseCase');

describe('LogoutUserUseCase', () => {
    it('should throw error if use case payload not contain refresh token', async () => {
        // Arrange
        const useCasePayload = {};
        const logoutUserUseCase = new LogoutUserUseCase({});

        // Action & Assert
        await expect(logoutUserUseCase.execute(useCasePayload))
            .rejects
            .toThrow('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    });

    it('should throw error if refresh token not string', async () => {
        // Arrange
        const useCasePayload = { refreshToken: 12345 };
        const logoutUserUseCase = new LogoutUserUseCase({});

        // Action & Assert
        await expect(logoutUserUseCase.execute(useCasePayload))
            .rejects
            .toThrow('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should orchestrating the delete authentication action correctly', async () => {
        // Arrange
        const useCasePayload = { refreshToken: 'valid-refresh-token' };
        const mockAuthenticationRepository = new AuthenticationsRepository();

        // Mocking
        mockAuthenticationRepository.checkAvailabilityToken = jest.fn()
            .mockResolvedValue();
        mockAuthenticationRepository.deleteToken = jest.fn()
            .mockResolvedValue();

        const logoutUserUseCase = new LogoutUserUseCase({
            authenticationRepository: mockAuthenticationRepository,
        });

        // Action
        await logoutUserUseCase.execute(useCasePayload);

        // Assert
        expect(mockAuthenticationRepository.checkAvailabilityToken)
            .toHaveBeenCalledWith(useCasePayload.refreshToken);
        expect(mockAuthenticationRepository.deleteToken)
            .toHaveBeenCalledWith(useCasePayload.refreshToken);
    });
});