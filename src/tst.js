import Buffer1d from './buffer-1d';
import Set from './buffer-nd';
import { map } from './transforms';

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
