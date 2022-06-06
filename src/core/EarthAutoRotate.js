class EarthAutoRotate {
    constructor(cesiumViewer) {
        this.enabled = false;
        this.speed=1;
        this.cesiumViewer = cesiumViewer;
        this.clock=new THREE.Clock();
    }

    update(){

        if (!this.enabled)return;

        // 地球自转关键代码
        const {height} = this.cesiumViewer.scene.globe.ellipsoid.cartesianToCartographic(this.cesiumViewer.camera.position);

        const interval =this.clock.getDelta()*this.speed;

        this.cesiumViewer.camera.rotate(Cesium.Cartesian3.UNIT_Z, (Math.PI / (24 * 60 * 60)) * interval,height);
    }

}
export {EarthAutoRotate};
