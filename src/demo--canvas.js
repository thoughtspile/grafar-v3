import _ from 'lodash';
import Set from './buffer-nd';
import { Generator } from './generators';
import { map, each } from './transforms';
import { zip } from './combine';
import mus from 'microseconds';


const N = 1000;

let canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');

let t = 0;
let x = new Generator(i => i / 2).into(new Set(1, N));
let fn = [x => 200 + 200 * Math.sin(Math.sin(t) + Math.cos(x / 20))];
let y = new Set(1, N);

(function update() {
    t += .01;
    map(x, fn, y);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let xy = zip([x, y]);
    let start = mus.now();
    xy.each((x, y) => ctx.fillRect(x, y, 1, 1));
    console.log(mus.since(start) / 1000);

    requestAnimationFrame(update);
}());
