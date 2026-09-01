/*
 * AFFILIATE FACULTY — EASY UPDATE FILE
 *
 * To add a person:
 * 1. Copy one member block below.
 * 2. Give it a unique `id`.
 * 3. Use `group: "sfu"` for SFU or `group: "other"` for another university.
 * 4. Replace the simple fields: name, title, unit, school, university, location, and tags.
 * 5. Optional: add prefix, pronouns, credentials, email, phone, profileUrl, profileLabel, and photo.
 *    `photo` can be a full web address or a path relative to this page,
 *    for example: "../assets/people/jane-doe.jpg".
 *
 * Keep the field names unchanged; the page layout updates automatically.
 */

window.DSCL_AFFILIATE_FACULTY = [
  // ===== SFU AFFILIATE FACULTY — START =====
  {
    id: "feyza-g-sahinyazan",
    group: "sfu",
    prefix: "Dr.",
    name: "Feyza G. Sahinyazan",
    pronouns: "she/her",
    credentials: "",
    title: "Associate Professor",
    unit: "Technology & Operations Management · Business & Society",
    school: "Beedie School of Business",
    university: "Simon Fraser University",
    location: "Vancouver, BC, Canada",
    initials: "FS",
    tags: ["Technology & Operations Management", "Business & Society"],
    email: "feyza_sahinyazan@sfu.ca",
    profileUrl: "https://www.sfu.ca/beedie/contact-us/faculty-staff-directory/profile.html?name=FeyzaSahinyazan",
    photo: "../assets/people/feyza-g-sahinyazan.jpg",
    photoAlt: "Dr. Feyza G. Sahinyazan"
  },
  {
    id: "fred-popowich",
    group: "sfu",
    prefix: "Dr.",
    name: "Fred Popowich",
    credentials: "PhD",
    title: "Scientific Director",
    unit: "SFU’s Big Data Hub",
    school: "School of Computing Science",
    university: "Simon Fraser University",
    location: "Burnaby, BC, Canada",
    initials: "FP",
    tags: ["Big Data", "Artificial Intelligence", "Natural Language Processing"],
    email: "popowich@sfu.ca",
    profileUrl: "https://www.sfu.ca/big-data",
    profileLabel: "SFU Big Data Hub →",
    photo: "../assets/people/fred-popowich.png",
    photoAlt: "Dr. Fred Popowich"
  },
  // ===== SFU AFFILIATE FACULTY — END =====

  // ===== OTHER UNIVERSITIES — START =====
  {
    id: "samuel-stephen-roscoe",
    group: "other",
    name: "Samuel Stephen Roscoe",
    credentials: "",
    title: "Assistant Professor of Teaching",
    unit: "Department of Curriculum & Pedagogy",
    school: "Faculty of Education",
    university: "University of British Columbia",
    location: "Vancouver, BC, Canada",
    initials: "SR",
    tags: ["Supply Chain Management", "Business Education"],
    email: "s.roscoe@ubc.ca",
    profileUrl: "https://edcp.educ.ubc.ca/samuel-roscoe/",
    photo: "../assets/people/samuel-stephen-roscoe.jpg",
    photoAlt: "Samuel Stephen Roscoe"
  },
  {
    id: "stuart-milligan",
    group: "other",
    name: "Stuart Milligan",
    credentials: "",
    title: "Associate Teaching Professor",
    unit: "Management, Information and Supply Chain",
    school: "Bob Gaglardi School of Business and Economics",
    university: "Thompson Rivers University",
    location: "Kamloops, BC, Canada",
    initials: "SM",
    tags: ["Supply Chain Management"],
    email: "smilligan@tru.ca",
    profileUrl: "https://www.tru.ca/gaglardi/faculty/management.html",
    photo: "../assets/people/stuart-milligan.jpg",
    photoAlt: "Stuart Milligan"
  }
  // ===== OTHER UNIVERSITIES — END =====
];
