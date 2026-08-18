
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
  document.getElementById('fabMain').addEventListener('click', function(){
    fabWrap.classList.toggle('open');
  });

  // toast + harmless CTA reactions
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg){
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
  var procAccordion = document.getElementById('processAccordion');
  if (procAccordion) {
    var procSteps = Array.prototype.slice.call(procAccordion.querySelectorAll('.proc-step'));
    var procActive = procSteps.findIndex(function(s){ return s.classList.contains('is-open'); });
    if (procActive < 0) procActive = 0;
    function procOpen(idx){
      procSteps.forEach(function(s,i){ s.classList.toggle('is-open', i === idx); });
    }
    var procHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    procSteps.forEach(function(step, idx){
      step.addEventListener('click', function(){
        procActive = idx;
        procOpen(procActive);
      });
      step.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); procActive = idx; procOpen(procActive); }
      });
      if (procHoverCapable) {
        step.addEventListener('mouseenter', function(){ procOpen(idx); });
      }
    });
    if (procHoverCapable) {
      procAccordion.addEventListener('mouseleave', function(){ procOpen(procActive); });
    }
  }

  // scroll to consultation form (real navigation, no toast needed)
  document.querySelectorAll('.js-scroll-consult').forEach(function(el){
    el.addEventListener('click', function(e){
      if (el.tagName === 'A') e.preventDefault();
      document.getElementById('consult').scrollIntoView({behavior:'smooth', block:'start'});
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
