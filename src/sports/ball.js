import * as THREE from 'three';
import {CONFIG  } from '../config.js';
const {table,physics,ball:cfg,machine}=CONFIG;
export function createBall(){
const pos=new THREE.Vector3();
const vel=new THREE.Vector3();
const mesh= new THREE.Mesh(
    new THREE.SphereGeometry(cfg.radius,12,13),
    new THREE.MeshLambertMaterial({color:cfg.color,flatShading:true})
);

shadow.rotation.x=-Math.PI/2;
const area=Math.PI * cfg.radius * cfg.radius;
const k = (0.5 * cfg.airdensity * cfg.dragCoeff * area) / cfg.mass;
function overTable(){
    return Math.abs(pos.x)<=table.width /2 && Math.abs(pos.z)<=table.length /2;
}

   const shadow=new THREE.Mesh(
        new THREE.CircleGeometry(cfg.radius * 1.3,16),
        new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.35})
    );
function step(dt){
    const prevY=pos.y;
    vel.y -=physics.gravity * dt;
    vel.addScaledVector(vel,-k * vel.length () * dt);
    pos.addScaledVector (vel,dt);
    if (prevY - cfg.radius >= table.height && pos.y-cfg.radius < table.height && overTable()){
        pos.y=table.height + cfg.radius;
        vel.y=-vel.y * cfg.restitution;
    }
    if (pos.y-cfg.radius<0 && vel.y<0){
        pos.y=cfg.radius;
        vel.y=-vel.y * cfg.floorRestitution
    }
    }
    function launch(){
        pos.set(machine.start.x, machine.start.y,machine.start.z);
        vel.set(machine.velocity.x,machine.velocity.y,machine.velocity.z);
    }
    function dropTest(height){
        const savedPos=pos.clone();
        const savedVel=velocity.clone();
        pos.set(0, table.height+cfg.radius+height,0);
    vel.set(0,0,0);
    let bounced=false;
    let apex=0;
    for(let t=0; t<3;t+=physics.step){
        step(physics.step);
        if(vel.y >0 )bounced=true;
        if(bounced){
            apex=Math.max(apex,pos.y-cfg.radius-table.height);
            if(vel.y<=0)break;
        }
    }
    console.log(`Drop test:Dropped from${(height * 100).toFixed(1)}cm,bounced back to ${(apex*100).toFixed(1)}cm`);
    pos.copy(savedPos);
    vel.copy(savedVel);
    return apex;
    }
    function syncMesh(){
        Mesh.position.copy(pos);
        shadow.position.set(pos.x, (overTable () && pos.y > table.height ? table.height:0)+ 0.004, pos.z);

    }
    launch();
    syncMesh();
    return{mesh,shadow,step,launch,dropTest,syncMesh};
}