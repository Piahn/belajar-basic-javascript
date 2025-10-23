const AuthenticationsRepository = require('../AuthenticationsRepository')

describe('AuthenticationsRepository interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrange
        const authRepository = new AuthenticationsRepository();

        // Action & Assert
        await expect(authRepository.addToken(''))
            .rejects.toThrow('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(authRepository.checkAvailabilityToken(''))
            .rejects.toThrow('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(authRepository.deleteToken(''))
            .rejects.toThrow('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});