

var menu = document.querySelector(".ri-menu-3-line");
var cross = document.querySelector(".ri-close-large-line");
var nav = document.querySelector(".responsive-nav");

menu.addEventListener("click", function(){
    nav.style.right = "0%";
});

cross.addEventListener("click", function(){
    nav.style.right = "-100%";
});
