// ============================================================
// TRACK TEAM HUB — APP LOGIC
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  applyTeamColors();

  // Check if already authenticated
  if (sessionStorage.getItem("track-auth") === "true") {
    showApp();
  }

  // Password form
  document.getElementById("password-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("password-input");
    const error = document.getElementById("password-error");

    if (input.value === TEAM_PASSWORD) {
      sessionStorage.setItem("track-auth", "true");
      showApp();
    } else {
      error.textContent = "Incorrect password. Please try again.";
      input.value = "";
      input.focus();
    }
  });

  // Logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.removeItem("track-auth");
    location.reload();
  });

  // Navigation
  document.querySelectorAll(".nav button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.section;
      switchSection(target);
    });
  });

  // Render all sections
  renderAnnouncements();
  renderSchedule();
  renderRoster();
  renderResults();
  renderResults2025();
  renderRecords();
  renderExpectations();
  renderCoaches();
});

function applyTeamColors() {
  document.documentElement.style.setProperty("--primary", TEAM_COLORS.primary);
  document.documentElement.style.setProperty("--accent", TEAM_COLORS.accent);
  document.title = TEAM_NAME + " — Team Hub";
  document.getElementById("team-name").textContent = TEAM_NAME;
  document.getElementById("gate-team-name").textContent = TEAM_NAME;
  if (typeof TEAM_SUBTITLE !== "undefined") {
    document.getElementById("gate-subtitle").textContent = TEAM_SUBTITLE + " — Team Hub";
  }
}

function showApp() {
  document.getElementById("password-gate").style.display = "none";
  document.getElementById("app").classList.add("active");
}

function switchSection(name) {
  document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
  document.querySelectorAll(".nav button").forEach((b) => b.classList.remove("active"));
  document.getElementById("section-" + name).classList.add("active");
  document.querySelector(`.nav button[data-section="${name}"]`).classList.add("active");
}

// ---- RENDER FUNCTIONS ----

function renderAnnouncements() {
  const el = document.getElementById("announcements-list");
  let html = `<div class="announcements-hero">
    <img src="https://www.yinghuaacademy.org/wp-content/uploads/2024/04/athletic_dragon-removebg-preview.png" alt="Dragons Athletics" class="hero-dragon">
  </div>`;
  html += ANNOUNCEMENTS.map((a) => `
    <div class="card">
      <h3>${esc(a.title)}</h3>
      <div class="meta">${formatDate(a.date)}</div>
      <p>${esc(a.body)}</p>
    </div>
  `).join("");
  el.innerHTML = html;
}

function renderSchedule() {
  const el = document.getElementById("schedule-list");
  const sorted = [...SCHEDULE].sort((a, b) => new Date(a.date) - new Date(b.date));
  el.innerHTML = sorted.map((s) => {
    const d = new Date(s.date + "T00:00:00");
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    const isMeet = s.type === "meet";
    const hasPlan = s.plan && Object.keys(s.plan).length > 0;
    return `
      <div class="card schedule-item ${hasPlan ? "has-plan" : ""}" ${hasPlan ? 'onclick="this.classList.toggle(\'expanded\')"' : ""}>
        <div class="schedule-date">
          <div class="month">${month}</div>
          <div class="day">${day}</div>
        </div>
        <div class="schedule-details">
          <h3>${esc(s.title)} <span class="badge ${isMeet ? "badge-meet" : "badge-practice"}">${isMeet ? "Meet" : "Practice"}</span>${hasPlan ? ' <span class="expand-hint">tap for details</span>' : ""}</h3>
          <div class="meta">${esc(s.time)} &middot; ${esc(s.location)}</div>
          ${s.notes ? `<div class="meta" style="margin-top:0.25rem;font-style:italic">${esc(s.notes)}</div>` : ""}
          ${hasPlan ? `
            <div class="practice-plan">
              <div class="plan-group"><span class="plan-label">Sprints</span><span class="plan-text">${esc(s.plan.sprints)}</span></div>
              <div class="plan-group"><span class="plan-label">Distance</span><span class="plan-text">${esc(s.plan.distance)}</span></div>
              <div class="plan-group"><span class="plan-label">Field / Hurdles</span><span class="plan-text">${esc(s.plan.field)}</span></div>
              <div class="plan-group"><span class="plan-label">Full Team</span><span class="plan-text">${esc(s.plan.team)}</span></div>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }).join("");
}

function renderRoster() {
  const el = document.getElementById("roster-content");
  const byGrade = {};
  ROSTER.forEach((r) => {
    if (!byGrade[r.grade]) byGrade[r.grade] = [];
    byGrade[r.grade].push(r);
  });

  const grades = Object.keys(byGrade).sort((a, b) => b - a);
  let html = `
    <table class="roster-table">
      <thead>
        <tr><th>Name</th><th>Grade</th><th>Events</th></tr>
      </thead>
      <tbody>
  `;
  grades.forEach((grade) => {
    byGrade[grade].sort((a, b) => a.name.localeCompare(b.name));
    byGrade[grade].forEach((r) => {
      html += `
        <tr>
          <td><strong>${esc(r.name)}</strong></td>
          <td>${r.grade}</td>
          <td>${r.events.length ? r.events.map((e) => `<span class="event-tag">${esc(e)}</span>`).join(" ") : '<span style="color:#999">TBD</span>'}</td>
        </tr>
      `;
    });
  });
  html += "</tbody></table>";

  // Coaches section
  html += `<h2 class="section-title" style="margin-top:2rem;">Coaching Staff</h2>`;
  html += `<div class="coaches-grid">`;
  COACHES.forEach((c) => {
    const initials = c.name.replace("Coach ", "").charAt(0);
    html += `
      <div class="card coach-card">
        <div class="coach-avatar">${esc(initials)}</div>
        <h3>${esc(c.name)}</h3>
        <div class="role">${esc(c.role)}</div>
        ${c.email ? `<div class="email">${esc(c.email)}</div>` : ""}
      </div>
    `;
  });
  html += "</div>";

  el.innerHTML = html;
}

function renderResults() {
  const el = document.getElementById("results-list");
  if (RESULTS.length === 0) {
    el.innerHTML = '<div class="card"><p>No meet results yet. Check back after the first meet!</p></div>';
    return;
  }
  el.innerHTML = RESULTS.map((r) => `
    <div class="card">
      <div class="result-meet-header">
        <div>
          <h3>${esc(r.meet)}</h3>
          <div class="meta">${formatDate(r.date)}</div>
        </div>
        <span class="place-badge">${esc(r.teamPlace)}</span>
      </div>
      <div class="results-grid">
        ${r.highlights.map((h) => `
          <div class="result-item">
            <div class="athlete">${esc(h.athlete)}</div>
            <div class="event">${esc(h.event)}</div>
            <div class="mark">${esc(h.result)}</div>
            <div class="place-text">${esc(h.place)}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function renderResults2025() {
  const el = document.getElementById("results2025-content");
  if (typeof RESULTS_2025 === "undefined" || !RESULTS_2025.events.length) {
    el.innerHTML = '<div class="card"><p>No past season results available.</p></div>';
    return;
  }

  // Build a map of in-house meet results by event name for merging
  const inHouseByEvent = {};
  if (RESULTS_2025.inHouseMeet) {
    RESULTS_2025.inHouseMeet.events.forEach((evt) => {
      inHouseByEvent[evt.name] = evt.results;
    });
  }

  // Helper: determine if lower is better (running events) or higher is better (field events)
  function isFieldEvent(name) {
    const n = name.toLowerCase();
    return n.includes("shot put") || n.includes("discus") || n.includes("long jump") || n.includes("high jump") || n.includes("triple jump") || n.includes("javelin");
  }

  // Helper: parse mark to comparable number (handles times and distances)
  function parseMark(mark) {
    if (!mark) return null;
    // Distance: e.g. 12' 4" or 10' 9"
    const ftMatch = mark.match(/^(\d+)['']\s*(\d+\.?\d*)?["""]?$/);
    if (ftMatch) {
      return parseFloat(ftMatch[1]) * 12 + (parseFloat(ftMatch[2]) || 0);
    }
    // Time with colon: e.g. 2:42 or 5:51
    if (mark.includes(":")) {
      const parts = mark.split(":");
      return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
    }
    // Plain number (seconds or decimal)
    return parseFloat(mark);
  }

  function isBetter(markA, markB, field) {
    const a = parseMark(markA);
    const b = parseMark(markB);
    if (a === null) return false;
    if (b === null) return true;
    return field ? a > b : a < b;
  }

  let html = "";

  RESULTS_2025.events.forEach((evt) => {
    const hasMarks = evt.results.some((r) => r.mark);
    if (!hasMarks) return;

    const field = isFieldEvent(evt.name);
    const inHouseResults = inHouseByEvent[evt.name] || [];

    // Merge: group all marks by athlete
    const athleteMap = {};
    evt.results.forEach((r) => {
      if (!r.mark) return;
      if (!athleteMap[r.athlete]) athleteMap[r.athlete] = [];
      athleteMap[r.athlete].push({ mark: r.mark, meet: "Season Meets" });
    });
    inHouseResults.forEach((r) => {
      if (!r.mark) return;
      if (!athleteMap[r.athlete]) athleteMap[r.athlete] = [];
      athleteMap[r.athlete].push({ mark: r.mark, meet: "In-House Meet" });
    });

    // For each athlete, find PR
    const athletes = Object.keys(athleteMap).map((name) => {
      const marks = athleteMap[name];
      let pr = marks[0];
      marks.forEach((m) => {
        if (isBetter(m.mark, pr.mark, field)) pr = m;
      });
      return { name, marks, pr, prVal: parseMark(pr.mark) };
    });

    // Sort by PR (best first)
    athletes.sort((a, b) => {
      if (a.prVal === null) return 1;
      if (b.prVal === null) return -1;
      return field ? b.prVal - a.prVal : a.prVal - b.prVal;
    });

    html += `<div class="card" style="margin-bottom:1.5rem">`;
    html += `<h3 style="margin-bottom:0.75rem;color:var(--primary)">${esc(evt.name)}</h3>`;
    html += `<table class="roster-table"><thead><tr><th>#</th><th>Athlete</th><th>PR</th><th>Meet</th><th></th></tr></thead><tbody>`;
    athletes.forEach((a, i) => {
      const hasMultiple = a.marks.length > 1;
      html += `<tr>`;
      html += `<td>${i + 1}</td>`;
      html += `<td><strong>${esc(a.name)}</strong></td>`;
      html += `<td style="font-weight:700;color:var(--primary)">${esc(a.pr.mark)}</td>`;
      html += `<td style="font-size:0.85rem;color:var(--muted)">${esc(a.pr.meet)}</td>`;
      html += `<td>`;
      if (hasMultiple) {
        const others = a.marks.filter((m) => m !== a.pr);
        html += `<span class="multi-mark-hint">`;
        others.forEach((m) => {
          html += `<span class="other-mark">${esc(m.mark)} <span style="color:var(--muted);font-size:0.8rem">(${esc(m.meet)})</span></span>`;
        });
        html += `</span>`;
      }
      html += `</td>`;
      html += `</tr>`;
    });
    html += `</tbody></table></div>`;
  });

  // Show events that only exist in the in-house meet (not in season events)
  if (RESULTS_2025.inHouseMeet) {
    const seasonEventNames = new Set(RESULTS_2025.events.map((e) => e.name));
    const meet = RESULTS_2025.inHouseMeet;
    const extraEvents = meet.events.filter((e) => !seasonEventNames.has(e.name));
    if (extraEvents.length) {
      html += `<h2 class="section-title" style="margin-top:2rem">${esc(meet.title)} — Additional Events</h2>`;
      extraEvents.forEach((evt) => {
        const withMarks = evt.results.filter((r) => r.mark);
        if (!withMarks.length) return;
        html += `<div class="card" style="margin-bottom:1.5rem">`;
        html += `<h3 style="margin-bottom:0.75rem;color:var(--primary)">${esc(evt.name)}</h3>`;
        html += `<table class="roster-table"><thead><tr><th>Place</th><th>Athlete</th><th>Team</th><th>Mark</th></tr></thead><tbody>`;
        withMarks.forEach((r) => {
          html += `<tr><td>${esc(r.place) || "—"}</td><td>${esc(r.athlete)}</td><td style="font-size:0.85rem">${esc(r.team)}</td><td style="font-weight:700;color:var(--primary)">${esc(r.mark)}</td></tr>`;
        });
        html += `</tbody></table></div>`;
      });
    }
  }

  el.innerHTML = html;
}

function renderRecords() {
  const el = document.getElementById("records-content");
  if (RECORDS.length === 0) {
    el.innerHTML = '<div class="card"><p>No team records yet. Records will be added as the season progresses!</p></div>';
    return;
  }
  el.innerHTML = `
    <table class="records-table">
      <thead>
        <tr><th>Event</th><th>Record</th><th>Athlete</th><th>Year</th></tr>
      </thead>
      <tbody>
        ${RECORDS.map((r) => `
          <tr>
            <td><strong>${esc(r.event)}</strong></td>
            <td style="font-weight:700;color:var(--primary)">${esc(r.record)}</td>
            <td>${esc(r.holder)}</td>
            <td>${r.year}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderExpectations() {
  const el = document.getElementById("expectations-content");
  if (typeof EXPECTATIONS === "undefined") {
    el.innerHTML = '<div class="card"><p>No expectations posted yet.</p></div>';
    return;
  }

  let html = `<div class="card"><p>${esc(EXPECTATIONS.intro)}</p>`;
  if (EXPECTATIONS.formLink) {
    html += `<p style="margin-top:1rem"><a href="${esc(EXPECTATIONS.formLink)}" target="_blank" class="form-link">Complete the Acknowledgment Form</a></p>`;
  }
  html += `</div>`;

  EXPECTATIONS.sections.forEach((sec) => {
    html += `<div class="card" style="margin-top:1rem">`;
    html += `<h3 style="color:var(--primary);margin-bottom:0.75rem">${esc(sec.title)}</h3>`;
    html += `<ul class="expectations-list">`;
    sec.rules.forEach((r) => {
      html += `<li>${esc(r)}</li>`;
    });
    html += `</ul>`;
    if (sec.consequences && sec.consequences.length) {
      html += `<div class="consequences"><strong>If expectations are not met:</strong><ul class="expectations-list">`;
      sec.consequences.forEach((c) => {
        html += `<li>${esc(c)}</li>`;
      });
      html += `</ul></div>`;
    }
    html += `</div>`;
  });

  html += `<div class="card" style="margin-top:1rem;text-align:center;font-weight:700;color:var(--primary);font-size:1.1rem">Go Dragons! Work hard and Play Fair.<br>Triple Competitor: Through hard work and effort you can make yourself better, your teammates better and the game better.</div>`;

  el.innerHTML = html;
}

function renderCoaches() {
  // Coaches are rendered inside the roster section
}

// ---- HELPERS ----

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function esc(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
