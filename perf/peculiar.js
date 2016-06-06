function gen (fn, set) {
    for (var i = 0; i < 1000000; i++)
        set[i | 0] = fn(i);
}

var arr = new Float32Array(1000000);
// var x = 0;
var fn = function(i) { return 0; };
var fn2 = function(i) { return 0; };
// var fn2 = fn;


// console.time('run1');
gen(fn2, arr);
// console.timeEnd('run1');

// console.time('run2');
gen(fn, arr);
// console.timeEnd('run2');

// console.time('run3');
// gen2(fn, arr);
// console.timeEnd('run3');
