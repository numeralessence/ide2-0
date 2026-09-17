(()=>{
  const meta=window.IDE2_DRIVE_UPDATE_META||{date:"17/09/2026",count:0};
  const sub=document.querySelector("header .sub");
  if(sub) sub.textContent=`Mise à jour Drive ${meta.date} • +${meta.count} questions issues des nouveaux cours • QCM, calculs, INDICE et PASSER • progression enregistrée sur cet appareil`;
  const badge=document.getElementById("driveSyncBadge");
  if(badge){
    badge.textContent=`✅ Drive synchronisé ${meta.date} • ${meta.count} nouvelles questions intégrées`;
    badge.style.background="rgba(255,255,255,.22)";
  }
  try{ populateFilters(); calcDashboard(); }catch(e){ console.warn("IDE2 refresh filtres",e); }
})();
