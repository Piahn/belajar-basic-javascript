const DeleteReplyUseCase = require('../DeleteReplyUseCase');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');

describe('DeleteReplyUseCase', () => {
    it('should orchestrating the delete reply action correctly', async () => {
        // Arrange
        const threadId = 'thread-123';
        const commentId = 'comment-123';
        const replyId = 'reply-123';
        const accessToken = 'valid_token';
        const owner = 'user-123';

        const mockReplyRepository = new ReplyRepository();
        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();
        const mockAuthenticationTokenManager = new AuthenticationTokenManager();

        mockAuthenticationTokenManager.decodePayload = jest.fn()
            .mockImplementation(() => Promise.resolve({ id: owner }));
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockCommentRepository.verifyCommentExists = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockReplyRepository.verifyReplyExists = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockReplyRepository.verifyReplyOwner = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockReplyRepository.deleteReply = jest.fn()
            .mockImplementation(() => Promise.resolve());

        const deleteReplyUseCase = new DeleteReplyUseCase({
            replyRepository: mockReplyRepository,
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
        });

        // Action
        await deleteReplyUseCase.execute(threadId, commentId, replyId, accessToken);

        // Assert
        expect(mockAuthenticationTokenManager.decodePayload).toHaveBeenCalledWith(accessToken);
        expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(threadId);
        expect(mockCommentRepository.verifyCommentExists).toHaveBeenCalledWith({ threadId, commentId });
        expect(mockReplyRepository.verifyReplyExists).toHaveBeenCalledWith(replyId);
        expect(mockReplyRepository.verifyReplyOwner).toHaveBeenCalledWith(replyId, owner);
        expect(mockReplyRepository.deleteReply).toHaveBeenCalledWith(replyId);
    });
});