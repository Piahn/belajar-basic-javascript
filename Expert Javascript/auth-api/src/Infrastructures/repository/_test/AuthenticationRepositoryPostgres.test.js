const AuthenticationsTableTestHelper = require('../../../../test/AuthenticationsTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthenticationRepositoryPostgres = require('../AuthenticationRepositoryPostgres');
const pool = require('../../database/postgres/pool');

describe('AuthenticationRepositoryPostgres', () => {
    afterEach(async () => {
        await AuthenticationsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addToken function', () => {
        it('should add token to database', async () => {
            // Arrange
            const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
            const token = 'token-123';

            // Action
            await authenticationRepository.addToken(token);

            // Assert
            const tokens = await AuthenticationsTableTestHelper.findToken(token);
            expect(tokens).toHaveLength(1);
            expect(tokens[0].token).toBe(token);
        });
    });

    describe('checkAvailabilityToken function', () => {
        it('should throw InvariantError if token not available', async () => {
            // Arrange
            const authenticationRepository = new AuthenticationRepositoryPostgres(pool);

            // Action & Assert
            await expect(authenticationRepository.checkAvailabilityToken('token-123'))
                .rejects.toThrow(InvariantError);
        });

        it('should not throw InvariantError if token available', async () => {
            // Arrange
            const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
            await AuthenticationsTableTestHelper.addToken('token-123');

            // Action & Assert
            await expect(authenticationRepository.checkAvailabilityToken('token-123'))
                .resolves.not.toThrow(InvariantError);
        });
    });

    describe('deleteToken function', () => {
        it('should delete token from database', async () => {
            // Arrange
            const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
            await AuthenticationsTableTestHelper.addToken('token-123');

            // Action
            await authenticationRepository.deleteToken('token-123');

            // Assert
            const tokens = await AuthenticationsTableTestHelper.findToken('token-123');
            expect(tokens).toHaveLength(0);
        });
    });
});