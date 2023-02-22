'use strict'

const collapsedClass = "nav--collapsed";
const active = "active";
const lsKey = "navCollapsed";
const nav = document.querySelector(".nav");
const navBorder = nav.querySelector(".nav__border");
const navButton = nav.querySelector(".nav__button");
const navButtons = nav.querySelectorAll(".nav__link");
let navStatus;

console.log(navButtons);
// const container = nav.querySelector(".page-container");
if (localStorage.getItem(lsKey) === "true") {
    nav.classList.add(collapsedClass);
}

navBorder.addEventListener("click", () => {
    if (navStatus === false) {
        nav.classList.toggle(collapsedClass);
        localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
    }
    else {
        navStatus = false;
    }

    if (!nav.classList.contains(collapsedClass))
        nav.classList.add(active);
    else
        nav.classList.remove(active);
});

navButton.addEventListener("click", () => {
    if (navStatus === false) {
        nav.classList.toggle(collapsedClass);
        localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
    }
    else {
        navStatus = false;
    }


    if (!nav.classList.contains(collapsedClass))
        nav.classList.add(active);
    else
        nav.classList.remove(active);
});

nav.addEventListener("mouseover", function () {
    if (nav.classList.contains(collapsedClass) && !nav.classList.contains(active)) {
        nav.classList.remove(collapsedClass);
        localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
        navStatus = true;
    }
});

nav.addEventListener("mouseout", function () {
    if (!nav.classList.contains(collapsedClass) && !nav.classList.contains(active)) {
        nav.classList.add(collapsedClass);
        localStorage.setItem(lsKey, nav.classList.contains(collapsedClass));
        navStatus = false;
    }
});

