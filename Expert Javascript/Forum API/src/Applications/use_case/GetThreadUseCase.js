class GetThreadUseCase {
    constructor({ threadRepository, commentRepository }) {
        this._threadRepository = threadRepository;
        this._commentRepository = commentRepository;
    }

    async execute(threadId) {
        const thread = await this._threadRepository.getThreadById(threadId);
        const comment = await this._commentRepository.getCommentsByThreadId(threadId);

        // Process Comment
        const processedComments = comment.map((comment) => ({
            id: comment.id,
            username: comment.username,
            date: comment.date,
            content: comment.is_deleted ? '**komentar telah dihapus**' : comment.content,
        }))

        // Sort comments by date (ascending)
        processedComments.sort((a, b) => new Date(a.date) - new Date(b.date));

        return {
            ...thread,
            comments: processedComments,
        };
    }
}

module.exports = GetThreadUseCase;