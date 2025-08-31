const autoBind = require('auto-bind');

class LikesHandler {
    constructor(likesService) {
        this._likesService = likesService;
        autoBind(this);
    }

    async postLikeAlbumHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const { id: albumId } = request.params;

        await this._likesService.verifyAlbumExists(albumId);
        await this._likesService.addLikeToAlbum(credentialId, albumId);

        const response = h.response({
            status: 'success',
            message: 'Berhasil menyukai album',
        });
        response.code(201);
        return response;
    }

    async getAlbumLikesHandler(request, h) {
        const { id: albumId } = request.params;
        const { count, fromCache } = await this._likesService.getAlbumLikes(albumId);

        const response = h.response({
            status: 'success',
            data: {
                likes: count,
            },
        });

        if (fromCache) {
            response.header('X-Data-Source', 'cache');
        }

        return response;
    }

    async deleteLikeAlbumHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const { id: albumId } = request.params;

        await this._likesService.deleteLikeFromAlbum(credentialId, albumId);

        return {
            status: 'success',
            message: 'Berhasil batal menyukai album',
        };
    }
}

module.exports = LikesHandler;