const MathBasic = {
    add: (...args) => {
        if (args.length !== 2) {
            throw new Error('fungsi add hanya menerima dua parameter');
        }
        const [a, b] = args;
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('fungsi add hanya menerima parameter number');
        }
        return a + b;
    },

    subtract: (...args) => {
        if (args.length !== 2) {
            throw new Error('fungsi subtract hanya menerima dua parameter');
        }
        const [a, b] = args;
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('fungsi subtract hanya menerima parameter number');
        }
        return a - b;
    },

    multiply: (...args) => {
        if (args.length !== 2) {
            throw new Error('fungsi multiply hanya menerima dua parameter');
        }
        const [a, b] = args;
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('fungsi multiply hanya menerima parameter number');
        }
        return a * b;
    },

    divide: (...args) => {
        if (args.length !== 2) {
            throw new Error('fungsi divide hanya menerima dua parameter');
        }
        const [a, b] = args;
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('fungsi divide hanya menerima parameter number');
        }

        if (b === 0) {
            throw new Error('tidak dapat melakukan pembagian dengan nol');
        }
        return a / b;
    },
};

module.exports = MathBasic;