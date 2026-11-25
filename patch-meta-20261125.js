// IDE 2.0 — métadonnées synchronisation Drive 25/11/2026
(()=>{
  const count=window.IDE2_20261125_COUNT||0;
  window.IDE2_DRIVE_UPDATE_META={date:"25/11/2026",count};
  const sub=document.querySelector("header .sub");
  if(sub) sub.textContent=`Mise à jour Drive 25/11/2026 • +${count} nouvelles questions depuis la synchronisation précédente • QCM, écrit, INDICE et PASSER • progression enregistrée sur cet appareil`;
  const badge=document.getElementById("driveSyncBadge");
  if(badge){
    badge.textContent=`✅ Drive synchronisé 25/11/2026 • ${count} nouvelles questions intégrées`;
    badge.style.background="rgba(255,255,255,.22)";
  }
  try{ populateFilters(); calcDashboard(); }catch(e){ console.warn("IDE2 refresh filtres",e); }
})();