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
  renderMeet();
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
  let html = "";

  // Alert announcements render at the very top so cancellations / urgent notices are unmissable
  const alerts = ANNOUNCEMENTS.filter((a) => a.kind === "alert");
  const regular = ANNOUNCEMENTS.filter((a) => a.kind !== "alert");

  html += alerts.map((a) => `
    <div class="card announcement-alert">
      <h3>${esc(a.title)}</h3>
      <div class="meta">${formatDate(a.date)}</div>
      <p>${esc(a.body)}</p>
    </div>
  `).join("");

  // Upcoming meet callout (links to Next Meets page) OR recent result callout (links to Results page)
  const upcomingCallout = renderMeetCallout();
  if (upcomingCallout) {
    html += upcomingCallout;
  } else {
    html += renderLatestResultCallout();
  }

  html += `<div class="announcements-hero">
    <img src="https://www.yinghuaacademy.org/wp-content/uploads/2024/04/athletic_dragon-removebg-preview.png" alt="Dragons Athletics" class="hero-dragon">
  </div>`;

  // Weather widget for next practice
  html += renderWeatherWidget();

  // Auto-generated "Up Next" card from schedule
  html += renderNextEventCard();

  html += regular.map((a) => `
    <div class="card">
      <h3>${esc(a.title)}</h3>
      <div class="meta">${formatDate(a.date)}</div>
      <p>${esc(a.body)}</p>
    </div>
  `).join("");
  el.innerHTML = html;

  // Fetch live weather after rendering
  fetchWeather();
}

function renderMeetCallout() {
  if (typeof MEET_INFO === "undefined") return "";

  // Find next upcoming meet
  const now = new Date();
  const central = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const todayStr = central.getFullYear() + "-" + String(central.getMonth() + 1).padStart(2, "0") + "-" + String(central.getDate()).padStart(2, "0");

  const dates = Object.keys(MEET_INFO).sort();
  let meetKey = null;
  for (const d of dates) {
    if (d >= todayStr) {
      meetKey = d;
      break;
    }
  }
  if (!meetKey) return "";

  const meet = MEET_INFO[meetKey];
  // Suppress the callout for cancelled meets — the cancellation announcement covers it.
  if (meet.cancelled) return "";

  const meetDate = new Date(meet.date + "T12:00:00");
  const centralNoon = new Date(central.getFullYear(), central.getMonth(), central.getDate(), 12, 0, 0);
  const dayMs = 1000 * 60 * 60 * 24;
  const daysUntil = Math.round((meetDate - centralNoon) / dayMs);
  let countdownText = "";
  if (daysUntil > 1) countdownText = `${daysUntil} days away`;
  else if (daysUntil === 1) countdownText = "Tomorrow!";
  else if (daysUntil === 0) countdownText = "Today!";
  else return "";

  return `
    <div class="meet-callout" onclick="switchSection('meet')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();switchSection('meet');}">
      <div class="meet-callout-main">
        <div class="meet-callout-badge">🏃 MEET DAY</div>
        <div class="meet-callout-title">${esc(meet.title)}</div>
        <div class="meet-callout-date">${esc(meet.dayLabel || formatDate(meet.date))}</div>
      </div>
      <div class="meet-callout-side">
        <div class="meet-callout-countdown">${esc(countdownText)}</div>
        <div class="meet-callout-cta">View meet info →</div>
      </div>
    </div>
  `;
}

function renderLatestResultCallout() {
  if (typeof RESULTS === "undefined" || !RESULTS.length) return "";

  // Find most recent result by date
  const sorted = [...RESULTS].sort((a, b) => b.date.localeCompare(a.date));
  const latest = sorted[0];
  if (!latest) return "";

  // Only show if the meet is in the past (and within ~3 weeks so it stays fresh)
  const now = new Date();
  const central = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const todayStr = central.getFullYear() + "-" + String(central.getMonth() + 1).padStart(2, "0") + "-" + String(central.getDate()).padStart(2, "0");
  if (latest.date > todayStr) return ""; // meet hasn't happened yet

  const meetDate = new Date(latest.date + "T12:00:00");
  const centralNoon = new Date(central.getFullYear(), central.getMonth(), central.getDate(), 12, 0, 0);
  const daysAgo = Math.round((centralNoon - meetDate) / (1000 * 60 * 60 * 24));
  if (daysAgo > 21) return ""; // stale after 3 weeks

  let ago;
  if (daysAgo <= 0) ago = "Today";
  else if (daysAgo === 1) ago = "Yesterday";
  else ago = `${daysAgo} days ago`;

  const athleteCount = new Set();
  (latest.events || []).forEach((e) => (e.results || []).forEach((r) => athleteCount.add(r.athlete)));
  const photoCount = (latest.photos || []).length;

  const statParts = [];
  if (athleteCount.size) statParts.push(`${athleteCount.size} athletes`);
  if ((latest.events || []).length) statParts.push(`${latest.events.length} events`);
  if (photoCount) statParts.push(`${photoCount} photos`);
  const stats = statParts.join(" · ");

  return `
    <div class="result-callout" onclick="switchSection('results')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();switchSection('results');}">
      <div class="result-callout-main">
        <div class="result-callout-badge">🏆 MEET RESULTS</div>
        <div class="result-callout-title">${esc(latest.meet)}</div>
        <div class="result-callout-meta">${esc(ago)}${stats ? " · " + esc(stats) : ""}</div>
      </div>
      <div class="result-callout-cta">View results →</div>
    </div>
  `;
}

function renderNextEventCard() {
  // Find next event using same 5 PM Central cutoff
  const now = new Date();
  const central = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const cutoffHour = 17;
  let refDate = new Date(central);
  if (central.getHours() >= cutoffHour) {
    refDate.setDate(refDate.getDate() + 1);
  }
  const todayStr = refDate.getFullYear() + "-" + String(refDate.getMonth() + 1).padStart(2, "0") + "-" + String(refDate.getDate()).padStart(2, "0");

  const sorted = [...SCHEDULE].sort((a, b) => a.date.localeCompare(b.date));
  let next = null;
  for (const s of sorted) {
    const isOff = s.title.toLowerCase().includes("no school") || s.title.toLowerCase().includes("no practice") || s.cancelled;
    if (s.date >= todayStr && !isOff) {
      next = s;
      break;
    }
  }
  if (!next) return "";

  const d = new Date(next.date + "T12:00:00");
  const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const isMeet = next.type === "meet";

  let details = "";
  if (isMeet) {
    details = `<strong>${esc(next.title)}</strong> — ${esc(next.time)} at ${esc(next.location)}.`;
    if (next.notes) details += ` ${esc(next.notes)}`;
  } else {
    details = `${esc(next.time)} at ${esc(next.location)}.`;
    if (next.notes) details += ` ${esc(next.notes)}`;
    if (next.plan) {
      const planParts = [];
      if (next.plan.sprints) planParts.push(`<strong>Sprints:</strong> ${esc(next.plan.sprints)}`);
      if (next.plan.distance) planParts.push(`<strong>Distance:</strong> ${esc(next.plan.distance)}`);
      if (next.plan.field) planParts.push(`<strong>Field/Hurdles:</strong> ${esc(next.plan.field)}`);
      if (planParts.length) {
        details += `<div class="next-event-plan">${planParts.join("<br>")}</div>`;
      }
    }
  }

  return `
    <div class="card next-event-card">
      <div class="next-event-header">
        <span class="badge ${isMeet ? "badge-meet" : "badge-practice"}">${isMeet ? "Meet" : "Practice"}</span>
        <span class="next-event-label">UP NEXT</span>
      </div>
      <h3>${isMeet ? "Meet Day" : "Next Practice"}: ${dayName}, ${dateStr}</h3>
      <p>${details}</p>
    </div>
  `;
}

function renderWeatherWidget() {
  // Find next practice from schedule
  // Use 5 PM Central as the cutoff to roll to the next event
  const now = new Date();
  const central = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const cutoffHour = 17; // 5 PM
  let refDate = new Date(central);
  if (central.getHours() >= cutoffHour) {
    refDate.setDate(refDate.getDate() + 1);
  }
  const todayStr = refDate.getFullYear() + "-" + String(refDate.getMonth() + 1).padStart(2, "0") + "-" + String(refDate.getDate()).padStart(2, "0");
  let nextPractice = null;
  const sorted = [...SCHEDULE].sort((a, b) => a.date.localeCompare(b.date));
  for (const s of sorted) {
    const isOff = s.title.toLowerCase().includes("no school") || s.title.toLowerCase().includes("no practice") || s.cancelled;
    if (s.date >= todayStr && !isOff) {
      nextPractice = s;
      break;
    }
  }
  if (!nextPractice) return "";

  const d = new Date(nextPractice.date + "T12:00:00");
  const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const isMeet = nextPractice.type === "meet";

  return `
    <div class="weather-widget" id="weather-widget">
      <div class="weather-header">
        <div class="weather-title-row">
          <span class="weather-label">${isMeet ? "MEET" : "PRACTICE"} DAY FORECAST</span>
          <span class="weather-date">${dayName}, ${dateStr}</span>
        </div>
      </div>
      <div class="weather-body" id="weather-body">
        <div class="weather-loading">Loading forecast...</div>
      </div>
    </div>
  `;
}

function fetchWeather() {
  const widget = document.getElementById("weather-body");
  if (!widget) return;

  // Minneapolis coordinates
  fetch("https://api.weather.gov/points/44.9978,-93.2650")
    .then((r) => r.json())
    .then((data) => fetch(data.properties.forecast))
    .then((r) => r.json())
    .then((forecast) => {
      // Find next practice date (rolls over after 5 PM Central)
      const now = new Date();
      const central = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
      const cutoffHour = 17;
      let refDate = new Date(central);
      if (central.getHours() >= cutoffHour) {
        refDate.setDate(refDate.getDate() + 1);
      }
      const todayStr = refDate.getFullYear() + "-" + String(refDate.getMonth() + 1).padStart(2, "0") + "-" + String(refDate.getDate()).padStart(2, "0");
      let nextDate = null;
      const sorted = [...SCHEDULE].sort((a, b) => a.date.localeCompare(b.date));
      for (const s of sorted) {
        const isOff = s.title.toLowerCase().includes("no school") || s.title.toLowerCase().includes("no practice") || s.cancelled;
        if (s.date >= todayStr && !isOff) {
          nextDate = s.date;
          break;
        }
      }
      if (!nextDate) return;

      const targetDate = new Date(nextDate + "T12:00:00");
      const targetDay = targetDate.toLocaleDateString("en-US", { weekday: "long" });

      // Find matching forecast period (daytime)
      const periods = forecast.properties.periods;
      let match = null;
      for (const p of periods) {
        if (p.name.includes(targetDay) && p.isDaytime) {
          match = p;
          break;
        }
      }

      // Fallback: if target day is today, use "This Afternoon" or "Today"
      if (!match) {
        for (const p of periods) {
          if ((p.name === "This Afternoon" || p.name === "Today") && p.isDaytime) {
            const pDate = new Date(p.startTime);
            if (pDate.toDateString() === targetDate.toDateString()) {
              match = p;
              break;
            }
          }
        }
      }

      if (!match) {
        widget.innerHTML = `<div class="weather-unavailable">Forecast not yet available for this date</div>`;
        return;
      }

      const temp = match.temperature;
      const unit = match.temperatureUnit;
      const condition = match.shortForecast;
      const wind = match.windSpeed + " " + match.windDirection;
      const precip = match.probabilityOfPrecipitation?.value || 0;
      const icon = getWeatherEmoji(condition);

      widget.innerHTML = `
        <div class="weather-main">
          <div class="weather-icon">${icon}</div>
          <div class="weather-temp">${temp}°${unit}</div>
          <div class="weather-condition">${esc(condition)}</div>
        </div>
        <div class="weather-details">
          <div class="weather-detail"><span class="weather-detail-icon">💨</span><span>Wind: ${esc(wind)}</span></div>
          <div class="weather-detail"><span class="weather-detail-icon">💧</span><span>Rain: ${precip}%</span></div>
          <div class="weather-detail"><span class="weather-detail-icon">👟</span><span>${temp < 45 ? "Dress warm! Layers recommended." : temp < 60 ? "Light layers recommended." : "Great running weather!"}</span></div>
        </div>
      `;
    })
    .catch(() => {
      widget.innerHTML = `<div class="weather-unavailable">Unable to load forecast</div>`;
    });
}

function getWeatherEmoji(condition) {
  const c = condition.toLowerCase();
  if (c.includes("snow")) return "🌨️";
  if (c.includes("rain") && c.includes("snow")) return "🌨️";
  if (c.includes("thunderstorm")) return "⛈️";
  if (c.includes("rain") || c.includes("showers")) return "🌧️";
  if (c.includes("cloudy") && c.includes("partly")) return "⛅";
  if (c.includes("cloudy") || c.includes("overcast")) return "☁️";
  if (c.includes("sunny") || c.includes("clear")) return "☀️";
  if (c.includes("mostly sunny")) return "🌤️";
  if (c.includes("fog")) return "🌫️";
  if (c.includes("wind")) return "💨";
  return "🌤️";
}

function renderSchedule() {
  const el = document.getElementById("schedule-list");
  const sorted = [...SCHEDULE].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Find the next upcoming practice or meet (rolls over after 5 PM Central)
  const now = new Date();
  const central = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const cutoffHour = 17;
  let refDate = new Date(central);
  if (central.getHours() >= cutoffHour) {
    refDate.setDate(refDate.getDate() + 1);
  }
  const todayStr = refDate.getFullYear() + "-" + String(refDate.getMonth() + 1).padStart(2, "0") + "-" + String(refDate.getDate()).padStart(2, "0");
  let nextIdx = -1;
  for (let i = 0; i < sorted.length; i++) {
    const isOff = sorted[i].title.toLowerCase().includes("no school") || sorted[i].title.toLowerCase().includes("no practice") || sorted[i].cancelled;
    if (sorted[i].date >= todayStr && !isOff) {
      nextIdx = i;
      break;
    }
  }

  // Calendar subscribe bar
  const icsUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "/") + "calendar.ics";
  const webcalUrl = icsUrl.replace(/^https?:/, "webcal:");
  const googleSubUrl = "https://calendar.google.com/calendar/r?cid=" + encodeURIComponent(webcalUrl);

  let html = `
    <div class="calendar-subscribe">
      <span class="subscribe-label">📅 Add to your calendar:</span>
      <div class="subscribe-buttons">
        <a href="${googleSubUrl}" target="_blank" class="subscribe-btn subscribe-google" title="Subscribe in Google Calendar">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V8.25h15v11.25z"/></svg>
          Google Calendar
        </a>
        <a href="${webcalUrl}" class="subscribe-btn subscribe-apple" title="Subscribe in Apple Calendar / Outlook">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V8.25h15v11.25z"/></svg>
          Apple / Outlook
        </a>
        <a href="calendar.ics" download="YA_Track_2026.ics" class="subscribe-btn subscribe-download" title="Download .ics file">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-14 9v2h14v-2H5z"/></svg>
          Download .ics
        </a>
      </div>
    </div>
  `;

  html += sorted.map((s, i) => {
    const d = new Date(s.date + "T00:00:00");
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    const isMeet = s.type === "meet";
    const hasPlan = s.plan && Object.keys(s.plan).length > 0;
    const isNext = i === nextIdx;
    return `
      <div class="card schedule-item ${hasPlan ? "has-plan" : ""} ${isNext ? "next-up" : ""} ${s.cancelled ? "schedule-cancelled" : ""}" id="${isNext ? "next-event" : ""}" ${hasPlan && !s.cancelled ? 'onclick="this.classList.toggle(\'expanded\')"' : ""}>
        ${isNext ? '<div class="next-up-badge">UP NEXT</div>' : ""}
        <div class="schedule-date">
          <div class="month">${month}</div>
          <div class="day">${day}</div>
        </div>
        <div class="schedule-details">
          <h3>${esc(s.title)} <span class="badge ${isMeet ? "badge-meet" : "badge-practice"}">${isMeet ? "Meet" : "Practice"}</span>${s.cancelled ? ' <span class="badge badge-cancelled">CANCELLED</span>' : ""}${hasPlan && !s.cancelled ? ' <span class="expand-hint">tap for details</span>' : ""}</h3>
          <div class="meta">${s.cancelled ? esc(s.location) : esc(s.time) + " &middot; " + esc(s.location)}</div>
          ${s.notes ? `<div class="meta" style="margin-top:0.25rem;font-style:italic">${esc(s.notes)}</div>` : ""}
          ${hasPlan ? `
            <div class="practice-plan">
              <div class="plan-group"><span class="plan-label">Sprints</span><span class="plan-text">${esc(s.plan.sprints)}</span></div>
              <div class="plan-group"><span class="plan-label">Distance</span><span class="plan-text">${esc(s.plan.distance)}</span></div>
              <div class="plan-group"><span class="plan-label">Field / Hurdles</span><span class="plan-text">${esc(s.plan.field)}</span></div>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }).join("");

  el.innerHTML = html;

  // Auto-scroll to next event when schedule tab is shown
  const nextEl = document.getElementById("next-event");
  if (nextEl) {
    setTimeout(() => nextEl.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
  }
}

function renderMeet() {
  const el = document.getElementById("meet-content");
  if (!el) return;
  if (typeof MEET_INFO === "undefined") {
    el.innerHTML = '<div class="card"><p>No meet info available yet.</p></div>';
    return;
  }

  // Get all upcoming meets based on today's date (Central time)
  const now = new Date();
  const central = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const todayStr = central.getFullYear() + "-" + String(central.getMonth() + 1).padStart(2, "0") + "-" + String(central.getDate()).padStart(2, "0");
  const centralNoon = new Date(central.getFullYear(), central.getMonth(), central.getDate(), 12, 0, 0);
  const dayMs = 1000 * 60 * 60 * 24;

  const dates = Object.keys(MEET_INFO).sort();
  let upcomingKeys = dates.filter((d) => d >= todayStr);

  // Fallback: if no upcoming meet, show the most recent one
  if (!upcomingKeys.length && dates.length) {
    upcomingKeys = [dates[dates.length - 1]];
  }
  if (!upcomingKeys.length) {
    el.innerHTML = '<div class="card"><p>No upcoming meet info posted yet.</p></div>';
    return;
  }

  let html = "";

  // Jump-to nav when there are multiple upcoming meets
  if (upcomingKeys.length > 1) {
    html += `<div class="meet-jump-nav">`;
    html += `<span class="meet-jump-label">Jump to:</span>`;
    upcomingKeys.forEach((key, idx) => {
      const m = MEET_INFO[key];
      const shortLabel = m.dayLabel ? m.dayLabel.replace(/^[A-Za-z]+,\s*/, "") : key;
      html += `<a href="#meet-${key}" class="meet-jump-link${idx === 0 ? " meet-jump-current" : ""}">${esc(shortLabel)} — ${esc(m.title)}</a>`;
    });
    html += `</div>`;
  }

  // Render each upcoming meet
  upcomingKeys.forEach((meetKey, idx) => {
    const meet = MEET_INFO[meetKey];

    // Days-until countdown
    const meetDate = new Date(meet.date + "T12:00:00");
    const daysUntil = Math.round((meetDate - centralNoon) / dayMs);
    let countdownText = "";
    if (daysUntil > 1) countdownText = `${daysUntil} days away`;
    else if (daysUntil === 1) countdownText = "Tomorrow!";
    else if (daysUntil === 0) countdownText = "Today — go Dragons!";
    else countdownText = "Completed";

    // Anchor + section wrapper
    html += `<section class="meet-section" id="meet-${esc(meetKey)}">`;

    // Cancellation banner — shows instead of the hero when meet is cancelled
    if (meet.cancelled) {
      html += `
        <div class="card meet-cancelled-banner">
          <div class="meet-cancelled-label">❌ MEET CANCELLED</div>
          <h3 class="meet-cancelled-title">${esc(meet.title)}</h3>
          <div class="meet-cancelled-date">${esc(meet.dayLabel || formatDate(meet.date))}</div>
          ${meet.cancellationNote ? `<p class="meet-cancelled-note">${esc(meet.cancellationNote)}</p>` : ""}
        </div>
      `;
      html += `</section>`;
      return;
    }

    // Hero card
    html += `
      <div class="card meet-hero">
        <div class="meet-hero-top">
          <span class="badge badge-meet">${idx === 0 ? "Next Meet" : "Upcoming Meet"}</span>
          <span class="meet-countdown">${esc(countdownText)}</span>
        </div>
        <h3 class="meet-hero-title">${esc(meet.title)}</h3>
        <div class="meet-hero-date">${esc(meet.dayLabel || formatDate(meet.date))}</div>
        <div class="meet-hero-location">
          📍 <a href="${esc(meet.mapUrl || "#")}" target="_blank" rel="noopener">${esc(meet.location)}</a>
          <div class="meet-hero-address">${esc(meet.address || "")}</div>
        </div>
        ${meet.arrival ? `<div class="meet-hero-note"><strong>Arrival:</strong> ${esc(meet.arrival)}</div>` : ""}
        ${meet.transportation ? `<div class="meet-hero-note"><strong>Transportation:</strong> ${esc(meet.transportation)}</div>` : ""}
        ${meet.parking ? `<div class="meet-hero-note"><strong>Parking:</strong> ${esc(meet.parking)}</div>` : ""}
        ${meet.eligibility ? `<div class="meet-hero-note"><strong>Who:</strong> ${esc(meet.eligibility)}</div>` : ""}
        ${meet.uniform ? `<div class="meet-hero-note"><strong>Uniform:</strong> ${esc(meet.uniform)}</div>` : ""}
        ${meet.teams ? `<div class="meet-hero-note"><strong>Teams:</strong> ${esc(meet.teams)}</div>` : ""}
        ${meet.admission ? `<div class="meet-hero-note"><strong>Admission:</strong> ${esc(meet.admission)}</div>` : ""}
      </div>
    `;

    // Announcements
    if (meet.announcements && meet.announcements.length) {
      html += `<h2 class="section-title" style="margin-top:1.5rem;">Meet Announcements</h2>`;
      meet.announcements.forEach((a) => {
        html += `
          <div class="card meet-announcement">
            <h3>${esc(a.title)}</h3>
            <p>${esc(a.body)}</p>
          </div>
        `;
      });
    }

    // What to bring
    if (meet.whatToBring && meet.whatToBring.length) {
      html += `<h2 class="section-title" style="margin-top:1.5rem;">What to Bring</h2>`;
      html += `<div class="card"><ul class="meet-bring-list">`;
      meet.whatToBring.forEach((item) => {
        html += `<li>${esc(item)}</li>`;
      });
      html += `</ul></div>`;
    }

    // Event schedule
    if (meet.schedule && meet.schedule.length) {
      html += `<h2 class="section-title" style="margin-top:1.5rem;">Event Schedule</h2>`;
      html += `<div class="card meet-schedule-card">`;
      html += `<div class="meet-schedule-list">`;
      meet.schedule.forEach((row) => {
        const typeClass = row.type ? `meet-row-${row.type}` : "";
        html += `
          <div class="meet-schedule-row ${typeClass}">
            <div class="meet-schedule-time">${esc(row.time || "")}</div>
            <div class="meet-schedule-event">
              <div class="meet-schedule-name">${esc(row.event)}</div>
              ${row.detail ? `<div class="meet-schedule-detail">${esc(row.detail)}</div>` : ""}
            </div>
          </div>
        `;
      });
      html += `</div></div>`;
    }

    // Field event notes
    if (meet.fieldEventNotes && meet.fieldEventNotes.length) {
      html += `<h2 class="section-title" style="margin-top:1.5rem;">Field Event Notes</h2>`;
      html += `<div class="card"><ul class="meet-bring-list">`;
      meet.fieldEventNotes.forEach((item) => {
        html += `<li>${esc(item)}</li>`;
      });
      html += `</ul></div>`;
    }

    html += `</section>`;

    // Divider between meets
    if (idx < upcomingKeys.length - 1) {
      html += `<div class="meet-divider" aria-hidden="true"></div>`;
    }
  });

  el.innerHTML = html;
}

function renderRoster() {
  const el = document.getElementById("roster-content");
  const byGrade = {};
  ROSTER.forEach((r) => {
    if (!byGrade[r.grade]) byGrade[r.grade] = [];
    byGrade[r.grade].push(r);
  });

  // Group staff by role type
  const coaches = COACHES.filter((c) => c.role.toLowerCase().includes("coach"));
  const manager = COACHES.filter((c) => c.role.toLowerCase().includes("manager"));
  const volunteers = COACHES.filter((c) => c.role.toLowerCase().includes("volunteer"));

  function renderStaffGrid(people) {
    let out = `<div class="coaches-grid">`;
    people.forEach((c) => {
      const initials = c.name.charAt(0);
      out += `
        <div class="card coach-card">
          <div class="coach-avatar">${esc(initials)}</div>
          <h3>${esc(c.name)}</h3>
          <div class="role">${esc(c.role)}</div>
          ${c.email ? `<div class="email">${esc(c.email)}</div>` : ""}
        </div>
      `;
    });
    out += "</div>";
    return out;
  }

  let html = `<h2 class="section-title">Coaching Staff</h2>`;
  html += renderStaffGrid(coaches);

  if (manager.length) {
    html += `<h2 class="section-title" style="margin-top:2rem;">Team Manager</h2>`;
    html += renderStaffGrid(manager);
  }

  if (volunteers.length) {
    html += `<h2 class="section-title" style="margin-top:2rem;">Parent Volunteers</h2>`;
    html += renderStaffGrid(volunteers);
  }

  // Roster table
  const grades = Object.keys(byGrade).sort((a, b) => b - a);
  html += `<h2 class="section-title" style="margin-top:2rem;">Athletes</h2>`;
  html += `
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

  el.innerHTML = html;
}

function renderResults() {
  const el = document.getElementById("results-list");
  if (RESULTS.length === 0) {
    el.innerHTML = '<div class="card"><p>No meet results yet. Check back after the first meet!</p></div>';
    return;
  }

  // Sort newest first
  const sorted = [...RESULTS].sort((a, b) => b.date.localeCompare(a.date));

  el.innerHTML = sorted.map((r, idx) => {
    // New format: events + photos; old format: highlights
    if (r.events) return renderMeetResult(r, idx);
    // Legacy fallback
    return `
      <div class="card">
        <div class="result-meet-header">
          <div>
            <h3>${esc(r.meet)}</h3>
            <div class="meta">${formatDate(r.date)}</div>
          </div>
          ${r.teamPlace ? `<span class="place-badge">${esc(r.teamPlace)}</span>` : ""}
        </div>
        <div class="results-grid">
          ${(r.highlights || []).map((h) => `
            <div class="result-item">
              <div class="athlete">${esc(h.athlete)}</div>
              <div class="event">${esc(h.event)}</div>
              <div class="mark">${esc(h.result)}</div>
              <div class="place-text">${esc(h.place)}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");

  // Wire lightbox
  setupResultsLightbox();
}

function renderMeetResult(r, idx) {
  const athleteCount = new Set();
  (r.events || []).forEach((e) => (e.results || []).forEach((res) => athleteCount.add(res.athlete)));

  // Group events by kind for better visual structure
  const running = (r.events || []).filter((e) => e.kind === "track" && !e.relay);
  const relays = (r.events || []).filter((e) => e.kind === "track" && e.relay);
  const field = (r.events || []).filter((e) => e.kind === "field");

  const orderedEvents = [...running, ...relays, ...field];
  const heatOrder = ["6/7 Girls", "8 Girls", "6/7 Boys", "8 Boys"];

  const eventBlock = (evt) => {
    // For relays: group by mark (time). For individual: group by heat.
    let groups;
    if (evt.relay) {
      // Group athletes sharing the same mark (= same relay team time)
      const byMark = {};
      evt.results.forEach((res) => {
        (byMark[res.mark] = byMark[res.mark] || []).push(res);
      });
      groups = Object.keys(byMark).map((mark) => ({
        label: byMark[mark][0].heat + " · " + mark,
        mark,
        athletes: byMark[mark],
      }));
    } else {
      const byHeat = {};
      heatOrder.forEach((h) => (byHeat[h] = []));
      evt.results.forEach((res) => {
        const h = res.heat || heatOrder[0];
        (byHeat[h] = byHeat[h] || []).push(res);
      });
      groups = heatOrder
        .filter((h) => byHeat[h] && byHeat[h].length)
        .map((h) => ({ label: h, athletes: byHeat[h] }));
    }

    return `
      <div class="result-event ${evt.kind === "field" ? "result-field" : evt.relay ? "result-relay" : "result-track"}">
        <div class="result-event-head">${esc(evt.name)}</div>
        ${groups.map((g) => `
          <div class="result-heat">
            <div class="result-heat-label">${esc(g.label)}</div>
            <div class="result-heat-rows">
              ${g.athletes.map((a) => `
                <div class="result-row">
                  <div class="result-athlete">${esc(a.athlete)}${a.grade ? `<span class="result-gr">gr${a.grade}</span>` : ""}</div>
                  <div class="result-mark">${esc(a.mark)}</div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  };

  const photos = r.photos || [];

  return `
    <div class="card result-meet">
      <div class="result-meet-hero">
        <div>
          <h3>${esc(r.meet)}</h3>
          <div class="meta">${formatDate(r.date)}${r.location ? " · " + esc(r.location) : ""}</div>
        </div>
        <div class="result-stats">
          <span class="stat"><strong>${athleteCount.size}</strong> athletes</span>
          <span class="stat"><strong>${orderedEvents.length}</strong> events</span>
        </div>
      </div>
      ${r.teamRecap ? `<p class="result-recap">${esc(r.teamRecap)}</p>` : ""}

      ${photos.length ? `
        <div class="result-photos-block">
          <div class="result-section-title">Photos</div>
          <div class="result-photo-grid">
            ${photos.map((p, i) => `
              <button class="result-photo" data-meet-idx="${idx}" data-photo-idx="${i}" aria-label="Open photo ${i + 1} of ${photos.length}">
                <img src="${esc(p.src)}" loading="lazy" alt="Team photo ${i + 1}">
              </button>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <div class="result-events-block">
        <div class="result-section-title">Event Results</div>
        ${orderedEvents.map(eventBlock).join("")}
      </div>
    </div>
  `;
}

function setupResultsLightbox() {
  let lightbox = document.getElementById("lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-prev" aria-label="Previous">&#10094;</button>
      <img class="lightbox-img" alt="">
      <button class="lightbox-next" aria-label="Next">&#10095;</button>
      <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);
  }
  const img = lightbox.querySelector(".lightbox-img");
  const caption = lightbox.querySelector(".lightbox-caption");
  let currentMeetIdx = 0, currentPhotoIdx = 0;

  function showPhoto() {
    const meet = [...RESULTS].sort((a, b) => b.date.localeCompare(a.date))[currentMeetIdx];
    if (!meet || !meet.photos || !meet.photos[currentPhotoIdx]) return;
    img.src = meet.photos[currentPhotoIdx].src;
    caption.textContent = `${meet.meet} · Photo ${currentPhotoIdx + 1} of ${meet.photos.length}`;
  }

  document.querySelectorAll(".result-photo").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentMeetIdx = parseInt(btn.dataset.meetIdx, 10);
      currentPhotoIdx = parseInt(btn.dataset.photoIdx, 10);
      lightbox.classList.add("active");
      showPhoto();
    });
  });

  lightbox.querySelector(".lightbox-close").onclick = () => lightbox.classList.remove("active");
  lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.classList.remove("active"); };
  lightbox.querySelector(".lightbox-prev").onclick = (e) => {
    e.stopPropagation();
    const meet = [...RESULTS].sort((a, b) => b.date.localeCompare(a.date))[currentMeetIdx];
    currentPhotoIdx = (currentPhotoIdx - 1 + meet.photos.length) % meet.photos.length;
    showPhoto();
  };
  lightbox.querySelector(".lightbox-next").onclick = (e) => {
    e.stopPropagation();
    const meet = [...RESULTS].sort((a, b) => b.date.localeCompare(a.date))[currentMeetIdx];
    currentPhotoIdx = (currentPhotoIdx + 1) % meet.photos.length;
    showPhoto();
  };
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") lightbox.classList.remove("active");
    if (e.key === "ArrowLeft") lightbox.querySelector(".lightbox-prev").click();
    if (e.key === "ArrowRight") lightbox.querySelector(".lightbox-next").click();
  });
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
      athleteMap[r.athlete].push({ mark: r.mark, meet: r.meet || "Season Meets" });
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
  if (!el) return;
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
