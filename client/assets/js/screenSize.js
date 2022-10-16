let mediaQueryList = window.matchMedia("(max-width: 768px)");
function phoneSize(event) {
  let carousel_indicators = document.getElementsByClassName(
    "carousel-indicators"
  )[0];
  carousel_indicators.classList.toggle("d-none");
  let btns = document.querySelectorAll(".carousel-btn");
  btns.forEach(e => {
    e.classList.toggle("d-none");
  });
  let carousel = document.querySelector("#products .container-fluid");
  carousel.classList.toggle("container-fluid");
  carousel.classList.toggle("carousel");
  carousel.classList.toggle("slide");
  carousel.setAttribute("id", "carouselExampleIndicators");
  carousel.setAttribute("data-bs-ride", "carousel");
  let products_row = document.getElementById("products_row");
  products_row.removeAttribute("class");
  products_row.setAttribute("class", "carousel-inner");
  let product_items = document.querySelectorAll(".product-item");
  product_items.forEach((e, i) => {
    e.removeAttribute("class");
    if (i != 0) {
      e.setAttribute("class", "carousel-item");
    } else {
      e.setAttribute("class", "carousel-item active");
    }
  });
}

function largerSizes(event) {
  let carousel_indicators = document.getElementsByClassName(
    "carousel-indicators"
  )[0];
  carousel_indicators.classList.toggle("d-none");
  let btns = document.querySelectorAll(".carousel-btn");
  btns.forEach(e => {
    e.classList.toggle("d-none");
  });
  let carousel = document.querySelector(".carousel.slide");
  carousel.classList.toggle("container-fluid");
  carousel.classList.toggle("carousel");
  carousel.classList.toggle("slide");
  carousel.removeAttribute("id", "carouselExampleIndicators");
  carousel.removeAttribute("data-bs-ride", "carousel");
  let products_row = document.getElementById("products_row");
  products_row.classList.toggle("carousel-inner");
  products_row.classList.add(
    "row",
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "g-0"
  );
  let product_items = document.querySelectorAll(".carousel-item");
  product_items.forEach((e, i) => {
    e.removeAttribute("class");
    e.classList.add("col-lg-3", "col-md-4", "product-item");
  });
}
if (mediaQueryList.matches) {
  phoneSize(mediaQueryList);
}
mediaQueryList.onchange = event => {
  if (event.matches) {
    phoneSize(event);
  } else {
    largerSizes(event);
  }
};