import Set from './buffer-nd';


function ints(start, end) {
    start = Math.ceil(start);
    end = Math.floor(end);
    const count = Math.abs(end + 1 - start);

    let res = new Set(1, count);
    let data = res.raw()[0];

    let val = start;
    let inc = Math.sign(end - start);
    for (let i = 0; i < count; i++) {
        data[i] = val;
        val += inc;
    }

    return res;
}


export {
    ints
};
