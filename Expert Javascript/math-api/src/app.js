const createServer = require('./createServer.js');
const FigureCalculator = require('./FigureCalculator.js');
const MathBasic = require('./MathBasic.js');

const start = async () => {
    const figureCalculator = new FigureCalculator(MathBasic)
    const server = createServer({
        mathBasic: MathBasic,
        figureCalculator,
    })

    await server.start()
    console.log(`Server start at ${server.info.uri}`)
}

start()