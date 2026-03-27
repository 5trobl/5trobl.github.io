(() => {
  const content = document.querySelector(".content");
  if (!content) {
    return;
  }

  const normalizeText = (text) =>
    text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

  // Remove legacy spacer nodes that only contain non-breaking spaces.
  for (const node of [...content.querySelectorAll("h2, h3, p")]) {
    const hasMedia = node.querySelector("img, video, iframe, table, a");
    if (!hasMedia && normalizeText(node.textContent) === "") {
      node.remove();
    }
  }

  const headingNodes = [...content.querySelectorAll("h2")].filter(
    (h2) => normalizeText(h2.textContent) !== "",
  );
  const usedIds = new Set();
  const quickNavTitle = (raw) =>
    raw.replace(/\s*\(google scholar profile\)\s*/i, "").trim();

  const makeId = (raw) => {
    const base = raw
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    let candidate = base || "section";
    let index = 2;

    while (usedIds.has(candidate)) {
      candidate = `${base || "section"}-${index}`;
      index += 1;
    }

    usedIds.add(candidate);
    return candidate;
  };

  for (const heading of headingNodes) {
    const headingText = normalizeText(heading.textContent);

    if (!heading.id) {
      heading.id = makeId(headingText);
    }

    if (/^research interests$/i.test(headingText)) {
      const list = heading.nextElementSibling;
      if (list && list.tagName === "UL") {
        list.classList.add("research-interests-list");
      }
    }
  }

  if (headingNodes.length > 1) {
    const quickLinks = document.createElement("nav");
    quickLinks.className = "quick-links";
    quickLinks.setAttribute("aria-label", "Section links");

    const label = document.createElement("span");
    label.className = "quick-links-label";
    label.textContent = "Quick Navigation";
    quickLinks.appendChild(label);

    const list = document.createElement("ul");
    list.className = "quick-links-list";

    for (const heading of headingNodes) {
      const item = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = `#${heading.id}`;
      anchor.textContent = quickNavTitle(normalizeText(heading.textContent));
      item.appendChild(anchor);
      list.appendChild(item);
    }

    quickLinks.appendChild(list);
    content.insertBefore(quickLinks, headingNodes[0]);
  }

  const topLevelBlocks = [...content.children];
  topLevelBlocks.forEach((el, index) => {
    el.style.setProperty("--delay", `${Math.min(index * 28, 880)}ms`);
  });

  document.body.classList.add("js-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  for (const block of topLevelBlocks) {
    observer.observe(block);
  }
})();
