(() => {
  const DRIVE_UPDATE_QUESTIONS = window.IDE2_DRIVE_QUESTIONS || [];

  extra = mergeQuestions(extra, DRIVE_UPDATE_QUESTIONS);
  allQuestions = mergeQuestions([...BASE_QUESTIONS,...makeFactVariants(),...makeDynamicCalculations(90)], extra);
  populateFilters();
  calcDashboard();

  const sub = document.querySelector("header .sub");
  if (sub) sub.textContent = "Mise à jour Drive 08/09/2026 • 376 formulations fixes • + calculs dynamiques • progression enregistrée sur cet appareil";

  const __ide2OriginalStartMode = startMode;
  const isRealCourseDiagram = q => (q.type||"single")==="diagram" && String(q.id||"").includes("DIAG-COURSE");

  const reviewBtn = document.querySelector('.mode[data-mode="review"]');
  if (reviewBtn && !document.querySelector('.mode[data-mode="diagrams"]')) {
    const btn = document.createElement("button");
    btn.className = "mode";
    btn.dataset.mode = "diagrams";
    btn.innerHTML = '<b>🫀 Schémas à compléter</b><span class="note">Priorité aux vrais schémas de tes cours</span>';
    reviewBtn.parentElement.appendChild(btn);
    btn.addEventListener("click", () => {
      const ue = ueFilter.value, t = topicFilter.value, d = diffFilter.value;
      const matches = allQuestions.filter(q =>
        (q.type||"single")==="diagram" &&
        (ue==="ALL"||q.ue===ue) &&
        (t==="ALL"||q.topic===t) &&
        (d==="ALL"||String(q.difficulty)===d)
      );
      const realMatches = matches.filter(isRealCourseDiagram);
      const pool = realMatches.length ? realMatches : matches;
      if (!pool.length) {
        alert("Aucun schéma disponible avec ces filtres. Essaie « Toutes les UE » ou un autre thème.");
        return;
      }
      __ide2OriginalStartMode("train", pool);
      quizMode.textContent = realMatches.length ? "Schémas réels de cours" : "Schémas à compléter";
    });
  }

  startMode = function(m, forcedList=null) {
    if (m==="exam" && !forcedList && (!typeFilter || typeFilter.value==="ALL")) {
      allQuestions = mergeQuestions([...BASE_QUESTIONS,...makeFactVariants(),...makeDynamicCalculations(90)], extra);
      const pool = filteredQuestions();
      const chosen = [], ids = new Set();
      const add = (type, n) => {
        let candidates = pool.filter(q => (q.type||"single")===type && !ids.has(q.id));
        if (type==="diagram") {
          const real = candidates.filter(isRealCourseDiagram);
          const synthetic = candidates.filter(q=>!isRealCourseDiagram(q));
          const selected = [
            ...smartPick(real, Math.min(n, real.length)),
            ...smartPick(synthetic, Math.max(0, n-Math.min(n, real.length)))
          ];
          selected.forEach(q=>{if(!ids.has(q.id)){ids.add(q.id);chosen.push(q);}});
          return;
        }
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
    if (hintBtn && hintBtn.parentElement === quizActions) {
      hintBtn.insertAdjacentElement("afterend", skipBtn);
    } else {
      quizActions.prepend(skipBtn);
    }

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
    if (b) {
      b.disabled = false;
      b.classList.remove("hidden");
    }
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
    badge.textContent = "☁️ Cours Drive intégrés • 08/09/2026";
    header.appendChild(badge);
  }
})();