const _ = require('lodash');

import Set from './buffer-nd';


function compile(fns) {
    const dimIn = fns.length;
    const compiled = fns.map(fn => wrapFn(fn));

    return function(src, targ) {
        for (var i = 0; i < dimIn; i++)
            compiled[i](src, targ[i]);
    };
}

function wrapFn(fn) {
    var nargfn = nListMap(fn.length);
    var boundfn = function(src, target) {
        nargfn(fn, src, target);
    };
    return boundfn;
};

function nListMap(nargs) {
    var application = '';
    for (var i = 0; i < nargs; i++) {
        application += 'src[' + i + '][i]';
        if (i !== nargs - 1)
            application += ', ';
    }
    return new Function('fn', 'src', 'target',
        'var len = (src[0] || target).length;\n' +
        'for (var i = 0; i < len; i++)\n' +
        '  target[i] = fn(' + application + ');');
};

function nCall(nargs) {
    var application = '';
    for (var i = 0; i < nargs; i++) {
        application += 'src[' + i + '][i]';
        if (i !== nargs - 1)
            application += ', ';
    }
    return new Function('fn', 'src',
        'var len = src[0].length;\n' +
        'for (var i = 0; i < len; i++)\n' +
        '  fn(' + application + ');');
}


function map(src, fn, targ) {
    if (!Array.isArray(fn))
        fn = [fn];
    if (_.isUndefined(targ))
        targ = new Set(fn.length, src.size());
    const compiled = compile(fn);
    compiled(src.raw(), targ.raw());
    return targ;
}

function each(src, fn) {
    const compiled = nCall(fn.length);
    compiled(fn, src.raw());
}


export {
    map,
    each
};
