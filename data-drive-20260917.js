// IDE 2.0 — finalisation du pack Drive 17/09/2026
window.IDE2_DATA_READY=(async()=>{
  try{
    const b64=window.IDE2_DATA_B64||"";
    const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
    const stream=new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'));
    const txt=await new Response(stream).text();
    const pack=JSON.parse(txt);
    window.IDE2_DRIVE_QUESTIONS=(window.IDE2_DRIVE_QUESTIONS||[]).concat(pack);
    window.IDE2_DRIVE_UPDATE_META={date:"17/09/2026",count:pack.length};
    delete window.IDE2_DATA_B64;
    return pack.length;
  }catch(err){
    console.error("IDE2 Drive pack",err);
    window.IDE2_DRIVE_UPDATE_META={date:"17/09/2026",count:0,error:String(err)};
    return 0;
  }
})();
