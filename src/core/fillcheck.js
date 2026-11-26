export const FILL_ME=null;
export function findblanks(obj,path='CONFIG',found=[]){
    for(const[key,value] of Object.entries(obj)){
        const where=`${path}.${key}`;
        if(value===FILL_ME) found.push(where);
        else if(typeof value==='object')findblanks(value,where,found);

    }
    return found;
}