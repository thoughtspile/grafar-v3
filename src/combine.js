function prod(arr) {
    return arr.reduce((acc, el) => acc * el, 1)
}

function cart(...comps) {
    let targ = comps.pop(); // TODO redim
    let srcData = comps.map(comp => comp.raw());
    const resSize = prod(comps.map(c => c.size()));
    targ.size(resSize);
    let targData = targ.raw();

    for (let iSet = 0, iComp = 0; iSet < srcData.length; iSet++) {
        let mod = iSet? prod(comps.slice(0, iSet).map(c => c.size())): resSize;
        let flat = prod(comps.slice(iSet + 1).map(c => c.size()));
        for (let iSetComp = 0; iSetComp < srcData[iSet].length; iSetComp++) {
            for (let iEl = 0; iEl < resSize; iEl++) {
                targData[iComp][iEl] = srcData[iSet][iSetComp][Math.floor(iEl / flat) % mod];
            }
            iComp++;
        }
    }

    return targ;
}


export {
    cart
};
