import Set from './buffer-nd';


function ints(start, end, targ) {
    start = Math.ceil(start);
    end = Math.floor(end);
    const size = Math.abs(end + 1 - start);
    if (!targ)
        targ = new Set(1, size);
    targ.size(size);
    return Generator.into(i => start + 1, targ);
}

const Generator =  {
    into: function(fn, set) {
        let raw = set.raw()[0];
        for (let i = 0; i < raw.length; i++) {
            raw[i] = fn(i);
        }
        return set;
    }
}

function plainGenerator(fn, set) {
    let raw = set.raw()[0];
    for (let i = 0; i < raw.length; i++) {
        raw[i] = fn(i);
    }
    return set;
}


export {
    ints,
    Generator,
    plainGenerator
};
