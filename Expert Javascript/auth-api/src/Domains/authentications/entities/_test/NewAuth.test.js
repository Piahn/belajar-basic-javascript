const NewAuth = require('../NewAuth');

describe('a NewAuth entity', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            accessToken: 'accessToken',
        };

        // Action and Assert
        expect(() => new NewAuth(payload)).toThrow('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            accessToken: 123,
            refreshToken: 'refreshToken',
        };

        // Action and Assert
        expect(() => new NewAuth(payload)).toThrow('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create newAuth object correctly', () => {
        // Arrange
        const payload = {
            accessToken: 'accessToken-123',
            refreshToken: 'refreshToken-xyz',
        };

        // Action
        const newAuth = new NewAuth(payload);

        // Assert
        expect(newAuth.accessToken).toEqual(payload.accessToken);
        expect(newAuth.refreshToken).toEqual(payload.refreshToken);
    });
});