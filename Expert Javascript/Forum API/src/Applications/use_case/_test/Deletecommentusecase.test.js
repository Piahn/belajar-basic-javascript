const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');

describe('DeleteCommentUseCase', () => {
    it('should orchestrating the delete comment action correctly', async () => {
        // Arrange
        const threadId = 'thread-123';
        const commentId = 'comment-123';
        const accessToken = 'valid_token';
        const owner = 'user-123';

        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();
        const mockAuthenticationTokenManager = new AuthenticationTokenManager();

        mockAuthenticationTokenManager.decodePayload = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: owner }));
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockCommentRepository.verifyCommentExists = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockCommentRepository.verifyCommentOwnerAccess = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockCommentRepository.deleteCommentById = jest.fn()
            .mockImplementation(() => Promise.resolve());

        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
        });

        // Action
        await deleteCommentUseCase.execute(threadId, commentId, accessToken);

        // Assert
        expect(mockAuthenticationTokenManager.decodePayload).toHaveBeenCalledWith(accessToken);
        expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(threadId);
        expect(mockCommentRepository.verifyCommentExists).toHaveBeenCalledWith({ threadId, commentId });
        expect(mockCommentRepository.verifyCommentOwnerAccess).toHaveBeenCalledWith({ commentId, owner });
        expect(mockCommentRepository.deleteCommentById).toHaveBeenCalledWith(commentId);
    });
});