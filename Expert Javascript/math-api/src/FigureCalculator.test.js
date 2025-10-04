const FigureCalculator = require('./FigureCalculator');
const MathBasic = require('./MathBasic');

describe('A FigureCalculator', () => {
    it('should contain calculateRectanglePerimeter, calculateRectangleArea, calculateTrianglePerimeter, and calculateTriangleArea functions', () => {
        const figureCalculator = new FigureCalculator({});

        expect(figureCalculator).toHaveProperty('calculateRectanglePerimeter');
        expect(figureCalculator).toHaveProperty('calculateRectangleArea');
        expect(figureCalculator).toHaveProperty('calculateTrianglePerimeter');
        expect(figureCalculator).toHaveProperty('calculateTriangleArea');
        expect(figureCalculator.calculateRectanglePerimeter).toBeInstanceOf(Function);
        expect(figureCalculator.calculateRectangleArea).toBeInstanceOf(Function);
        expect(figureCalculator.calculateTrianglePerimeter).toBeInstanceOf(Function);
        expect(figureCalculator.calculateTriangleArea).toBeInstanceOf(Function);
    });

    /**
     * calculateRectanglePerimeter
     */
    describe('A calculateRectanglePerimeter function', () => {
        it('should throw error when not given 2 parameters', () => {
            const figureCalculator = new FigureCalculator({});
            expect(() => figureCalculator.calculateRectanglePerimeter()).toThrow();
            expect(() => figureCalculator.calculateRectanglePerimeter(1)).toThrow();
            expect(() => figureCalculator.calculateRectanglePerimeter(1, 2, 3)).toThrow();
        });

        it('should throw error when given with non-number parameters', () => {
            const figureCalculator = new FigureCalculator({});
            expect(() => figureCalculator.calculateRectanglePerimeter(true, {})).toThrow();
            expect(() => figureCalculator.calculateRectanglePerimeter(null, '2')).toThrow();
            expect(() => figureCalculator.calculateRectanglePerimeter([], {})).toThrow();
        });


        it('should return correct value based on rectangle perimeter formula', () => {
            // Arrange
            const length = 20;
            const width = 10;
            const spyAdd = jest.spyOn(MathBasic, 'add');
            const spyMultiply = jest.spyOn(MathBasic, 'multiply');
            const figureCalculator = new FigureCalculator(MathBasic);
            // Action
            const result = figureCalculator.calculateRectanglePerimeter(length, width);
            // Assert
            expect(result).toEqual(60); // 2 x (length + width)
            expect(spyAdd).toHaveBeenCalledWith(length, width);
            expect(spyMultiply).toHaveBeenCalledWith(2, 30); // 2 * (length + width)
        });
    });

    /**
     * calculateRectangleArea
     */
    describe('A calculateRectangleArea function', () => {
        it('should throw error when not given 2 parameters', () => {
            const figureCalculator = new FigureCalculator({});
            expect(() => figureCalculator.calculateRectangleArea()).toThrow();
            expect(() => figureCalculator.calculateRectangleArea(1)).toThrow();
            expect(() => figureCalculator.calculateRectangleArea(1, 2, 3)).toThrow();
        });

        it('should throw error when given with non-number parameters', () => {
            const figureCalculator = new FigureCalculator({});
            expect(() => figureCalculator.calculateRectangleArea(true, {})).toThrow();
            expect(() => figureCalculator.calculateRectangleArea(null, '2')).toThrow();
            expect(() => figureCalculator.calculateRectangleArea([], {})).toThrow();
        });


        it('should return correct value based on rectangle perimeter formula', () => {
            // Arrange
            const length = 8;
            const width = 5;
            const spyMultiply = jest.spyOn(MathBasic, 'multiply');
            const figureCalculator = new FigureCalculator(MathBasic);
            // Action
            const result = figureCalculator.calculateRectangleArea(length, width);
            // Assert
            expect(result).toEqual(40); // length * width
            expect(spyMultiply).toHaveBeenCalledWith(length, width)
        });
    });

    /**
     * calculateTrianglePerimeter
     */
    describe('A calculateTrianglePerimeter function', () => {
        it('should throw error when not given 3 parameters', () => {
            const figureCalculator = new FigureCalculator({});
            expect(() => figureCalculator.calculateTrianglePerimeter()).toThrow();
            expect(() => figureCalculator.calculateTrianglePerimeter(1)).toThrow();
            expect(() => figureCalculator.calculateTrianglePerimeter(1, 2)).toThrow();
            expect(() => figureCalculator.calculateTrianglePerimeter(1, 2, 3, 4)).toThrow();
        });

        it('should throw error when given with non-number parameters', () => {
            const figureCalculator = new FigureCalculator({});
            expect(() => figureCalculator.calculateTrianglePerimeter(true, {}, [])).toThrow();
            expect(() => figureCalculator.calculateTrianglePerimeter(null, '2', false)).toThrow();
            expect(() => figureCalculator.calculateTrianglePerimeter([], {}, null)).toThrow();
        });


        it('should return correct value based on rectangle perimeter formula', () => {
            // Arrange
            const sideA = 5;
            const sideB = 7;
            const base = 8
            const spyAdd = jest.spyOn(MathBasic, 'add');
            const figureCalculator = new FigureCalculator(MathBasic);
            // Action
            const result = figureCalculator.calculateTrianglePerimeter(sideA, sideB, base);
            // Assert
            expect(result).toEqual(20); // (sideA + sideB) + base
            expect(spyAdd).toHaveBeenCalledTimes(3); // Memastikan fungsi `add` dipanggil 3 kali
        });
    });

    /**
    * calculateTriangleArea
    */
    describe('A calculateTriangleArea function', () => {
        it('should throw error when not given 2 parameters', () => {
            const figureCalculator = new FigureCalculator({});
            expect(() => figureCalculator.calculateTriangleArea()).toThrow();
            expect(() => figureCalculator.calculateTriangleArea(1)).toThrow();
            expect(() => figureCalculator.calculateTriangleArea(1, 2, 3)).toThrow();
        });

        it('should throw error when given with non-number parameters', () => {
            const figureCalculator = new FigureCalculator({});
            expect(() => figureCalculator.calculateTriangleArea(true, {})).toThrow();
            expect(() => figureCalculator.calculateTriangleArea(null, '2')).toThrow();
            expect(() => figureCalculator.calculateTriangleArea([], {})).toThrow();
        });


        it('should return correct value based on rectangle perimeter formula', () => {
            // Arrange
            const base = 10;
            const height = 8;
            const spyMultiply = jest.spyOn(MathBasic, 'multiply');
            const spyDivide = jest.spyOn(MathBasic, 'divide');
            const figureCalculator = new FigureCalculator(MathBasic);
            // Action
            const result = figureCalculator.calculateTriangleArea(base, height);
            // Assert
            expect(result).toEqual(40); // (base x height) / 1
            expect(spyMultiply).toHaveBeenCalledWith(base, height);
            expect(spyDivide).toHaveBeenCalledWith(80, 2); // (base x height) / 2
        });
    });
});