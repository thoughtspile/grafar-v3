import Set from './buffer-nd';


// thread-unsafe
const gens = {
    int: (function() {
        var start = 0;
        return {
            setup: function(obj) {
                start = obj.start;
                return this;
            },
            fn: i => start + i
        };
    }())
};

const ints = (function() {
    return function ints(startLoc, end, targ) {
        const start = Math.ceil(startLoc);
        const size = Math.abs(Math.floor(end) + 1 - start);
        targ = targ ? targ.size(size) : new Set(1, size);

        return Generator.into(gens.int.setup({ start }).fn, targ);
    };
}());

const Generator =  {
    into: function(fn, set) {
        let raw = set.raw()[0];
        for (let i = 0; i < raw.length; i++) {
            raw[i] = fn(i);
        }
        return set;
    }
}


export {
    ints,
    Generator
};
