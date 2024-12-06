const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,

  // for tablet smooth
  tablet: { smooth: true },

  // for mobile
  smartphone: { smooth: true }
});
function locomotiveAnimation(){
  gsap.registerPlugin(ScrollTrigger);


locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  // follwoing line is not required to work pinning on touch screen

  /* pinType: document.querySelector(".smooth-scroll").style.transform
    ? "transform"
    : "fixed"*/
});
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
}

function loadingAnimation(){
  let tl = gsap.timeline();
  tl.from(".page1",{
    opacity:0,
    duration:0.2,
    delay:-0.2
  })
  tl.from(".page1",{
    transform:'scaleX(0.7) scaleY(0.2) translateY(80%)',
    borderRadius:'50px',
    duration:2,
  ease:"expo.out"
  })
  tl.from("nav",{
    opacity:0
  })
  tl.from(".page1 p, .page1 div, .page1 h1",{
    opacity:0,
    duration:0.5
    ,stagger:0.2
  })
}

function page1animation(){
let dropdown = document.querySelector(".dropdown");
let whatwedo = document.querySelector("#whatwedo");
whatwedo.addEventListener("mouseenter", () => {
  dropdown.style.display = "block";
});
document.addEventListener("mousemove", (event) => {
  if (!dropdown.contains(event.target) && event.target !== whatwedo) {
    dropdown.style.display = "none";
  }
});}

function rightElemAnimation() {
  let rightElems = document.querySelectorAll(".rightElem");
  rightElems.forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      gsap.to(elem.childNodes[3], {
        opacity: 1,
        scale: 1,
      });
    });
    elem.addEventListener("mouseleave", () => {
      gsap.to(elem.childNodes[3], {
        opacity: 0,
        scale: 0,
      });
    });
    elem.addEventListener("mousemove", (dets) => {
      gsap.to(elem.childNodes[3], {
        x: dets.x - elem.getBoundingClientRect().x - 50,
        y: dets.y - elem.getBoundingClientRect().y - 140,
      });
    });
  });
}

let sections = document.querySelectorAll(".rightup");
sections.forEach((elem) => {
  // console.log(elem.childNodes[3])
  let video = elem.childNodes[3];
  elem.addEventListener("mouseenter", () => {
    console.log("enter");
  });
});

function initializeScrollAnimations(containerSelector, triggerSelector) {
  // Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(containerSelector), // Locomotive Scroll container
    smooth: true,
  });

  // Sync Locomotive Scroll with GSAP's ScrollTrigger
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(containerSelector, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector(containerSelector).style.transform
      ? "transform"
      : "fixed",
  });

  // Counter Animation
  let valueDisplay = document.querySelectorAll(`${triggerSelector} h1`);
  let interval = 4000;

  valueDisplay.forEach((elem) => {
    let endVal = parseInt(elem.getAttribute("data-val"));
    let duration = Math.floor(interval / endVal);

    const startCounter = () => {
      let startVal = 0;
      elem.textContent = startVal;
      let counter = setInterval(() => {
        startVal += 1;
        elem.textContent = startVal;
        if (startVal === endVal) {
          clearInterval(counter);
        }
      }, duration);
    };

    ScrollTrigger.create({
      trigger: elem.closest(triggerSelector),
      start: "top 80%",
      onEnter: startCounter,
      once: false,
      scroller: containerSelector, // Sync with Locomotive Scroll
    });
  });

  // Refresh ScrollTrigger after Locomotive Scroll initialization
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}


function page6animation() {
  gsap.from(".page6bottom h4", {
    x: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".page6bottom",
      scroller: ".main", // Link to Locomotive Scroll container
      // markers: true, // Uncomment for debugging
      start: "top 60%",
      end: "top 20%",
      scrub: true,
    },
  });
}

ScrollTrigger.create({
  trigger: ".page3left",
  markers:true,
  start: "top top", // When the top of the sticky element hits the top of the viewport
  end: " top 70%", // When the bottom of the sticky element hits the top of the viewport
  pin: true, // Pins the element in place
  scroller: ".main", // Sync with Locomotive Scroll
});

ScrollTrigger.create({
  trigger: ".secleft",
  start: "top top", // When the top of the sticky element hits the top of the viewport
  end: "bottom top", // When the bottom of the sticky element hits the top of the viewport
  pin: true, // Pins the element in place
  scroller: ".main", // Sync with Locomotive Scroll
});

ScrollTrigger.create({
  trigger: ".finleft",
  start: "top top", // When the top of the sticky element hits the top of the viewport
  end: "bottom top", // When the bottom of the sticky element hits the top of the viewport
  pin: true, // Pins the element in place
  scroller: ".main", // Sync with Locomotive Scroll
});

ScrollTrigger.create({
  trigger: ".webleft",
  start: "top top", // When the top of the sticky element hits the top of the viewport
  end: "bottom top", // When the bottom of the sticky element hits the top of the viewport
  pin: true, // Pins the element in place
  scroller: ".main", // Sync with Locomotive Scroll
});
loadingAnimation()
locomotiveAnimation()
page1animation()
rightElemAnimation();
// Initialize animations for the scroll container and elements
initializeScrollAnimations(".main", ".elem");
locoScroll.on("scroll", () => ScrollTrigger.update());
page6animation();

const text = document.querySelector(".text p");
const innerText = text.innerText;

text.innerHTML = text.innerText
  .split("")
  .map((char, i) => {
    return `<span style="transform: rotate(${i * 8.3}deg)">${char}</span>`;
  })
  .join("");

