import { lights } from "three/tsl";

export const CONFIG={
    renderer:{
        maxPixelRatio:1.5, 
        clearColor:0x0b0e13
    },


    //Camera Angels
    camera:{
        fov:55,
        near:1,
        far:110,
        height:3.6,
        distance:1.8,
        lookAtHeight:0.80,
        lookAtZ:0,


        
    },
    //Dimensions
    table: { 
        length:2.4,
        width:1.525,
        height:0.76,
        thickness:0.05
    },
    net: {
        height:0.1525,
        overhang:0.1525,
        thickness:0.01
    },

    player:{startZ:2.2  },
    arena:{
         floorWidth:15,
    floorDepth:12,
    },
    lights:{
        skyColor:0xffffff,
        groundColor:0x556677,
        hemiStrenght:1.2,
        sunColor:0xffffff,
        sunStrenght:1.6,
    },
    colors:{
        floor:0xe8604c,
        table:0x1f5fd6,
        line:0xf4f4f4,
        net:0xf4f4f4,
        legs:0x232323,
    }
};