const NewThread = require('../../Domains/threads/entities/NewThread');

class AddThreadUseCase {
    constructor({ threadRepository, authenticationTokenManager }) {
        this._threadRepository = threadRepository;
        this._authenticationTokenManager = authenticationTokenManager;
    }

    async execute(useCasePayload, accessToken) {
        const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken);

        const newThread = new NewThread({
            ...useCasePayload,
            owner,
        });

        return this._threadRepository.addThread(newThread);
    }
};

module.exports = AddThreadUseCase;