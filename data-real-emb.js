(() => {
  const img=window.IDE2_EMB_B64||"";
  const q={
    id:"B1-DIAG-COURSE-EMB-001",ue:"B.1",topic:"Embryologie",difficulty:2,type:"diagram",realCourseDiagram:true,
    q:"Schéma réel de ton cours : vésicules cérébrales. Nomme les repères 1 à 6.",
    diagramSvg:`<svg viewBox="0 0 390 450" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma embryologie réel issu du cours"><rect width="390" height="450" fill="#fff"/><image href="data:image/webp;base64,${img}" x="0" y="0" width="390" height="450" preserveAspectRatio="xMidYMid meet"/></svg>`,
    fields:[
      {n:1,answer:"télencéphale",aliases:["telencephale"]},
      {n:2,answer:"diencéphale",aliases:["diencephale"]},
      {n:3,answer:"mésencéphale",aliases:["mesencephale"]},
      {n:4,answer:"métencéphale",aliases:["metencephale"]},
      {n:5,answer:"myélencéphale",aliases:["myelencephale"]},
      {n:6,answer:"moelle",aliases:["moelle épinière","moelle epiniere"]}
    ],
    hint:"Repère la succession antéro-postérieure : télencéphale → diencéphale → mésencéphale → métencéphale → myélencéphale → moelle.",
    exp:"Schéma numéroté repris du cours commun d’embryologie 2026. La légende a été retirée pour l’entraînement."
  };
  window.IDE2_DRIVE_QUESTIONS=[...(window.IDE2_DRIVE_QUESTIONS||[]),q];
})();