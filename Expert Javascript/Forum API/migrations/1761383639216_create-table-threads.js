/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('threads', {
        id: {
            type: 'VARCHAR(17)',
            primaryKey: true,
        },
        title: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        body: {
            type: 'TEXT',
            notNull: true,
        },
        owner: {
            type: 'VARCHAR(15)',
            notNUll: true,
            references: 'users(id)',
            onDelete: 'CASCADE',
        },
        date: {
            type: 'TEXT',
            notNull: true,
        },
    })
};

exports.down = (pgm) => {
    pgm.dropTable('threads');
};
