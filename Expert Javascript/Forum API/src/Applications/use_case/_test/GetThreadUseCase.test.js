const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const GetThreadUseCase = require('../Getthreadusecase');

describe('GetThreadUseCase', () => {
    it('should orchestrating the get thread action correctly', async () => {
        // Arrange
        const threadId = 'thread-123';
        const mockThread = {
            id: 'thread-123',
            title: 'sebuah thread',
            body: 'sebuah body thread',
            date: '2021-08-08T07:19:09.775Z',
            username: 'dicoding',
        };

        const mockComments = [
            {
                id: 'comment-123',
                username: 'johndoe',
                date: '2021-08-08T07:22:33.555Z',
                content: 'sebuah comment',
                is_deleted: false,
            },
            {
                id: 'comment-124',
                username: 'dicoding',
                date: '2021-08-08T07:26:21.338Z',
                content: 'komentar yang dihapus',
                is_deleted: true,
            },
        ];

        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();

        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve(mockThread));
        mockCommentRepository.getCommentsByThreadId = jest.fn()
            .mockImplementation(() => Promise.resolve(mockComments));

        const getThreadUseCase = new GetThreadUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        });

        // Action
        const thread = await getThreadUseCase.execute(threadId);

        // Assert
        expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(threadId);
        expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith(threadId);
        expect(thread).toEqual({
            id: 'thread-123',
            title: 'sebuah thread',
            body: 'sebuah body thread',
            date: '2021-08-08T07:19:09.775Z',
            username: 'dicoding',
            comments: [
                {
                    id: 'comment-123',
                    username: 'johndoe',
                    date: '2021-08-08T07:22:33.555Z',
                    content: 'sebuah comment',
                },
                {
                    id: 'comment-124',
                    username: 'dicoding',
                    date: '2021-08-08T07:26:21.338Z',
                    content: '**komentar telah dihapus**',
                },
            ],
        });
    });

    it('should sort comments by date in ascending order', async () => {
        // Arrange
        const threadId = 'thread-123';
        const mockThread = {
            id: 'thread-123',
            title: 'sebuah thread',
            body: 'sebuah body thread',
            date: '2021-08-08T07:19:09.775Z',
            username: 'dicoding',
        };

        const mockComments = [
            {
                id: 'comment-124',
                username: 'dicoding',
                date: '2021-08-08T07:26:21.338Z',
                content: 'comment kedua',
                is_deleted: false,
            },
            {
                id: 'comment-123',
                username: 'johndoe',
                date: '2021-08-08T07:22:33.555Z',
                content: 'comment pertama',
                is_deleted: false,
            },
        ];

        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();

        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve(mockThread));
        mockCommentRepository.getCommentsByThreadId = jest.fn()
            .mockImplementation(() => Promise.resolve(mockComments));

        const getThreadUseCase = new GetThreadUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        });

        // Action
        const thread = await getThreadUseCase.execute(threadId);

        // Assert
        expect(thread.comments[0].id).toEqual('comment-123');
        expect(thread.comments[1].id).toEqual('comment-124');
    });
});