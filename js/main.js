"use strict";

// burger
var burger = document.querySelector('.burger');
var burgerMenu = document.querySelector('.burger-menu');
var burgerMenuContent = document.querySelector('.burger-menu__content');
var body = document.querySelector('body');
var burgerLine = document.querySelectorAll('.burger__line');
burger.addEventListener('click', function () {
  var headerBottom = document.querySelector('.header-bottom');
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
    burgerMenuContent.style.zIndex = '300';
    burgerMenu.style.zIndex = '300';
    headerBottom.style.zIndex = '300';
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
};
"use strict";

// cart-display
var cartDisplayClose = document.querySelector('.cart-display__close');
var cartDisplay = document.querySelector('.cart-display');
var cartDisplayCount = document.querySelector('.cart-display-count__count');

if (cartDisplay) {
  if (cartDisplayCount.innerHTML == 0) {
    cartDisplay.classList.add('is-hidden');
  } else {
    cartDisplay.classList.remove('is-hidden');
  }

  cartDisplayClose.addEventListener('click', function () {
    cartDisplay.classList.add('is-hidden');
  });
}
"use strict";

var accordions = document.querySelectorAll('.footer-accordion__item');
var accordions2 = document.querySelectorAll('.catalog-hero-accordion');
var accordionTitle = document.querySelectorAll('.catalog-hero-accordion__title');
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
}); //accordion

if (window.innerWidth > 1150) {
  $('#accordion').accordion({
    collapsible: true,
    heightStyle: "content",
    active: false,
    beforeActivate: function beforeActivate(event, ui) {
      // The accordion believes a panel is being opened
      if (ui.newHeader[0]) {
        var currHeader = ui.newHeader;
        var currContent = currHeader.next('.ui-accordion-content'); // The accordion believes a panel is being closed
      } else {
        var currHeader = ui.oldHeader;
        var currContent = currHeader.next('.ui-accordion-content');
      } // Since we've changed the default behavior, this detects the actual status


      var isPanelSelected = currHeader.attr('aria-selected') == 'true'; // Toggle the panel's header

      currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', (!isPanelSelected).toString()); // Toggle the panel's icon

      currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e', isPanelSelected).toggleClass('ui-icon-triangle-1-s', !isPanelSelected); // Toggle the panel's content

      currContent.toggleClass('accordion-content-active', !isPanelSelected);

      if (isPanelSelected) {
        currContent.slideUp();
      } else {
        currContent.slideDown();
      }

      return false; // Cancel the default action
    }
  });
}

var titleBoiler = document.querySelector('.accordion__title--boiler');
var titleParts = document.querySelector('.accordion__title--parts');
var contentBoiler = document.querySelector('.accordion__content--boiler');
var contentParts = document.querySelector('.accordion__content--parts');
var titleMobile = document.querySelectorAll('.accordion__title--mobile');
titleMobile.forEach(function (e) {
  e.addEventListener('click', function () {
    contentBoiler.classList.remove('accordion__content--active');
    contentParts.classList.remove('accordion__content--active');
  });
});

if (titleBoiler) {
  titleBoiler.addEventListener('click', function () {
    contentBoiler.classList.toggle('accordion__content--active');
  });
  titleParts.addEventListener('click', function () {
    contentParts.classList.toggle('accordion__content--active');
  });
}
"use strict";

var mainListTitle = document.querySelector('.main-list__title--open');
var mainListTablet = document.querySelector('.main-list__wrapper--tablet');
var body = document.querySelector('body');

if (mainListTitle) {
  mainListTitle.addEventListener('click', function () {
    mainListTablet.classList.toggle('main-list--visible');
    body.classList.toggle('main-list--visible');
  });
}
"use strict";

// filter
var boilerBlock = document.querySelector('.catalog-hero-status__block--boiler');
var partsBlock = document.querySelector('.catalog-hero-status__block--parts');
var resetFilters = document.querySelector('.filter-reset');
var resetFiltersAll = document.querySelectorAll('.filter-reset');
var allcheckboxes = document.querySelectorAll('.checkbox');
var checkboxBoiler = document.querySelectorAll('.checkbox--boiler');
var checkboxParts = document.querySelectorAll('.checkbox--parts');
var filterItem = document.querySelectorAll('.catalog-hero-status__item');
var filterItemList = document.querySelector('.catalog-hero-status__list--boiler');
var resetFilters3 = document.querySelector('.catalog-hero-status__reset-btn--mobile');
var catalogFilterBtn = document.querySelector('.catalog-hero-status__filter-btn');
var catalogContentRight = document.querySelector('.catalog-hero-content__right');
var catalogTitleMobile = document.querySelector('.catalog-hero-content__title--mobile');
var catalogContentInner = document.querySelector('.catalog-hero-content__inner');
var body = document.querySelector('body');
var filtrItemsArr;

if (catalogFilterBtn) {
  catalogFilterBtn.addEventListener('click', function () {
    catalogContentRight.classList.toggle('mobile-filter-active');
    catalogContentInner.classList.toggle('mobile-filter-active');
    body.classList.toggle('mobile-filter-active');
  });
  catalogTitleMobile.addEventListener('click', function () {
    catalogContentRight.classList.remove('mobile-filter-active');
    catalogContentInner.classList.remove('mobile-filter-active');
    body.classList.remove('mobile-filter-active');
  });

  catalogContentInner.onclick = function (e) {
    if (e.target == catalogContentInner) {
      catalogContentInner.classList.remove('mobile-filter-active');
      catalogContentRight.classList.remove('mobile-filter-active');
      body.classList.remove('mobile-filter-active');
    }
  };
}

if (resetFilters) {
  var resetFilter = function resetFilter(btn, checkbox) {
    btn.forEach(function (e) {
      e.addEventListener('click', function () {
        btn.forEach(function (e) {
          e.disabled = true;
          e.classList.remove('catalog-hero-status__reset-btn--hover');
        });
        boilerBlock.style.display = 'none';
        partsBlock.style.display = 'none';
        filterItem.forEach(function (e) {
          e.classList.remove('catalog-hero-status__item--active');
        });
        checkbox.forEach(function (e) {
          e.classList.remove('boiler');
          e.classList.remove('parts');
        });
        checkbox.forEach(function (e) {
          e.checked = false;
          e.classList.remove('checked');
        });
      });
    });
  };

  resetFilter(resetFiltersAll, allcheckboxes);
}

function checkedCheckbox() {
  var checkedArr = document.getElementsByClassName('checked');
  console.log(checkedArr);
  this.classList.toggle('checked');
  resetFiltersAll.forEach(function (el) {
    el.disabled = false;
    el.classList.add('catalog-hero-status__reset-btn--hover');
  });

  if (checkedArr.length == 0) {
    resetFiltersAll.forEach(function (el) {
      el.disabled = true;
      el.classList.remove('catalog-hero-status__reset-btn--hover');
    });
  }
}

;

function filterByArr(array, className, element) {
  array = document.getElementsByClassName(className);

  if (array.length == 0) {
    element.style.display = 'none';
  }
}

function filterBoiler() {
  var boilerArr = [];
  this.classList.toggle('boiler');
  boilerBlock.style.display = 'block';
  filterByArr(boilerArr, 'boiler', boilerBlock);
}

function filterParts() {
  var partsArr = [];
  this.classList.toggle('parts');
  partsBlock.style.display = 'block';
  console.log(partsArr);
  filterByArr(partsArr, 'parts', partsBlock);
}

document.querySelectorAll('.checkbox--boiler').forEach(function (e) {
  e.addEventListener('click', function (e) {
    var checkItem = e.currentTarget.dataset.boiler;
    filtrItemsArr = document.getElementsByClassName('catalog-hero-status__item--active');
    console.log(filtrItemsArr);
    document.querySelectorAll('.catalog-hero-status__item').forEach(function (e) {
      document.querySelector("[data-target='".concat(checkItem, "']")).classList.toggle('catalog-hero-status__item--active');
    });
  });
});
document.querySelectorAll('.checkbox--parts').forEach(function (e) {
  e.addEventListener('click', function (e) {
    var checkItem = e.currentTarget.dataset.parts;
    filtrItemsArr = document.getElementsByClassName('catalog-hero-status__item--active');
    console.log(filtrItemsArr);
    document.querySelectorAll('.catalog-hero-status__item').forEach(function (e) {
      document.querySelector("[data-target='".concat(checkItem, "']")).classList.toggle('catalog-hero-status__item--active');
    });
  });
});

function removeFilterItem(key) {
  document.querySelectorAll(".close--".concat(key)).forEach(function (e) {
    e.addEventListener('click', function (e) {
      if (filtrItemsArr.length == 1) {
        resetFilters.disabled = true;
        resetFilters.classList.remove('catalog-hero-status__reset-btn--hover');
        boilerBlock.style.display = 'none';
        partsBlock.style.display = 'none';
      }

      var closeItem = e.currentTarget.dataset.close;
      document.querySelectorAll('.catalog-hero-status__item').forEach(function (e) {
        document.querySelector("[data-target='".concat(closeItem, "']")).classList.remove('catalog-hero-status__item--active');
      });
      document.querySelectorAll('.checkbox--boiler').forEach(function (e) {
        document.querySelector("[data-".concat(key, "='").concat(closeItem, "']")).checked = false;
        document.querySelector("[data-".concat(key, "='").concat(closeItem, "']")).classList.remove("".concat(key));
        document.querySelector("[data-".concat(key, "='").concat(closeItem, "']")).classList.remove('checked');
      });
    });
  });
}

removeFilterItem('boiler');
removeFilterItem('parts');
checkboxParts.forEach(function (e) {
  return e.addEventListener('click', filterParts);
});
checkboxBoiler.forEach(function (e) {
  return e.addEventListener('click', filterBoiler);
});
allcheckboxes.forEach(function (e) {
  return e.addEventListener('click', checkedCheckbox);
});
"use strict";

var mainListLink = document.querySelectorAll('.main-list__link');
var catalogHeroHeading = document.querySelector('.catalog-hero__heading');
var productTitle = document.querySelector('.product-title');

function showProductHeading() {
  catalogHeroHeading.innerHTML = this.innerHTML;
  productTitle.innerHTML = this.innerHTML;
}

;
mainListLink.forEach(function (e) {
  return e.addEventListener('click', showProductHeading);
});
"use strict";

var productList = document.querySelector('.product-list');
var loadMore = document.querySelector('.load-more__btn');
var loadMoreIcon = document.querySelector('.load-more__load');
var prodQuantity = 24;
var dataLength = null;
var timeoutId;

var normalPrice = function normalPrice(str) {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

if (productList) {
  var loadProducts = function loadProducts(quantity) {
    fetch('../data/data.json').then(function (response) {
      return response.json();
    }).then(function (data) {
      dataLength = data.length;
      productList.innerHTML = '';

      for (var i = 0; i < dataLength; i++) {
        if (i < quantity) {
          var item = data[i];
          console.log(item);
          productList.innerHTML += "\n          <li class=\"product-list__item\">\n            <article class=\"product-list__article hits-slide\">\n              <img src=\"".concat(item.mainImage, "\" alt=\"").concat(item.title, "\">\n              <div class=\"hits-slide__inner product-list__inner\">\n                <h3 class=\"product-list__title\"><a href=\"#\"\n                    class=\"hits-slide__name product-list__name\">").concat(item.title, "</a></h3>\n                <span class=\"hits-slide__vendor product-list__vendor\">\u0410\u0440\u0442\u0438\u043A\u0443\u043B: 354715946</span>\n                <span class=\"hits-slide__price product-list__price\">").concat(normalPrice(item.price), " \u0440</span>\n              </div>\n              <button class=\"product-list__status btn-reset\">\n                <span class=\"product-list__add\"></span>\n                <span class=\"product-list__added\"></span>\n              </button>\n            </article>\n          </li>\n          ");
        }
      }

      var cartStatusBtn = document.querySelectorAll('.product-list__status');
      cartStatusBtn.forEach(function (el) {
        el.addEventListener('click', function (e) {
          var self = e.currentTarget;
          var addToCart = self.querySelector('.product-list__add');
          var addedToCart = self.querySelector('.product-list__added');
          self.classList.toggle('csrt-status-change');

          if (self.classList.contains('csrt-status-change')) {
            addToCart.style.display = 'none';
            addedToCart.style.display = 'block';
          } else {
            addToCart.style.display = 'block';
            addedToCart.style.display = 'none';
          }
        });
      });
    });
  };

  loadProducts(prodQuantity);
  loadMore.addEventListener('click', function (e) {
    prodQuantity = prodQuantity + 4;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      loadProducts(prodQuantity);
      loadMoreIcon.style.animationName = 'ball_moveGg';
    }, 4000);

    if (prodQuantity >= dataLength) {
      loadMore.style.display = 'none';
      loadMoreIcon.style.display = 'none';
    } else {
      loadMore.style.display = 'block';
      loadMoreIcon.style.display = 'block';
      loadMoreIcon.style.animationName = 'ball_moveG';
    }
  });
}
"use strict";

var rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [0, 5000],
    connect: true,
    step: 1,
    range: {
      'min': [0],
      'max': [10000]
    }
  });
  var input0 = document.getElementById('input-0');
  var input1 = document.getElementById('input-1');
  var inputs = [input0, input1];
  rangeSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

  var setRangeSlider = function setRangeSlider(i, value) {
    var arr = [null, null];
    arr[i] = value;
    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach(function (el, index) {
    el.addEventListener('change', function (e) {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}
"use strict";

var catalogListBtn = document.querySelector('.catalog-list__btn');
var catalogList = document.querySelector('.catalog-list');

if (catalogList) {
  catalogListBtn.addEventListener('click', function (e) {
    catalogListBtn.classList.toggle('catalog-list__btn--active');
    catalogList.classList.toggle('catalog-list--visible');
  });
}
"use strict";

// slider-hero
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
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var mainListLinkArr = document.getElementsByClassName('main-list__link');
var mainListLink = document.querySelectorAll('.main-list__link');
var breadcrumbsTitle = document.querySelector('.product-title');
var catalogHeading = document.querySelector('.catalog-hero__heading');
var pageParams = new URLSearchParams(location.search);
var postPage = pageParams.get('heading');

if (breadcrumbsTitle) {
  breadcrumbsTitle.innerHTML = postPage;
  catalogHeading.innerHTML = postPage;
}

for (var i = 0; i < mainListLinkArr.length; i++) {
  var _iterator = _createForOfIteratorHelper(mainListLinkArr),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var link = _step.value;
      link.setAttribute('href', "catalog.html?heading=".concat(postPage));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function setHeading() {
  this.setAttribute('href', "catalog.html?heading=".concat(this.innerHTML.trim()));
}

mainListLink.forEach(function (e) {
  return e.addEventListener('click', setHeading);
});
"use strict";

// /**
//   * название функции
//   *
//   * @param {number} first - первое число
//   * @returns {number}
//   */
// filter-select
if (document.querySelector('.catalog-hero-status__select')) {
  var element = document.querySelector('.catalog-hero-status__select');
  var choices = new Choices(element, {
    searchEnabled: false
  });
}
//# sourceMappingURL=main.js.map
