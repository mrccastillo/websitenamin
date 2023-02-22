'use strict'

const button = document.querySelector('.nav-button');
const nav = document.querySelector('.nav')
const header = document.querySelector('.header');
//background ng body ung blue

let statusNav = 0;
button.addEventListener('click', function () {
    if (statusNav === 0) {
        nav.classList.add('hidden')
        statusNav = 1;
    }
    else {
        nav.classList.remove('hidden')
        statusNav = 0;
    }
})

button.addEventListener('mouseover', function () {
    if (statusNav !== 0) {
        nav.classList.remove('hidden')
    }
})

button.addEventListener('mouseout', function () {
    if (statusNav !== 0) {
        nav.classList.add('hidden')
    }
})

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    rootMargin: `-${navHeight}px`,
    threshold: 0,
});
headerObserver.observe(header);