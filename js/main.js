"use strict";

var accordions = document.querySelectorAll('.footer-accordion__item');
accordions.forEach(function (el) {
  el.addEventListener('click', function (e) {
    var self = e.currentTarget;
    var control = self.querySelector('.footer-accordion__control');
    var content = self.querySelector('.footer-accordion__content');
    self.classList.toggle('open'); // если открыт аккордеон

    if (self.classList.contains('open')) {
      control.setAttribute('aria-expanded', true);
      content.setAttribute('aria-hidden', false);
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      control.setAttribute('aria-expanded', false);
      content.setAttribute('aria-hidden', true);
      content.style.maxHeight = null;
    }
  });
});
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
}); // burger

var burger = document.querySelector('.burger');
var burgerMenu = document.querySelector('.burger-menu');
var burgerMenuContent = document.querySelector('.burger-menu__content');
var body = document.querySelector('body');
var burgerLine = document.querySelectorAll('.burger__line');
burger.addEventListener('click', function () {
  burgerMenu.classList.toggle('burger-menu--active');
  burgerMenuContent.classList.toggle('burger-menu--active');
  burgerLine.forEach(function (e) {
    if (burgerMenuContent.classList.contains('burger-menu--active')) {
      e.classList.add('burger-open');
    } else {
      e.classList.remove('burger-open');
    }
  });

  if (burgerMenuContent.classList.contains('burger-menu--active')) {
    burgerMenuContent.style.top = 'calc(0% + 70px)';
    burger.classList.add('burger-open');
  } else {
    burger.classList.remove('burger-open');
    burgerMenuContent.style.top = '-100vw';
  }
});

window.onclick = function (e) {
  if (e.target == burgerMenu) {
    burgerMenu.classList.remove('burger-menu--active');
    burgerMenuContent.classList.remove('burger-menu--active');
    burgerLine.forEach(function (e) {
      e.classList.remove('burger-open');
    });
  }
}; // slider-hero


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
    320: {
      slidesPerView: 'auto',
      spaceBetween: 8
    },
    480: {
      slidesPerView: 'auto',
      spaceBetween: 16
    },
    750: {
      slidesPerView: 'auto',
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
