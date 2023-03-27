"use strict"

// Toggle Navbar Links
const toggleBtn = document.querySelector("header.navbar .toggle_btn");
const toggleIcon = document.querySelector("header.navbar .toggle_btn i");
const nav = document.querySelector("header.navbar nav");

toggleBtn.onclick = function () {
  nav.classList.toggle("close");
  let isOpen = nav.classList.contains("close") ? false : true;
  toggleIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}
// Hide navbar links when clicked a link in navbar links
nav.onclick = function () {
  nav.classList.add("close");
}

// Hide navbar when scrolling down
const navbar = document.querySelector("header.navbar");
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
      navbar.classList.add("navbar--hide");
      nav.classList.add("close");
    } else {
      navbar.classList.remove("navbar--hide");
      toggleIcon.classList.remove("fa-xmark");
      toggleIcon.classList.add("fa-bars");
    }
    lastScrollY = window.scrollY;
});
