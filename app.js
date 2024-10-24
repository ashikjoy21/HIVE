var cursor = document.querySelector(".cursor");
var scrollIcon = document.querySelector(".icon-scroll");
var videos = document.querySelectorAll("video");
var images = document.querySelectorAll('img');
var rows = document.querySelectorAll('.page_5 .row');
var navElements = document.querySelectorAll('nav h4');
var navhover = document.querySelector('.nav_hover');
var navhoverH1 = document.querySelectorAll('.nav_hover h1');
var main = document.querySelector("main");
// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);
// Initialize Locomotive Scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
  lerp: 0.05,
  multiplier: 1,
  getDirection: true,
  getSpeed: true,
  inertia: 0.5,
  smoothMobile: false,
  touchMultiplier: 2,
  scrollFromAnywhere: true,
  scrollbarContainer: document.querySelector('main'),
});
// Sync Locomotive Scroll with ScrollTrigger
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed",
});
// Update ScrollTrigger on scroll
locoScroll.on("scroll", ScrollTrigger.update);
// Refresh ScrollTrigger and update Locomotive Scroll
ScrollTrigger.addEventListener("refresh", () => {
  locoScroll.update();
  setTimeout(() => {
    locoScroll.update();
  }, 200);
});
ScrollTrigger.refresh();
function animateShapes() {
  const shape1 = document.getElementById('shape1');
  const shape2 = document.getElementById('shape2');
  let angle1 = 0;
  let angle2 = 0;
  function rotateShapes() {
    angle1 += 0.5;
    angle2 -= 0.3;
    shape1.style.transform = `rotate(${angle1}deg)`;
    shape2.style.transform = `rotate(${angle2}deg)`;
    requestAnimationFrame(rotateShapes);
  }
  rotateShapes();
}
window.addEventListener('load', animateShapes);
// Cursor Animation on body
document.addEventListener("mousemove", function (dets) {
  cursor.style.left = dets.x + 20 + "px";
  cursor.style.top = dets.y + 20 + "px";
  cursor.animate({
    left: `${dets.x}px`,
    top: `${dets.y}px`,
  }, { duration: 1500, fill: "forwards" });
});
// Cursor effect on nav
navElements.forEach((element, idx) => {
  if (idx == 0) return;
  element.addEventListener('mouseenter', function() {
    navhoverH1.forEach((h1) => {
      h1.innerHTML = "&nbsp;" + element.innerHTML + "  " + element.innerHTML + "  " + element.innerHTML + "  " + element.innerHTML + "  " + element.innerHTML;
    });
    navhover.style.display = "block";
    navhover.style.opacity = "1";
    cursor.style.transform = "translate(-50%, -50%) scale(2)";
  });
});
document.querySelector('nav').addEventListener('mouseleave', function() {
  navhover.style.display = "none";
  navhover.style.opacity = "0";
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
});
document.querySelector(".nav_hover h1").addEventListener("mouseenter", function() {
  cursor.style.transform = "translate(-50%, -50%) scale(2)";
});
document.querySelector(".nav_hover h1").addEventListener("mouseleave", function() {
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
});
// Cursor effect on images
function cursorOnImages(text) {
  cursor.classList.add('cursor-active');
  cursor.innerHTML = "view";
}
images.forEach((img, idx) => {
  if (idx == 0) return;
  img.addEventListener('mouseenter', function() {
    cursorOnImages("view");
    img.style.filter = "blur(2px)";
  });
});
images.forEach((img) => {
  img.addEventListener('mouseleave', function() {
    cursor.classList.remove('cursor-active');
    cursor.innerHTML = "";
    img.style.filter = "blur(0px)";
  });
});
// Cursor effect on rows
const preloadedImages = [];
rows .forEach((row) => {
  const img = new Image();
  img.onload = () => {
    preloadedImages.push(img);
  };
  img.src = row.dataset.image;
});
function cursorOnRows(img) {
  cursor.classList.add('cursor-blend');
  cursor.classList.add('cursor-img');
  cursor.appendChild(img);
}
rows.forEach((row, index) => {
  if (index == 0) return;
  row.addEventListener('mouseenter', function() {
    cursorOnRows(preloadedImages[index - 1]);
  });
});
rows.forEach((row) => {
  row.addEventListener('mouseleave', function() {
    cursor.classList.remove('cursor-blend');
    cursor.classList.remove('cursor-img');
    cursor.innerHTML = "";
  });
});
// Cursor effect on nav
function footerEffect(element, distance) {
  var x = element.getBoundingClientRect().x;
  var y = element.getBoundingClientRect().y;
  var width = element.getBoundingClientRect().width;
  var height = element.getBoundingClientRect().height;
  var cursorX = cursor.getBoundingClientRect().x;
  var cursorY = cursor.getBoundingClientRect().y;
  var distanceX = cursorX - (x + width / 2);
  var distanceY = cursorY - (y + height / 2);
  if (distanceX < 0) distanceX = -distanceX;
  if (distanceY < 0) distanceY = -distanceY;
  var x = cursorX - x - width / 2;
  var y = cursorY - y - height / 2;
  if (distanceX < distance && distanceY < distance) {
    element.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
    element.children[0].style.transform = `translate(${x / 11}px, ${y / 11}px)`;
    element.classList.add('focus');
    cursor.style.opacity = "0";
  } else if (element.classList.contains('focus')) {
    element.children[0].style.transform = `translate(0px, 0px)`;
    cursor.style.opacity = "1";
    element.classList.remove('focus');
    var bounce = gsap.timeline();
    bounce.to(element, {
      x: -x / 3,
      y: -y / 3,
      linear: true,
      duration: 0.2,
    });
    bounce.to(element, {
      x: x / 4,
      y: y / 4,
      linear: true,
      duration: 0.2,
    });
    bounce.to(element, {
      x: 0,
      y: 0,
      linear: true,
      duration: 0.1,
    });
    var bounceText = gsap.timeline();
    let text = element.children[0];
    bounceText.to(text, {
      x: -x / 14,
      y: -y / 14,
      linear: true,
      duration: 0.2,
    });
    bounceText.to(text, {
      x: x / 20,
      y: y / 20,
      linear: true,
      duration: 0.2,
    });
    bounceText.to(text, {
      x: 0,
      y: 0,
      linear: true,
      duration: 0.1,
    });
  }
}
document.addEventListener('mousemove', function (e) {
  footerEffect(document.querySelector('footer .circle'), 100);
});
// Hero_section Animation
function hero_anime() {
  gsap.to(scrollIcon, {
    scrollTrigger: {
      trigger: ".page_1",
      scroller: "main",
      start: "top -2%",
      end: "top -5%",
      scrub: 2,
    },
    opacity: 0,
  });
  gsap.from(".page_1 h1,.page_1 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.5,
  });
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page_1 h1",
      scroller: "main",
      start: "top 27%",
      end: "top 0",
      scrub: 3,
    },
  });
  tl.to(".page_1 h1", {
    x: -100,
  }, "Hero_animation");
  tl.to(".page_1 h2", {
    x: 100,
  }, "Hero_animation");
  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page_1 h1",
      scroller: "main",
      start: "top -10%",
      end: "top -30%",
      scrub: 3,
    },
  });
  tl2.to("main", {
    backgroundColor: "#fff",
  });
  var tl3 = gsap.timeline({
    scrollTrigger : {
      trigger: ".page_1 h1",
      scroller: "main",
      start: "top -140%",
      end: "top -300%",
      scrub: 3,
    },
  });
  tl3.to("main", {
    backgroundColor: "#050a30",
  });
}
hero_anime();
// Add resize event listener to update scroll height
function updateScrollHeight() {
  const mainElement = document.querySelector('main');
  const lastChild = mainElement.lastElementChild;
  const lastChildHeight = lastChild.offsetHeight;
  const viewportHeight = window.innerHeight;
  mainElement.style.setProperty('--bottom-padding', `${Math.max(viewportHeight - lastChildHeight, 0)}px`);
  locoScroll.update();
  ScrollTrigger.refresh();
}
window.addEventListener('load', updateScrollHeight);
window.addEventListener('resize', updateScrollHeight);
window.addEventListener('resize', () => {
  setTimeout(() => {
    updateScrollHeight();
  }, 200);
});