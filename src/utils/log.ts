export const logFunc=(payload:any, optional:any)=>{
    if (process.env.NODE_ENV==="development") {
        console.log(optional);
        console.log(payload);
    }else{
        return
    }
}