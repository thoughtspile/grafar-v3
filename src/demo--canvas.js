import _ from 'lodash';
import Set from './buffer-nd';
import { Generator, ints } from './generators';
import { map, each } from './transforms';
import { zip, cart } from './combine';
import mus from 'microseconds';


const N = 1000;

let canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');

let t = 0;
let x = new Generator(i => i / 2).into(new Set(1, N));
let i = ints(-2, 2);
let ix = cart([i, x]);
let fn = [(i, x) => 200 + 200 * Math.sin(Math.sin(t * i) + Math.cos(i + x / 20))];
let y = new Set(1);

(function update() {
    t += .01;
    cart([i, x], ix);
    map(ix, fn, y);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let xy = zip([ix, y]);
    let start = mus.now();
    xy.each((i, x, y) => ctx.fillRect(x, y, 1, 1));
    console.log(mus.since(start) / 1000);

    requestAnimationFrame(update);
}());
