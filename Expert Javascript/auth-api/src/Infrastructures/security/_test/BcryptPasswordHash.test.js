const bcrypt = require('bcrypt');
const BcryptPasswordHash = require('../BcryptPasswordHash')
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError')

describe('BcryptPasswordHash', () => {
    describe('hash function', () => {
        it('should encrypt password correctly', async () => {
            // Arrange
            const spyHash = jest.spyOn(bcrypt, 'hash');
            const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

            // Action
            const encryptedPassword = await bcryptPasswordHash.hash('plain_password');

            // Assert
            expect(typeof encryptedPassword).toEqual('string');
            expect(encryptedPassword).not.toEqual('plain_password');
            expect(spyHash).toHaveBeenCalledWith('plain_password', 10)
        })
    })

    describe('compare function', () => {
        it('should throw AuthenticationError when password not match', async () => {
            // Arrange
            const password = 'plain_password';
            const hashedPassword = 'encrypted_password';
            const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
            // mock bcrypt.compare agar selalu mengembalikan false
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

            // Action & Assert
            await expect(bcryptPasswordHash.compare(password, hashedPassword))
                .rejects.toThrow(AuthenticationError);
        });

        it('should not throw AuthenticationError when password match', async () => {
            // Arrange
            const password = 'plain_password';
            const hashedPassword = 'encrypted_password';
            const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
            // mock bcrypt.compare agar selalu mengembalikan true
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

            // Action & Assert
            await expect(bcryptPasswordHash.compare(password, hashedPassword))
                .resolves.not.toThrow(AuthenticationError);
        });
    })
})