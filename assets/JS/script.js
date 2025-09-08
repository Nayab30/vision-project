// navbar show on scroll up
let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // scrolling down → hide navbar
        navbar.style.top = "-100px";
      } else {
        // scrolling up → show navbar
        navbar.style.top = "0";
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // avoid negative scroll
    });



// responsive navbar

var menu = document.querySelector(".ri-menu-3-line");
var cross = document.querySelector(".ri-close-large-line");
var nav = document.querySelector(".responsive-nav");

menu.addEventListener("click", function(){
    nav.style.right = "0%";
});

cross.addEventListener("click", function(){
    nav.style.right = "-100%";
});


// custom cursor
 const cursor = document.getElementById("cursor");

    // Follow mouse
    document.addEventListener("mousemove", e => {
      cursor.style.left = e.pageX + "px";
      cursor.style.top = e.pageY + "px";
    });

    // Ripple on click
    document.addEventListener("click", e => {
      const ripple = document.createElement("div");
      ripple.className = "click-ripple";
      ripple.style.left = e.pageX + "px";
      ripple.style.top = e.pageY + "px";
      document.body.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600); // Remove after animation
    });
    

    // preloader

    
    // Hide preloader when page loads
    window.addEventListener("load", function(){
      document.querySelector(".preloader").style.display = "none";
    });

    // lenis smooth scroll

    // Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


// Split letters into spans
  const textElement = document.querySelector(".reveal-text");
  const letters = textElement.textContent.split("");
  textElement.textContent = "";
  letters.forEach((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    textElement.appendChild(span);
  });

  // Animate on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const spans = entry.target.querySelectorAll("span");
        spans.forEach((span, i) => {
          setTimeout(() => {
            span.classList.add("active");
          }, i * 80); // delay between letters
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(textElement);
 




 
