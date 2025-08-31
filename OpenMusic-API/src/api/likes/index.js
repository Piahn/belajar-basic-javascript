const LikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'likes',
    version: '1.0.0',
    register: async (server, { likesService }) => {
        const likesHandler = new LikesHandler(likesService);
        server.route(routes(likesHandler));
    },
};