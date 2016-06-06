-
    case:
        function gen (fn, set) {
            for (var i = 0; i < 1000000; i++)
                set[i] = fn(i);
        }

        var arr = new Float32Array(1000000);
        var fn = function(i) { return 0; };
        var fn2 = function(i) { return 0; };
        gen(fn2, arr);
        gen(fn, arr); // deoptimized
    solution: reuse fn instead of creating fn2
