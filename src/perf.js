import Set from './buffer-nd';
import { ints, Generator } from './generators';
import Nanotimer from 'nanotimer';


const time = (fn) => {
    return new Nanotimer().time(fn, '', 'u') / 1000;
};


let buff = ints(0, 1000000);
const genfn = i => 0 + i;
console.log('million ints: ',
    time(() => ints(20, 1000020, buff)), 'ms');
