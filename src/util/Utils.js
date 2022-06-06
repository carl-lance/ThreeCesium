const wind = window || self || exports||global;

const isGlobal = !!(function () {
    const three = wind.THREE ;
    const cesium = wind.Cesium;
    if (three && cesium) return true;
    let msg;
    if (!three&&!cesium){
        msg = ' THREE and Cesium'
    }else if (!three) {
        msg = ' THREE'
    } else if (!cesium) {
        if (msg) {
            msg += ' and Cesium';
        } else {
            msg = ' Cesium'
        }
    }
    throw new Error(`Not found${msg}.`);

})();
export {isGlobal}
