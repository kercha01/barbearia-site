(() => {
  const slides = Array.from(document.querySelectorAll('.hero .slide'));
  const track = document.querySelector('.carousel-track');
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  const yearEl = document.getElementById('year');
  const menuToggle = document.querySelector('.menu-toggle');
  const topbar = document.querySelector('.topbar');
  const navLinks = Array.from(document.querySelectorAll('.nav a'));
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  let current = 0;

  const setSlide = (index) => {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    dots[current].classList.add('active');
    track.style.transform = `translateX(-${current * 100}%)`;
  };

  const nextSlide = () => setSlide(current + 1);
  let autoPlay = setInterval(nextSlide, 7000);

  const resetAutoPlay = () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, 7000);
  };

  const closeNav = () => topbar.classList.remove('open');

  prevBtn.addEventListener('click', () => {
    setSlide(current - 1);
    resetAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    setSlide(current + 1);
    resetAutoPlay();
  });

  dots.forEach((dot, idx) => dot.addEventListener('click', () => {
    setSlide(idx);
    resetAutoPlay();
  }));

  if (menuToggle && topbar) {
    const setExpanded = (expanded) => {
      menuToggle.setAttribute('aria-expanded', String(expanded));
      topbar.classList.toggle('open', expanded);
    };

    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
      closeNav();
      setExpanded(false);
    }));
  }

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (window.IntersectionObserver && reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('active'));
  }
})();
