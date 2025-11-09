const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const GetThreadUseCase = require('../Getthreadusecase');

describe('GetThreadUseCase with Replies', () => {
  it('should orchestrating the get thread with replies action correctly', async () => {
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
        id: 'comment-456',
        username: 'dicoding',
        date: '2021-08-08T07:30:00.000Z',
        content: 'komentar ini telah dihapus',
        is_deleted: true,
      },
    ];

    const mockReplies = [
      {
        id: 'reply-124',
        comment_id: 'comment-123',
        username: 'johndoe',
        date: '2021-08-08T08:07:01.522Z',
        content: 'sebuah balasan',
        is_deleted: false,
      },
      {
        id: 'reply-123',
        comment_id: 'comment-123',
        username: 'dicoding',
        date: '2021-08-08T07:59:48.766Z',
        content: 'balasan yang dihapus',
        is_deleted: true,
      },
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(mockComments));
    mockReplyRepository.getRepliesByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(mockReplies));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const thread = await getThreadUseCase.execute(threadId);

    // Assert
    expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith(threadId);
    expect(mockReplyRepository.getRepliesByThreadId).toHaveBeenCalledWith(threadId);

    expect(thread.comments).toHaveLength(2);
    expect(thread.comments[0].content).toEqual('sebuah comment');
    expect(thread.comments[1].content).toEqual('**komentar telah dihapus**');
    expect(thread.comments[0].replies).toHaveLength(2);
    expect(thread.comments[0].replies[0].content).toEqual('**balasan telah dihapus**');
    expect(thread.comments[0].replies[1].content).toEqual('sebuah balasan');
  });

  it('should sort replies by date in ascending order', async () => {
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
    ];

    const mockReplies = [
      {
        id: 'reply-124',
        comment_id: 'comment-123',
        username: 'johndoe',
        date: '2021-08-08T08:07:01.522Z',
        content: 'balasan kedua',
        is_deleted: false,
      },
      {
        id: 'reply-123',
        comment_id: 'comment-123',
        username: 'dicoding',
        date: '2021-08-08T07:59:48.766Z',
        content: 'balasan pertama',
        is_deleted: false,
      },
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(mockComments));
    mockReplyRepository.getRepliesByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(mockReplies));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const thread = await getThreadUseCase.execute(threadId);

    // Assert
    expect(thread.comments[0].replies[0].id).toEqual('reply-123');
    expect(thread.comments[0].replies[1].id).toEqual('reply-124');
  });
});
