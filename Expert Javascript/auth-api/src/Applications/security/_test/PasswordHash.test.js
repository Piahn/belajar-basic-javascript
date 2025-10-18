const PasswordHash = require('../PasswordHash')

describe('PasswordHash interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrenge
        const passwordHash = new PasswordHash();

        // Action & Assert
        await expect(passwordHash.hash('dummy_password')).rejects.toThrow('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED')
    })

    it('should throw error when invoke to abscract password', async () => {
        // Arrenge 
        const passwordCompare = new PasswordHash()

        await expect(passwordCompare.compare('dummy_password')).rejects.toThrow('PASSWORD_COMPARE.METHOD_NOT_IMPLEMENTED')
    })
})