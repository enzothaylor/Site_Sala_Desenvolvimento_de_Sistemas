document.querySelectorAll('.slideshow-container').forEach((container, idx) => {
  const slides = Array.from(container.querySelectorAll('.slides'));
  const prev = container.querySelector('.prev');
  const next = container.querySelector('.next');
  const dotsWrap = container.querySelector('.dots');
  if (!dotsWrap) return;

  let current = 0;

  slides.forEach((s, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.className = 'dot';
    d.setAttribute('aria-label', 'Ir para imagem ' + (i + 1));
    d.addEventListener('click', () => show(i));
    dotsWrap.appendChild(d);
  });

  const dots = Array.from(dotsWrap.children);

  function show(n){
    if (n < 0) n = slides.length - 1;
    if (n >= slides.length) n = 0;
    slides.forEach(s => s.style.display = 'none');
    dots.forEach(d => d.classList.remove('active'));
    slides[n].style.display = 'block';
    dots[n].classList.add('active');
    current = n;
  }

  if(slides.length === 0){
    container.innerHTML = '<p class="note">Sem imagens disponíveis.</p>';
    return;
  }

  show(0);

  if (prev) prev.addEventListener('click', () => show(current - 1));
  if (next) next.addEventListener('click', () => show(current + 1));

  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { show(current - 1); }
    if (e.key === 'ArrowRight') { show(current + 1); }
  });

  if (container.hasAttribute('data-autoplay')){
    let playing = true;
    let interval = setInterval(() => { if(playing) show(current + 1); }, 4500);
    container.addEventListener('mouseenter', () => playing = false);
    container.addEventListener('mouseleave', () => playing = true);
  }
});
