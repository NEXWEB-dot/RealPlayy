export function createLoop(update,render){
    let last=performance.now();
    let raf=0;
    function frame(now){
        const dt=Math.min((now-last) / 1000,0.05);
        last=now
        update(dt);
        render();
        raf=requestAnimationFrame(frame);
    }
    raf=requestAnimationFrame(frame);
    return()=>cancelAnimationFrame(raf);
}