(function () {
  "use strict";

  const posts = [
    {
      slug: "is-pantolonu-secim-rehberi-2026",
      title: "İş Pantolonu Seçim Rehberi 2026",
      summary: "Kumaş, model, gramaj, cep yapısı ve kullanım alanına göre doğru iş pantolonu seçimini adım adım inceleyin.",
      category: "Ürün Rehberleri",
      tags: ["İş Pantolonu", "İş Pantolonu Seçimi", "Gabardin İş Pantolonu", "Kargo İş Pantolonu", "Reflektörlü İş Pantolonu", "Yazlık İş Pantolonu"],
      searchTerms: ["streç iş pantolonu", "ripstop pantolon", "iş pantolonu kumaşı", "iş pantolonu bedeni", "diz cepli pantolon"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafeti-fiyatlari-2026",
      title: "İş Kıyafeti Fiyatları 2026: Fiyatları Neler Belirler?",
      summary: "İş kıyafeti fiyatlarını etkileyen kumaş, gramaj, logo, sipariş adedi ve üretim detaylarını kapsamlı şekilde inceleyin.",
      category: "İş Kıyafeti Rehberi",
      tags: ["İş Kıyafeti Fiyatları", "İş Kıyafeti Fiyatları 2026", "İş Kıyafeti", "Kumaş Gramajı", "Logo Uygulaması", "Toplu Sipariş"],
      searchTerms: ["iş kıyafeti maliyeti", "iş elbisesi fiyatları", "nakış fiyatı", "baskı fiyatı", "iş kıyafeti teklifi"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafeti-kumas-rehberi",
      title: "İş Kıyafeti Kumaş Rehberi (2026)",
      summary: "Örme, dokuma ve teknik kumaş türlerini; mevsime ve sektöre göre doğru kumaş seçimini kapsamlı şekilde inceleyin.",
      category: "Kumaş Bilgileri",
      tags: ["İş Kıyafeti Kumaşları", "Kumaş Rehberi", "Lakost Kumaş", "Gabardin Kumaş", "Softshell", "Polar", "Pamuk Polyester"],
      searchTerms: ["pike", "süprem", "interlok", "ripstop", "Oxford", "polyamid", "viskon", "kumaş gramajı"],
      published: "2026-07-27",
      views: 0
    },
    {
      slug: "is-kiyafeti-terimleri-sozlugu",
      title: "İş Kıyafeti Terimleri Sözlüğü",
      summary: "Kumaş, dikim, baskı, nakış ve iş kıyafeti üretiminde kullanılan 229 terimi A'dan Z'ye açıklayan kapsamlı sözlük.",
      category: "Tekstil Sözlüğü",
      tags: ["İş Kıyafeti Terimleri", "Tekstil Terimleri", "Kumaş", "Dikim", "Nakış", "Baskı", "İş Kıyafeti Üretimi"],
      searchTerms: ["alpaka", "gabardin", "lakost", "penye", "softshell", "reflektör", "pastal", "reçme", "DTF"],
      published: "2026-07-27",
      views: 0
    },
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
      summary: "Doğru ürün seçimi, nakış ve baskı, logo yerleşimi, numune ve üretim aşamalarına yönelik rehber.",
      category: "Ürün Rehberleri",
      tags: ["Logolu İş Kıyafeti", "Kurumsal İş Kıyafeti", "Nakış", "Baskı", "İş Kıyafeti Üretimi"],
      published: "2026-07-24",
      views: 82
    },
    {
      slug: "gabardin-kumas-nedir",
      title: "Gabardin Kumaş Nedir? Özellikleri, Çeşitleri ve Kullanım Alanları",
      summary: "Gabardin kumaşın çeşitlerini, gramajını, esneklik ve dayanıklılık özelliklerini, iş kıyafetlerinde kullanım alanlarını inceleyin.",
      category: "Kumaş Bilgileri",
      tags: ["Gabardin Kumaş", "İş Kıyafeti Kumaşları", "İş Pantolonu", "Pamuklu Gabardin", "Likralı Gabardin", "İş Kıyafeti Üretimi", "Kumaş Seçimi"],
      published: "2026-07-27",
      views: 94
    },
    {
      slug: "reflektorlu-is-kiyafeti-nedir",
      title: "Reflektörlü İş Kıyafeti Nedir? Özellikleri, Standartları ve Kullanım Alanları",
      summary: "Reflektörlü iş kıyafetlerinin çalışma prensibini, EN ISO 20471 sınıflarını, kullanım alanlarını ve doğru ürün seçimini inceleyin.",
      category: "İş Güvenliği",
      tags: ["Reflektörlü İş Kıyafeti", "Yüksek Görünürlüklü İş Kıyafeti", "İş Güvenliği", "Reflektörlü Yelek", "Reflektörlü Mont", "Reflektörlü İş Pantolonu", "EN ISO 20471", "Kişisel Koruyucu Donanım", "Saha İş Kıyafetleri", "Reflektör", "Yüksek Görünürlük", "İkaz Yeleği", "Mühendis Yeleği"],
      published: "2026-07-27",
      views: 78
    },
    {
      slug: "nakis-mi-baski-mi",
      title: "Nakış mı, Baskı mı? İş Kıyafetlerinde Doğru Logo Uygulaması Nasıl Seçilir?",
      summary: "Nakış, DTF, serigrafi ve transfer baskı yöntemlerini; dayanıklılık, görünüm, maliyet ve ürün uyumu açısından karşılaştırın.",
      category: "Sektörel Çözümler",
      tags: ["Nakış mı Baskı mı", "İş Kıyafetinde Nakış", "İş Kıyafetinde Baskı", "Logo Uygulaması", "DTF Baskı", "Serigrafi Baskı", "Kurumsal İş Kıyafeti", "Logolu İş Kıyafeti", "Nakış Baskı Farkı"],
      searchTerms: ["logo baskısı", "nakış kartı", "polo yaka nakış", "polar nakış"],
      published: "2026-07-27",
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
        const searchable = normalize([post.title, post.summary, post.category, ...post.tags, ...(post.searchTerms || [])].join(" "));
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
