const NewReply = require('../../Domains/replies/entities/NewReply');

class AddReplyUseCase {
  constructor({
    replyRepository, commentRepository, threadRepository, authenticationTokenManager,
  }) {
    this._replyRepository = replyRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, threadId, commentId, accessToken) {
    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken);

    // Verify thread exists
    await this._threadRepository.getThreadById(threadId);

    // Verify comment exists
    await this._commentRepository.verifyCommentExists({ threadId, commentId });

    const newReply = new NewReply({
      content: useCasePayload.content,
      commentId,
      owner,
    });

    return this._replyRepository.addReply(newReply);
  }
}

module.exports = AddReplyUseCase;
