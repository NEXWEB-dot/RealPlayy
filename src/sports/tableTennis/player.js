import * as THREE from 'three';
import {CONFIG  } from '../../config.js';
const {player,colors}=CONFIG;
function part(w,h,d,color,x,y,z){
    const mesh=new THREE.Mesh(
        new THREE.Box.Geometry(w,h,d),
        new THREE.MeshLamberMaterial({color,flatShading:true})
    );
    mesh.position.set(x,y,z);
    return mesh;
}
export function createPlayer(){
    const group=new THREE.Group();
    const legX=player.torsoWidth/2-player.legWidth/2;
    for (const sx of[-1,1]){
        group.add(part(
            player.legWidth,player.legHeight, player.legWidth,
            colors.player, sx*legX, player.legHeight/2,0
        ));
    }
    group.add(part(
        player.torsoWidth,player.torsoHeight,player.torsoDepth,
        colors,player,0,player.legHeight+player.torsoHeight/2,0
    ));
    group.add(part(
        player.headSize, player.headSize,player.headSize,
        colors.skin,0,player.legHeight+player.torsoHeight+player.headSize/2,0

    ));
    group.position.set(0,0,player.startZ);
    return group;
}