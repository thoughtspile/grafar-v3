import Buffer1d from './buffer-1d';
import Set from './buffer-nd';
import { map, each } from './transforms';
import { ints } from './generators';
import { cart } from './combine';

let buff = new Buffer1d();
console.log(buff, buff.size());
buff.size(3);
console.log(buff, buff.size());

let set0d = new Set();
console.log(set0d, set0d.size());

let set2d = new Set(2);
console.log(set2d, set2d.size());
set2d.size(3);
console.log(set2d, set2d.size());

let set1d = new Set(1, 3);
set2d._cols[0]._data.set([1,2,3]);
set2d._cols[1]._data.set([10,20,30]);
map(set2d, (x, y) => x + y, set1d);
console.log(set1d.raw());

let targ2d = new Set(2, 3);
map(set2d, [(x, y) => x + y, (x, y) => x * y], targ2d);
console.log(targ2d.raw());

let intSet = ints(0, 12);
console.log(intSet, intSet.raw());

let int2 = ints(0, 1);
console.log(int2.raw())
console.log(cart(int2, int2, new Set(2, 4)).raw());

const sqr3 = cart(int2, int2, int2, new Set(3, 8));
each(sqr3, (x, y, z) => console.log(x, y, z));
