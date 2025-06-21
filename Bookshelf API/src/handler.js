const { nanoid } = require('nanoid');
const bookSlef = require('./bookshelf');

const addBookSelftHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  bookSlef.push(newBook);
  const isSuccess = bookSlef.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBookSelfHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = bookSlef;

  if (finished === '0') {
    filteredBooks = filteredBooks.filter((book) => !book.finished);
  } else if (finished === '1') {
    filteredBooks = filteredBooks.filter((book) => book.finished);
  }

  if (reading === '0') {
    filteredBooks = filteredBooks.filter((book) => !book.reading);
  } else if (reading === '1') {
    filteredBooks = filteredBooks.filter((book) => book.reading);
  }

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.name &&
        name &&
        book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  const response = h.response({
    status: 'success',
    data: {
      books: [
        ...filteredBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      ],
    },
  });
  response.code(200);
  return response;
};

const getBookSelfHandler = (request, h) => {
  const { bookId } = request.params;

  const book = bookSlef.filter((book) => book.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editBookSelfHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = bookSlef.findIndex((book) => book.id === bookId);

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    bookSlef[index] = {
      ...bookSlef[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteBookSelfHandler = (request, h) => {
  const { bookId } = request.params;

  const index = bookSlef.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    bookSlef.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookSelftHandler,
  getAllBookSelfHandler,
  getBookSelfHandler,
  editBookSelfHandler,
  deleteBookSelfHandler,
};
