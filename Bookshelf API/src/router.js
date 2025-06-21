const {
  addBookSelftHandler,
  getAllBookSelfHandler,
  getBookSelfHandler,
  editBookSelfHandler,
  deleteBookSelfHandler,
} = require('./handler');

const router = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookSelftHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookSelfHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookSelfHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookSelfHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookSelfHandler,
  },
];

module.exports = router;
