(() => {
  const img=window.IDE2_HEART_B64||"";
  const q={
    id:"B1-DIAG-COURSE-CV-001",ue:"B.1",topic:"Cardiovasculaire",difficulty:2,type:"diagram",realCourseDiagram:true,
    q:"Schéma réel de ton cours : cœur et thorax, vue antérieure. Complète les repères numérotés.",
    diagramSvg:`<svg viewBox="0 0 730 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma cardio-vasculaire réel issu du cours"><rect width="730" height="400" fill="#fff"/><image href="data:image/webp;base64,${img}" x="0" y="0" width="730" height="400" preserveAspectRatio="xMidYMid meet"/></svg>`,
    fields:[
      {n:1,answer:"veine jugulaire interne gauche",aliases:["jugulaire interne gauche"]},
      {n:2,answer:"artère carotide commune gauche",aliases:["carotide commune gauche","artere carotide commune gauche"]},
      {n:3,answer:"veine brachio-céphalique gauche",aliases:["veine brachiocéphalique gauche"]},
      {n:4,answer:"arc aortique",aliases:["crosse aortique","crosse de l'aorte"]},
      {n:5,answer:"nerf phrénique gauche",aliases:["nerf phrenique gauche"]},
      {n:6,answer:"tronc pulmonaire",aliases:["artère pulmonaire","artere pulmonaire"]},
      {n:7,answer:"auricule gauche",aliases:[]},
      {n:8,answer:"poumon gauche",aliases:[]},
      {n:9,answer:"plèvre gauche",aliases:["plevre gauche"]},
      {n:10,answer:"diaphragme",aliases:[]},
      {n:11,answer:"glande thyroïde",aliases:["thyroïde","thyroide"]},
      {n:12,answer:"nerf phrénique droit",aliases:["nerf phrenique droit"]},
      {n:13,answer:"veine brachio-céphalique droite",aliases:["veine brachiocéphalique droite"]},
      {n:14,answer:"veine cave supérieure",aliases:["vcs","veine cave sup","veine cave superieure"]},
      {n:15,answer:"poumon droit",aliases:[]},
      {n:16,answer:"auricule droite",aliases:["auricule droit"]},
      {n:17,answer:"cœur",aliases:["coeur"]},
      {n:18,answer:"péricarde",aliases:["pericarde"]},
      {n:19,answer:"plèvre droite",aliases:["plevre droite"]}
    ],
    hint:"Commence par les gros repères : poumons, cœur, diaphragme et veine cave supérieure, puis complète les vaisseaux et les nerfs.",
    exp:"Schéma anatomique repris de ton diaporama cardio-vasculaire. La légende a été retirée pour l’entraînement."
  };
  window.IDE2_DRIVE_QUESTIONS=[...(window.IDE2_DRIVE_QUESTIONS||[]),q];
})();