import * as THREE from'three';
import{CONFIG}from'../config.js';
export function createRenderer(canvas){
    const renderer= new THREE.WebGLRenderer({canvas,antialias:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,CONFIG.renderer.maxPixelRatio));
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    return renderer;
}
