"use strict";

// /**
//   * название функции
//   *
//   * @param {number} first - первое число
//   * @returns {number}
//   */
// cart-display
var cartDisplayClose = document.querySelector('.cart-display__close');
var cartDisplay = document.querySelector('.cart-display');
var cartDisplayCount = document.querySelector('.cart-display-count__count');

if (cartDisplayCount.innerHTML == 0) {
  cartDisplay.classList.add('is-hidden');
} else {
  cartDisplay.classList.remove('is-hidden');
}

cartDisplayClose.addEventListener('click', function () {
  cartDisplay.classList.add('is-hidden');
}); // slider-hero

var swiper = new Swiper('.hero__slider', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  freeMode: true,
  navigation: {
    nextEl: '.hero-pag-1',
    prevEl: '.hero-pag-2'
  }
}); // slider-hits

var swiper = new Swiper('.hits__slider', {
  navigation: {
    nextEl: '.hits-pag-1',
    prevEl: '.hits-pag-2'
  },
  breakpoints: {
    1024: {
      slidesPerView: 2,
      spaceBetween: 16
    },
    1150: {
      slidesPerView: 3,
      spaceBetween: 16
    },
    // when window width is >= 640px
    1450: {
      slidesPerView: 4,
      spaceBetween: 16
    }
  }
});
//# sourceMappingURL=main.js.map
