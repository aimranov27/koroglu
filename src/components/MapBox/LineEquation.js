export default class LineEquation {
    slope = null;
    intercept = null;

    constructor(slope, intersection)
    {
        this.slope = slope;
        this.intercept = intersection;
    }
    getSlope()
    {
        return this.slope;
    }
    getIntercept()
    {
        return this.intercept;
    }
}