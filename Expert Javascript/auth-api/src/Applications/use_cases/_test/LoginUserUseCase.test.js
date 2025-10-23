const UserRepository = require('../../../Domains/users/UserRepository');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationsRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const PasswordHash = require('../../security/PasswordHash');
const LoginUserUseCase = require('../LoginUserUseCase');
const NewAuth = require('../../../Domains/authentications/entities/NewAuth');
const UserLogin = require('../../../Domains/users/entities/LoginUser');

describe('LoginUserUseCase', () => {
    it('should orchestrating the login user action correctly', async () => {
        // Arrange
        const useCasePayload = new UserLogin({
            username: 'dicoding',
            password: 'secret',
        });
        const expectedNewAuth = new NewAuth({
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
        });

        // Membuat mock dependencies
        const mockUserRepository = new UserRepository();
        const mockAuthRepository = new AuthenticationRepository();
        const mockAuthTokenManager = new AuthenticationTokenManager();
        const mockPasswordHash = new PasswordHash();

        // Mocking fungsi yang dibutuhkan
        mockUserRepository.getPasswordByUsername = jest.fn()
            .mockResolvedValue('encrypted_password');
        mockPasswordHash.compare = jest.fn()
            .mockResolvedValue()
        mockUserRepository.getIdByUsername = jest.fn()
            .mockResolvedValue('user-123');
        mockAuthTokenManager.createAccessToken = jest.fn()
            .mockResolvedValue('access_token');
        mockAuthTokenManager.createRefreshToken = jest.fn()
            .mockResolvedValue('refresh_token');
        mockAuthRepository.addToken = jest.fn()
            .mockResolvedValue();

        const loginUserUseCase = new LoginUserUseCase({
            userRepository: mockUserRepository,
            authenticationRepository: mockAuthRepository,
            authenticationTokenManager: mockAuthTokenManager,
            passwordHash: mockPasswordHash,
        });

        // Action
        const newAuth = await loginUserUseCase.execute(useCasePayload);

        // Assert
        expect(newAuth).toStrictEqual(expectedNewAuth);
        expect(mockUserRepository.getPasswordByUsername).toHaveBeenCalledWith(useCasePayload.username);
        expect(mockPasswordHash.compare).toHaveBeenCalledWith(useCasePayload.password, 'encrypted_password');
        expect(mockUserRepository.getIdByUsername).toHaveBeenCalledWith(useCasePayload.username);
        expect(mockAuthRepository.addToken).toHaveBeenCalledWith('refresh_token');
    });
});