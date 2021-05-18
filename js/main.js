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
  },
  breakpoints: {
    // when window width is >= 320px
    1024: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    // when window width is >= 480px
    1250: {
      slidesPerView: 4,
      spaceBetween: 20,
      freeMode: false
    },
    // when window width is >= 640px
    1360: {
      slidesPerView: 6,
      spaceBetween: 16,
      freeMode: true
    }
  }
}); // slider-hits

var swiper = new Swiper('.hits__slider', {
  // slidesPerView: 'auto',
  // spaceBetween: 16,
  navigation: {
    nextEl: '.hits-pag-1',
    prevEl: '.hits-pag-2'
  },
  breakpoints: {
    // when window width is >= 320px
    // 320: {
    //   slidesPerView: 2,
    //   spaceBetween: 20
    // },
    // when window width is >= 480px
    1024: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1150: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    // when window width is >= 640px
    1450: {
      slidesPerView: 4,
      spaceBetween: 16
    }
  }
});
//# sourceMappingURL=main.js.map
