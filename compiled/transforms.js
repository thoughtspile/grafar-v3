'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.map = undefined;

var _bufferNd = require('./buffer-nd');

var _bufferNd2 = _interopRequireDefault(_bufferNd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');

function compile(fns) {
    var dimIn = fns.length;
    var compiled = fns.map(function (fn) {
        return wrapFn(fn);
    });

    return function (src, targ) {
        for (var i = 0; i < dimIn; i++) {
            compiled[i](src, targ[i]);
        }
    };
}

function wrapFn(fn) {
    var nargfn = nListMap(fn.length);
    var boundfn = function boundfn(src, target) {
        nargfn(fn, src, target);
    };
    return boundfn;
};

function nListMap(nargs) {
    var application = '';
    for (var i = 0; i < nargs; i++) {
        application += 'src[' + i + '][i]';
        if (i !== nargs - 1) application += ', ';
    }
    return new Function('fn', 'src', 'target', 'var len = (src[0] || target).length;\n' + 'for (var i = 0; i < len; i++)\n' + '  target[i] = fn(' + application + ');');
};

function map(src, fn, targ) {
    if (!Array.isArray(fn)) fn = [fn];
    if (_.isUndefined(targ)) targ = new _bufferNd2.default(fn.length, src.size());
    var compiled = compile(fn);
    compiled(src.raw(), targ.raw());
    return targ;
}

exports.map = map;