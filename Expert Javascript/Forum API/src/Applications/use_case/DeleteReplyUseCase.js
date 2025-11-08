class DeleteReplyUseCase {
    constructor({ replyRepository, commentRepository, threadRepository, authenticationTokenManager }) {
        this._replyRepository = replyRepository;
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
        this._authenticationTokenManager = authenticationTokenManager;
    }

    async execute(threadId, commentId, replyId, accessToken) {
        const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken);

        // Verify thread exists
        await this._threadRepository.getThreadById(threadId);

        // Verify comment exists
        await this._commentRepository.verifyCommentExists({ threadId, commentId });

        // Verify reply exists
        await this._replyRepository.verifyReplyExists(replyId);

        // Verify reply owner
        await this._replyRepository.verifyReplyOwner(replyId, owner);

        // Soft delete reply
        await this._replyRepository.deleteReply(replyId);
    }
}

module.exports = DeleteReplyUseCase;