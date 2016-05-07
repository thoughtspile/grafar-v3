'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ints = undefined;

var _bufferNd = require('./buffer-nd');

var _bufferNd2 = _interopRequireDefault(_bufferNd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ints(start, end) {
    start = Math.ceil(start);
    end = Math.floor(end);
    var count = Math.abs(end + 1 - start);

    var res = new _bufferNd2.default(1, count);
    var data = res.raw()[0];

    var val = start;
    var inc = Math.sign(end - start);
    for (var i = 0; i < count; i++) {
        data[i] = val;
        val += inc;
    }

    return res;
}

exports.ints = ints;