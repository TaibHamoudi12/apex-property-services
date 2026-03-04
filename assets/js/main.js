
(function(){
  const header = document.getElementById('apsHeader');
  const burger = document.getElementById('apsBurger');
  const mobile = document.getElementById('apsMobile');
  const yearNodes = document.querySelectorAll('[data-year]');
  yearNodes.forEach(node => node.textContent = new Date().getFullYear());

  function onScroll(){
    if(!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  if(burger && mobile){
    burger.addEventListener('click', function(){
      const open = mobile.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-compare]').forEach(function(card){
    const range = card.querySelector('.aps-compare__range');
    const before = card.querySelector('.aps-compare__before');
    const handle = card.querySelector('.aps-compare__handle');
    if(!range || !before || !handle) return;
    const setValue = function(v){
      const value = Math.max(0, Math.min(100, Number(v)));
      before.style.clipPath = 'inset(0 ' + (100 - value) + '% 0 0)';
      handle.style.left = value + '%';
    };
    range.addEventListener('input', function(e){ setValue(e.target.value); });
    setValue(range.value || 50);
  });

  const form = document.getElementById('apsQuoteForm');
  const msg = document.getElementById('apsFormMsg');
  if(form && msg){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      msg.textContent = document.documentElement.lang === 'fr'
        ? "Merci. Votre demande a bien été préparée. Nous reviendrons vers vous rapidement."
        : "Thank you. Your request has been prepared and we will get back to you shortly.";
      form.reset();
    });
  }
})();


  document.querySelectorAll('.aps-accordion').forEach(function(item){
    const trigger = item.querySelector('.aps-accordion__trigger');
    const content = item.querySelector('.aps-accordion__content');
    if(!trigger || !content) return;
    trigger.addEventListener('click', function(){
      const open = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
      item.classList.toggle('is-open', !open);
      const icon = trigger.querySelector('.aps-accordion__icon');
      if(icon) icon.textContent = open ? '+' : '−';
    });
  });
