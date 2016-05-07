'use strict';

var _buffer1d = require('./buffer-1d');

var _buffer1d2 = _interopRequireDefault(_buffer1d);

var _bufferNd = require('./buffer-nd');

var _bufferNd2 = _interopRequireDefault(_bufferNd);

var _transforms = require('./transforms');

var _generators = require('./generators');

var _combine = require('./combine');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buff = new _buffer1d2.default();
console.log(buff, buff.size());
buff.size(3);
console.log(buff, buff.size());

var set0d = new _bufferNd2.default();
console.log(set0d, set0d.size());

var set2d = new _bufferNd2.default(2);
console.log(set2d, set2d.size());
set2d.size(3);
console.log(set2d, set2d.size());

var set1d = new _bufferNd2.default(1, 3);
set2d._cols[0]._data.set([1, 2, 3]);
set2d._cols[1]._data.set([10, 20, 30]);
(0, _transforms.map)(set2d, function (x, y) {
  return x + y;
}, set1d);
console.log(set1d.raw());

var targ2d = new _bufferNd2.default(2, 3);
(0, _transforms.map)(set2d, [function (x, y) {
  return x + y;
}, function (x, y) {
  return x * y;
}], targ2d);
console.log(targ2d.raw());

var intSet = (0, _generators.ints)(0, 12);
console.log(intSet, intSet.raw());

var int2 = (0, _generators.ints)(0, 1);
console.log(int2.raw());
console.log((0, _combine.cart)(int2, int2, new _bufferNd2.default(2, 4)).raw());

var sqr3 = (0, _combine.cart)(int2, int2, int2, new _bufferNd2.default(3, 8));
(0, _transforms.each)(sqr3, function (x, y, z) {
  return console.log(x, y, z);
});