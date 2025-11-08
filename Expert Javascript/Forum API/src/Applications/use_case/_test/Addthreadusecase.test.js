const AddThreadUseCase = require('../AddThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');

describe('AddThreadUseCase', () => {
    it('should orchestrating the add thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
            title: 'sebuah thread',
            body: 'sebuah body thread',
        };

        const accessToken = 'valid_token';

        const mockAddedThread = new AddedThread({
            id: 'thread-123',
            title: useCasePayload.title,
            owner: 'user-123',
        });

        const mockThreadRepository = new ThreadRepository();
        const mockAuthenticationTokenManager = new AuthenticationTokenManager();

        mockAuthenticationTokenManager.decodePayload = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: 'user-123' }));
        mockThreadRepository.addThread = jest.fn()
            .mockImplementation(() => Promise.resolve(mockAddedThread));

        const addThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
        });

        // Action
        const addedThread = await addThreadUseCase.execute(useCasePayload, accessToken);

        // Assert
        expect(addedThread).toStrictEqual(mockAddedThread);
        expect(mockAuthenticationTokenManager.decodePayload).toHaveBeenCalledWith(accessToken);
        expect(mockThreadRepository.addThread).toHaveBeenCalledWith(
            expect.objectContaining({
                title: useCasePayload.title,
                body: useCasePayload.body,
                owner: 'user-123',
            })
        );
    });
});