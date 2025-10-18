const UserLogin = require('../LoginUser');

describe('a UserLogin entity', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            username: 'abc',
        };

        // Action and Assert
        expect(() => new UserLogin(payload)).toThrow('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            username: 123,
            password: 'abc',
        };

        // Action and Assert
        expect(() => new UserLogin(payload)).toThrow('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create userLogin object correctly', () => {
        // Arrange
        const payload = {
            username: 'dicoding',
            password: 'abc',
        };

        // Action
        const { username, password } = new UserLogin(payload);

        // Assert
        expect(username).toEqual(payload.username);
        expect(password).toEqual(payload.password);
    });
});