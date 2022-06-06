import serve from "rollup-plugin-serve";
import liveReload from "rollup-plugin-livereload";
import {terser} from "rollup-plugin-terser";
// import nodeResolve from "rollup-plugin-node-resolve";
// import postcss from "rollup-plugin-postcss";


function header() {

    return {

        renderChunk(code) {

            return `/**
 * @license
 * Copyright 2010-2022 ThreeCesium.Scene Authors Zhang-jw
 * SPDX-License-Identifier: MIT
 */
 
const THREE=window.THREE,Cesium=window.Cesium;
 
${code}`;

        }

    };

}

function externalFile(name) {
    return /three.*/.test(name);
}

function clearUp() {

    return {

        transform(code) {

            code = code.replace(`import * as THREE from 'three';`, '');
            code = code.replace(`import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';`, 'const GLTFLoader = THREE.GLTFLoader;');

            return {
                code: code,
                map: null
            };

        }

    };
}

export default [
    {
        input: 'src/ThreeCesium.js',
        external:name=>externalFile(name),
        plugins: [
            clearUp(),
            header(),
            //terser(),
            serve({
                open: false,
                contentBase: '.',
                verbose: true,
                openPage: '/public/',
                host: 'localhost',
                port: 9009
            }),
            //liveReload()
        ],
        output: [
            {
                name: 'ThreeCesium',
                format: 'umd',
                file: 'build/ThreeCesium.min.js',
                globals: {
                    Cesium: 'Cesium',
                    THREE: 'THREE'
                },
                indent: '\t',
                sourcemap: true
            },
        ]
    },
    {
        input: 'src/ThreeCesium.js',
        external:name=>externalFile(name),
        plugins: [
            clearUp(),
            header(),
            //terser()
        ],
        output: [
            {
                name: 'ThreeCesium',
                format: 'esm',
                file: 'build/ThreeCesium.module.js',
                globals: {
                    Cesium: 'Cesium',
                    THREE: 'THREE'
                },
                indent: '\t',
                sourcemap: false
            },
        ]
    }
];
