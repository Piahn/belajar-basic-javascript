const InvariantError = require('../../exceptions/InvariantError');
const { SongPayloadSchema, SongQuerysSchema } = require('./schema');

const SongValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateQuery: (query) => {
    const validationResult = SongQuerysSchema.validate(query);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
    return validationResult;
  },
};

module.exports = SongValidator;
