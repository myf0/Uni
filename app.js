// ==========================
// UNIOM CAPS
// app.js
// ==========================

// Navbar berubah saat scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.style.background = "rgba(255,255,255,.97)";
        navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,.08)";

    } else {

        navbar.style.background = "rgba(250,250,250,.85)";
        navbar.style.boxShadow = "none";

    }

});


// Animasi hero saat halaman dibuka

const heroLeft = document.querySelector(".left");
const heroRight = document.querySelector(".right");

window.addEventListener("load", () => {

    heroLeft.style.opacity = 0;
    heroLeft.style.transform = "translateY(40px)";

    heroRight.style.opacity = 0;
    heroRight.style.transform = "translateY(40px)";

    setTimeout(() => {

        heroLeft.style.transition = ".8s";
        heroLeft.style.opacity = 1;
        heroLeft.style.transform = "translateY(0)";

    },200);

    setTimeout(() => {

        heroRight.style.transition = ".8s";
        heroRight.style.opacity = 1;
        heroRight.style.transform = "translateY(0)";

    },450);

});


// Hover Card

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0) scale(1)";

    });

});


// Efek klik tombol

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.animate([

            {transform:"scale(1)"},
            {transform:"scale(.92)"},
            {transform:"scale(1)"}

        ],{

            duration:180

        });

    });

});


// Animasi Pattern Background

const patterns=document.querySelectorAll(".bg-pattern");

let angle=0;

function animatePattern(){

    angle+=0.05;

    patterns.forEach((item,index)=>{

        item.style.transform=
        `translateY(${Math.sin(angle+index)*10}px)
         rotate(${Math.sin(angle)*2}deg)`;

    });

    requestAnimationFrame(animatePattern);

}

animatePattern();


// Scroll Reveal

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity=1;
            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.2
});

document.querySelectorAll(".card").forEach(card=>{

    card.style.opacity=0;
    card.style.transform="translateY(40px)";
    card.style.transition=".7s";

    observer.observe(card);

});

console.log("UNIOM Website Loaded");