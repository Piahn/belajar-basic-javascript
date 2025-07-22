require('dotenv').config();

const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');

/**
 * Import Album
 */
const albums = require('./api/albums');
const AlbumService = require('./services/localStorage/AlbumService');
const AlbumValidator = require('./validator/albums');

/**
 * Import Song
 */
const songs = require('./api/songs');
const SongService = require('./services/localStorage/SongService');
const SongValidator = require('./validator/songs');

const init = async () => {
  const albumService = new AlbumService();
  const songsService = new SongService(albumService);
  const server = Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
