import * as THREE from 'three';
import {CONFIG} from '../../config.js';
const {table,net,arena,colors}=CONFIG;
function flat(color){
    return new THREE.MeshLambertMaterial({color,flatShading:true});

}
function box(w,h,d,color){
    return new THREE.Mesh(new THREE.BoxGeometry(w,h,d),flat(color));

}


export function createArena(){
    const group=new THREE.Group();
    const topY=table.height;
    const floor= new THREE.Mesh(
        new THREE.PlaneGeometry(arena.floodWidth,arena.floorDepth),
        flat(colors.floor)

    );
    floor.rotation.x= -Math.PI/2;
    group.add(floor);
    const bh= arena.barrierHeight;
    const bt=arena.barrierThickeness;
    const halfW=arena.floorWidth/2;
    const halfD=arena.floorDepth/2;
    for (const sz of [-1,1]) {
        const wall=box(arena.floorWidth,bh,bt,colors.barrier);
        wall.position.set(0,bh/2,sz*halfD);
        group.add(wall);

    }
    for (const sx of [-1,1]) {
        const wall= box(bt,bh,arena.floorDepth,colors.barrier);
        wall.position.set(sx*halfW,bh/2,0);
        group.add(wall);
    } 
    const top=new THREE.Mesh(
        new THREE.BoxGeometry(table.width,table.thickness,table.length),
        new THREE.MeshPhongMaterial({color:colors.table,shininess:80,flatShading:true})

    );
    top.position.y=topY-table.thickness/2;
    group.add(top);
    const legH=table.height-table.thickness;
    const legX=table.width/2-0.12;
    const legZ=table.length/2-0.12;
    for (const sx of [-1,1]){
        for (const sz of [-1,1]){
            const leg=box(0.06,legH,0.06,colors.legs);
            leg.position.set(sx*legX,legH/2, sz * legZ);
            group.add(leg);
        }
    }
    const netW=table.width + net.overhang*2;
    const netMesh=box(netW,net.height,net.thickness,colors.net);
    netMesh.position.set(0,topY+net.height/2,0);
    group.add(netMesh);
    return group;
}
