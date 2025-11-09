class DeleteCommentUseCase {
  constructor({ commentRepository, threadRepository, authenticationTokenManager }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(threadId, commentId, accessToken) {
    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken);

    await this._threadRepository.getThreadById(threadId);

    await this._commentRepository.verifyCommentExists({ threadId, commentId });
    await this._commentRepository.verifyCommentOwnerAccess({ commentId, owner });

    await this._commentRepository.deleteCommentById(commentId);
  }
}

module.exports = DeleteCommentUseCase;
