
  // mobile nav drawer
  var mobileNav = document.getElementById('mobileNav');
  var burgerBtn = document.getElementById('burgerBtn');
  var closeBtn = document.getElementById('mobileNavClose');
  function openNav(){ mobileNav.classList.add('open'); burgerBtn.setAttribute('aria-expanded','true'); }
  function closeNav(){ mobileNav.classList.remove('open'); burgerBtn.setAttribute('aria-expanded','false'); }
  burgerBtn.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  mobileNav.addEventListener('click', function(e){ if(e.target === mobileNav) closeNav(); });
  document.querySelectorAll('.js-close-nav').forEach(function(a){ a.addEventListener('click', closeNav); });

  // mobile nav accordion (category sub-menus)
  document.querySelectorAll('.mobile-nav-trigger').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.mobile-nav-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.mobile-nav-item.open').forEach(function(i){ i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // FAB
  var fabWrap = document.getElementById('fabWrap');
  var fabMain = document.getElementById('fabMain');
  if (fabMain) {
    fabMain.addEventListener('click', function(){
      fabWrap.classList.toggle('open');
    });
  }

  // toast + harmless CTA reactions
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg){
    if (!toast) return;
    toast.textContent = msg || 'Заявка принята — мы скоро перезвоним';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2800);
  }
  document.querySelectorAll('.js-cta-lead').forEach(function(btn){
    btn.addEventListener('click', function(){
      showToast('Заявка принята — мы скоро перезвоним');
      fabWrap.classList.remove('open');
      document.getElementById('footer-contacts').scrollIntoView({behavior:'smooth', block:'start'});
    });
    if (btn.getAttribute('role') === 'button') {
      btn.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
      });
    }
  });

  // consult form
  document.querySelectorAll('.toggle-row').forEach(function(row){
    row.addEventListener('click', function(e){
      var btn = e.target.closest('.toggle-btn');
      if (!btn) return;
      row.querySelectorAll('.toggle-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  var consultPhone = document.getElementById('consultPhone');
  if (consultPhone) {
    consultPhone.addEventListener('input', function(){
      var digits = consultPhone.value.replace(/\D/g,'');
      if (digits.charAt(0) === '7' || digits.charAt(0) === '8') digits = digits.slice(1);
      digits = digits.slice(0,10);
      var out = '+7';
      if (digits.length > 0) out += ' (' + digits.slice(0,3);
      if (digits.length >= 3) out += ')';
      if (digits.length > 3) out += ' ' + digits.slice(3,6);
      if (digits.length > 6) out += '-' + digits.slice(6,8);
      if (digits.length > 8) out += '-' + digits.slice(8,10);
      consultPhone.value = out;
    });
  }

  var consultForm = document.getElementById('consultForm');
  if (consultForm) {
    consultForm.addEventListener('submit', function(e){
      e.preventDefault();
      var digits = consultPhone.value.replace(/\D/g,'');
      if (digits.length < 11) {
        consultPhone.style.borderColor = '#e2574c';
        consultPhone.focus();
        showToast('Проверьте, пожалуйста, номер телефона');
        return;
      }
      consultPhone.style.borderColor = '';
      showToast('Заявка отправлена — мы скоро свяжемся с вами');
      consultForm.reset();
      document.getElementById('consultMsg').value = '';
    });
  }

  var otzRequestForm = document.getElementById('otzRequestForm');
  if (otzRequestForm) {
    var otzRequestPhone = otzRequestForm.querySelector('input[type="tel"]');
    otzRequestPhone.addEventListener('input', function(){
      var digits = otzRequestPhone.value.replace(/\D/g,'');
      if (digits.charAt(0) === '7' || digits.charAt(0) === '8') digits = digits.slice(1);
      digits = digits.slice(0,10);
      var out = '+7';
      if (digits.length > 0) out += ' (' + digits.slice(0,3);
      if (digits.length >= 3) out += ')';
      if (digits.length > 3) out += ' ' + digits.slice(3,6);
      if (digits.length > 6) out += '-' + digits.slice(6,8);
      if (digits.length > 8) out += '-' + digits.slice(8,10);
      otzRequestPhone.value = out;
    });
    otzRequestForm.addEventListener('submit', function(e){
      e.preventDefault();
      var digits = otzRequestPhone.value.replace(/\D/g,'');
      if (digits.length < 10) {
        otzRequestPhone.style.borderColor = '#e2574c';
        otzRequestPhone.focus();
        showToast('Проверьте, пожалуйста, номер телефона');
        return;
      }
      otzRequestPhone.style.borderColor = '';
      showToast('Заявка отправлена — мы скоро свяжемся с вами');
      otzRequestForm.reset();
    });
  }

  // faq accordion
  var faqList = document.getElementById('faqList');
  if (faqList) {
    var faqItems = Array.prototype.slice.call(faqList.querySelectorAll('.faq-item'));
    faqItems.forEach(function(item){
      var btn = item.querySelector('.faq-question');
      btn.addEventListener('click', function(){
        var willOpen = !item.classList.contains('is-open');
        faqItems.forEach(function(i){
          i.classList.remove('is-open');
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // reviews carousel
  var reviewsTrack = document.getElementById('reviewsTrack');
  var reviewsPrev = document.getElementById('reviewsPrev');
  var reviewsNext = document.getElementById('reviewsNext');
  var reviewsNavWrap = document.querySelector('.reviews-nav');
  function reviewsUpdateNav(){
    var scrollable = reviewsTrack.scrollWidth - reviewsTrack.clientWidth > 4;
    if (reviewsNavWrap) reviewsNavWrap.style.display = scrollable ? 'flex' : 'none';
    if (!scrollable) return;
    var max = reviewsTrack.scrollWidth - reviewsTrack.clientWidth - 2;
    reviewsPrev.disabled = reviewsTrack.scrollLeft <= 2;
    reviewsNext.disabled = reviewsTrack.scrollLeft >= max;
  }
  if (reviewsTrack) {
    reviewsNext.addEventListener('click', function(){ reviewsTrack.scrollBy({left: 320, behavior:'smooth'}); });
    reviewsPrev.addEventListener('click', function(){ reviewsTrack.scrollBy({left: -320, behavior:'smooth'}); });
    reviewsTrack.addEventListener('scroll', reviewsUpdateNav);
    window.addEventListener('resize', reviewsUpdateNav);
    reviewsUpdateNav();
  }

  // reviews modal
  var reviewsModal = document.getElementById('reviewsModal');
  if (reviewsModal) {
    var reviewCards = Array.prototype.slice.call(document.querySelectorAll('.review-card'));
    var reviewData = reviewCards.map(function(card){
      return {
        img: card.querySelector('.review-thumb img').src,
        tag: card.querySelector('.review-tag').textContent,
        quote: card.querySelector('h3').textContent,
        duration: card.querySelector('.review-meta span').textContent
      };
    });
    var reviewModalImg = document.getElementById('reviewModalImg');
    var reviewModalTag = document.getElementById('reviewModalTag');
    var reviewModalQuote = document.getElementById('reviewModalQuote');
    var reviewModalDuration = document.getElementById('reviewModalDuration');
    var reviewIndex = 0;
    var reviewLastFocused = null;

    function reviewShow(idx){
      reviewIndex = (idx + reviewData.length) % reviewData.length;
      var d = reviewData[reviewIndex];
      reviewModalImg.src = d.img;
      reviewModalImg.alt = d.tag;
      reviewModalTag.textContent = d.tag;
      reviewModalQuote.textContent = d.quote;
      reviewModalDuration.textContent = d.duration;
    }
    function reviewOpen(idx){
      reviewLastFocused = document.activeElement;
      reviewShow(idx);
      reviewsModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      reviewsModal.querySelector('.gallery-close').focus();
    }
    function reviewClose(){
      reviewsModal.classList.remove('open');
      document.body.style.overflow = '';
      if (reviewLastFocused) reviewLastFocused.focus();
    }
    document.querySelectorAll('.js-open-reviews').forEach(function(el){
      el.addEventListener('click', function(){
        reviewOpen(parseInt(el.getAttribute('data-review-index'), 10) || 0);
      });
      if (el.getAttribute('role') === 'button') {
        el.addEventListener('keydown', function(e){
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
        });
      }
    });
    reviewsModal.querySelectorAll('[data-review-close]').forEach(function(el){
      el.addEventListener('click', reviewClose);
    });
    document.getElementById('reviewModalPrev').addEventListener('click', function(){ reviewShow(reviewIndex - 1); });
    document.getElementById('reviewModalNext').addEventListener('click', function(){ reviewShow(reviewIndex + 1); });
    document.addEventListener('keydown', function(e){
      if (!reviewsModal.classList.contains('open')) return;
      if (e.key === 'Escape') reviewClose();
      if (e.key === 'ArrowLeft') reviewShow(reviewIndex - 1);
      if (e.key === 'ArrowRight') reviewShow(reviewIndex + 1);
    });
  }

  // clinic gallery modal
  var galleryModal = document.getElementById('galleryModal');
  if (galleryModal) {
    var galleryThumbs = Array.prototype.slice.call(document.querySelectorAll('.gallery-thumb'));
    var galleryPhotos = galleryThumbs.map(function(t){
      var img = t.querySelector('img');
      return {src: img.src, caption: img.alt};
    });
    var galleryMainImg = document.getElementById('galleryMainImg');
    var galleryCaption = document.getElementById('galleryCaption');
    var galleryIndex = 0;
    var galleryLastFocused = null;

    function galleryShow(idx){
      galleryIndex = (idx + galleryPhotos.length) % galleryPhotos.length;
      var photo = galleryPhotos[galleryIndex];
      galleryMainImg.src = photo.src;
      galleryMainImg.alt = photo.caption;
      galleryCaption.textContent = photo.caption;
      galleryThumbs.forEach(function(t,i){ t.classList.toggle('active', i === galleryIndex); });
    }
    function galleryOpen(idx){
      galleryLastFocused = document.activeElement;
      galleryShow(idx);
      galleryModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      galleryModal.querySelector('.gallery-close').focus();
    }
    function galleryClose(){
      galleryModal.classList.remove('open');
      document.body.style.overflow = '';
      if (galleryLastFocused) galleryLastFocused.focus();
    }
    document.querySelectorAll('.js-open-gallery').forEach(function(el){
      el.addEventListener('click', function(){
        galleryOpen(parseInt(el.getAttribute('data-gallery-index'), 10) || 0);
      });
      if (el.getAttribute('role') === 'button') {
        el.addEventListener('keydown', function(e){
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
        });
      }
    });
    galleryModal.querySelectorAll('[data-gallery-close]').forEach(function(el){
      el.addEventListener('click', galleryClose);
    });
    document.getElementById('galleryPrev').addEventListener('click', function(){ galleryShow(galleryIndex - 1); });
    document.getElementById('galleryNext').addEventListener('click', function(){ galleryShow(galleryIndex + 1); });
    galleryThumbs.forEach(function(t){
      t.addEventListener('click', function(){ galleryShow(parseInt(t.getAttribute('data-idx'), 10)); });
    });
    document.addEventListener('keydown', function(e){
      if (!galleryModal.classList.contains('open')) return;
      if (e.key === 'Escape') galleryClose();
      if (e.key === 'ArrowLeft') galleryShow(galleryIndex - 1);
      if (e.key === 'ArrowRight') galleryShow(galleryIndex + 1);
    });
  }

  // process accordion — click persists, hover previews on desktop
  // scroll to consultation form (real navigation, no toast needed)
  document.querySelectorAll('.js-scroll-consult').forEach(function(el){
    el.addEventListener('click', function(e){
      if (el.tagName === 'A') e.preventDefault();
      var target = document.getElementById('consult') || document.getElementById('final-cta');
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
    if (el.getAttribute('role') === 'button') {
      el.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    }
  });

  // scroll reveal
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold:0, rootMargin:'0px 0px 150px 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  // ===== Blog catalog (blog.html only) =====
  var blogGrid = document.getElementById('blogGrid');
  if (blogGrid) {
    var BLOG_ARTICLES = [
      {slug:'otdelenie-reabilitacii', href:'novost-otdelenie-reabilitacii.html', category:'Новости', title:'В клинике «Спасение» открылось новое отделение комплексной реабилитации', excerpt:'Новое отделение позволит пациентам проходить основные этапы восстановления в одном месте под наблюдением специалистов.', date:'2026-08-19', read:4, reviewed:false, img:'clinic-lounge.jpg'},
      {slug:'alkogolnaya-lomka', href:'alkogolnaya-lomka.html', category:'Лечение', title:'Алкогольная ломка: симптомы, причины и способы лечения', excerpt:'Как распознать состояние отмены и когда необходима медицинская помощь.', date:'2026-08-10', read:9, reviewed:true, img:'dir-alcoholism.jpg'},
      {slug:'detoksikaciya-vs-zapoy', href:'detoksikaciya-ot-alkogolya.html', category:'Алкогольная зависимость', title:'Чем детоксикация отличается от вывода из запоя', excerpt:'Объясняем разницу между двумя форматами помощи.', date:'2026-08-08', read:6, reviewed:true, img:'sit-drinking.jpg'},
      {slug:'pered-kodirovaniem', href:'kodirovanie-ot-alkogolizma.html', category:'Лечение', title:'Что важно обсудить перед кодированием', excerpt:'Возможности, ограничения и вопросы врачу.', date:'2026-08-05', read:7, reviewed:true, img:'clinic-office.jpg'},
      {slug:'hronicheskiy-alkogolizm-blog', href:'hronicheskiy-alkogolizm.html', category:'Алкогольная зависимость', title:'Как формируется хронический алкоголизм', excerpt:'Стадии развития зависимости и на что обратить внимание.', date:'2026-08-01', read:8, reviewed:true, img:'doc-1.jpg'},
      {slug:'otkaz-ot-lecheniya', href:'rodstvennikam.html', category:'Помощь родственникам', title:'Что делать, если человек отказывается от лечения', excerpt:'Как говорить без давления, угроз и ультиматумов.', date:'2026-07-28', read:9, reviewed:true, img:'sit-relative.jpg'},
      {slug:'nuzhen-li-stacionar', href:'detoksikaciya-ot-narkotikov.html', category:'Лечение', title:'Как понять, нужен ли стационар', excerpt:'На что врач обращает внимание при выборе формата.', date:'2026-07-25', read:5, reviewed:true, img:'clinic-room.jpg'},
      {slug:'govorit-bez-obvineniy', href:'rodstvennikam.html', category:'Помощь родственникам', title:'Как говорить о зависимости без обвинений', excerpt:'Фразы и подходы, которые сохраняют возможность диалога.', date:'2026-07-22', read:6, reviewed:false, img:'review-relative.jpg'},
      {slug:'odnoy-detoksikacii-nedostatochno', href:'pomoshch-narkozavisimym.html', category:'Лечение', title:'Почему одной детоксикации бывает недостаточно', excerpt:'Как формируется последовательный маршрут помощи.', date:'2026-07-18', read:7, reviewed:true, img:'doc-4.jpg'},
      {slug:'podderzhat-posle-lecheniya', href:'pomoshch-narkozavisimym.html', category:'Реабилитация', title:'Как поддержать близкого после лечения', excerpt:'Триггеры, поддержка и план действий после программы.', date:'2026-07-15', read:8, reviewed:false, img:'clinic-lounge.jpg'},
      {slug:'priznaki-narkozavisimosti', href:'narkomaniya.html', category:'Наркотическая зависимость', title:'Признаки наркотической зависимости на ранней стадии', excerpt:'На что стоит обратить внимание в поведении и состоянии близкого.', date:'2026-07-12', read:7, reviewed:true, img:'dir-addiction.jpg'},
      {slug:'sozavisimost', href:'rodstvennikam.html', category:'Помощь родственникам', title:'Что такое созависимость и как её распознать', excerpt:'Как понять, что забота превратилась в часть проблемы.', date:'2026-07-09', read:6, reviewed:false, img:'doc-3.jpg'},
      {slug:'skolko-dlitsya-reabilitaciya', href:'pomoshch-narkozavisimym.html', category:'Реабилитация', title:'Сколько длится программа реабилитации', excerpt:'От чего зависит длительность и как оценивают прогресс.', date:'2026-07-01', read:5, reviewed:true, img:'clinic-reception.jpg'},
      {slug:'depressiya-i-zavisimost', href:'psihiatriya.html', category:'Психическое здоровье', title:'Депрессия и зависимость: что первично', excerpt:'Как два состояния влияют друг на друга и почему важно лечить оба.', date:'2026-06-15', read:9, reviewed:true, img:'dir-psychiatry.jpg'},
      {slug:'kak-vybrat-centr', href:'o-klinike.html', category:'Реабилитация', title:'Как выбрать реабилитационный центр', excerpt:'На какие критерии обратить внимание при выборе.', date:'2026-06-07', read:8, reviewed:false, img:'clinic-office.jpg'},
      {slug:'vazhnost-anonimnosti', href:'pravila-dlya-pacientov.html', category:'Помощь родственникам', title:'Почему важна анонимность при обращении', excerpt:'Как устроена конфиденциальность на всех этапах помощи.', date:'2026-05-29', read:5, reviewed:false, img:'review-self.jpg'},
      {slug:'gruppovaya-terapiya', href:'pomoshch-narkozavisimym.html', category:'Реабилитация', title:'Групповая терапия: как это работает', excerpt:'Почему общение с людьми со схожим опытом помогает.', date:'2026-05-13', read:6, reviewed:false, img:'clinic-lounge.jpg'},
      {slug:'kogda-ekstrennaya-pomoshch', href:'vyvod-iz-zapoya.html', category:'Психическое здоровье', title:'Когда стоит обратиться за экстренной помощью', excerpt:'Тревожные признаки, при которых нельзя ждать.', date:'2026-05-05', read:4, reviewed:true, img:'dir-psychiatry.jpg'}
    ];

    var PAGE_SIZE = 9;
    var blogState = {category: 'all', query: '', sort: 'new', page: 1};

    var blogCategoriesTrack = document.getElementById('blogCategories');
    var blogResultsCount = document.getElementById('blogResultsCount');
    var blogResetBtn = document.getElementById('blogResetBtn');
    var blogSortSelect = document.getElementById('blogSort');
    var blogNoResults = document.getElementById('blogNoResults');
    var blogLoadMoreWrap = document.getElementById('blogLoadMoreWrap');
    var blogLoadMoreBtn = document.getElementById('blogLoadMoreBtn');
    var blogShownCount = document.getElementById('blogShownCount');
    var blogPagination = document.getElementById('blogPagination');
    var blogPaginationNext = document.getElementById('blogPaginationNext');
    var blogSearchForm = document.getElementById('blogSearchForm');
    var blogSearchInput = document.getElementById('blogSearchInput');
    var blogSearchClear = document.getElementById('blogSearchClear');

    function pluralArticles(n){
      var mod10 = n % 10, mod100 = n % 100;
      if (mod10 === 1 && mod100 !== 11) return 'статью';
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'статьи';
      return 'статей';
    }
    function pluralMaterials(n){
      var mod10 = n % 10, mod100 = n % 100;
      if (mod10 === 1 && mod100 !== 11) return 'материал';
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'материала';
      return 'материалов';
    }

    function pluralMinutes(n){
      var mod10 = n % 10, mod100 = n % 100;
      if (mod10 === 1 && mod100 !== 11) return 'минута';
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'минуты';
      return 'минут';
    }
    function formatDate(iso){
      var months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
      var parts = iso.split('-');
      return parseInt(parts[2], 10) + ' ' + months[parseInt(parts[1], 10) - 1];
    }
    function escapeHtml(s){
      return s.replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
    }

    function getFiltered(){
      var q = blogState.query.trim().toLowerCase();
      var list = BLOG_ARTICLES.filter(function(a){
        var matchCat = blogState.category === 'all' || a.category === blogState.category;
        var matchQ = !q || a.title.toLowerCase().indexOf(q) !== -1 || a.excerpt.toLowerCase().indexOf(q) !== -1;
        return matchCat && matchQ;
      });
      list.sort(function(a, b){
        return blogState.sort === 'new' ? (a.date < b.date ? 1 : -1) : (a.date > b.date ? 1 : -1);
      });
      return list;
    }

    function cardHtml(a){
      var reviewedBadge = '';
      var href = a.href || 'blog.html';
      return '' +
        '<a href="' + href + '" class="article-card">' +
          '<div class="article-thumb"><img src="media/' + a.img + '" alt="' + escapeHtml(a.title) + '" loading="lazy" width="400" height="250"></div>' +
          '<div class="article-body">' +
            '<span class="article-tag">' + escapeHtml(a.category) + '</span>' +
            '<h3>' + escapeHtml(a.title) + '</h3>' +
            '<p class="article-excerpt">' + escapeHtml(a.excerpt) + '</p>' +
            '<div class="article-meta">' +
              '<span>' + formatDate(a.date) + ' · ' + a.read + ' ' + pluralMinutes(a.read) + '</span>' +
              reviewedBadge +
            '</div>' +
            '<span class="article-link">Открыть материал <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M14 7l5 5-5 5"/></svg></span>' +
          '</div>' +
        '</a>';
    }

    function render(opts){
      opts = opts || {};
      var filtered = getFiltered();
      var visibleCount = Math.min(blogState.page * PAGE_SIZE, filtered.length);
      var visible = filtered.slice(0, visibleCount);

      if (opts.append && blogGrid.dataset.rendered === String(filtered.length > 0)) {
        var start = (blogState.page - 1) * PAGE_SIZE;
        var appendHtml = filtered.slice(start, visibleCount).map(cardHtml).join('');
        blogGrid.insertAdjacentHTML('beforeend', appendHtml);
      } else {
        blogGrid.innerHTML = visible.map(cardHtml).join('');
      }
      blogGrid.dataset.rendered = String(filtered.length > 0);

      var total = filtered.length;
      var catLabel = blogState.category === 'all' ? '' : ' в категории «' + blogState.category + '»';
      blogResultsCount.textContent = total === 0 ? 'Ничего не найдено' : ('Найдено ' + total + ' ' + pluralMaterials(total) + catLabel);

      var filtersActive = blogState.category !== 'all' || blogState.query.trim() !== '';
      blogResetBtn.hidden = !filtersActive;

      blogNoResults.hidden = total !== 0;
      blogGrid.hidden = total === 0;

      if (total <= PAGE_SIZE || visibleCount >= total) {
        blogLoadMoreBtn.hidden = true;
      } else {
        blogLoadMoreBtn.hidden = false;
        blogLoadMoreBtn.disabled = false;
        var remaining = Math.min(PAGE_SIZE, total - visibleCount);
        blogLoadMoreBtn.textContent = 'Показать ещё ' + remaining + ' ' + pluralArticles(remaining);
      }
      blogLoadMoreWrap.hidden = total === 0;
      blogShownCount.textContent = 'Показано ' + visibleCount + ' из ' + total;

      var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      blogPagination.hidden = totalPages <= 1;
      blogPagination.querySelectorAll('.pagination-btn').forEach(function(btn){
        var p = parseInt(btn.dataset.page, 10);
        btn.hidden = p > totalPages;
        btn.classList.toggle('active', p === blogState.page);
        if (p === blogState.page) btn.setAttribute('aria-current', 'page'); else btn.removeAttribute('aria-current');
      });
      blogPaginationNext.disabled = blogState.page >= totalPages;

      syncUrl();
    }

    function syncUrl(){
      var params = new URLSearchParams();
      if (blogState.category !== 'all') params.set('category', blogState.category);
      if (blogState.query.trim()) params.set('q', blogState.query.trim());
      if (blogState.page > 1) params.set('page', String(blogState.page));
      var qs = params.toString();
      var url = window.location.pathname + (qs ? '?' + qs : '');
      window.history.replaceState(null, '', url);
    }

    function setCategory(cat){
      blogState.category = cat;
      blogState.page = 1;
      blogCategoriesTrack.querySelectorAll('.blog-chip').forEach(function(chip){
        var active = chip.dataset.category === cat;
        chip.classList.toggle('active', active);
        chip.setAttribute('aria-selected', String(active));
      });
      render();
    }

    blogCategoriesTrack.addEventListener('click', function(e){
      var chip = e.target.closest('.blog-chip');
      if (chip) setCategory(chip.dataset.category);
    });

    blogSearchForm.addEventListener('submit', function(e){
      e.preventDefault();
      blogState.query = blogSearchInput.value;
      blogState.page = 1;
      blogSearchClear.hidden = blogState.query.trim() === '';
      render();
    });
    blogSearchInput.addEventListener('input', function(){
      blogSearchClear.hidden = blogSearchInput.value.trim() === '';
    });
    blogSearchClear.addEventListener('click', function(){
      blogSearchInput.value = '';
      blogSearchClear.hidden = true;
      blogState.query = '';
      blogState.page = 1;
      blogSearchInput.focus();
      render();
    });

    blogSortSelect.addEventListener('change', function(){
      blogState.sort = blogSortSelect.value;
      render();
    });

    blogResetBtn.addEventListener('click', function(){
      blogState.category = 'all';
      blogState.query = '';
      blogState.page = 1;
      blogSearchInput.value = '';
      blogSearchClear.hidden = true;
      blogCategoriesTrack.querySelectorAll('.blog-chip').forEach(function(chip){
        var active = chip.dataset.category === 'all';
        chip.classList.toggle('active', active);
        chip.setAttribute('aria-selected', String(active));
      });
      render();
    });

    blogLoadMoreBtn.addEventListener('click', function(){
      blogLoadMoreBtn.disabled = true;
      blogLoadMoreBtn.textContent = 'Загрузка…';
      window.setTimeout(function(){
        blogState.page += 1;
        render({append: true});
      }, 350);
    });

    blogPagination.addEventListener('click', function(e){
      var btn = e.target.closest('.pagination-btn');
      if (btn && !btn.disabled) {
        blogState.page = parseInt(btn.dataset.page, 10);
        render();
        blogGrid.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
    blogPaginationNext.addEventListener('click', function(){
      var total = getFiltered().length;
      var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      if (blogState.page < totalPages) {
        blogState.page += 1;
        render();
        blogGrid.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });

    // initial state from URL
    (function initFromUrl(){
      var params = new URLSearchParams(window.location.search);
      var cat = params.get('category');
      var q = params.get('q');
      var page = parseInt(params.get('page'), 10);
      if (cat && BLOG_ARTICLES.some(function(a){ return a.category === cat; })) {
        blogState.category = cat;
        blogCategoriesTrack.querySelectorAll('.blog-chip').forEach(function(chip){
          var active = chip.dataset.category === cat;
          chip.classList.toggle('active', active);
          chip.setAttribute('aria-selected', String(active));
        });
      }
      if (q) { blogState.query = q; blogSearchInput.value = q; blogSearchClear.hidden = false; }
      if (page && page > 0) blogState.page = page;
      render();
    })();
  }

  // ===== News article page =====
  var newsContent = document.querySelector('.news-content');
  if (newsContent) {
    // TOC accordion on mobile (tablet/mobile), scroll-spy on all sizes
    var newsTocInner = document.querySelector('.news-toc-inner');
    var newsTocTitle = document.querySelector('.news-toc-title');
    if (newsTocTitle && window.matchMedia('(max-width:1080px)').matches === false) {
      // desktop: no toggle needed, ol always visible via CSS
    }
    if (newsTocTitle) {
      newsTocTitle.setAttribute('role', 'button');
      newsTocTitle.setAttribute('tabindex', '0');
      newsTocTitle.insertAdjacentHTML('beforeend', ' <svg class="news-toc-chev" viewBox="0 0 10 10"><path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      function toggleToc(){
        if (window.matchMedia('(max-width:1080px)').matches) {
          newsTocInner.classList.toggle('open');
        }
      }
      newsTocTitle.addEventListener('click', toggleToc);
      newsTocTitle.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleToc(); }
      });
    }

    // scroll-spy: highlight active TOC link
    var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.news-toc-inner a[href^="#"]'));
    var tocTargets = tocLinks.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    if (tocTargets.length && 'IntersectionObserver' in window) {
      var spyObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            var id = '#' + entry.target.id;
            tocLinks.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === id); });
          }
        });
      }, {rootMargin: '-100px 0px -70% 0px'});
      tocTargets.forEach(function(t){ spyObserver.observe(t); });
    }

    // share buttons
    var pageUrl = window.location.href;
    var pageTitle = document.title;
    document.querySelectorAll('.news-share-btn[data-share]').forEach(function(btn){
      var kind = btn.getAttribute('data-share');
      if (kind === 'telegram') {
        btn.addEventListener('click', function(){
          window.open('https://t.me/share/url?url=' + encodeURIComponent(pageUrl) + '&text=' + encodeURIComponent(pageTitle), '_blank', 'noopener');
        });
      } else if (kind === 'vk') {
        btn.addEventListener('click', function(){
          window.open('https://vk.com/share.php?url=' + encodeURIComponent(pageUrl) + '&title=' + encodeURIComponent(pageTitle), '_blank', 'noopener');
        });
      } else if (kind === 'max') {
        btn.addEventListener('click', function(){
          showToast('Заявка принята — мы скоро перезвоним');
          document.getElementById('footer-contacts').scrollIntoView({behavior:'smooth', block:'start'});
        });
      }
    });

    // copy link buttons
    document.querySelectorAll('#newsCopyLink, [data-share="copy2"]').forEach(function(btn){
      btn.addEventListener('click', function(){
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(pageUrl).then(function(){
            showToast('Ссылка скопирована');
          }).catch(function(){
            showToast('Не удалось скопировать ссылку');
          });
        } else {
          showToast('Не удалось скопировать ссылку');
        }
      });
    });
  }

  // ===== Contacts page =====
  var contactsMap = document.getElementById('contactsMap');
  if (contactsMap) {
    var contactsPins = Array.prototype.slice.call(contactsMap.querySelectorAll('.contacts-pin'));
    var contactsCards = Array.prototype.slice.call(document.querySelectorAll('.contacts-address-card'));

    function selectCenter(id){
      contactsPins.forEach(function(p){ p.classList.toggle('active', p.dataset.center === id); });
      contactsCards.forEach(function(c){ c.classList.toggle('active', c.dataset.center === id); });
    }
    contactsPins.forEach(function(pin){
      pin.addEventListener('click', function(){ selectCenter(pin.dataset.center); });
    });
    contactsCards.forEach(function(card){
      card.addEventListener('click', function(){ selectCenter(card.dataset.center); });
      card.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCenter(card.dataset.center); }
      });
    });

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      contactsCards.forEach(function(card){
        card.addEventListener('mouseenter', function(){
          var pin = contactsPins.filter(function(p){ return p.dataset.center === card.dataset.center; })[0];
          if (pin) pin.classList.add('is-hovered');
        });
        card.addEventListener('mouseleave', function(){
          var pin = contactsPins.filter(function(p){ return p.dataset.center === card.dataset.center; })[0];
          if (pin) pin.classList.remove('is-hovered');
        });
      });
    }

    var mapFilters = Array.prototype.slice.call(document.querySelectorAll('.contacts-map-filter'));
    mapFilters.forEach(function(btn){
      btn.addEventListener('click', function(){
        mapFilters.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.dataset.filter;
        contactsCards.forEach(function(card){
          var show = filter === 'all' || card.dataset.type === filter;
          card.style.display = show ? '' : 'none';
        });
        contactsPins.forEach(function(pin){
          var card = contactsCards.filter(function(c){ return c.dataset.center === pin.dataset.center; })[0];
          var show = filter === 'all' || (card && card.dataset.type === filter);
          pin.classList.toggle('hidden-filter', !show);
        });
      });
    });
  }

  document.querySelectorAll('.js-scroll-contact-top').forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = document.getElementById('contactsPhoneCard');
      if (target) target.scrollIntoView({behavior:'smooth', block:'center'});
    });
  });

  // ===== Price list page =====
  var priceGroups = document.getElementById('priceGroups');
  if (priceGroups) {
    var priceChips = Array.prototype.slice.call(document.querySelectorAll('#priceCategories .blog-chip'));
    var priceCats = Array.prototype.slice.call(priceGroups.querySelectorAll('.price-table'));
    priceChips.forEach(function(chip){
      chip.addEventListener('click', function(){
        priceChips.forEach(function(c){
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');
        var filter = chip.dataset.filter;
        priceCats.forEach(function(cat){
          var show = filter === 'all' || cat.dataset.category === filter;
          cat.classList.toggle('hidden-filter', !show);
        });
      });
    });
  }

  // ===== Interactive quiz "Узнать, нужна ли помощь" =====
  var quizCard = document.getElementById('quizCard');
  if (quizCard) {
    var quizQuestions = Array.prototype.slice.call(quizCard.querySelectorAll('.quiz-q'));
    var totalQ = quizQuestions.length;
    var quizProgressFill = document.getElementById('quizProgressFill');
    var quizProgressLabel = document.getElementById('quizProgressLabel');
    var quizResult = document.getElementById('quizResult');
    var quizResultEmergency = document.getElementById('quizResultEmergency');
    var quizResultNormal = document.getElementById('quizResultNormal');
    var quizResultTitle = document.getElementById('quizResultTitle');
    var quizResultText = document.getElementById('quizResultText');
    var quizResultLink = document.getElementById('quizResultLink');
    var quizBack = document.getElementById('quizBack');
    var quizRestart = document.getElementById('quizRestart');
    var quizQuestionsWrap = document.getElementById('quizQuestions');

    var currentQ = 0;
    var scores = {vyvod: 0, detox: 0, kodirovanie: 0, kompleks: 0};
    var quizHistory = [];

    var RESULTS = {
      vyvod: {title: 'Вывод из запоя', text: 'Учитывая ответы, для первого шага чаще всего рекомендуют стабилизацию состояния — дома или в стационаре.', href: 'vyvod-iz-zapoya.html'},
      detox: {title: 'Детоксикация', text: 'Судя по ответам, сейчас важнее всего медицинское наблюдение и снятие интоксикации.', href: 'detoksikaciya-ot-alkogolya.html'},
      kodirovanie: {title: 'Кодирование', text: 'Похоже, острой стадии сейчас нет, а важнее — закрепить результат и снизить риск срыва.', href: 'kodirovanie-ot-alkogolizma.html'},
      kompleks: {title: 'Комплексное лечение', text: 'Учитывая длительность и повторяемость ситуации, лучше подойдёт долгосрочная программа.', href: 'hronicheskiy-alkogolizm.html'}
    };

    function updateProgress(){
      var idx = quizQuestions.findIndex(function(q){ return q.dataset.q == currentQ; });
      var pct = ((idx + 1) / totalQ) * 100;
      quizProgressFill.style.width = pct + '%';
      quizProgressLabel.textContent = 'Вопрос ' + (idx + 1) + ' из ' + totalQ;
    }

    function showQuestion(qIndex){
      quizQuestions.forEach(function(q){ q.hidden = (q.dataset.q != qIndex); });
      currentQ = qIndex;
      updateProgress();
      quizBack.hidden = quizHistory.length === 0;
    }

    function parseScore(str){
      var out = {};
      if (!str) return out;
      str.split(',').forEach(function(pair){
        var parts = pair.split(':');
        if (parts.length === 2) out[parts[0]] = parseInt(parts[1], 10);
      });
      return out;
    }

    function computeResult(){
      var best = 'vyvod', bestScore = -1;
      Object.keys(scores).forEach(function(key){
        if (scores[key] > bestScore) { bestScore = scores[key]; best = key; }
      });
      var r = RESULTS[best];
      quizResultTitle.textContent = r.title;
      quizResultText.textContent = r.text;
      quizResultLink.href = r.href;
      quizQuestionsWrap.hidden = true;
      quizBack.hidden = true;
      quizResult.hidden = false;
      quizResultNormal.hidden = false;
      quizResultEmergency.hidden = true;
      quizCard.querySelector('.quiz-progress').hidden = true;
    }

    function showEmergency(){
      quizQuestionsWrap.hidden = true;
      quizBack.hidden = true;
      quizResult.hidden = false;
      quizResultEmergency.hidden = false;
      quizResultNormal.hidden = true;
      quizCard.querySelector('.quiz-progress').hidden = true;
    }

    quizQuestions.forEach(function(q){
      var options = q.querySelectorAll('.quiz-option');
      options.forEach(function(btn){
        btn.addEventListener('click', function(){
          options.forEach(function(b){ b.classList.remove('selected'); });
          btn.classList.add('selected');

          if (q.dataset.safety === 'true') {
            if (btn.dataset.value === 'emergency') {
              showEmergency();
              return;
            }
          } else {
            var sc = parseScore(btn.dataset.score);
            Object.keys(sc).forEach(function(k){ scores[k] = (scores[k] || 0) + sc[k]; });
          }

          quizHistory.push(currentQ);
          var idx = quizQuestions.findIndex(function(qq){ return qq.dataset.q == currentQ; });
          if (idx + 1 < quizQuestions.length) {
            window.setTimeout(function(){
              showQuestion(quizQuestions[idx + 1].dataset.q);
            }, 200);
          } else {
            window.setTimeout(computeResult, 200);
          }
        });
      });
    });

    quizBack.addEventListener('click', function(){
      if (quizHistory.length === 0) return;
      var prevQ = quizHistory.pop();
      showQuestion(prevQ);
    });

    quizRestart.addEventListener('click', function(){
      scores = {vyvod: 0, detox: 0, kodirovanie: 0, kompleks: 0};
      quizHistory = [];
      quizQuestions.forEach(function(q){
        q.querySelectorAll('.quiz-option').forEach(function(b){ b.classList.remove('selected'); });
      });
      quizResult.hidden = true;
      quizQuestionsWrap.hidden = false;
      quizCard.querySelector('.quiz-progress').hidden = false;
      showQuestion('0');
    });

    updateProgress();
  }

  // ===== Отзывы (архив) — фильтр по категориям + пагинация =====
  var reviewsGrid = document.getElementById('reviewsGrid');
  if (reviewsGrid) {
    var reviewsChips = Array.prototype.slice.call(document.querySelectorAll('#reviewsCategories .blog-chip'));
    var reviewsCards = Array.prototype.slice.call(reviewsGrid.querySelectorAll('.review-card'));
    var reviewsCountEl = document.getElementById('reviewsCount');
    var reviewsEmptyEl = document.getElementById('reviewsEmpty');
    var otzLoadMoreBtn = document.getElementById('otzLoadMore');
    var PAGE_SIZE = 9;
    var shownCount = PAGE_SIZE;

    function declineOtzyv(n){
      var n10 = n % 10, n100 = n % 100;
      if (n10 === 1 && n100 !== 11) return 'отзыв';
      if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return 'отзыва';
      return 'отзывов';
    }

    function currentFilter(){
      var active = reviewsChips.filter(function(c){ return c.classList.contains('active'); })[0];
      return active ? active.dataset.filter : 'all';
    }

    function applyVisibility(){
      var filter = currentFilter();
      var matched = 0;
      reviewsCards.forEach(function(card){
        var isMatch = filter === 'all' || card.dataset.category === filter;
        if (isMatch) {
          matched++;
          card.classList.remove('hidden-filter');
          card.classList.toggle('hidden-pagination', matched > shownCount);
        } else {
          card.classList.add('hidden-filter');
          card.classList.remove('hidden-pagination');
        }
      });
      if (reviewsCountEl) reviewsCountEl.textContent = 'Найдено: ' + matched;
      if (reviewsEmptyEl) reviewsEmptyEl.hidden = matched !== 0;
      if (otzLoadMoreBtn) otzLoadMoreBtn.hidden = matched <= shownCount;
    }

    reviewsChips.forEach(function(chip){
      chip.addEventListener('click', function(){
        reviewsChips.forEach(function(c){
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');
        shownCount = PAGE_SIZE;
        applyVisibility();
      });
    });

    if (otzLoadMoreBtn) {
      otzLoadMoreBtn.addEventListener('click', function(){
        shownCount += PAGE_SIZE;
        applyVisibility();
      });
    }

    applyVisibility();
  }

  // ===== Специалисты — фильтр по категориям =====
  var vrGrid = document.getElementById('vrGrid');
  if (vrGrid) {
    var vrChips = Array.prototype.slice.call(document.querySelectorAll('#vrCategories .blog-chip'));
    var vrCards = Array.prototype.slice.call(vrGrid.querySelectorAll('.vr-card'));
    var vrCountEl = document.getElementById('vrCount');
    var vrEmptyEl = document.getElementById('vrEmpty');

    vrChips.forEach(function(chip){
      chip.addEventListener('click', function(){
        vrChips.forEach(function(c){
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');
        var filter = chip.dataset.filter;
        var visibleCount = 0;
        vrCards.forEach(function(card){
          var show = filter === 'all' || card.dataset.filter === filter;
          card.classList.toggle('vr-hide', !show);
          if (show) visibleCount++;
        });
        if (vrCountEl) vrCountEl.textContent = 'Найдено: ' + visibleCount;
        if (vrEmptyEl) vrEmptyEl.hidden = visibleCount !== 0;
      });
    });
  }

  // ===== Лицензии — увеличение документа по клику =====
  var licModal = document.getElementById('licModal');
  if (licModal) {
    var licModalPage = document.getElementById('licModalPage');
    document.querySelectorAll('.js-open-lic').forEach(function(card){
      card.addEventListener('click', function(){
        var page = card.querySelector('.lic-doc-page');
        licModalPage.innerHTML = page ? page.outerHTML : '';
        licModal.classList.add('open');
      });
    });
    licModal.querySelectorAll('[data-lic-close]').forEach(function(el){
      el.addEventListener('click', function(){ licModal.classList.remove('open'); });
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && licModal.classList.contains('open')) licModal.classList.remove('open');
    });
  }

  // ===== Реквизиты — копирование значения строки =====
  document.querySelectorAll('.js-rek-copy').forEach(function(btn){
    btn.addEventListener('click', function(){
      var row = btn.closest('.rek-row');
      var valueEl = row ? row.querySelector('.rek-row-value') : null;
      var text = valueEl ? valueEl.textContent.trim() : '';
      if (!text) return;
      var restoreLabel = btn.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function(){
          btn.textContent = 'Скопировано';
          btn.classList.add('copied');
          setTimeout(function(){ btn.textContent = restoreLabel; btn.classList.remove('copied'); }, 1800);
        }).catch(function(){
          showToast('Не удалось скопировать');
        });
      } else {
        showToast('Не удалось скопировать');
      }
    });
  });

  // ===== Родственникам — переключение табов статей =====
  var relTopicsGrid = document.getElementById('relTopics');
  if (relTopicsGrid) {
    var relTopicCards = Array.prototype.slice.call(relTopicsGrid.querySelectorAll('.rel-topic-card'));

    function activateRelTab(target, scroll){
      relTopicCards.forEach(function(c){
        var isActive = c.dataset.tab === target;
        c.classList.toggle('active', isActive);
        c.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      document.querySelectorAll('.rel-tab-panel').forEach(function(panel){
        panel.classList.toggle('active', panel.id === target);
      });
      if (scroll) {
        var panel = document.getElementById(target);
        if (panel) panel.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }

    relTopicCards.forEach(function(card){
      card.addEventListener('click', function(){
        activateRelTab(card.dataset.tab, false);
      });
    });

    document.querySelectorAll('.js-rel-next').forEach(function(btn){
      btn.addEventListener('click', function(){
        activateRelTab(btn.dataset.next, true);
      });
    });
  }

/* ===== Этапы помощи — переключение активного этапа ===== */
(function(){
  var stagesWrap = document.getElementById('svcStages');
  if (!stagesWrap) return;
  var stages = Array.prototype.slice.call(stagesWrap.querySelectorAll('.svc-stage'));
  stages.forEach(function(stage){
    var head = stage.querySelector('.svc-stage-head');
    if (!head) return;
    head.setAttribute('aria-expanded', stage.classList.contains('is-active') ? 'true' : 'false');
    head.addEventListener('click', function(){
      if (stage.classList.contains('is-active')) return;
      stages.forEach(function(s){
        s.classList.remove('is-active');
        var h = s.querySelector('.svc-stage-head');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
      stage.classList.add('is-active');
      head.setAttribute('aria-expanded', 'true');
    });
  });
})();
