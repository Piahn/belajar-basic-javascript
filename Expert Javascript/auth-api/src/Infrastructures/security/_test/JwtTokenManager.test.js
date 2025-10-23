const Jwt = require('@hapi/jwt');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const JwtTokenManager = require('../JwtTokenManager');

describe('JwtTokenManager', () => {
    // Skenario Sukses
    it('should create access token correctly', async () => {
        // Arrange
        const payload = { username: 'dicoding' };
        const jwtTokenManager = new JwtTokenManager(Jwt.token);

        // Action
        const accessToken = await jwtTokenManager.createAccessToken(payload);

        // Assert
        expect(typeof accessToken).toBe('string');
    });

    it('should create refresh token correctly', async () => {
        // Arrange
        const payload = { username: 'dicoding' };
        const jwtTokenManager = new JwtTokenManager(Jwt.token);

        // Action
        const refreshToken = await jwtTokenManager.createRefreshToken(payload);

        // Assert
        expect(typeof refreshToken).toBe('string');
    });

    it('should verify refresh token correctly', async () => {
        // Arrange
        const payload = { username: 'dicoding' };
        const jwtTokenManager = new JwtTokenManager(Jwt.token);
        const refreshToken = await jwtTokenManager.createRefreshToken(payload);

        // Action & Assert
        await expect(jwtTokenManager.verifyRefreshToken(refreshToken))
            .resolves.not.toThrow(InvariantError);
    });

    it('should decode payload correctly', async () => {
        // Arrange
        const payload = { username: 'dicoding', id: 'user-123' };
        const jwtTokenManager = new JwtTokenManager(Jwt.token);
        const accessToken = await jwtTokenManager.createAccessToken(payload);

        // Action
        const decodedPayload = await jwtTokenManager.decodePayload(accessToken);

        // Assert
        expect(decodedPayload.username).toEqual(payload.username);
        expect(decodedPayload.id).toEqual(payload.id);
    });

    // Skenario Gagal
    it('should throw InvariantError when verify refresh token with invalid signature', async () => {
        // Arrange
        const payload = { username: 'dicoding' };
        const jwtTokenManager = new JwtTokenManager(Jwt.token);
        const refreshToken = await jwtTokenManager.createRefreshToken(payload);

        // Action & Assert
        await expect(jwtTokenManager.verifyRefreshToken(`${refreshToken}123`))
            .rejects.toThrow(InvariantError);
    });
});