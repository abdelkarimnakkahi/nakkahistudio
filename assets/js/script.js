let lastTopScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function () {
  const topScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (topScroll > lastTopScroll) {
    navbar.style.top = '-5rem'
  } else {
    navbar.style.top = '0';
    navbar.style.background = '#070e27';
    navbar.style.boxShadow = '0 5px 15px -5px #070e27';
  }
  lastTopScroll = topScroll;
});


const menu = document.querySelector('.menu');
const ul = document.querySelector('nav ul');

menu.addEventListener('click', function (e) {
  ul.classList.toggle("active");
});

const link = document.querySelectorAll('nav ul a');
console.log(link);
for (let i = 0; i < link.length; i++) {
  link[i].addEventListener('click', function () {
    ul.classList.toggle("active");
  });
}

// FadeIn Animation

const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".card");

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px"
};

const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});

// Scroll Animation

const sr = ScrollReveal({
  distance: '1rem',
  duration: 1800,
  reset: false
});

sr.reveal('.card', {
  origin: 'top',
  interval: 200
});

sr.reveal('.message', {
  origin: 'left',
  interval: 200
});

sr.reveal('.message-info', {
  origin: 'right',
  interval: 200
});