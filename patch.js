(() => {
  const DRIVE_UPDATE_QUESTIONS = window.IDE2_DRIVE_QUESTIONS || [];

  extra = mergeQuestions(extra, DRIVE_UPDATE_QUESTIONS);
  allQuestions = mergeQuestions([...BASE_QUESTIONS,...makeFactVariants(),...makeDynamicCalculations(90)], extra);
  populateFilters();
  calcDashboard();

  const sub = document.querySelector("header .sub");
  if (sub) sub.textContent = "Mise à jour Drive 08/09/2026 • 373 formulations fixes • + calculs dynamiques • progression enregistrée sur cet appareil";

  const __ide2OriginalStartMode = startMode;

  const reviewBtn = document.querySelector('.mode[data-mode="review"]');
  if (reviewBtn && !document.querySelector('.mode[data-mode="diagrams"]')) {
    const btn = document.createElement("button");
    btn.className = "mode";
    btn.dataset.mode = "diagrams";
    btn.innerHTML = '<b>🫀 Schémas à compléter</b><span class="note">Anatomie, embryologie, infectiologie</span>';
    reviewBtn.parentElement.appendChild(btn);
    btn.addEventListener("click", () => {
      const ue = ueFilter.value, t = topicFilter.value, d = diffFilter.value;
      const pool = allQuestions.filter(q =>
        (q.type||"single")==="diagram" &&
        (ue==="ALL"||q.ue===ue) &&
        (t==="ALL"||q.topic===t) &&
        (d==="ALL"||String(q.difficulty)===d)
      );
      if (!pool.length) {
        alert("Aucun schéma disponible avec ces filtres. Essaie « Toutes les UE » ou un autre thème.");
        return;
      }
      __ide2OriginalStartMode("train", pool);
      quizMode.textContent = "Schémas à compléter";
    });
  }

  startMode = function(m, forcedList=null) {
    if (m==="exam" && !forcedList && (!typeFilter || typeFilter.value==="ALL")) {
      allQuestions = mergeQuestions([...BASE_QUESTIONS,...makeFactVariants(),...makeDynamicCalculations(90)], extra);
      const pool = filteredQuestions();
      const chosen = [], ids = new Set();
      const add = (type, n) => {
        const candidates = pool.filter(q => (q.type||"single")===type && !ids.has(q.id));
        smartPick(candidates, n).forEach(q => {
          if (!ids.has(q.id)) { ids.add(q.id); chosen.push(q); }
        });
      };
      add("diagram", 2);
      add("text", 4);
      add("multi", 4);
      add("single", 6);
      add("number", 2);
      smartPick(pool.filter(q=>!ids.has(q.id)), 20-chosen.length).forEach(q=>{
        ids.add(q.id); chosen.push(q);
      });
      forcedList = chosen.slice(0,20);
    }
    return __ide2OriginalStartMode(m, forcedList);
  };

  const header = document.querySelector("header");
  if (header && !document.getElementById("driveSyncBadge")) {
    const badge = document.createElement("div");
    badge.id = "driveSyncBadge";
    badge.style.cssText = "margin-top:10px;display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.16);font-size:12px;font-weight:800";
    badge.textContent = "☁️ Cours Drive intégrés • 08/09/2026";
    header.appendChild(badge);
  }
})();