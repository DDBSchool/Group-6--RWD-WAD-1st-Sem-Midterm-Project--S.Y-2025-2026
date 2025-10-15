const hamburger = document.querySelector('.hamburger');
const closeMenu = document.querySelector('.close-menu');
const navLinks = document.querySelector('.nav-links');

hamburger.onclick = function () {
  navLinks.classList.add('active');
  document.body.style.overflow = 'hidden';
};

closeMenu.onclick = function () {
  navLinks.classList.remove('active');
  document.body.style.overflow = '';
};

window.onclick = function (e) {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  }
};