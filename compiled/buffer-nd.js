'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _buffer1d = require('./buffer-1d');

var _buffer1d2 = _interopRequireDefault(_buffer1d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var Set = function () {
    function Set() {
        var dims = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var size = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Set);

        this._cols = _.range(dims).map(function () {
            return new _buffer1d2.default(size);
        });
        this._size = size;
    }

    _createClass(Set, [{
        key: 'size',
        value: function size(_size) {
            if (_.isUndefined(_size)) return this._size;
            this._cols.forEach(function (buff) {
                return buff.size(_size);
            });
            this._size = _size;
            return this;
        }
    }, {
        key: 'getDims',
        value: function getDims() {
            return this._cols.length;
        }
    }, {
        key: 'raw',
        value: function raw() {
            return this._cols.map(function (col) {
                return col._data;
            });
        }
    }]);

    return Set;
}();

exports.default = Set;