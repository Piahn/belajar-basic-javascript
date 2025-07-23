const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong({ title, year, genre, performer, duration, albumId }) {
    const id = `song-${nanoid(16)}`;

    const newSong = {
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.filter((album) => album.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return id;
  }

  getSongs({ title, performer }) {
    let filteredSongs = this._songs;

    if (title) {
      filteredSongs = filteredSongs.filter((song) =>
        song.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (performer) {
      filteredSongs = filteredSongs.filter((song) =>
        song.performer.toLowerCase().includes(performer.toLowerCase())
      );
    }

    return filteredSongs.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    }));
  }

  getSongById(id) {
    const song = this._songs.filter((song) => song.id === id)[0];
    if (!song) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return song;
  }

  editSongById(id, { title, year, genre, performer, duration, albumId }) {
    const index = this._songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }
    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal menghapus lagu. Id tidak ditemukan');
    }

    this._songs.splice(index, 1);
  }

  getSongsByAlbumId(albumId) {
    const songs = this._songs.filter((song) => song.albumId === albumId);
    return songs.map(({ id, title, performer }) => ({
      id,
      title,
      performer,
    }));
  }
}

module.exports = SongsService;
