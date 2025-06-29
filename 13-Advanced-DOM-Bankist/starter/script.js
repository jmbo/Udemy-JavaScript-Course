'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); // prevents page from jumping when opening modal
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////// Selecting, Creating, and Deleting Elements Lesson /////////////////////////////
// console.log(document.documentElement); // entire html -- used to apply CSS to entire document
// console.log(document.head);
// console.log(document.body);

// // get elements by selector -- '.' for class, '#' for id
const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// // get elements by id, tag, or class names
// document.getElementById('section--1'); // just need id name
// const allButtons = document.getElementsByTagName('button'); // "live collection" -- changes as the DOM is updated (not the case for querySelector above)
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn')); // also a "live collection"

// creating and inserting elements
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// can use prepend and append to move elements around... counterintuitively message is NOT added twice below
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true)); // creates a copy for duplication

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message); // old way of doing this
  });

//////////////////////// Styles, Attributes and Classes Lesson /////////////////////////////
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// console.log(message.style.height); // got nothing -- this only works for properties that we set manually ourselves (in-line, not hidden in the class or CSS files)
// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message)); // get actual styles as computed by the browser from the CSS
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); // only standard properties work
// console.log(logo.className); // not just "class"... historical reasons it's className

// logo.alt = 'Beautiful minimalist logo';

// console.log(logo.src);
// console.log(logo.getAttribute('src')); // this is the relative reference

// // Non-standard
// console.log(logo.designer); // this would not work
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// const link2 = document.querySelector('.nav__link--btn');
// console.log(link2.href);
// console.log(link2.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber); // special attributes that start with the word "data" (the follow on data is converted into camel case: "data-version-number" -> .versionNumber)

// // Classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not called "includes"!

// // Don't use this since this will overwrite all other existing classes -- use the above
// logo.className = 'jonas';

//////////////////////// Implementing Smooth Scrolling Lesson /////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  //   const s1coords = section1.getBoundingClientRect();
  //   console.log(s1coords);

  //   console.log(e.target.getBoundingClientRect());

  //   console.log('Current scroll (X/Y)', window.scrollX, window.scrollY); //legacy: pageXOffset, pageYOffset

  //   console.log(
  //     'height/width viewport',
  //     document.documentElement.clientHeight, // does not include the scrollbars
  //     document.documentElement.clientWidth
  //   );

  // Scrolling
  //   window.scrollTo(s1coords + window.scroll);
  //   window.scrollTo(
  //     s1coords.left + window.scrollX,
  //     s1coords.top + window.scrollY
  //   );
  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });

  section1.scrollIntoView({ behavior: 'smooth' }); // only works on modern browsers
});

//////////////////////// Types of Events and Event Handlers Lesson /////////////////////////////
// const h1 = document.querySelector('h1');

// https://developer.mozilla.org/en-US/docs/Web/Events
// https://developer.mozilla.org/en-US/docs/Web/API/Element#events

// h1.onmouseenter = function (e) {
//   // old-school -- generally use addEventListener()
//   alert('onmouseenter: Great! You ar reading the heading :D');
// };

// addEventListener is better to 1) add multiple event listeners to same event 2) we can remove event handlers easily
// const alertH1 = function (e) {
//   alert('addEventListener: Great! You ar reading the heading :D');

//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // DO NOT USE - html attribute
// <h1 onclick="alert('HTML alert')"></h1>;

//////////////////////// Event Propagation: Bubbling and Capturing Lesson /////////////////////////////
//////////////////////// Event Propagation in Practice Lesson /////////////////////////////
// // rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// // when a click happens, the event bubbles through the parent DOM objects, but the e.target remains the same
// // event handlers are not picking up events during the capture phase by default!! useful for event delegation
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this); // always true

//   // Stop propagations
//   e.stopPropagation(); // not a good idea to use -- good for sometimes troubleshooting
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true // this true is to enable event listening during the capture phase
// );

//////////////////////// Event Delegation: Implementing Page Navigation Lesson /////////////////////////////
// Page navigation
// the the below is unnecessarily bloated -- adding the exact same event handler to multiple elements
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// better solution is to use event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////// DOM Traversing Lesson /////////////////////////////
const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // everything
// console.log(h1.children); // HTMLCollection -- live collection

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// // closest -> opposite of query selector -- finds parents
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// // h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings -- most of the time we are working with the elements
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// // if we want all siblings go through the parent
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

//////////////////////// Building a Tabbed Component Lesson /////////////////////////////
// Tabbed component
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //   console.log(clicked);

  // clicked is null when the tabsContainer area is clicked, but not an actual button containing .operations__tab so null is return

  // Guard clause -- to exit if there's a null
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////// Passing Arguments to Event Handlers Lesson /////////////////////////////
// Menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  // cannot pass arguments inside handler functions, the only param is the Event
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// mouseenter does not bubble so we use mouseover
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
//OR
// Passing "argument" into handler using bind() for setting the "this" keyword
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////// Implementing a Sticky Navigation: The Scroll Event Lesson /////////////////////////////
// // Sticky navigation
// // should avoid scroll event since it's very inefficient -- but nonetheless we'll do it

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   //   console.log(e);
//   console.log(this.window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//////////////////////// A Better Way: The Intersection Observer API Lesson /////////////////////////////
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null, // element that target is intersecting -- null specifies entire viewport
//   //   threshold: 0.1, // % of intersection observer callback observes -- can specify an array here and have multiple thresholds passed in the entries of the callback
//   threshold: [0.1, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// ///////////////////////////////////
// const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//////////////////////// Revealing Elements on Scroll Lesson /////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    //   if (entry.isIntersecting) entry.target.classList.remove('section--hidden');
    // OR -- a guard clause
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target); // slight optimization for performance
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
//////////////////////// Fixing a Small Scrolling Bug Lesson /////////////////////////////
//////////////////////// Lazy Loading Images Lesson /////////////////////////////
// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src');
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //   console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); // remove the blurry filter once the image is fully loaded
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // load the image with an offset (before the user gets to it)
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////// Building a Slider Component: Part 1 Lesson /////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;

  // troubleshooting / debugging settings
  // slider.style.transform = 'scale(0.4) translateX(-1200px)';
  // slider.style.overflow = 'visible';

  const goToSlide = function (slide) {
    // 0%, 100%, 200%, 300%
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  //////////////////////// Building a Slider Component: Part 2 Lesson /////////////////////////////
  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
};
// can even make this function accept additional options
slider();

//////////////////////// Lifecycle DOM Events Lesson /////////////////////////////
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// don't abuse this function -- creates a pop up notification upon closing the browser tab
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault(); // some browsers require this
//   console.log(e);
//   e.returnValue = 'message'; // for historical reasons
// });

//////////////////////// Efficient Script Loading: defer and async Lesson /////////////////////////////
