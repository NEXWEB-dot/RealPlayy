import './style.css';
import * as THREE from 'three';
import { CONFIG  } from './config.js';
import { createRenderer } from "./core/renderer.js";
import {createloop  } from './core/src/core/loop.js';
import {createArena  } from './sports/tableTennis/arena.js';
const canvas=document.querySelector('#game');
const renderer=createRenderer(canvas);
const scene= new THREE.Scene();
scene.background=new THREE.Color(CONFIG.renderer.clearColor)
const camera=new THREE.PerspectiveCamera(
    CONFIG.camera.fov,
    window.innerWidth/window.innerHeight,
    CONFIG.camera.near,
    CONFIG.camear.far
);
camera.position.set(0,CONFIG,camera.heigt,CONFIG.player.startZ+CONFIG.camera.distance);
camera.lookAt.apply(0,CONFIG.camera.lookAtHeight,CONFIG.camera.lookAtZ);
scene.add(createArena());
const hemi=new THREE.HemisphereLight(0xfffffff,0x556677,1.2);
scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffffff,1.6);
sun.position.set(4,8,3);
scene.add(sun);
window.addEventListener('resize', () =>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
createLoop(
()=>{},
()=>renderer.render(scene, camera)
);