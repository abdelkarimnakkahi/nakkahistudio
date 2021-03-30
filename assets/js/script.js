let lastTopScroll = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", function () {
  const topScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (topScroll > lastTopScroll) {
    navbar.style.top = "-5rem";
  } else {
    navbar.style.top = "0";
    navbar.style.background = "#080c20";
    navbar.style.boxShadow = "0 5px 15px -5px #080c20";
  }
  lastTopScroll = topScroll;
});

const menu = document.querySelector(".menu");
const ul = document.querySelector("nav ul");

menu.addEventListener("click", function (e) {
  ul.classList.toggle("active");
});

const link = document.querySelectorAll("nav ul a");
for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", function () {
    ul.classList.toggle("active");
  });
}

// FadeIn Animation

const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".card");

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

sliders.forEach((slider) => {
  appearOnScroll.observe(slider);
});

// Scroll Animation

const sr = ScrollReveal({
  distance: "1rem",
  duration: 1500,
  reset: false,
});

sr.reveal(".card", {
  origin: "top",
  interval: 200,
});

sr.reveal(".message", {
  origin: "left",
  interval: 200,
});

sr.reveal(".message-info", {
  origin: "right",
  interval: 200,
});

// Get Current Year

const fullYear = new Date();
const currentYear = fullYear.getFullYear();

document.querySelector(".current-year").textContent = currentYear;

// Smooth scroll experience
function init() {
  new SmoothScroll(document, 55, 12);
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body; // cross browser support for document scrolling

  var moving = false;
  var pos = target.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target; // safari is the new IE

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling

    var delta = normalizeWheelDelta(e);

    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // limit scrolling

    if (!moving) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else return -e.detail / 3; // Firefox
    } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  function update() {
    moving = true;

    var delta = (pos - target.scrollTop) / smooth;

    target.scrollTop += delta;

    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function () {
    // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
}
