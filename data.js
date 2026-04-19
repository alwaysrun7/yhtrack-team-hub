// ============================================================
// TRACK TEAM HUB — EDITABLE DATA
// Update the values below to keep your site current.
// ============================================================

const TEAM_PASSWORD = "yinghuatrack26"; // Change this to your team password

const TEAM_NAME = "Yinghua Academy Dragons";
const TEAM_SUBTITLE = "Track & Field";
const TEAM_COLORS = {
  primary: "#790E1D",   // Yinghua maroon
  accent: "#FFD700",    // Yinghua gold
};

// ---- ANNOUNCEMENTS ----
const ANNOUNCEMENTS = [
  {
    date: "2026-04-15",
    title: "❌ Saturday's Meet Cancelled",
    body: "Saturday's meet at St. Paul Central H.S. (4/18) has been cancelled. No need to travel to St. Paul — enjoy your weekend! Practice resumes Tuesday 4/21 as scheduled. Next meet is Wednesday 4/22 at Richfield MS.",
    kind: "alert",
  },
  {
    date: "2026-04-02",
    title: "Welcome to the 2026 Season!",
    body: "We're excited to kick off another great year of Dragons Track & Field. Bring running shoes, water, and a great attitude to every practice!",
  },
];

// ---- SCHEDULE ----
// type: "practice" or "meet"
// Practices: Tue & Thu 3:30–5:00 PM. Pickup at 5:00 PM from field behind school.
// NOTE: ALL BUS RIDES ARE ONE WAY. Parents must pick up from meet.
const SCHEDULE = [
  // ---- WEEK 1 ----
  { date: "2026-04-02", type: "practice", title: "Practice — Week 1", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM · Gym available",
    plan: {
      sprints: "400m (50-75% pace), 300m (50-75% pace), 200m (75-90%), 2x100m (best effort). Introduce sprint form.",
      distance: "Introduce distance events & basic pacing. Fartlek \"Speed Play\" for 20 min.",
      field: "No field events or hurdles Week 1.",
    }},
  { date: "2026-04-07", type: "practice", title: "Practice — Week 1", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM",
    plan: {
      sprints: "Sprint drills. 4x200m (50-75% pace).",
      distance: "3 min on/steady to 2 min conversational for 20-25 min.",
      field: "Introduce hurdles and long jump.",
    }},
  // ---- NO SCHOOL ----
  { date: "2026-04-09", type: "practice", title: "No School — NO Practice", time: "", location: "Train at home", notes: "" },
  // ---- WEEK 2 ----
  { date: "2026-04-14", type: "practice", title: "Practice — Week 2", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM",
    plan: {
      sprints: "4x300m (50-75% pace).",
      distance: "4x300m (50-75% pace).",
      field: "Practice hurdles and long jump.",
    }},
  { date: "2026-04-16", type: "practice", title: "Pre-Meet Practice — Week 2", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM · Gym available",
    plan: {
      sprints: "Pre-meet: warm-up + 2x200m, 2x100m at 75%.",
      distance: "Pre-meet: 15 min easy running + 3x30 sec striders.",
      field: "Shot put and discus with throws coach.",
    }},
  // ---- MEET ----
  { date: "2026-04-18", type: "meet", title: "St. Paul Central H.S.", time: "CANCELLED", location: "St. Paul Central HS — 275 Lexington Pkwy N, St Paul, MN 55104", notes: "❌ CANCELLED — no meet this Saturday", cancelled: true },
  // ---- WEEK 3 ----
  { date: "2026-04-21", type: "practice", title: "Pre-Meet Practice — Week 3", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM",
    plan: {
      sprints: "Pre-meet: warm-up + 2x200m, 2x100m at 75%.",
      distance: "Pre-meet: 15 min easy running + 3x30 sec striders.",
      field: "Shot put and discus with throws coach.",
    }},
  { date: "2026-04-22", type: "meet", title: "Richfield MS", time: "4:30 PM", location: "Richfield HS — 7001 Harriet Ave, Richfield, MN 55423", notes: "Grades 6-8 · Dismiss 3:15 · Bus 3:30" },
  { date: "2026-04-23", type: "practice", title: "Practice — Week 3", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM · Gym available",
    plan: {
      sprints: "Sprint drills, shuttle relays.",
      distance: "Hills: 10-15x sprint up / recover down. 2x400m (75%).",
      field: "Practice hurdles and long jump.",
    }},
  // ---- WEEK 4 ----
  // NOTE: Throws coach (KP) swapped to Tue 4/28 this week — KP has a work conflict Thu 4/30.
  { date: "2026-04-28", type: "practice", title: "Practice — Week 4", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM",
    plan: {
      sprints: "4x100m relay repeats. Sprint form drills.",
      distance: "Fartlek with pace groups (15 min conversational). 5 min handoff practice.",
      field: "Shot put and discus with throws coach (swapped from Thu this week).",
    }},
  { date: "2026-04-30", type: "practice", title: "Practice — Week 4", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM · Gym available",
    plan: {
      sprints: "400m relay teams (2-3 people; 4x400m each).",
      distance: "400m relay teams (2-3 people; 4x400m each).",
      field: "Practice hurdles and long jump (throws coach out this Thursday).",
    }},
  // ---- WEEK 5 ----
  { date: "2026-05-05", type: "practice", title: "Pre-Meet Practice — Week 5", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM",
    plan: {
      sprints: "Pre-meet: warm-up + 2x200m, 2x100m.",
      distance: "Pre-meet: warm-up + 2 laps + 2 straightaway striders.",
      field: "Practice hurdles, long jump, and relay handoffs.",
    }},
  { date: "2026-05-06", type: "meet", title: "Olson MS–Bloomington", time: "4:15 PM", location: "Jefferson HS — 4001 W 102nd St, Bloomington, MN 55437", notes: "Grades 6-8 · Dismiss 3:05 · Bus 3:15" },
  { date: "2026-05-07", type: "practice", title: "Practice — Week 5", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM · Gym available",
    plan: {
      sprints: "Sprint drills, shuttle relays.",
      distance: "Fartlek with pace groups (15 min conversational).",
      field: "Shot put and discus with throws coach.",
    }},
  // ---- WEEK 6 ----
  { date: "2026-05-12", type: "practice", title: "Pre-Meet Practice — Week 6", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM",
    plan: {
      sprints: "Pre-meet: warm-up + 2x200m, 2x100m.",
      distance: "Pre-meet: warm-up + 2 laps + 2 straightaway striders.",
      field: "Practice hurdles, long jump, and relay handoffs.",
    }},
  { date: "2026-05-13", type: "meet", title: "Prior Lake", time: "4:00 PM", location: "Prior Lake HS — 7575 150th St W, Savage, MN 55378", notes: "Grades 6-8 · Dismiss 2:50 · Bus 3:00" },
  { date: "2026-05-14", type: "practice", title: "Pre-Meet Practice — Week 6", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM · Gym available",
    plan: {
      sprints: "Pre-meet: warm-up + 2x200m, 2x100m at 75%.",
      distance: "Pre-meet: 15 min easy running + 3x30 sec striders.",
      field: "Shot put and discus with throws coach.",
    }},
  { date: "2026-05-15", type: "meet", title: "TCGIS", time: "TBD", location: "Concordia Academy — 2400 Dale St N, Roseville, MN 55113", notes: "Grades 5-8" },
  // ---- WEEK 7 ----
  { date: "2026-05-19", type: "practice", title: "Pre-Meet Practice — Week 7", time: "3:30–5:00 PM", location: "Field behind school", notes: "Pickup at 5:00 PM",
    plan: {
      sprints: "Pre-meet: warm-up + 2x300m, 2x100m.",
      distance: "Pre-meet: warm-up + 2 laps + 2 straightaway striders.",
      field: "Practice hurdles, long jump, and relay handoffs.",
    }},
  { date: "2026-05-21", type: "meet", title: "Yinghua In-House Meet & End of Season Party", time: "3:45 PM", location: "Yinghua / NE Park", notes: "Grades 5-8 · Dismiss 3:30" },
];

// ---- MEET INFO ----
// Detailed info for upcoming meets. Keyed by schedule date (YYYY-MM-DD).
// The "This Meet" tab auto-shows the next upcoming meet entry found here.
// signupFormUrl: paste a Google Form URL here to let athletes sign up for events.
// To embed the form directly in the page, use the embeddable share URL (ends in /viewform?embedded=true).
const MEET_INFO = {
  "2026-04-18": {
    title: "St. Paul Central H.S.",
    date: "2026-04-18",
    dayLabel: "Saturday, April 18",
    location: "St. Paul Central HS",
    address: "275 Lexington Pkwy N, St Paul, MN 55104",
    mapUrl: "https://maps.google.com/?q=275+Lexington+Pkwy+N+St+Paul+MN+55104",
    cancelled: true,
    cancellationNote: "This meet has been cancelled. Practice resumes Tuesday 4/21. Next meet: Wednesday 4/22 at Richfield MS.",
    arrival: "Athletes should arrive by 12:30 PM for check-in and warm-up.",
    transportation: "Parents provide transportation to and from the meet.",
    whatToBring: [
      "⚠️ DRESS WARM — forecast is cold, windy, chance of precipitation",
      "Snow pants",
      "Winter jacket",
      "Winter hat and gloves",
      "Yinghua track uniform / team shirt (to wear under warm layers)",
      "Running shoes + water bottle",
      "Snacks and lunch (it's a long meet!)",
      "Change of clothes / extra socks in case you get wet",
    ],
    announcements: [
      {
        title: "Tell a coach which events you want to run",
        body: "Talk to Coach Drew, Coach David, or Coach Lily at Thursday's pre-meet practice (4/16) and let them know which events you'd like to do. We'll build heat sheets from there.",
      },
      {
        title: "Parent pickup",
        body: "There is no team bus for this meet. Parents are responsible for getting athletes to and from St. Paul Central.",
      },
    ],
    schedule: [
      { time: "1:00 PM", event: "Opening Field Events Begin", detail: "Girls shot put · Boys discus · Girls high jump · Boys/Girls long jump (rolling)", type: "field" },
      { time: "", event: "Field Event Check-in", detail: "Check-in, warm-up, practice throws & jumps end at 1:15 PM (or at event official's discretion based on entries).", type: "note" },
      { time: "1:30 PM", event: "Girls 100m Hurdles", type: "track" },
      { time: "1:40 PM", event: "Boys 100m Hurdles", type: "track" },
      { time: "1:50 PM", event: "Girls 100m Dash", type: "track" },
      { time: "2:00 PM", event: "Boys 100m Dash", type: "track" },
      { time: "2:10 PM", event: "Girls 1600m Run", type: "track" },
      { time: "2:20 PM", event: "Boys 1600m Run", type: "track" },
      { time: "2:30 PM", event: "Girls 400m Dash", type: "track" },
      { time: "2:30 PM", event: "Opening Field Events Conclude", type: "note" },
      { time: "2:40 PM", event: "Boys 400m Dash", type: "track" },
      { time: "2:45 PM", event: "Second Field Events Begin", detail: "Boys shot put · Girls discus · Boys high jump · Boys/Girls long jump (rolling)", type: "field" },
      { time: "2:50 PM", event: "Girls 4x100m Relay", type: "track" },
      { time: "3:00 PM", event: "Boys 4x100m Relay", type: "track" },
      { time: "3:10 PM", event: "Girls 800m Run", type: "track" },
      { time: "3:20 PM", event: "Boys 800m Run", type: "track" },
      { time: "3:30 PM", event: "Girls 200m Dash", type: "track" },
      { time: "3:40 PM", event: "Boys 200m Dash", type: "track" },
      { time: "3:50 PM", event: "Girls 4x400m Relay", type: "track" },
      { time: "4:00 PM", event: "Boys 4x400m Relay", type: "track" },
      { time: "4:10 PM", event: "Co-ed 4x100m Relay", detail: "Pass anything BUT a baton!", type: "fun" },
      { time: "4:20 PM", event: "Coaches / Parents 4x100m Relay", detail: "Come cheer on the grown-ups!", type: "fun" },
    ],
  },
};

// ---- ROSTER ----
// events: array of event names (add as athletes are assigned)
const ROSTER = [
  { name: "Reuben Addington", grade: 6, events: [] },
  { name: "Brighton Balk Mmary", grade: 5, events: [] },
  { name: "Cole Beaudry", grade: 7, events: [] },
  { name: "Althea Bortel Fielder", grade: 7, events: [] },
  { name: "Keva Bowron", grade: 7, events: [] },
  { name: "Teagan Bowron", grade: 5, events: [] },
  { name: "Liam Bursell", grade: 7, events: [] },
  { name: "Mila Bursell", grade: 7, events: [] },
  { name: "Grayson Chon", grade: 7, events: [] },
  { name: "Cooper Coblentz", grade: 8, events: [] },
  { name: "Hudson Coblentz", grade: 8, events: [] },
  { name: "Nathan Coblentz", grade: 8, events: [] },
  { name: "Addis Demere", grade: 8, events: [] },
  { name: "Amen Demere", grade: 5, events: [] },
  { name: "Kai Dinger", grade: 7, events: [] },
  { name: "Alexandra Ebinger", grade: 6, events: [] },
  { name: "Cora Ebinger", grade: 8, events: [] },
  { name: "Jace Euphosin", grade: 5, events: [] },
  { name: "Elyse Folbrecht", grade: 6, events: [] },
  { name: "Walter Folbrecht", grade: 5, events: [] },
  { name: "Remy Fortin", grade: 7, events: [] },
  { name: "Gabriella Gruber", grade: 5, events: [] },
  { name: "Vienna Haas", grade: 7, events: [] },
  { name: "Aedan Herman", grade: 8, events: [] },
  { name: "Louie Herman", grade: 5, events: [] },
  { name: "Jasper Hill", grade: 5, events: [] },
  { name: "Ben Hinrichs", grade: 8, events: [] },
  { name: "Sage Houdek", grade: 8, events: [] },
  { name: "Ari Klapperich-Khuu", grade: 7, events: [] },
  { name: "Marcus Kunc", grade: 6, events: [] },
  { name: "Mattias Kunc", grade: 8, events: [] },
  { name: "Avinash Landahl", grade: 5, events: [] },
  { name: "Perrin Light-Haberstroh", grade: 6, events: [] },
  { name: "Devin Lindquist", grade: 6, events: [] },
  { name: "Gabriel Nowariak", grade: 6, events: [] },
  { name: "Annika Peterson", grade: 7, events: [] },
  { name: "Cailee Pham", grade: 8, events: [] },
  { name: "Amelia Roddy", grade: 6, events: [] },
  { name: "Audrey Roffe", grade: 7, events: [] },
  { name: "Liv Romsaas", grade: 5, events: [] },
  { name: "Frank Ryan", grade: 5, events: [] },
  { name: "Louis Ryan", grade: 7, events: [] },
  { name: "Charlotte Saeger", grade: 5, events: [] },
  { name: "Arya Sanaka", grade: 7, events: [] },
  { name: "Leo Shu", grade: 8, events: [] },
  { name: "Harper Stewart", grade: 5, events: [] },
  { name: "Ben Surla", grade: 7, events: [] },
  { name: "Otto Terhark", grade: 5, events: [] },
  { name: "Jin Trenh", grade: 8, events: [] },
  { name: "Thea Trenh", grade: 5, events: [] },
  { name: "Ethan Tschida", grade: 6, events: [] },
  { name: "Isabel Tschida", grade: 8, events: [] },
  { name: "Caleb Wilson", grade: 7, events: [] },
  { name: "Isaac Wilson", grade: 7, events: [] },
  { name: "Tiancheng Yang", grade: 5, events: [] },
  { name: "Tianming Yang", grade: 5, events: [] },
];

// ---- COACHES ----
const COACHES = [
  // Head Coaches
  { name: "Drew Addington", role: "Head Coach — Distance 800/1600, Hurdles", email: "drewadding@gmail.com" },
  { name: "David Lewis", role: "Head Coach — Middle Distance, Jumps", email: "david.lewis@yinghuaacademy.org" },
  { name: "Lily Ciske", role: "Head Coach — Sprints, Jumps", email: "lilian.ciske@mail.northcentral.edu" },
  // Assistant Coaches
  { name: "Angela Bortel", role: "Assistant Coach", email: "" },
  { name: "Leighton Becher", role: "Assistant Coach — Distance 800/1600", email: "" },
  // Team Manager
  { name: "Thein Sam", role: "Team Manager", email: "tnsam1@gmail.com" },
  // Parent Volunteers
  { name: "Anna Lindquist", role: "Parent Volunteer — Hurdles", email: "jasonandanna@gmail.com" },
  { name: "Charles Nowariak", role: "Parent Volunteer", email: "cdnowariak@icloud.com" },
  { name: "Kristin Petersen", role: "Parent Volunteer — Shot Put & Discus", email: "kristincpetersen@hotmail.com" },
  { name: "Anaya Mitra", role: "Parent Volunteer — Thursdays", email: "landahl.mitra@gmail.com" },
];

// ---- MEET RESULTS ----
// Add results after each meet
const RESULTS = [];

// ---- TEAM RECORDS ----
const RECORDS = [];

// ---- EXPECTATIONS ----
const EXPECTATIONS = {
  intro: "Our goal is to have a positive season where student athletes, coaches, and parents can work together to create an environment that is productive and cohesive for everyone. Students are expected to conduct themselves in a manner which follows the behavior code for Yinghua Academy. Participation in extracurricular activities is only permissible if the student is academically eligible and if the student acts in a way which is in accordance with this behavior code.",
  formLink: "",
  sections: [
    {
      title: "Practice",
      rules: [
        "I will work hard at practice and support my teammates to the best of my ability.",
        "I will show respect to my coach and teammates at all times. I am there to learn and I will not talk when the coach is talking.",
        "I will go to all practices and arrive on time. If I am late due to a teacher talking with me or a make-up test, I will arrive with a pass. If I am sick or cannot attend practice, I or my parents will contact the coach by email.",
        "I will not be \"Physical.\" Examples: kicking a basketball or volleyball, throwing a ball at someone, tripping or attempting to trip, push, poke, wrestle, spit, fight…",
        "I will not disrupt others. Examples: throwing grass, being silly, making funny noises, bringing toys or objects to practice…",
        "Before I start my practice warm up I will help put away other equipment if needed.",
      ],
      consequences: [
        "I will be given a reminder to stay on task. The coach will remind the player of the expectations.",
        "After a reminder the coach will use TAB: Take a Break One: the athlete will move away from activity and reset (re-enter practice when ready). Take a Break Two: the athlete will move away from activity and may rejoin practice only after a conversation with the coach. Take a Break Three: the athlete will move away from activity and will sit and watch the rest of the practice (parent will be emailed, called or a discussion at pick up). TAB 3 may result in loss of some game time.",
        "Repeated behavior/disruption issues: The athlete may have to sit and watch, write an apology, sit near the Athletic Director's office, game suspension or a one-week suspension (this includes at least one game).",
        "Continued behavior/disruption issues (athlete shows little to no change): the Athletic Director will work with the Student Development and Family Liaison team to come up with a solution/consequence. This could result in expulsion from the team.",
      ],
    },
    {
      title: "Meets / Games",
      rules: [
        "I will be respectful to my coach, teammates, opponents, referees and parents/fans.",
        "I will display good sportsmanship at all times.",
        "I will help clean up after the game. Example: picking up trash, picking up balls, putting away chairs…",
        "I will manage myself in the bleachers when watching my teammates. This is before a game or after a game. I must stay in the gymnasium area.",
        "Every player will treat all teammates with acceptance, respect, and friendship.",
      ],
      consequences: [
        "I will apologize to whoever has been impacted such as players, coaches, or referees.",
        "I understand that I may have reduced playing time.",
        "I understand that I may be suspended from practices or games.",
      ],
    },
    {
      title: "Academics",
      rules: [
        "I will do my best to be focused in class.",
        "I will do my homework.",
        "I will work hard to keep up with my work.",
      ],
      consequences: [
        "If I do not meet the academic expectations, I understand that this may impact my practice or playing time.",
      ],
    },
    {
      title: "Classroom Behavior",
      rules: [
        "I will be a good role model in the classroom. When appropriate or asked, I will be a leader in the classroom.",
        "I will respect my teachers and other staff.",
        "I will not distract or disrupt learning for classmates.",
      ],
      consequences: [
        "If I do not meet the classroom behavior expectations, I understand that this may impact my practice or playing time.",
      ],
    },
    {
      title: "Away Games",
      rules: [
        "I will take care of all my own belongings and trash.",
        "I will show respect to the host school.",
        "I will be a fine representative of Yinghua Academy.",
      ],
    },
    {
      title: "Bus Expectations",
      rules: [
        "No eating on the bus. I can eat my snack near the entrance to the gym.",
        "I will use a quiet voice and stay seated on the bus.",
        "I will be respectful, responsible and helpful.",
        "I will stay seated at all times.",
      ],
      consequences: [
        "If I do not meet the bus expectations, I will not be allowed to ride the bus. This can be a one time or season suspension. Should this happen, I understand that my parents will be responsible to get me to the games.",
      ],
    },
    {
      title: "Parents",
      rules: [
        "I will respect the coach, referee, players and opponents.",
        "I will cheer and be a role model of good sportsmanship.",
        "I will let the coaches coach.",
        "I will pick up my child on time from practices and games. Parents are responsible for picking up their child from away games (bus or carpool from school is a one way ride).",
      ],
    },
    {
      title: "Other Important Policies",
      rules: [
        "ABSENCE FROM SCHOOL: no practice or game that day (there are some exceptions).",
        "SCHOOL SUSPENSION OR IN-SCHOOL SUSPENSION (ISS): the student cannot participate in that day's practice or game.",
        "RULE OF 3 (3 times): Repetitive inappropriate behavior, skipping practice or other issues will result in a game(s) suspension. Skipping once or twice may lead to other consequences worked out with the coach and Athletic Director.",
        "DRUG, ALCOHOL, TOBACCO or VAPING & HARASSMENT: We will use the MN State High School Eligibility Rules as a general guideline. Infraction consequences will be adapted for the middle schooler thought process.",
      ],
    },
  ],
};

// ---- 2025 SEASON RESULTS ----
const RESULTS_2025 = {
  season: "2025",
  events: [
    {
      name: "100m Hurdles",
      results: [
        { athlete: "Ada Light-Haberstroh", mark: "14.68", meet: "Richfield Meet" },
        { athlete: "Cora Cartwright", mark: "17.1", meet: "Richfield Meet" },
        { athlete: "Saoirse Bowron", mark: "19.3", meet: "Richfield Meet" },
        { athlete: "Ari Klapperich-Khuu", mark: "19.8", meet: "Mini-meet @ Edison" },
        { athlete: "Arthur Goben", mark: "20.1", meet: "Mini-meet @ Edison" },
        { athlete: "Hazel Hill", mark: "21.2", meet: "Mini-meet @ Edison" },
        { athlete: "Orianna Gruber", mark: "21.51", meet: "Prior Lake Meet" },
        { athlete: "Santiago Guzman-Neva", mark: "22.24", meet: "Mini-meet @ Edison" },
        { athlete: "Keva Bowron", mark: "22.9", meet: "Mini-meet @ Edison" },
        { athlete: "Christopher Sabatke", mark: "23.33", meet: "Mini-meet @ Edison" },
        { athlete: "Albin Tyborski", mark: "28.8", meet: "Mini-meet @ Edison" },
        { athlete: "Althea Bortel Fielder", mark: "29.35", meet: "Mini-meet @ Edison" },
      ],
    },
    {
      name: "100m Dash",
      results: [
        { athlete: "Jonathan Trenh", mark: "12.7", meet: "Prior Lake Meet" },
        { athlete: "Sylvia Martin", mark: "13.48", meet: "Mini-meet @ Edison" },
        { athlete: "Ian Lindquist", mark: "13.55", meet: "Richfield Meet" },
        { athlete: "Owen Colai", mark: "13.8", meet: "Mini-meet @ Edison" },
        { athlete: "Arthur Goben", mark: "13.82", meet: "Richfield Meet" },
        { athlete: "Ada Light-Haberstroh", mark: "13.95", meet: "Prior Lake Meet" },
        { athlete: "Anika Robinson", mark: "14.05", meet: "Prior Lake Meet" },
        { athlete: "Albin Tyborski", mark: "14.1", meet: "Mini-meet @ Edison" },
        { athlete: "Santiago Guzman-Neva", mark: "14.13", meet: "Richfield Meet" },
        { athlete: "Nathan Coblentz", mark: "14.2", meet: "Mini-meet @ Edison" },
        { athlete: "Jin Pham", mark: "14.22", meet: "Richfield Meet" },
        { athlete: "Cooper Lindquist", mark: "14.41", meet: "Prior Lake Meet" },
        { athlete: "Addis Demere", mark: "14.6", meet: "Mini-meet @ Edison" },
        { athlete: "Orianna Gruber", mark: "14.91", meet: "Mini-meet @ Edison" },
        { athlete: "Christopher Sabatke", mark: "15.0", meet: "Richfield Meet" },
        { athlete: "Keva Bowron", mark: "15.03", meet: "Prior Lake Meet" },
        { athlete: "Cailee Pham", mark: "15.13", meet: "Richfield Meet" },
        { athlete: "Hudson Coblentz", mark: "15.21", meet: "Richfield Meet" },
        { athlete: "Althea Bortel Fielder", mark: "15.29", meet: "Richfield Meet" },
        { athlete: "Isabel Tschida", mark: "15.3", meet: "Mini-meet @ Edison" },
        { athlete: "Londyn Thomas", mark: "15.39", meet: "Prior Lake Meet" },
        { athlete: "Isaac Winkelman", mark: "15.44", meet: "Prior Lake Meet" },
        { athlete: "Ari Klapperich-Khuu", mark: "15.47", meet: "Richfield Meet" },
        { athlete: "Devin Lindquist", mark: "15.5", meet: "Mini-meet @ Edison" },
        { athlete: "Saoirse Bowron", mark: "15.8", meet: "Mini-meet @ Edison" },
        { athlete: "Hazel Hill", mark: "15.9", meet: "Prior Lake Meet" },
        { athlete: "Audrey Roffe", mark: "16.0", meet: "Richfield Meet" },
        { athlete: "Caleb Dinger", mark: "16.41", meet: "Richfield Meet" },
        { athlete: "Evelyn Evans", mark: "16.59", meet: "Mini-meet @ Edison" },
        { athlete: "Naomi Hefferan", mark: "16.6", meet: "Mini-meet @ Edison" },
        { athlete: "Perrin Light-Haberstroh", mark: "16.7", meet: "Mini-meet @ Edison" },
        { athlete: "Finley Cox", mark: "17.1", meet: "Mini-meet @ Edison" },
        { athlete: "Marcus Kunc", mark: "18.13", meet: "Mini-meet @ Edison" },
        { athlete: "Grayson Chon", mark: "18.6", meet: "Richfield Meet" },
        { athlete: "Remi Klapperich-Khuu", mark: "19.5", meet: "Mini-meet @ Edison" },
      ],
    },
    {
      name: "200m Dash",
      results: [
        { athlete: "Ian Lindquist", mark: "28.47", meet: "Richfield Meet" },
        { athlete: "Ada Light-Haberstroh", mark: "29.02", meet: "Richfield Meet" },
        { athlete: "Sylvia Martin", mark: "29.74", meet: "Mini-meet @ Edison" },
        { athlete: "Jonathan Trenh", mark: "29.9", meet: "Richfield Meet" },
        { athlete: "Nathan Coblentz", mark: "30.26", meet: "Prior Lake Meet" },
        { athlete: "Owen Colai", mark: "30.57", meet: "Mini-meet @ Edison" },
        { athlete: "Saoirse Bowron", mark: "31.7", meet: "Mini-meet @ Edison" },
        { athlete: "Jin Pham", mark: "31.94", meet: "Richfield Meet" },
        { athlete: "Hudson Coblentz", mark: "32.0", meet: "Richfield Meet" },
        { athlete: "Keva Bowron", mark: "32.36", meet: "Prior Lake Meet" },
        { athlete: "Ari Klapperich-Khuu", mark: "32.84", meet: "Prior Lake Meet" },
        { athlete: "Santiago Guzman-Neva", mark: "33.18", meet: "Richfield Meet" },
        { athlete: "Althea Bortel Fielder", mark: "33.63", meet: "Prior Lake Meet" },
        { athlete: "Addis Demere", mark: "34.4", meet: "Richfield Meet" },
        { athlete: "Londyn Thomas", mark: "34.74", meet: "Prior Lake Meet" },
        { athlete: "Audrey Roffe", mark: "36.98", meet: "Mini-meet @ Edison" },
        { athlete: "Perrin Light-Haberstroh", mark: "37.12", meet: "Mini-meet @ Edison" },
        { athlete: "Evelyn Evans", mark: "39.43", meet: "Mini-meet @ Edison" },
        { athlete: "Finley Cox", mark: "39.7", meet: "Mini-meet @ Edison" },
        { athlete: "Ethan Tschida", mark: "44.37", meet: "Mini-meet @ Edison" },
        { athlete: "Quentin Moy-Gottfried", mark: "45.8", meet: "Mini-meet @ Edison" },
        { athlete: "Greyson DeWalt", mark: "48.05", meet: "Richfield Meet" },
        { athlete: "Grayson Chon", mark: "52.2", meet: "Mini-meet @ Edison" },
      ],
    },
    {
      name: "400m Dash",
      results: [
        { athlete: "Anika Robinson", mark: "1:15", meet: "Prior Lake Meet" },
        { athlete: "Keva Bowron", mark: "1:27", meet: "Prior Lake Meet" },
        { athlete: "Greyson DeWalt", mark: "1:48", meet: "Richfield Meet" },
      ],
    },
    {
      name: "800m Run",
      results: [
        { athlete: "Sawyer Schulz", mark: "2:20", meet: "Prior Lake Meet" },
        { athlete: "Isaac Winkelman", mark: "2:49", meet: "Prior Lake Meet" },
        { athlete: "Isaac Jasper", mark: "2:58", meet: "Richfield Meet" },
        { athlete: "Rowan McGregor", mark: "2:59", meet: "Prior Lake Meet" },
        { athlete: "Cora Ebinger", mark: "3:00", meet: "Richfield Meet" },
        { athlete: "Duyen Nguyen", mark: "3:09", meet: "Mini-meet @ Edison" },
        { athlete: "Santiago Guzman-Neva", mark: "3:12", meet: "Richfield Meet" },
        { athlete: "Christopher Sabatke", mark: "3:12", meet: "Prior Lake Meet" },
        { athlete: "Alexandra Ebinger", mark: "3:16", meet: "Mini-meet @ Edison" },
        { athlete: "Amelia Roddy", mark: "3:17", meet: "Mini-meet @ Edison" },
        { athlete: "Devin Lindquist", mark: "3:18", meet: "Mini-meet @ Edison" },
        { athlete: "Hazel Courtney", mark: "4:22", meet: "Mini-meet @ Edison" },
        { athlete: "Greyson DeWalt", mark: "4:25", meet: "Prior Lake Meet" },
      ],
    },
    {
      name: "1600m Run",
      results: [
        { athlete: "Sawyer Schulz", mark: "5:12", meet: "Prior Lake Meet" },
        { athlete: "Ben Surla", mark: "6:07", meet: "Prior Lake Meet" },
        { athlete: "Isaac Jasper", mark: "6:19", meet: "Mini-meet @ Edison" },
        { athlete: "Rowan McGregor", mark: "6:29", meet: "Mini-meet @ Edison" },
        { athlete: "Mattias Kunc", mark: "6:37", meet: "Mini-meet @ Edison" },
        { athlete: "Duyen Nguyen", mark: "6:41", meet: "Mini-meet @ Edison" },
        { athlete: "Santiago Guzman-Neva", mark: "6:51", meet: "Richfield Meet" },
        { athlete: "Cora Cartwright", mark: "7:03", meet: "Prior Lake Meet" },
        { athlete: "Audrey Roffe", mark: "7:35", meet: "Prior Lake Meet" },
        { athlete: "Amelia Roddy", mark: "7:41", meet: "Mini-meet @ Edison" },
        { athlete: "Cora Ebinger", mark: "7:52", meet: "Mini-meet @ Edison" },
        { athlete: "Marcus Kunc", mark: "8:23", meet: "Mini-meet @ Edison" },
        { athlete: "Evelyn Evans", mark: "8:29", meet: "Mini-meet @ Edison" },
        { athlete: "Remi Klapperich-Khuu", mark: "9:23", meet: "Mini-meet @ Edison" },
      ],
    },
    {
      name: "4x200m Relay",
      results: [
        { athlete: "Anika, Duyen, Isaac J, Sawyer", mark: "2:03", meet: "Mini-meet @ Edison" },
        { athlete: "Addis, Nathan, Ian L, Owen", mark: "2:08", meet: "Mini-meet @ Edison" },
        { athlete: "Addis, Arthur, Hudson, Jin", mark: "2:09", meet: "Richfield Meet" },
        { athlete: "Saoirse, Sylvia, Ada, Audrey", mark: "2:10", meet: "Richfield Meet" },
        { athlete: "Ada, Orianna, Hazel H, Saoirse", mark: "2:15", meet: "Mini-meet @ Edison" },
        { athlete: "Rowan, Kai, Ben, Ari", mark: "2:19", meet: "Mini-meet @ Edison" },
        { athlete: "Cora E, Isabel, Cailee, Londyn", mark: "2:27", meet: "Mini-meet @ Edison" },
        { athlete: "Keva, Thea, Elyse, Perrin", mark: "2:28", meet: "Mini-meet @ Edison" },
        { athlete: "Reuben, Devin, Remi, Marcus", mark: "2:41", meet: "Mini-meet @ Edison" },
        { athlete: "Amelia, Quentin, Ava, Kayleigh", mark: "2:46", meet: "Mini-meet @ Edison" },
      ],
    },
    {
      name: "4x100m Relay",
      results: [
        { athlete: "Ian, Owen, Greyson, Jonathan", mark: "58.14", meet: "Richfield Meet" },
        { athlete: "Sawyer, Rowan, Chris, Isaac", mark: "59.7", meet: "Prior Lake Meet" },
        { athlete: "Grant, Addis, Cooper, Nathan", mark: "1:01", meet: "Prior Lake Meet" },
        { athlete: "Sylvia, Audrey, Cora C, Anika", mark: "1:01", meet: "Prior Lake Meet" },
        { athlete: "Saoirse, Anika, Orianna, Ada", mark: "1:01.12", meet: "Richfield Meet" },
        { athlete: "Jin, Hudson, Addis, Arthur", mark: "1:02.32", meet: "Richfield Meet" },
        { athlete: "Hazel H, Saoirse, Ada, Orianna", mark: "1:02", meet: "Prior Lake Meet" },
        { athlete: "Cailee, Londyn, Althea, Isabel", mark: "1:05.38", meet: "Richfield Meet" },
        { athlete: "Isabel, Londyn, Althea, Evelyn", mark: "1:06", meet: "Prior Lake Meet" },
        { athlete: "Isaac, Ari, Ben, Caleb", mark: "1:07", meet: "Richfield Meet" },
        { athlete: "Ari, Kai, Isaac W, Caleb", mark: "1:08", meet: "Prior Lake Meet" },
      ],
    },
    {
      name: "4x400m Relay",
      results: [
        { athlete: "Orianna, Anika, Althea, Isabel", mark: "5:24", meet: "Richfield Meet" },
      ],
    },
    {
      name: "Sprint Medley Relay",
      results: [
        { athlete: "Ada, Saoirse, Orianna, Anika", mark: "2:21", meet: "Prior Lake Meet" },
        { athlete: "Grant, Addis, Nathan, Hudson", mark: "2:22", meet: "Prior Lake Meet" },
        { athlete: "Ari, Kai, Isaac W, Ben, Caleb", mark: "2:24", meet: "Prior Lake Meet" },
        { athlete: "Althea, Keva, Isabel, Audrey", mark: "2:30", meet: "Prior Lake Meet" },
      ],
    },
    {
      name: "Long Jump",
      results: [
        { athlete: "Arthur Goben", mark: "12' 10\"", meet: "Mini-meet @ Edison" },
        { athlete: "Albin Tyborski", mark: "12' 4\"", meet: "Mini-meet @ Edison" },
        { athlete: "Owen Colai", mark: "11' 10\"", meet: "Mini-meet @ Edison" },
        { athlete: "Ada Light-Haberstroh", mark: "10' 9\"", meet: "Mini-meet @ Edison" },
        { athlete: "Alexandra Ebinger", mark: "10' 9\"", meet: "Mini-meet @ Edison" },
        { athlete: "Isabel Tschida", mark: "10' 1.5\"", meet: "Mini-meet @ Edison" },
        { athlete: "Mattias Kunc", mark: "10' 1\"", meet: "Mini-meet @ Edison" },
        { athlete: "Greyson DeWalt", mark: "10'", meet: "Mini-meet @ Edison" },
        { athlete: "Perrin Light-Haberstroh", mark: "9'", meet: "Mini-meet @ Edison" },
        { athlete: "Kayleigh Thomas", mark: "8' 10\"", meet: "Mini-meet @ Edison" },
        { athlete: "Amelia Roddy", mark: "8' 9\"", meet: "Mini-meet @ Edison" },
        { athlete: "Audrey Roffe", mark: "8' 3\"", meet: "Mini-meet @ Edison" },
        { athlete: "Ava Copperud", mark: "8' 1\"", meet: "Mini-meet @ Edison" },
        { athlete: "Evelyn Evans", mark: "7' 5.5\"", meet: "Mini-meet @ Edison" },
        { athlete: "Gabriel Nowariak", mark: "7'", meet: "Mini-meet @ Edison" },
        { athlete: "Ethan Tschida", mark: "6' 10\"", meet: "Mini-meet @ Edison" },
        { athlete: "Hazel Courtney", mark: "6' 7\"", meet: "Mini-meet @ Edison" },
      ],
    },
  ],
  // ---- IN-HOUSE MEET RESULTS ----
  inHouseMeet: {
    title: "Yinghua In-House Meet",
    teams: ["Robert", "Imagine Pope Kiwis III", "Jurassic Chickens", "Red Dead Cheetahs"],
    events: [
      {
        name: "100m Hurdles",
        results: [
          { athlete: "Albin Tyborski", team: "Jurassic Chickens", mark: "16.60", place: "1st" },
          { athlete: "Ada Light-Haberstroh", team: "Imagine Pope Kiwis III", mark: "18.08", place: "1st" },
          { athlete: "Anika Robinson", team: "Red Dead Cheetahs", mark: "18.17", place: "2nd" },
          { athlete: "Ari Klapperich-Khuu", team: "Imagine Pope Kiwis III", mark: "18.27", place: "1st" },
          { athlete: "Keva Bowron", team: "Imagine Pope Kiwis III", mark: "18.70", place: "1st" },
          { athlete: "Nathan Coblentz", team: "Robert", mark: "19.03", place: "2nd" },
          { athlete: "Orianna Gruber", team: "Robert", mark: "19.00", place: "3rd" },
          { athlete: "Cooper Coblentz", team: "Imagine Pope Kiwis III", mark: "19.05", place: "3rd" },
          { athlete: "Cora Clark", team: "Imagine Pope Kiwis III", mark: "19.07", place: "4th" },
          { athlete: "Hazel Hill", team: "Jurassic Chickens", mark: "19.17", place: "5th" },
          { athlete: "Santiago Guzman-Neva", team: "Imagine Pope Kiwis III", mark: "19.36", place: "4th" },
          { athlete: "Christopher Sabatke", team: "Imagine Pope Kiwis III", mark: "19.54", place: "5th" },
          { athlete: "Rowan McGregor", team: "Robert", mark: "20.80", place: "" },
          { athlete: "Alexandra Ebinger", team: "Red Dead Cheetahs", mark: "21.83", place: "3rd" },
          { athlete: "Evelyn Evans", team: "Robert", mark: "21.82", place: "2nd" },
          { athlete: "Perrin Light-Haberstroh", team: "Red Dead Cheetahs", mark: "21.93", place: "4th" },
          { athlete: "Mattias Kunc", team: "Red Dead Cheetahs", mark: "22.00", place: "" },
          { athlete: "Gabriel Nowariak", team: "Red Dead Cheetahs", mark: "22.50", place: "2nd" },
          { athlete: "Ava Copperud", team: "Robert", mark: "26.38", place: "5th" },
          { athlete: "Isabel Tschida", team: "Red Dead Cheetahs", mark: "26.38", place: "" },
        ],
      },
      {
        name: "100m Dash",
        results: [
          { athlete: "Jonathan Thomas", team: "Imagine Pope Kiwis III", mark: "13.41", place: "1st" },
          { athlete: "Jin Trenh", team: "Imagine Pope Kiwis III", mark: "13.56", place: "2nd" },
          { athlete: "Ian Lindquist", team: "Red Dead Cheetahs", mark: "13.61", place: "3rd" },
          { athlete: "Nathan Coblentz", team: "Robert", mark: "13.96", place: "4th" },
          { athlete: "Cooper Coblentz", team: "Imagine Pope Kiwis III", mark: "13.96", place: "5th" },
          { athlete: "Albin Tyborski", team: "Jurassic Chickens", mark: "14.40", place: "6th" },
          { athlete: "Kai Dinger", team: "Jurassic Chickens", mark: "14.48", place: "1st" },
          { athlete: "Ada Light-Haberstroh", team: "Imagine Pope Kiwis III", mark: "14.97", place: "1st" },
          { athlete: "Ari Klapperich-Khuu", team: "Imagine Pope Kiwis III", mark: "15.18", place: "2nd" },
          { athlete: "Isaac Wilson", team: "Red Dead Cheetahs", mark: "15.22", place: "3rd" },
          { athlete: "Isabel Tschida", team: "Red Dead Cheetahs", mark: "15.37", place: "2nd" },
          { athlete: "Cailee Pham", team: "Jurassic Chickens", mark: "15.37", place: "3rd" },
          { athlete: "Anika Robinson", team: "Red Dead Cheetahs", mark: "15.55", place: "4th" },
          { athlete: "Addis Demere", team: "Jurassic Chickens", mark: "15.68", place: "7th" },
          { athlete: "Devin Lindquist", team: "Jurassic Chickens", mark: "15.71", place: "4th" },
          { athlete: "Hazel Hill", team: "Jurassic Chickens", mark: "15.81", place: "5th" },
          { athlete: "Christopher Sabatke", team: "Imagine Pope Kiwis III", mark: "15.97", place: "8th" },
          { athlete: "Orianna Gruber", team: "Robert", mark: "15.98", place: "6th" },
          { athlete: "Keva Bowron", team: "Imagine Pope Kiwis III", mark: "16.00", place: "1st" },
          { athlete: "Saoirse Bowron", team: "Robert", mark: "16.59", place: "7th" },
          { athlete: "Thea Trenh", team: "Robert", mark: "16.59", place: "2nd" },
          { athlete: "Cora Clark", team: "Imagine Pope Kiwis III", mark: "16.68", place: "8th" },
          { athlete: "Alexandra Ebinger", team: "Red Dead Cheetahs", mark: "16.73", place: "3rd" },
          { athlete: "Londyn Thomas", team: "Robert", mark: "16.90", place: "9th" },
          { athlete: "Ben Surla", team: "Robert", mark: "16.98", place: "5th" },
          { athlete: "Audrey Roffe", team: "Jurassic Chickens", mark: "17.69", place: "4th" },
          { athlete: "Gabriel Nowariak", team: "Red Dead Cheetahs", mark: "17.75", place: "" },
          { athlete: "Perrin Light-Haberstroh", team: "Red Dead Cheetahs", mark: "17.87", place: "5th" },
          { athlete: "Ethan Tschida", team: "Imagine Pope Kiwis III", mark: "18.14", place: "" },
          { athlete: "Remi Klapperich-Khuu", team: "Robert", mark: "19.25", place: "" },
          { athlete: "Reuben Addington", team: "Jurassic Chickens", mark: "19.54", place: "" },
        ],
      },
      {
        name: "200m Run",
        results: [
          { athlete: "Ian Lindquist", team: "Red Dead Cheetahs", mark: "29.10", place: "1st" },
          { athlete: "Albin Tyborski", team: "Jurassic Chickens", mark: "31.03", place: "2nd" },
          { athlete: "Cooper Coblentz", team: "Imagine Pope Kiwis III", mark: "31.04", place: "3rd" },
          { athlete: "Nathan Coblentz", team: "Robert", mark: "31.19", place: "4th" },
          { athlete: "Amelia Roddy", team: "Jurassic Chickens", mark: "31.33", place: "1st" },
          { athlete: "Thea Trenh", team: "Robert", mark: "31.35", place: "2nd" },
          { athlete: "Ada Light-Haberstroh", team: "Imagine Pope Kiwis III", mark: "31.40", place: "1st" },
          { athlete: "Saoirse Bowron", team: "Robert", mark: "32.84", place: "2nd" },
          { athlete: "Santiago Guzman-Neva", team: "Imagine Pope Kiwis III", mark: "32.88", place: "5th" },
          { athlete: "Ari Klapperich-Khuu", team: "Imagine Pope Kiwis III", mark: "33.10", place: "1st" },
          { athlete: "Christopher Sabatke", team: "Imagine Pope Kiwis III", mark: "33.66", place: "6th" },
          { athlete: "Addis Demere", team: "Jurassic Chickens", mark: "34.09", place: "7th" },
          { athlete: "Grant Owens", team: "Robert", mark: "34.16", place: "8th" },
          { athlete: "Keva Bowron", team: "Imagine Pope Kiwis III", mark: "34.55", place: "3rd" },
          { athlete: "Orianna Gruber", team: "Robert", mark: "34.70", place: "3rd" },
          { athlete: "Hudson Coblentz", team: "Red Dead Cheetahs", mark: "34.76", place: "9th" },
          { athlete: "Hazel Hill", team: "Jurassic Chickens", mark: "35.13", place: "4th" },
          { athlete: "Gabriel Nowariak", team: "Red Dead Cheetahs", mark: "36.00", place: "2nd" },
          { athlete: "Isaac Wilson", team: "Red Dead Cheetahs", mark: "36.12", place: "10th" },
          { athlete: "Devin Lindquist", team: "Jurassic Chickens", mark: "36.90", place: "3rd" },
          { athlete: "Londyn Thomas", team: "Robert", mark: "36.90", place: "5th" },
          { athlete: "Audrey Roffe", team: "Jurassic Chickens", mark: "37.01", place: "4th" },
          { athlete: "Perrin Light-Haberstroh", team: "Red Dead Cheetahs", mark: "40.00", place: "5th" },
          { athlete: "Alexandra Ebinger", team: "Red Dead Cheetahs", mark: "40.46", place: "" },
          { athlete: "Evelyn Evans", team: "Robert", mark: "41.61", place: "" },
          { athlete: "Ethan Tschida", team: "Imagine Pope Kiwis III", mark: "42.13", place: "4th" },
          { athlete: "Finley Cox", team: "Jurassic Chickens", mark: "42.13", place: "" },
          { athlete: "Ava Copperud", team: "Robert", mark: "43.47", place: "" },
          { athlete: "Kayleigh Thomas", team: "Robert", mark: "43.93", place: "" },
          { athlete: "Hazel Courtney", team: "Imagine Pope Kiwis III", mark: "49.58", place: "" },
        ],
      },
      {
        name: "400m Run",
        results: [
          { athlete: "Sawyer Schulz", team: "Jurassic Chickens", mark: "", place: "1st" },
          { athlete: "Gabriel Nowariak", team: "Red Dead Cheetahs", mark: "1:24", place: "2nd" },
          { athlete: "Duyen Nguyen", team: "Imagine Pope Kiwis III", mark: "", place: "1st" },
          { athlete: "Ben Surla", team: "Robert", mark: "", place: "1st" },
          { athlete: "Cooper Coblentz", team: "Imagine Pope Kiwis III", mark: "", place: "2nd" },
          { athlete: "Isaac Jasper", team: "Robert", mark: "", place: "3rd" },
          { athlete: "Caleb Wilson", team: "Imagine Pope Kiwis III", mark: "1:31", place: "3rd" },
          { athlete: "Jasper McGregor", team: "Robert", mark: "1:37", place: "" },
          { athlete: "Audrey Roffe", team: "Jurassic Chickens", mark: "", place: "1st" },
          { athlete: "Orianna Gruber", team: "Robert", mark: "", place: "2nd" },
          { athlete: "Hazel Hill", team: "Jurassic Chickens", mark: "", place: "3rd" },
          { athlete: "Rowan McGregor", team: "Robert", mark: "", place: "4th" },
          { athlete: "Cora Clark", team: "Imagine Pope Kiwis III", mark: "", place: "4th" },
          { athlete: "Reuben Addington", team: "Jurassic Chickens", mark: "", place: "4th" },
          { athlete: "Hudson Coblentz", team: "Red Dead Cheetahs", mark: "", place: "5th" },
          { athlete: "Remi Klapperich-Khuu", team: "Robert", mark: "", place: "5th" },
        ],
      },
      {
        name: "800m Run",
        results: [
          { athlete: "Sawyer Schulz", team: "Jurassic Chickens", mark: "2:40", place: "1st" },
          { athlete: "Isaac Jasper", team: "Robert", mark: "2:46", place: "2nd" },
          { athlete: "Ben Surla", team: "Robert", mark: "2:52", place: "1st" },
          { athlete: "Duyen Nguyen", team: "Imagine Pope Kiwis III", mark: "", place: "1st" },
          { athlete: "Keva Bowron", team: "Imagine Pope Kiwis III", mark: "", place: "2nd" },
          { athlete: "Santiago Guzman-Neva", team: "Imagine Pope Kiwis III", mark: "3:26", place: "5th" },
          { athlete: "Jasper McGregor", team: "Robert", mark: "3:28", place: "2nd" },
          { athlete: "Mattias Kunc", team: "Red Dead Cheetahs", mark: "3:30", place: "" },
          { athlete: "Marcus Kunc", team: "Imagine Pope Kiwis III", mark: "3:42", place: "3rd" },
          { athlete: "Finley Cox", team: "Jurassic Chickens", mark: "3:46", place: "4th" },
          { athlete: "Ari Klapperich-Khuu", team: "Imagine Pope Kiwis III", mark: "3:48", place: "5th" },
          { athlete: "Cora Ebinger", team: "Jurassic Chickens", mark: "", place: "4th" },
          { athlete: "Evelyn Evans", team: "Robert", mark: "3:59", place: "3rd" },
          { athlete: "Amelia Roddy", team: "Jurassic Chickens", mark: "", place: "1st" },
          { athlete: "Cora Clark", team: "Imagine Pope Kiwis III", mark: "", place: "2nd" },
          { athlete: "Grayson Chon", team: "Red Dead Cheetahs", mark: "4:17", place: "" },
          { athlete: "Hazel Hill", team: "Jurassic Chickens", mark: "", place: "3rd" },
          { athlete: "Hazel Courtney", team: "Imagine Pope Kiwis III", mark: "4:24", place: "4th" },
          { athlete: "Jin Trenh", team: "Imagine Pope Kiwis III", mark: "", place: "4th" },
          { athlete: "Rowan McGregor", team: "Robert", mark: "", place: "3rd" },
        ],
      },
    ],
  },
};
