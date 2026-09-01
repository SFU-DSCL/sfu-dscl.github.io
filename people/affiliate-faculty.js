(() => {
  const members = Array.isArray(window.DSCL_AFFILIATE_FACULTY)
    ? window.DSCL_AFFILIATE_FACULTY
    : [];

  const sfuGrid = document.getElementById("sfu-faculty-grid");
  const otherGrid = document.getElementById("other-faculty-grid");
  const searchInput = document.getElementById("faculty-search");
  const universityFilter = document.getElementById("university-filter");
  const resultsSummary = document.getElementById("faculty-results-summary");
  const emptyState = document.getElementById("faculty-empty");
  const groupSections = {
    sfu: document.querySelector('[data-faculty-group="sfu"]'),
    other: document.querySelector('[data-faculty-group="other"]')
  };

  function textElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function fallbackInitials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  function createMemberCard(member) {
    const card = document.createElement("article");
    card.className = "faculty-card";
    card.dataset.memberId = member.id;

    const top = document.createElement("div");
    top.className = "faculty-card-top";

    const avatar = document.createElement("div");
    avatar.className = "faculty-avatar";
    const showInitials = () => {
      avatar.replaceChildren();
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = member.initials || fallbackInitials(member.name);
    };

    if (member.photo) {
      const photo = document.createElement("img");
      photo.src = member.photo;
      photo.alt = member.photoAlt || `Portrait of ${member.name}`;
      photo.loading = "lazy";
      photo.width = 82;
      photo.height = 82;
      photo.referrerPolicy = "no-referrer";
      photo.addEventListener("error", showInitials, { once: true });
      avatar.append(photo);
    } else {
      showInitials();
    }

    const identity = document.createElement("div");
    const nameWithPrefix = [member.prefix, member.name].filter(Boolean).join(" ");
    const displayName = member.credentials
      ? `${nameWithPrefix}, ${member.credentials}`
      : nameWithPrefix;
    const nameHeading = textElement("h3", "", displayName);
    if (member.pronouns) {
      nameHeading.append(
        textElement("span", "faculty-pronouns", ` (${member.pronouns})`)
      );
    }
    identity.append(
      textElement("p", "faculty-university", member.university),
      nameHeading
    );
    top.append(avatar, identity);
    card.append(top);

    if (member.title) card.append(textElement("p", "faculty-title", member.title));
    if (member.unit) card.append(textElement("p", "faculty-unit", member.unit));
    if (member.school) card.append(textElement("p", "faculty-school", member.school));
    if (member.location) card.append(textElement("p", "faculty-location", member.location));

    if (Array.isArray(member.tags) && member.tags.length) {
      const tagList = document.createElement("ul");
      tagList.className = "faculty-tags";
      tagList.setAttribute("aria-label", "Research areas");
      member.tags.forEach((tag) => tagList.append(textElement("li", "", tag)));
      card.append(tagList);
    }

    if (member.profileUrl || member.email || member.phone) {
      const cardLinks = document.createElement("div");
      cardLinks.className = "faculty-card-links";

      if (member.profileUrl) {
        const profileLink = textElement(
          "a",
          "faculty-profile-link",
          member.profileLabel || "Faculty profile →"
        );
        profileLink.href = member.profileUrl;
        cardLinks.append(profileLink);
      }

      if (member.email) {
        const emailLink = textElement("a", "faculty-profile-link", "Email →");
        emailLink.href = `mailto:${member.email}`;
        emailLink.setAttribute("aria-label", `Email ${member.name}`);
        cardLinks.append(emailLink);
      }

      if (member.phone) {
        const phoneLink = textElement("a", "faculty-profile-link", member.phone);
        phoneLink.href = `tel:${member.phone.replace(/[^+\d]/g, "")}`;
        phoneLink.setAttribute("aria-label", `Call ${member.name}`);
        cardLinks.append(phoneLink);
      }

      card.append(cardLinks);
    }

    return card;
  }

  function populateUniversityFilter() {
    const universities = [...new Set(members.map((member) => member.university))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    universities.forEach((university) => {
      const option = document.createElement("option");
      option.value = university;
      option.textContent = university;
      universityFilter.append(option);
    });
  }

  function updateStats() {
    const sfuCount = members.filter((member) => member.group === "sfu").length;
    const partnerCount = new Set(
      members.filter((member) => member.group === "other").map((member) => member.university)
    ).size;

    document.getElementById("sfu-stat").textContent = sfuCount;
    document.getElementById("partner-stat").textContent = partnerCount;
    document.getElementById("total-stat").textContent = members.length;
  }

  function render() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const selectedUniversity = universityFilter.value;
    const visibleMembers = members.filter((member) => {
      const searchableText = [
        member.prefix,
        member.name,
        member.pronouns,
        member.credentials,
        member.title,
        member.unit,
        member.school,
        member.university,
        member.location,
        member.email,
        member.phone,
        ...(member.tags || [])
      ].join(" ").toLocaleLowerCase();
      const matchesSearch = !query || searchableText.includes(query);
      const matchesUniversity = !selectedUniversity || member.university === selectedUniversity;
      return matchesSearch && matchesUniversity;
    });

    sfuGrid.replaceChildren();
    otherGrid.replaceChildren();

    visibleMembers.forEach((member) => {
      const target = member.group === "sfu" ? sfuGrid : otherGrid;
      target.append(createMemberCard(member));
    });

    const sfuVisible = visibleMembers.filter((member) => member.group === "sfu").length;
    const otherVisible = visibleMembers.length - sfuVisible;
    groupSections.sfu.hidden = sfuVisible === 0;
    groupSections.other.hidden = otherVisible === 0;
    document.getElementById("sfu-count").textContent = `${sfuVisible} ${sfuVisible === 1 ? "member" : "members"}`;
    document.getElementById("other-count").textContent = `${otherVisible} ${otherVisible === 1 ? "member" : "members"}`;

    resultsSummary.textContent = `Showing ${visibleMembers.length} of ${members.length} affiliate faculty`;
    emptyState.hidden = visibleMembers.length !== 0;
  }

  populateUniversityFilter();
  updateStats();
  render();
  searchInput.addEventListener("input", render);
  universityFilter.addEventListener("change", render);
})();
