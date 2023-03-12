"use strict";
// Note for sean
// Edit name using js and put every bday hehe
// NAV
const nav = document.querySelector(".nav");
const navBorder = nav.querySelector(".nav__border");
const navButton = nav.querySelector(".nav__button");
const navButtons = nav.querySelectorAll(".nav__buttons");
const collapsedClass = "nav--collapsed";
const navActive = "nav--active";
const lsKey = "navCollapsed";

let navStatus;
let abtStatus;
let memStatus;
let galStatus;

// OBSERVERS
//HOME OBSERVER
// About Us
const home = document.querySelector("#home");
const navAboutUs = document.querySelector(".nav__about-us");

// Members
const members = document.querySelector("#id-members");
const navMembers = document.querySelector(".nav__members");

// Gallery
const gallery = document.querySelector(".gallery-container");
const navGallery = document.querySelector(".nav__gallery");

const homeObs = function (entries, homeObserver) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      navAboutUs.classList.add("active");
      navGallery.classList.remove("active");
      navMembers.classList.remove("active");
      galStatus = false;
      abtStatus = true;
      memStatus = false;
    }
  });
};

const homeObserver = new IntersectionObserver(homeObs, {
  root: null,
  // threshold: 0.5,
  threshold: [0.5, 1],
});

homeObserver.observe(home);

//MEMBERS OBSERVER

const memObs = function (entries, memObserver) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      navMembers.classList.add("active");
      navAboutUs.classList.remove("active");
      navGallery.classList.remove("active");
      galStatus = false;
      abtStatus = false;
      memStatus = true;
    }
  });
};

const memObserver = new IntersectionObserver(memObs, {
  root: null,
  // threshold: 0.1,
  threshold: [0.08, 0.1],
});

memObserver.observe(members);

// GALLERY OBSERVER
const galObs = function (entries, galObserver) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      navGallery.classList.add("active");
      navAboutUs.classList.remove("active");
      navMembers.classList.remove("active");
      galStatus = true;
      abtStatus = false;
      memStatus = false;
    }
  });

  //
  // } else navGallery.classList.remove("active");
};

const galObserver = new IntersectionObserver(galObs, {
  root: null,
  threshold: [0.5, 1],
});

galObserver.observe(gallery);

// Navigation Menu
if (localStorage.getItem(lsKey) === null) {
  nav.classList.add(collapsedClass);
}
if (localStorage.getItem(lsKey) === "true") {
  nav.classList.add(collapsedClass);
}

navBorder.addEventListener("click", () => {
  if (navStatus === false) {
    nav.classList.toggle(collapsedClass);
    localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
  } else {
    navStatus = false;
  }

  if (!nav.classList.contains(collapsedClass)) nav.classList.add(navActive);
  else nav.classList.remove(navActive);
});

navButton.addEventListener("click", () => {
  if (navStatus === false) {
    nav.classList.toggle(collapsedClass);
    localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
  } else {
    navStatus = false;
  }

  if (!nav.classList.contains(collapsedClass)) nav.classList.add(navActive);
  else nav.classList.remove(navActive);
});

nav.addEventListener("mouseover", function (e) {
  if (navAboutUs.classList.contains("active")) {
    navAboutUs.classList.remove("active");
  } else if (navMembers.classList.contains("active")) {
    navMembers.classList.remove("active");
  } else if (navGallery.classList.contains("active")) {
    navGallery.classList.remove("active");
  }

  if (
    nav.classList.contains(collapsedClass) &&
    !nav.classList.contains(navActive)
  ) {
    nav.classList.remove(collapsedClass);
    localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
    navStatus = true;
  }
});

nav.addEventListener("mouseout", function (e) {
  if (abtStatus === true) {
    navAboutUs.classList.add("active");
  } else if (memStatus === true) {
    navMembers.classList.add("active");
  } else if (galStatus === true) {
    navGallery.classList.add("active");
  }

  if (
    !nav.classList.contains(collapsedClass) &&
    !nav.classList.contains(navActive)
  ) {
    nav.classList.add(collapsedClass);
    localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
    navStatus = false;
  }
});

// Gallery slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Functions
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // Slide next to right
  btnRight.addEventListener("click", nextSlide);

  // Slide next to left
  btnLeft.addEventListener("click", prevSlide);

  gallery.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    else if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

const gallObs = function (entries, galObserver) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      if (e.key === "ArrowLeft") prevSlide();
    }
  });

  //
  // } else navGallery.classList.remove("active");
};

const gallObserver = new IntersectionObserver(galObs, {
  root: null,
  threshold: [0.5, 1],
});

gallObserver.observe(gallery);

function PlaySound(soundobj) {
  var thissound = document.getElementById(soundobj);
  thissound.play();
}

function StopSound(soundobj) {
  var thissound = document.getElementById(soundobj);
  thissound.pause();
  // thissound.currentTime = 0;
}

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelectorAll('.btn--open-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// const introVid = document.querySelector('.video');
// const vidContainer = document.querySelector('.about-us-image-container');
// vidContainer.addEventListener('mouseover', function () {
//   introVid.play();
// })

// vidContainer.addEventListener('mouseout', function () {
//   introVid.pause();
// })

// Event Handler
//FOT TESTING
let currentDate = new Date("March 02 2023");
const eventModal = document.querySelector('.event--modal');
const eventOverlay = document.querySelector('.event__overlay');
// const eventBtnOpenModal = document.querySelectorAll('.btn--open-modal');
const eventBtnCloseModal = document.querySelector('.btn--close--event-modal');

const openEventModal = function () {
  // e.preventDefault();
  eventModal.classList.remove('hidden');
  eventOverlay.classList.remove('hidden');
  localStorage.setItem("ModalClosed", "false");
};

const closeEventModal = function () {
  eventModal.classList.add('hidden');
  eventOverlay.classList.add('hidden');
  localStorage.setItem("ModalClosed", "true");
};

eventBtnCloseModal.addEventListener('click', closeEventModal);
eventOverlay.addEventListener('click', closeEventModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

if (currentDate.getDate() === new Date().getDate() && localStorage.getItem("ModalClosed") === "false") {
  openEventModal();
}

// ----- IMAGE ZOOM -----
const images = document.querySelectorAll('.member-image');
images.forEach(img => addEventListener('click', function () {
  img.classList.toggle('zoom');
}));
