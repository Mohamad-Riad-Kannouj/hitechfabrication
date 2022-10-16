const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};
let navBarLinks = document.querySelectorAll("#navbar .scrollto");
const navbarlinksActive = () => {
  let Header = document.getElementById("header");
  if (window.scrollY > 40) {
    Header.classList.add("header-scrolled");
  } else {
    Header.classList.remove("header-scrolled");
  }
  let position = window.scrollY + 350;
  navBarLinks.forEach(navbarlink => {
    if (!navbarlink.hash) return;
    let section = document.querySelector(navbarlink.hash);
    if (!section) return;
    if (
      position >= section.offsetTop &&
      position <= section.offsetTop + section.offsetHeight
    ) {
      navbarlink.classList.add("active");
    } else {
      navbarlink.classList.remove("active");
    }
  });
};
onscroll(document, navbarlinksActive);
function hideNav() {
  if (window.matchMedia("(max-width: 992px)").matches) {
    let btn = document.querySelector("#header button");
    let div = document.getElementById("navbarSupportedContent");

    btn.classList.toggle("collapsed");
    btn.setAttribute("aria-expanded", "false");
    div.classList.toggle("show");
  }
  return;
}
let vid = document.getElementById("video");
function openVideo() {
  vid.currentTime = 0;
  vid.play();
  vid.muted = false;
  document.getElementById("myVideo").style.display = "block";
}
function closeVideo() {
  vid.pause();
  document.getElementById("myVideo").style.display = "none";
}
let backtotop = document.getElementById("back-to-top");
setInterval(() => {
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }
}, 300);
function ScrollToMessage() {
  let message = document.getElementById("form");
  let position = message.offsetTop - 100;
  window.scrollTo(0, position);
}
function copyValue() {
  var phoneNum = document.getElementById("phone");
  navigator.clipboard.writeText(phoneNum.innerText);
  document.querySelector(".phone h4").innerHTML =
    "Call: <span class='text-success'>copied</span>";
  document.querySelector(".phone i").removeAttribute("onmouseover");
}