(() => {
  const DRIVE_UPDATE_QUESTIONS = window.IDE2_DRIVE_QUESTIONS || [];

  // IMPORTANT : on ne laisse plus entrer dans le mode « Schémas » une diapo entière,
  // une capture aléatoire ou un schéma simplifié généré. Seuls les schémas de cours
  // vérifiés et nettoyés ci-dessous sont autorisés.
  const VERIFIED_DIAGRAM_IDS = new Set([
    "B1-DIAG-COURSE-CV-001",
    "B1-DIAG-COURSE-RESP-001",
    "B1-DIAG-COURSE-EMB-001"
  ]);
  const isVerifiedDiagram = q => (q.type||"single")==="diagram" && VERIFIED_DIAGRAM_IDS.has(q.id);
  const keepQuestion = q => (q.type||"single")!=="diagram" || isVerifiedDiagram(q);

  // Retire les anciens schémas simplifiés / captures non vérifiées de la banque de base.
  for (let i=BASE_QUESTIONS.length-1;i>=0;i--) {
    if (!keepQuestion(BASE_QUESTIONS[i])) BASE_QUESTIONS.splice(i,1);
  }

  extra = mergeQuestions(extra, DRIVE_UPDATE_QUESTIONS).filter(keepQuestion);
  allQuestions = mergeQuestions([...BASE_QUESTIONS,...makeFactVariants(),...makeDynamicCalculations(90)], extra).filter(keepQuestion);
  populateFilters();
  calcDashboard();

  const sub = document.querySelector("header .sub");
  if (sub) sub.textContent = "Mise à jour 09/09/2026 • 3 vrais schémas de cours vérifiés • + banque QCM et calculs dynamiques • progression enregistrée sur cet appareil";

  const __ide2OriginalStartMode = startMode;

  const reviewBtn = document.querySelector('.mode[data-mode="review"]');
  if (reviewBtn && !document.querySelector('.mode[data-mode="diagrams"]')) {
    const btn = document.createElement("button");
    btn.className = "mode";
    btn.dataset.mode = "diagrams";
    btn.innerHTML = '<b>🫀 Schémas à compléter</b><span class="note">Uniquement de vrais schémas issus des cours</span>';
    reviewBtn.parentElement.appendChild(btn);
    btn.addEventListener("click", () => {
      const ue = ueFilter.value, t = topicFilter.value, d = diffFilter.value;
      const pool = allQuestions.filter(q =>
        isVerifiedDiagram(q) &&
        (ue==="ALL"||q.ue===ue) &&
        (t==="ALL"||q.topic===t) &&
        (d==="ALL"||String(q.difficulty)===d)
      );
      if (!pool.length) {
        alert("Aucun vrai schéma de cours disponible avec ces filtres. Choisis « Toutes les UE » ou un autre thème.");
        return;
      }
      __ide2OriginalStartMode("train", pool);
      quizMode.textContent = "Schémas réels de cours";
    });
  }

  startMode = function(m, forcedList=null) {
    // Reconstitue la banque sans réintroduire les anciens schémas non vérifiés.
    allQuestions = mergeQuestions([...BASE_QUESTIONS,...makeFactVariants(),...makeDynamicCalculations(90)], extra).filter(keepQuestion);

    if (m==="exam" && !forcedList && (!typeFilter || typeFilter.value==="ALL")) {
      const pool = filteredQuestions().filter(keepQuestion);
      const chosen = [], ids = new Set();
      const add = (type, n) => {
        let candidates = pool.filter(q => (q.type||"single")===type && !ids.has(q.id));
        if (type==="diagram") candidates = candidates.filter(isVerifiedDiagram);
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
        if (!ids.has(q.id)) { ids.add(q.id); chosen.push(q); }
      });
      forcedList = chosen.slice(0,20);
    }
    if (forcedList) forcedList = forcedList.filter(keepQuestion);
    return __ide2OriginalStartMode(m, forcedList);
  };

  // UX quiz : INDICE bien visible + PASSER si la question est trop difficile.
  const quizActions = document.querySelector("#quiz .actions");
  let skipBtn = document.getElementById("skipBtn");
  if (quizActions && !skipBtn) {
    skipBtn = document.createElement("button");
    skipBtn.type = "button";
    skipBtn.id = "skipBtn";
    skipBtn.className = "secondary";
    skipBtn.textContent = "⏭️ PASSER";
    skipBtn.title = "Passer cette question et la retrouver ensuite dans Mes erreurs";
    if (hintBtn && hintBtn.parentElement === quizActions) hintBtn.insertAdjacentElement("afterend", skipBtn);
    else quizActions.prepend(skipBtn);

    skipBtn.addEventListener("click", () => {
      if (answered || !session.length) return;
      const q = session[idx];
      answered = true;
      const advancedByExam = registerResult(q, false, {skipped:true});
      if (!advancedByExam) next();
    });
  }

  if (hintBtn) {
    hintBtn.textContent = "💡 INDICE";
    hintBtn.title = "Afficher un indice sans donner directement la réponse";
  }

  const __ide2OriginalRenderQuestion = renderQuestion;
  renderQuestion = function() {
    __ide2OriginalRenderQuestion();
    if (hintBtn) hintBtn.textContent = "💡 INDICE";
    const b = document.getElementById("skipBtn");
    if (b) { b.disabled = false; b.classList.remove("hidden"); }
  };

  const __ide2OriginalShowFeedback = showFeedback;
  showFeedback = function(ok, html) {
    __ide2OriginalShowFeedback(ok, html);
    const b = document.getElementById("skipBtn");
    if (b) b.classList.add("hidden");
  };

  const __ide2OriginalFormatUserAnswer = formatUserAnswer;
  formatUserAnswer = function(q, detail) {
    if (detail && detail.skipped) return "⏭️ Question passée";
    return __ide2OriginalFormatUserAnswer(q, detail);
  };

  const header = document.querySelector("header");
  if (header && !document.getElementById("driveSyncBadge")) {
    const badge = document.createElement("div");
    badge.id = "driveSyncBadge";
    badge.style.cssText = "margin-top:10px;display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.16);font-size:12px;font-weight:800";
    badge.textContent = "✅ Schémas de cours vérifiés • 09/09/2026";
    header.appendChild(badge);
  }
})();