import './style.css'
import * as THREE from 'three';
import {CONFIG  } from './config.js';
import {findblanks  } from './core/fillcheck.js';
import {  createRenderer} from './core/renderer.js';
import {createLoop  } from './core/loop.js';
import {createArena  } from './sports/tableTennis/arena.js';
import {createBall  } from './sports/ball.js';
const blanks=findblanks(CONFIG);
if(blanks.length >0){
    document.body.innerHTML=`<pre style="color#fff;padding:16px;font:16px monospace">Fill in these valus in src/config.js:\n\n${blanks.join('\n')}</pre>;`
    throw new Error(`Unfilled config values:${blanks.join(',')}`)
}
const canvas=document.querySelector('#game');
const renderer=createRenderer(canvas);
const scene=new THREE.Scene();
scene.background=new THREE.Color(CONFIG.renderer.clearColor);
const camera=new THREE.PerspectiveCamera(
    CONFIG.camera.fov,
    window.innerWidth/window.innerHeight,
    CONFIG.camera.near,
    CONFIG.camera.far
);
camera.position.set(0,CONFIG.camera.height,CONFIG.player.startZ+CONFIG.camera.distance);
camera.lookAt(0,CONFIG.camera.lookAtHeight,CONFIG.camera.lookAtZ);
scene.add(createArena());
const hemi= new THREE.HemisphereLight(CONFIG.lights,skyColor,CONFIG.lights.groundColor,CONFIG.lights.hemiStrenght);
scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffffff,1.6);
sun.position.set(4,8,3);
scene.add(sun);
window.addEventListener('resize', ()=> {
    camera.aspect=window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
createLoop(
    ()=>{},
    ()=>renderer.render(scene,camera)
);
