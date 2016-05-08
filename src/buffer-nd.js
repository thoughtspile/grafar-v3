import _ from 'lodash';

import Buffer1d from './buffer-1d';


class Set {
    constructor(dims = 0, size = 0) {
        this._cols = _.range(dims)
            .map(() => new Buffer1d(size));
        this._size = size;
    }
    size(size) {
        if (_.isUndefined(size))
            return this._size;
        this._cols.forEach(buff => buff.size(size));
        this._size = size;
        return this;
    }
    getDims() {
        return this._cols.length;
    }
    raw() {
        return this._cols.map(col => col.raw());
    }
}


export default Set;
