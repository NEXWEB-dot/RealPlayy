import * as THREE from 'three';
import {CONFIG  } from '../config.js';
const {table,physics,ball:cfg,machine}=CONFIG;
export function createBall(){








    const shadow=new THREE.Mesh(
        new THREE.CircleGeometry(cfg.radius * 1.3,16),
        new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.35})
    );
    shadow.rotation.x=-Math.PI/2;







    function step(dt){















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