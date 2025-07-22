/* ===================================== toogle icon navbar =========================================*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-xmark');
  navbar.classList.toggle('active');
};
/* ===================================== scroll section active link ==================================*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }
  });
  /* ===================================== sticky navbar =============================================*/
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  /* ===================================== remove toggle icon and navbar =============================*/
  menuIcon.classList.remove('fa-xmark');
  navbar.classList.remove('active');
};

/* ===================================== scroll reveal =============================*/
// Inisialisasi ScrollReveal dengan jarak, durasi, dan delay
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200,
  reset: true,
});

// Reveal elemen dari berbagai arah
ScrollReveal().reveal('.home', { origin: 'top' });
ScrollReveal().reveal('.about', { origin: 'left' });
ScrollReveal().reveal('.projects', { origin: 'left' });
ScrollReveal().reveal('.skills', { origin: 'top' });
ScrollReveal().reveal('.experince', { origin: 'top' });
ScrollReveal().reveal('.portofolio', { origin: 'left' });
ScrollReveal().reveal('.container-fluid', { origin: 'bottom' });
ScrollReveal().reveal('.contact', { origin: 'left' });

/* ===================================== typed js =============================*/
const typed = new Typed('.multiple-text', {
  strings: ['Afiyatus Solihah'],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

// const canvas = document.getElementById('bokehCanvas');
// const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// function drawBokeh() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   for (let i = 0; i < 50; i++) {
//     const x = Math.random() * canvas.width;
//     const y = Math.random() * canvas.height;
//     const size = Math.random() * 5;
//     ctx.beginPath();
//     ctx.arc(x, y, size, 0, Math.PI * 2);
//     ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
//     ctx.fill();
//   }
//   requestAnimationFrame(drawBokeh);
// }
// drawBokeh();
