console.log('million ints:', new Nanotimer().time(() => ints(0, 1000000), '', 'u') / 1000, 'ms');
let preMillion = ints(0, 1000000);
console.log('million ints (preallocated):',
    new Nanotimer().time(() => ints(0, 1000000, preMillion), '', 'u') / 1000, 'ms');

console.log('million ints (preallocated, literal):',
    new Nanotimer().time(() => {
        let raw = preMillion.raw()[0];
        let fn = i => i;
        for (var i = 0; i < raw.length; i++) {
            raw[i] = fn(i);
        }
    }, '', 'u') / 1000, 'ms');
