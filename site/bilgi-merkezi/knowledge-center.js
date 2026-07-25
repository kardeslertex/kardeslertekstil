(function () {
  "use strict";

  const posts = [
    {
      slug: "is-kiyafeti-secerken-nelere-dikkat-edilmeli",
      title: "İş Kıyafeti Seçerken Nelere Dikkat Edilmeli?",
      summary: "Kumaş, model, beden, mevsim, logo uygulaması ve kullanım alanına göre doğru iş kıyafeti seçimi.",
      category: "İş Kıyafeti Rehberi",
      tags: ["İş Kıyafeti", "Kurumsal İş Kıyafeti", "Kumaş Seçimi", "Logolu İş Kıyafeti", "İş Güvenliği"],
      published: "2026-07-25",
      views: 100
    },
    {
      slug: "logolu-is-kiyafeti-uretimi",
      title: "Logolu İş Kıyafeti Üretimi",
      summary: "Kurumsal kimliğe uygun logolu kıyafet planlamasının temel aşamaları.",
      category: "Ürün Rehberleri",
      tags: ["İş Kıyafeti", "Nakış", "Baskı", "Polo Yaka"],
      published: "2026-07-24",
      views: 82
    },
    {
      slug: "gabardin-kumas-nedir",
      title: "Gabardin Kumaş Nedir?",
      summary: "Gabardin kumaşın yapısı, kullanım alanları ve iş kıyafetlerindeki yeri.",
      category: "Kumaş Bilgileri",
      tags: ["Kumaş", "Gabardin", "İş Kıyafeti"],
      published: "2026-07-23",
      views: 94
    },
    {
      slug: "reflektorlu-is-kiyafeti-nedir",
      title: "Reflektörlü İş Kıyafeti Nedir?",
      summary: "Görünürlüğü destekleyen reflektörlü ürünlerin temel özellikleri ve kullanım alanları.",
      category: "İş Güvenliği",
      tags: ["İş Güvenliği", "Reflektör", "İş Kıyafeti"],
      published: "2026-07-22",
      views: 78
    },
    {
      slug: "nakis-mi-baski-mi",
      title: "Nakış mı, Baskı mı?",
      summary: "Farklı kullanım koşullarında logo uygulaması seçimine yönelik kısa bir başlangıç rehberi.",
      category: "Sektörel Çözümler",
      tags: ["Nakış", "Baskı", "İş Kıyafeti", "Polo Yaka"],
      published: "2026-07-21",
      views: 88
    },
    {
      slug: "is-kiyafeti-uretim-sureci",
      title: "İş Kıyafeti Üretim Süreci",
      summary: "İhtiyaç analizinden teslimata uzanan kurumsal iş kıyafeti üretim adımları.",
      category: "Üretim Rehberi",
      tags: ["İş Kıyafeti", "Kumaş", "Nakış", "Baskı"],
      published: "2026-07-20",
      views: 70
    }
  ];

  const normalize = (value) => value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const postUrl = (post, onIndex) => onIndex ? `${post.slug}/` : `../${post.slug}/`;
  const tagUrl = (tag, onIndex) => onIndex ? `?tag=${encodeURIComponent(tag)}` : `../?tag=${encodeURIComponent(tag)}`;

  function tagList(post, onIndex) {
    const list = document.createElement("div");
    list.className = "knowledge-tags";
    list.setAttribute("aria-label", "Etiketler");
    post.tags.forEach((tag) => {
      const link = document.createElement("a");
      link.href = tagUrl(tag, onIndex);
      link.textContent = tag;
      link.dataset.tag = tag;
      list.appendChild(link);
    });
    return list;
  }

  function renderRankedList(target, source, label, onIndex) {
    target.replaceChildren();
    source.slice(0, 3).forEach((post, index) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = postUrl(post, onIndex);
      const marker = document.createElement("span");
      marker.textContent = label === "Yeni" ? label : String(index + 1).padStart(2, "0");
      const title = document.createElement("strong");
      title.textContent = post.title;
      link.append(marker, title);
      item.appendChild(link);
      target.appendChild(item);
    });
  }

  function initIndex() {
    const cards = Array.from(document.querySelectorAll(".knowledge-card[data-post-slug]"));
    const search = document.querySelector("#knowledge-search");
    const status = document.querySelector("#knowledge-search-status");
    const clear = document.querySelector("#knowledge-filter-clear");
    const tagHeading = document.querySelector("#knowledge-active-filter");
    let activeTag = new URLSearchParams(window.location.search).get("tag") || "";

    document.querySelectorAll("[data-category-count]").forEach((counter) => {
      const category = counter.dataset.categoryCount;
      const count = posts.filter((post) => post.category === category).length;
      counter.textContent = `${count} yazı`;
    });

    renderRankedList(
      document.querySelector("#popular-posts"),
      [...posts].sort((a, b) => b.views - a.views),
      "Sıra",
      true
    );
    renderRankedList(
      document.querySelector("#latest-posts"),
      [...posts].sort((a, b) => b.published.localeCompare(a.published)),
      "Yeni",
      true
    );

    cards.forEach((card) => {
      const post = posts.find((item) => item.slug === card.dataset.postSlug);
      if (post) card.insertBefore(tagList(post, true), card.querySelector(".read-more"));
    });

    function filterPosts() {
      const term = normalize(search.value.trim());
      let visibleCount = 0;
      cards.forEach((card) => {
        const post = posts.find((item) => item.slug === card.dataset.postSlug);
        const searchable = normalize([post.title, post.summary, post.category, ...post.tags].join(" "));
        const visible = (!term || searchable.includes(term)) && (!activeTag || post.tags.includes(activeTag));
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      document.querySelectorAll(".knowledge-category[data-category]").forEach((section) => {
        section.hidden = !section.querySelector(".knowledge-card:not([hidden])");
      });
      status.textContent = `${visibleCount} yazı gösteriliyor`;
      tagHeading.textContent = activeTag ? `Etiket: ${activeTag}` : "";
      clear.hidden = !activeTag && !term;
    }

    search.addEventListener("input", filterPosts);
    document.querySelector(".knowledge-index").addEventListener("click", (event) => {
      const tag = event.target.closest("[data-tag]");
      if (!tag) return;
      event.preventDefault();
      activeTag = tag.dataset.tag;
      window.history.replaceState({}, "", `?tag=${encodeURIComponent(activeTag)}`);
      filterPosts();
    });
    clear.addEventListener("click", () => {
      activeTag = "";
      search.value = "";
      window.history.replaceState({}, "", window.location.pathname);
      filterPosts();
    });
    filterPosts();
  }

  function initArticle(slug) {
    const current = posts.find((post) => post.slug === slug);
    const article = document.querySelector(".knowledge-article-main");
    if (!current || !article) return;

    const anchor = article.querySelector(".knowledge-article-meta") || article.querySelector(".intro");
    anchor.insertAdjacentElement("afterend", tagList(current, false));

    const similar = posts
      .filter((post) => post.slug !== current.slug)
      .map((post) => ({
        post,
        categoryMatch: post.category === current.category ? 1 : 0,
        sharedTags: post.tags.filter((tag) => current.tags.includes(tag)).length
      }))
      .filter((item) => item.categoryMatch || item.sharedTags)
      .sort((a, b) => b.categoryMatch - a.categoryMatch || b.sharedTags - a.sharedTags || b.post.published.localeCompare(a.post.published))
      .slice(0, 3);

    const section = document.createElement("section");
    section.className = "knowledge-related";
    const heading = document.createElement("h2");
    heading.textContent = "Benzer Yazılar";
    const grid = document.createElement("div");
    grid.className = "knowledge-related-grid";
    similar.forEach(({ post }) => {
      const link = document.createElement("a");
      link.href = postUrl(post, false);
      const category = document.createElement("span");
      category.textContent = post.category;
      const title = document.createElement("strong");
      title.textContent = post.title;
      link.append(category, title);
      grid.appendChild(link);
    });
    section.append(heading, grid);
    const navigation = article.querySelector(".knowledge-post-nav");
    article.insertBefore(section, navigation);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const index = document.querySelector("[data-knowledge-index]");
    if (index) initIndex();
    const article = document.body.dataset.postSlug;
    if (article) initArticle(article);
  });
})();
