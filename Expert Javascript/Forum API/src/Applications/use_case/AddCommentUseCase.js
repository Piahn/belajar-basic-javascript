const NewComment = require('../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository, authenticationTokenManager }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, threadId, accessToken) {
    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken);

    await this._threadRepository.getThreadById(threadId);

    const newComment = new NewComment({
      content: useCasePayload.content,
      threadId,
      owner,
    });

    return this._commentRepository.addComment(newComment);
  }
}

module.exports = AddCommentUseCase;
