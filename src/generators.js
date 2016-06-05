import Set from './buffer-nd';


function ints(start, end, targ) {
    start = Math.ceil(start);
    end = Math.floor(end);
    const size = Math.abs(end + 1 - start);
    if (!targ)
        targ = new Set(1, size);
    targ.size(size);
    return new Generator(i => start + i).into(targ);
}

class Generator {
    // fn(state) returns value or undefined
    constructor(fn) {
        this.fn = fn;
    }
    into(set) {
        // TODO autoresize
        // TODO autoredim
        let raw = set.raw()[0];
        let fn = this.fn;
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
