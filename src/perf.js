import Set from './buffer-nd';
import { ints, Generator } from './generators';
import Nanotimer from 'nanotimer';


const time = (fn) => {
    return new Nanotimer().time(fn, '', 'u') / 1000;
};


let buff = ints(0, 1000000);
for (var i = 0; i < 10; i++) {
    console.log(`ints, take  ${i}:`, time(() => ints(20, 1000020, buff)));
}
for (var i = 0; i < 10; i++) {
    console.log(`custom gen  ${i}:`, time(() => Generator.into(i => i + 2, buff)));
}
