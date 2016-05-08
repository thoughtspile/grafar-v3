import Buffer1d from './buffer-1d';
import Set from './buffer-nd';
import { map, each } from './transforms';
import { ints } from './generators';
import { cart } from './combine';

const log = console.log.bind(console);


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
console.log('\n\tsum and product:');
console.log(targ2d.raw());

console.log('\n\t0..5')
each(ints(0, 5), log);

let int2 = ints(0, 1);
console.log('\n\t{0, 1}')
each(int2, log)

console.log('\n\tdouble cube');
each(cart([int2, int2], new Set(2, 4)), log);

console.log('\n\ttriple cube')
const sqr3 = cart([int2, int2, int2], new Set(3, 8));
each(sqr3, log);

console.log('\n\titerative triple cube')
const step1 = cart([int2, int2], new Set(2));
console.log('\nstep 1')
each(step1, log);
const step2 = cart([step1, int2], new Set(3));
console.log('\nstep 2')
each(step2, log);
