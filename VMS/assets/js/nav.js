

var menu = document.querySelector(".ri-menu-3-line");
var cross = document.querySelector(".ri-close-large-line");
var nav = document.querySelector(".responsive-nav");

menu.addEventListener("click", function(){
    nav.style.left = "0%";
});

cross.addEventListener("click", function(){
    nav.style.left = "-100%";
});
// ------------------------------------------------------

// const toggle =document.getElementById('toggleDark');
// const body = document.querySelector('body');

// toggle.addEventListener("click", function(){
//     this.classList.toggle('ri-moon-fill');
//     document.body.classList.contains('darktheme');

//     if(this.classList.toggle('ri-sun-line')){
//         document.body.classList.contains('darktheme');
//         body.style.transition ='2s';

//     }else{
//         // body.style.background = 'black';
//         body.style.transition ='2s';


//     }
// })


