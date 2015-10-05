import { memoize } from "./memoize.js";

chai.config.includeStack = true;

let expect = chai.expect;

describe("Memoized function", function () {
    
    function abs() {
        let xs = [...arguments];
        let power = xs.map(x => x * x).reduce((sum, x) => sum + x);
        return Math.round(Math.sqrt(power));
    }

    function concatArray() {
        let xs = [...arguments];
        let result = xs.map(x => typeof x).reduce((sum, x) => sum + x);
        return result;
    }

    var absSpy;
    var memoizedAbs;
    var concatArraySpy;
    var memoizedConcatArray;

    beforeEach(function () {
        absSpy = chai.spy(abs);
        concatArraySpy = chai.spy(concatArray);

        memoizedAbs = memoize(absSpy);
        memoizedConcatArray = memoize(concatArraySpy);
    });

    it("should delegate calls to target function", function() {
        expect(memoizedAbs(0, 1)).to.equal(1);
        expect(memoizedAbs(3, 4)).to.equal(5);
    });

    it("should return correct values in case of the consequent calls with identical arguments", function() {
        for (var i = 0; i < 2; i++) {
            expect(memoizedAbs(3, 4)).to.equal(5);
        }
    });

    it("should cache results of the consequent calls with identical arguments", function() {
        const ARGS0 = [3, 4],
              ARGS1 = [3, 5];

        memoizedAbs(...ARGS0); // first call
        expect(absSpy).to.have.been.called.with(...ARGS0);
        memoizedAbs(...ARGS1);
        expect(absSpy).to.have.been.called.with(...ARGS1);
        expect(absSpy).to.have.been.called.twice();

        absSpy.reset();
        memoizedAbs(...ARGS0); // second call
        expect(absSpy).to.not.have.been.called();
    });

    it("should use all arguments to compute cache key", function() {
        for (var i = 0; i < 2; i++) {
            memoizedAbs(1, 2, 3, 4, 5);
        }
        expect(absSpy).to.have.been.called.once();
    });

    it("should executed without errors", function() {
        expect(memoizedAbs(1, 2, null));
        expect(memoizedAbs(1, 2, undefined));
        expect(memoizedAbs(1, 2, NaN));
        expect(concatArray(1, [1,2,3,4,'asdfasdf']));
    });

    it("should return different values", function() {
        expect(memoizedAbs(1, 2)).to.equal(2);
        expect(memoizedAbs(12)).to.equal(12);

        expect(memoizedConcatArray(1, 2, NaN)).to.equal('numbernumbernumber');
        expect(memoizedConcatArray(1, 2, undefined)).to.equal('numbernumberundefined');
        expect(memoizedConcatArray(1, 2, null)).to.equal('numbernumberobject');

        expect(memoizedConcatArray(112,['',3,4,'asdfasdf'])).to.equal('numberobject');
        expect(memoizedConcatArray(11,[2,3,4,'asdfasdf'],null)).to.equal('numberobjectobject');


    });

    it("should understand the difference between Object", function() {
        const ARGS0 = [112, {name: 'Ван Гог'}],
              ARGS1 = [112, {status: 'DEAD'}];

        memoizedConcatArray(...ARGS0);
        expect(concatArraySpy).to.have.been.called();

        memoizedConcatArray(...ARGS1);
        expect(concatArraySpy).to.have.been.called.twice();

    });
});