import _ from 'lodash';

import Set from './buffer-nd';


function compileMap(fns) {
    const dimIn = fns.length;
    const compiled = fns.map(fn => wrapFn(fn, nListMap));

    return (src, targ) => {
        for (let i = 0; i < dimIn; i++)
            compiled[i](src, targ[i]);
    };
}

function compileEach(fn) {}

function wrapFn(fn, compiler) {
    const nargfn = nListMap(fn.length);
    return (src, target) => nargfn(fn, src, target);
};

function repWithI(count, pattern, join = ',') {
    return _.range(0, count)
        .map(i => pattern(i))
        .join(join);
}

function nListMap(nargs) {
    return new Function(['fn', 'src', 'target'],
        'var len = (src[0] || target).length;\n' +
        'for (var i = 0; i < len; i++)\n' +
        '  target[i] = fn(' + repWithI(nargs, i => `src[${i}][i]`, ',') + ');');
};

function nCall(nargs) {
    return new Function(['fn', 'src'],
        'var len = src[0].length;\n' +
        'for (var i = 0; i < len; i++)\n' +
        '  fn(' + repWithI(nargs, i => `src[${i}][i]`, ',') + ');');
}


function map(src, fn, targ) {
    if (!Array.isArray(fn))
        fn = [fn];
    targ = (targ || new Set(fn.length, src.size())).size(src.size());
    const compiled = compileMap(fn);
    compiled(src.raw(), targ.raw());
    return targ;
}

function each(src, fn) {
    const compiled = nCall(src.getDims());
    compiled(fn, src.raw());
}


export {
    map,
    each
};
