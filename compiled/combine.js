"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function prod(arr) {
    return arr.reduce(function (acc, el) {
        return acc * el;
    }, 1);
}

function cart() {
    for (var _len = arguments.length, comps = Array(_len), _key = 0; _key < _len; _key++) {
        comps[_key] = arguments[_key];
    }

    var targ = comps.pop(); // TODO redim
    var srcData = comps.map(function (comp) {
        return comp.raw();
    });
    var resSize = prod(comps.map(function (c) {
        return c.size();
    }));
    targ.size(resSize);
    var targData = targ.raw();

    for (var iSet = 0, iComp = 0; iSet < srcData.length; iSet++) {
        var mod = iSet ? prod(comps.slice(0, iSet).map(function (c) {
            return c.size();
        })) : resSize;
        var flat = prod(comps.slice(iSet + 1).map(function (c) {
            return c.size();
        }));
        for (var iSetComp = 0; iSetComp < srcData[iSet].length; iSetComp++) {
            for (var iEl = 0; iEl < resSize; iEl++) {
                targData[iComp][iEl] = srcData[iSet][iSetComp][Math.floor(iEl / flat) % mod];
            }
            iComp++;
        }
    }

    return targ;
}

exports.cart = cart;