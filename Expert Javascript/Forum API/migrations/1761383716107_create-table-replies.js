/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('replies', {
        id: {
            type: 'VARCHAR(16)',
            primaryKey: true,
        },
        comment_id: {
            type: 'VARCHAR(18)',
            notNull: true,
            references: 'comments(id)',
            onDelete: 'CASCADE',
        },
        owner: {
            type: 'VARCHAR(15)',
            notNull: true,
        },
        content: {
            type: 'TEXT',
            notNull: true,
            references: 'users(id)',
            onDelete: 'CASCADE',
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
    pgm.dropTable('replies');
};
