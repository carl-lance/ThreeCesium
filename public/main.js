
const camera = new THREE.PerspectiveCamera(45, 1, 1, 99999999999);
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    logarithmicDepthBuffer: true,
    stencil: true,
    depth:true
});
renderer.outputEncoding=THREE.sRGBEncoding;
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const dom = document.getElementById('app-three');
dom.appendChild(renderer.domElement);

const scene = new ThreeCesium.Scene({
    cesiumDom: 'app-cesium',
    threeHabit:true,
    autoRotate:false,
    enableLighting:true,
    axesHelper:false,
    camera,
    renderer,
    lngLat: [114.29408, 30.60988],
    cesiumOption: {
        animation:true,
        timeline:true,
        imageryProvider: {
            type: 'WebMapTileServiceImageryProvider',
            option: {
                url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=65a5f62a964c1d5b23fa81bc34147973',
                layer: 'img',
                style: 'default',
                tileMatrixSetID: 'w',
                format: 'tiles',
                maximumLevel: 18
            }
        }
    },
    cesiumLayers:[
        {
            type:'WebMapTileServiceImageryProvider',
            option:{
                url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=65a5f62a964c1d5b23fa81bc34147973',
                layer: 'cia',
                style: 'default',
                tileMatrixSetID: 'w',
                format: 'tiles',
                maximumLevel: 18
            }
        }
    ]
});

/*scene.addImageryProvider('WebMapTileServiceImageryProvider', {
    url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=65a5f62a964c1d5b23fa81bc34147973',
    layer: 'cia',
    style: 'default',
    tileMatrixSetID: 'w',
    format: 'tiles',
    maximumLevel: 18
})*/

const tilesRenderer = new ThreeCesium.TilesRenderer( './data/tileset.json'  );
tilesRenderer.setCamera( scene.camera );
tilesRenderer.setResolutionFromRenderer( scene.camera, scene.renderer );
tilesRenderer.group.position.set(-200,0,-90);
scene.add( tilesRenderer.group );

const state=new Stats();
document.getElementById('app-root').appendChild(state.domElement);

///////

const center = Cesium.Cartesian3.fromDegrees(
    scene.lngLat[0], scene.lngLat[1] - 0.00006,
    15
);
scene.cameraFlyTo(center)
/*
const axesHelper = new THREE.AxesHelper(1000000);
scene.add(axesHelper);*/
/*scene.sun.visible=false;
//
//const light = new THREE.AmbientLight('#ffffff', 0.5);
const light2 = new THREE.DirectionalLight('#ffffff', 1);
//light2.position.set(0,scene.childrenGroup.position+10,0);
scene.add(light2);
light2.castShadow=true;
light2.position.set(0,100,100)
const helper=new THREE.DirectionalLightHelper(light2,100);
scene.add(helper);
helper.add(new THREE.AxesHelper(1000000000000000))
light2.add(new THREE.AxesHelper(1000000000000000))
light2.target=scene.childrenGroup;*/

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshLambertMaterial({
    color: '#fff',
    side: THREE.DoubleSide,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = 0.5;
scene.add(box);


const planeGeometry = new THREE.PlaneGeometry(100, 100);
planeGeometry.rotateX( - Math.PI / 2 );
const planeMaterial = new THREE.ShadowMaterial(/*{
    color: '#7ce0ff',
    side: THREE.DoubleSide,
    opacity:0.5
}*/);
planeMaterial.opacity = 0.2;
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

box.castShadow= true;/*
plane.castShadow=true;
box.receiveShadow=true;*/
plane.receiveShadow=true;

window.t = scene


const rend=new THREE.WebGLRenderer({antialias: true});

document.getElementById('app-root').appendChild(rend.domElement);

rend.setSize(100,100);
rend.domElement.style.position='absolute';
rend.domElement.style.right='0';

const rend2=new THREE.WebGLRenderer({antialias: true});
rend2.outputEncoding=THREE.sRGBEncoding;
rend2.shadowMap.enabled=true;
rend2.shadowMap.type=THREE.PCFSoftShadowMap;

document.getElementById('app-root').appendChild(rend2.domElement);

rend2.setSize(200,200);
rend2.domElement.style.position='absolute';
rend2.domElement.style.top='100px';
rend2.domElement.style.right='0';

const camera3=new THREE.PerspectiveCamera(50,1,0.001,500);
camera3.position.set(0,15,15);
camera3.lookAt(scene.childrenGroup.position);
scene.add(camera3);


////
loop();

function loop() {
    requestAnimationFrame(loop);
    scene.update();
    state.update();
    tilesRenderer.update();
    /*rend.render(scene,scene.sun.shadow.camera)
    rend2.render(scene,camera3)*/
}
