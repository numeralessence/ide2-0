(()=>{
const catalogue=[
[1,"S1","Psychologie",10],[1,"S2","Anatomie, physiologie, douleur et sémiologie",11],[1,"S3","Biologie, embryologie et génétique",13],[1,"S4","Infectiologie, hygiène et immunologie",14],[1,"S5","Pharmacologie et imagerie médicale",17],[1,"S6","Fondements de la relation de soin",19],[1,"S7","Initiation aux compétences numériques transversales",21],[1,"S8","Méthodes universitaires",24],[1,"S14","Sociologie, anthropologie et ethnologie",26],[1,"A1","Psychologie – Approfondissement",30],[1,"A5","Gérontologie",39],[1,"A9","Système digestif",48],[1,"A10","Système locomoteur",53],[1,"A12","Une seule santé (One Health)",57],[1,"A59","Anglais",117],
[2,"S9","Droit et éthique clinique",63],[2,"S10","Santé publique",65],[2,"S11","Transition environnementale et sociétale – partie 1",70],[2,"S12","Connaissance des métiers et échanges interprofessionnels",72],[2,"S13","Numérique en santé 1 (FINS 1)",74],[2,"S16","Numérique en santé 2 (FINS 2)",76],[2,"A14","Droit et éthique clinique – Approfondissement",79],[2,"A22","Pédiatrie",98],[2,"A23","Pédiatrie – Approfondissement",99],[2,"A25","Système cardio-pulmonaire",103],[2,"A26","Systèmes endocrinien et tégumentaire",106],[2,"A27","Systèmes uro-génital et reproducteur",108],[2,"A28","Santé au travail et ergonomie",109],[2,"A60","Anglais",117],
[0,"MET","UE métiers IFSI – contenus existants (rattachement à confirmer)",0],[0,"TRANS","Entraînement transversal / à classer",0]];
const norm=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
function classify(q){
const t=norm(q.topic),u=String(q.ue||""), id=String(q.id||"");
if(catalogue.some(x=>x[1]===u))return u;
if(/anglais|english/.test(t)||u==="ANGLAIS")return /hospital departments|equipment|symptoms|anatomy|emergency/.test(t)?"A60":"A59";
if(/one health|exposome|sante environnementale/.test(t))return "A12";
if(/gerontolog|vieillissement|douleur — evaluation ide/.test(t))return "A5";
if(/locomoteur — demarche|systeme locomoteur|rhumatolog/.test(t))return "A10";
if(/^anatomie — digestif, urologie et genital/.test(t))return "S2";
if(/se miologie/.test(t))return "S2";
if(/semiologie — digestif|patholog.*digest|bucco.dent|stomie|systeme digestif|physiologie digestive/.test(t))return "A9";
if(/semiologie — urinaire|uro.genital|systeme urinaire|systeme reproducteur/.test(t))return "A27";
if(/semiologie — respiratoire/.test(t))return "S2";
if(/cardio.pulmonaire/.test(t))return "A25";
if(/endocrinien et tegumentaire/.test(t))return "A26";
if(/infectio|hygiene|immunolog|vaccin|antibio|asepsie|microbio/.test(t))return "S4";
if(/pharmacolog|pharmacovigilance|addictovigilance|imagerie|galenique/.test(t))return "S5";
if(/embryolog|genetique|biologie cellulaire|biochimie|mitose|meiose/.test(t))return "S3";
if(/sociolog|anthropolog/.test(t))return "S14";
if(/psychologie.*approfond|psychologie de la douleur|comportements de sante/.test(t))return "A1";
if(/psychologie/.test(t))return "S1";
if(/saed|communication interprofessionnelle|echanges interprofessionnels/.test(t))return "S12";
if(/relation de soin|communication|teach.back|ecoute active|empathie/.test(t))return "S6";
if(/ethique|deontologie|droits du patient/.test(t))return "S9";
if(/anatomie|physiologie|semiologie|cardiovasculaire|respiratoire|systeme nerveux|neuroanatomie|douleur/.test(t)&&!/^B3/.test(id))return "S2";
if(/methodes universitaires/.test(t))return "S8";
if(/sante publique|epidemiologie/.test(t))return "S10";
if(/pediatrie/.test(t))return "A22";
if(/calcul|surveillance|parametres vitaux|sciences infirmieres|henderson|raisonnement clinique|transmission|histoire de la profession|vigilances infirmieres/.test(t)||u==="A.1"||u==="B.3")return "MET";
return "TRANS";
}
const sem=document.createElement("select");sem.id="semesterFilter";sem.setAttribute("aria-label","Semestre");sem.innerHTML='<option value="ALL">L1 — Tous les semestres</option><option value="1">Semestre 1</option><option value="2">Semestre 2</option><option value="0">UE métiers / transversal</option>';ueFilter.before(sem);
ueFilter.setAttribute("aria-label","Unité d’enseignement");topicFilter.setAttribute("aria-label","Thématique");
const info=document.createElement("div");info.className="note";info.style.cssText="margin:12px 0;line-height:1.5";ueFilter.parentElement.after(info);
const matchSem=q=>sem.value==="ALL"||String(catalogue.find(x=>x[1]===classify(q))?.[0])===sem.value;
const matchUE=q=>matchSem(q)&&(ueFilter.value==="ALL"||classify(q)===ueFilter.value);
function topics(){
 const prev=topicFilter.value;const pool=allQuestions.filter(matchUE);const names=[...new Set(pool.map(q=>q.topic))].sort((a,b)=>a.localeCompare(b,"fr"));
 topicFilter.replaceChildren(new Option("Tous les thèmes","ALL"));
 names.forEach(n=>topicFilter.add(new Option(n+" ("+pool.filter(q=>q.topic===n).length+")",n)));
 if(names.includes(prev))topicFilter.value=prev;
 const n=pool.filter(q=>topicFilter.value==="ALL"||q.topic===topicFilter.value).length;
 const item=catalogue.find(x=>x[1]===ueFilter.value);
 info.textContent=n+" question(s) dans cette sélection. "+(n?"":"UE au programme : questions à intégrer. ")+(item?.[3]?"Syllabus L1, p. "+item[3]+". ":"")+"Référence : syllabus LSS du 24/11/2026.";
}
populateFilters=function(){
 const prev=ueFilter.value;ueFilter.replaceChildren(new Option("Toutes les UE","ALL"));
 for(const [s,label] of [[1,"Semestre 1"],[2,"Semestre 2"],[0,"IFSI / transversal"]]){
 if(sem.value!=="ALL"&&sem.value!==String(s))continue;
 for(const [kind,title] of [["S","UE socles"],["A","UE avancées"],["M","UE métiers et transversal"]]){
 const rows=catalogue.filter(x=>x[0]===s&&(kind==="M"?s===0:x[1].startsWith(kind)));if(!rows.length)continue;
 const g=document.createElement("optgroup");g.label=label+" · "+title;
 rows.forEach(x=>{const count=allQuestions.filter(q=>classify(q)===x[1]).length;g.append(new Option((s?"UE "+x[1]+" — ":"")+x[2]+" ("+count+")",x[1]));});ueFilter.append(g);
 }}
 if([...ueFilter.options].some(o=>o.value===prev))ueFilter.value=prev;topics();
};
sem.addEventListener("change",()=>{ueFilter.value="ALL";populateFilters();});
ueFilter.addEventListener("change",topics);topicFilter.addEventListener("change",topics);
filteredQuestions=function(){const t=topicFilter.value,d=diffFilter.value,ty=typeFilter.value;return allQuestions.filter(q=>matchUE(q)&&(t==="ALL"||q.topic===t)&&(d==="ALL"||String(q.difficulty)===d)&&(ty==="ALL"||(q.type||"single")===ty));};
const prevStart=startMode;
startMode=function(m,list=null){if(!list&&["quick","train","exam"].includes(m)&&!filteredQuestions().length){alert("Aucune question disponible dans cette sélection. Cette UE figure au programme et sera alimentée avec les cours.");return;}return prevStart(m,list);};
const old=document.querySelector('.mode[data-mode="diagrams"]');if(old){const btn=old.cloneNode(true);old.replaceWith(btn);btn.addEventListener("click",()=>{const pool=allQuestions.filter(q=>q.type==="diagram"&&matchUE(q)&&(topicFilter.value==="ALL"||q.topic===topicFilter.value)&&(diffFilter.value==="ALL"||String(q.difficulty)===diffFilter.value));if(!pool.length){alert("Aucun schéma disponible pour cette sélection.");return;}startMode("train",pool);quizMode.textContent="Schémas à compléter";});}
populateFilters();calcDashboard();
window.IDE2_SYLLABUS={source:"LSS_Syllabus_L1_MAJ241126.pdf",date:"24/11/2026",parcours:"Sciences infirmières",catalogue};
})();