(() => {
  const img=window.IDE2_RESP_B64||"";
  const q={
    id:"B1-DIAG-COURSE-RESP-001",ue:"B.1",topic:"Appareil respiratoire",difficulty:2,type:"diagram",realCourseDiagram:true,
    q:"Schéma réel de ton cours : voies aériennes supérieures. Complète les 9 repères.",
    diagramSvg:`<svg viewBox="0 0 660 755" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma respiratoire réel issu du cours"><rect width="660" height="755" fill="#fff"/><image href="data:image/webp;base64,${img}" x="0" y="0" width="660" height="755" preserveAspectRatio="xMidYMid meet"/></svg>`,
    fields:[
      {n:1,answer:"fosses nasales",aliases:["fosse nasale","cavités nasales","cavité nasale"]},
      {n:2,answer:"cavité orale",aliases:["bouche","cavite orale"]},
      {n:3,answer:"rhinopharynx",aliases:["cavum","nasopharynx"]},
      {n:4,answer:"trompe d'Eustache",aliases:["trompe d eustache","trompe auditive"]},
      {n:5,answer:"oropharynx",aliases:[]},
      {n:6,answer:"hypopharynx",aliases:["laryngopharynx"]},
      {n:7,answer:"œsophage",aliases:["oesophage"]},
      {n:8,answer:"larynx",aliases:[]},
      {n:9,answer:"trachée",aliases:["trachee"]}
    ],
    hint:"Pars du haut vers le bas : fosses nasales et bouche, puis les trois étages du pharynx, puis œsophage, larynx et trachée.",
    exp:"Schéma anatomique repris directement du cours « Appareil Respiratoire - Dr T. PLANCHAMP ». Les annotations ont été retirées pour l’entraînement."
  };
  window.IDE2_DRIVE_QUESTIONS=[...(window.IDE2_DRIVE_QUESTIONS||[]),q];
})();