function prod(arr) {
    return arr.reduce((acc, el) => acc * el, 1);
}

function cart(...comps) {
    let targ = comps.pop(); // TODO redim
    let srcData = comps.map(comp => comp.raw());
    const resSize = prod(comps.map(c => c.size()));
    targ.size(resSize);
    let targData = targ.raw();

    for (let iSet = 0, iComp = 0; iSet < comps.length; iSet++) { // each multiplier
        let rep = prod(comps.slice(0, iSet).map(c => c.size()));
        let stretch = prod(comps.slice(iSet + 1).map(c => c.size()));
        let compSize = comps[iSet].size();

        for (let iSetComp = 0, iEl = 0; iSetComp < comps[iSet].getDims(); iSetComp++) { // each col in current multiplier
            for (let iRep = 0; iRep < rep; iRep++) { // repeat
                for (let iSrcEl = 0; iSrcEl < compSize; iSrcEl++) { // each element
                    let el = srcData[iSet][iSetComp][iSrcEl];
                    for (let iStretch = 0; iStretch < stretch; iStretch++) { // stretch
                        targData[iComp][iEl] = el;
                        iEl++;
                    }
                }
            }
            iComp++;
        }
    }

    return targ;
}


export {
    cart
};
