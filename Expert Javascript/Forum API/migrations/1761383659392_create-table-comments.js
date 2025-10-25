/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('comments', {
        id: {
            type: 'VARCHAR(18)',
            primaryKey: true,
        },
        thread_id: {
            type: 'VARCHAR(17)',
            notNull: true,
            references: 'threads(id)',
            onDelete: 'CASCADE',
        },
        owner: {
            type: 'VARCHAR(15)',
            notNull: true,
            references: 'users(id)',
            onDelete: 'CASCADE',
        },
        content: {
            type: 'TEXT',
            notNull: true,
        },
        date: {
            type: 'TEXT',
            notNull: true,
        },
        is_deleted: {
            type: 'BOOLEAN',
            notNull: true,
            default: false,
        },
    })
};


exports.down = (pgm) => {
    pgm.dropTable('comments');
};
