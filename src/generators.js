import Set from './buffer-nd';


// thread-unsafe
const gens = {
    int: (function() {
        var start = 0;
        const fn = i => start + i;
        const gen = mkGen();

        return {
            setup: function(obj) {
                start = obj.start;
                return this;
            },
            into: function into(set) {
                gen(fn, set.raw()[0], set.size());
                return set;
            }
        };
    }())
};

const ints = (function() {
    return function ints(startLoc, end, targ) {
        const start = Math.ceil(startLoc);
        const size = Math.abs(Math.floor(end) + 1 - start);
        targ = targ ? targ.size(size) : new Set(1, size);

        return gens.int.setup({ start }).into(targ);
    };
}());

const Generator =  {
    into: function(fn, set) {
        mkGen()(fn, set.raw()[0], set.size());
        return set;
    }
}

function mkGen() {
    // seed prevents inlining
    const seed = Math.floor(Math.random() * 10000);
    return Function(['fn', 'raw', 'size'],
        `${seed}; for (var i = 0; i < size; i++) raw[i] = fn(i);`);
}


export {
    ints,
    Generator
};
