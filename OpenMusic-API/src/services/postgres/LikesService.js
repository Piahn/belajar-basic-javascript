const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class LikesService {
    constructor(cacheService) {
        this._pool = new Pool();
        this._cacheService = cacheService;
    }

    async addLikeToAlbum(userId, albumId) {
        const checkQuery = {
            text: 'SELECT id FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
            values: [userId, albumId],
        };
        const checkResult = await this._pool.query(checkQuery);

        if (checkResult.rows.length > 0) {
            throw new InvariantError('Anda sudah menyukai album ini');
        }

        // Tambahkan data likes
        const id = `like-${nanoid(16)}`;
        const addQuery = {
            text: 'INSERT INTO user_album_likes VALUES($1, $2, $3)',
            values: [id, userId, albumId],
        };
        await this._pool.query(addQuery);

        await this._cacheService.delete(`likes:${albumId}`);
    }

    async deleteLikeFromAlbum(userId, albumId) {
        const query = {
            text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
            values: [userId, albumId],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal batal menyukai album. Like tidak ditemukan');
        }

        await this._cacheService.delete(`likes:${albumId}`);
    }

    async getAlbumLikes(albumId) {
        try {
            // Coba dapatkan dari cache dulu
            const result = await this._cacheService.get(`likes:${albumId}`);
            return { count: JSON.parse(result), fromCache: true };
        } catch (error) {
            // Jika gagal atau datanya expiyet (expirationInSecond), ambil dari DB
            const query = {
                text: 'SELECT COUNT(id) FROM user_album_likes WHERE album_id = $1',
                values: [albumId],
            };
            const result = await this._pool.query(query);
            const likesCount = parseInt(result.rows[0].count, 10);

            // Simpan ke cache sebelum mengembalikan
            await this._cacheService.set(`likes:${albumId}`, JSON.stringify(likesCount));

            return { count: likesCount, fromCache: false };
        }
    }

    async verifyAlbumExists(id) {
        const query = {
            text: 'SELECT id FROM albums WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Album tidak ditemukan');
        }
    }
}

module.exports = LikesService;