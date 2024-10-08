import $, { event } from 'jquery';
import Parallax from 'parallax-js';

$(document).ready(function () {

  const mediaQuery = {
    xs: window.matchMedia("(max-width:  575.98px)"),
    sm: window.matchMedia("(max-width:  767.98px)"),
    md: window.matchMedia("(max-width:  991.98px)"),
    lg: window.matchMedia("(max-width:  1199.98px)"),
    xl: window.matchMedia("(max-width:  1399.98px)"),
    big: window.matchMedia("(min-width:  991.98px)"),
  };

  function stepSelect() {
    const stepButtons = document.querySelectorAll(".way-section__left-name");
    const dropdownToggle = document.querySelector(".dropdown-toggle");

    const changeBorder = (btn) => {
      if (mediaQuery.big.matches) {
        stepButtons.forEach((item) => item.classList.remove("active-border"));
        btn.classList.add("active-border");
      }
    };
    const makeActiveContent = (btn) => {
      const prevActiveItem = document.querySelector(
        ".way-section__right.active"
      );
      if (prevActiveItem) {
        prevActiveItem.classList.remove("active");
      }
      const dataTargetItem = btn.getAttribute("data-target");
      const contentItem = document.getElementById(dataTargetItem);
      contentItem.classList.add("active");
    };
    const updateDropdownText = (btn) => {
      dropdownToggle.textContent = btn.textContent;
    };

    stepButtons.forEach((btn) =>
      btn.addEventListener("click", function (event) {
        event.preventDefault();

        changeBorder(btn);
        makeActiveContent(btn);
        updateDropdownText(btn);
      })
    );
  }

  function noUpdateSite() {
    $("form").submit(function (event) {
      event.preventDefault();
    });
  }

  function makeDropdown() {
    const dropdown = document.querySelector(".way-section__left");
    const dropdownMenu = document.querySelector(".tabs");
    const dropdownItem = document.querySelectorAll(".way-section__left-name");

    const addClassForDropdown = () => {
      if (mediaQuery.xs.matches) {
        dropdown.classList.add("dropdown");
        dropdownMenu.classList.add("dropdown-menu");
        dropdownItem.forEach((element) =>
          element.classList.add("dropdown-item")
        );
      } else {
        dropdown.classList.remove("dropdown");
        dropdownMenu.classList.remove("dropdown-menu");
        dropdownItem.forEach((element) =>
          element.classList.remove("dropdown-item")
        );
      }
    };
    addClassForDropdown(mediaQuery);
    mediaQuery.xs.addEventListener("change", addClassForDropdown);
  }

  // Инициализация Parallax после загрузки документа
  function dragEllipse() {
      let parallaxScene1 = document.getElementById("parallax-scene-1");
      if (parallaxScene1) {
          new Parallax(parallaxScene1, {
              limitX: false,
              limitY: false,
              scalarX: 20,
              scalarY: 60,
              invertX: false,
              invertY: false,
          });
      }
      let parallaxScene2 = document.getElementById("parallax-scene-2");
      if (parallaxScene2) {
          new Parallax(parallaxScene2, {
              limitX: 150,
              limitY: false,
              scalarX: 5,
              scalarY: 20,
              invertX: false,
              invertY: false,
          });
      }
  }


  function scrollBlur() {
    window.addEventListener("scroll", function () {
      // Получаем текущее положение скролла
      let scrollPosition = window.scrollY;

      // Пороговое значение для смены положения и добавления blur
      let threshold = 700;

      // Получаем элемент background
      let bg = document.querySelector(".bg");

      // Если скролл превышает пороговое значение, меняем позицию на absolute и добавляем blur
      if (scrollPosition > threshold) {
        bg.style.transform = "scale(1.2)";
        bg.style.filter = "blur(5px)";
      } else {
        bg.style.filter = `blur(0)`;
        bg.style.transform = "scale(1)";
      }
    });
  }

  class VisibleToggle {
    constructor(element) {
      this.element = element;
    }

    displayFlex() {
      this.element.style.display = "flex";
    }

    displayNoneTimeOut350() {
      setTimeout(() => {
        this.element.style.display = "none";
      }, 350);
    }

    displayBlockOpacity1() {
      this.element.style.display = "block"
      setTimeout(() => {
        this.element.style.opacity = "1"
      }, 10)
    }

    displayNoneOpacity0() {
      this.element.style.opacity = '0'
      setTimeout(() => {
        this.element.style.display = "none"
      }, 300)
    }
  }

  class RightSlideToggle {
    constructor(element) {
      this.element = element;
    }

    slideIn() {
      setTimeout(() => {
        this.element.style.transform = "translateX(0%)";
      }, 10)
    }

    slideOut() {
      this.element.style.transform = "translateX(100%)";
    }
  }

  function makeSideBar() {
    const menu = document.getElementById("menu");
    const checkbox = document.querySelector(".header-section__toggle");
    const blackOut = document.querySelector(".blackout");
    const toggleButton = document.querySelector('.header-section__button')
    const toggleButtonClose = document.querySelector('.header-section__button_close')
    const menuItem = document.querySelectorAll('.header-section__link')
    const blackOutToggle = new VisibleToggle(blackOut);
    const menuVisibleToggle = new VisibleToggle(menu);
    const menuSlideToggle = new RightSlideToggle(menu);


    if (!menu || !toggleButton || !blackOut) {
      console.error("Menu, toggle button, or blackout element not found.");
      return;
    }

    const inertToggle = {
      logoAndButton: document.querySelector('.header-section__wrapper'),
      main: document.querySelector('main'),
      footer: document.querySelector('footer'),
      
      on: function () {
        if (!this.logoAndButton || !this.main || !this.footer) {
          console.error('logo, main or footer not found.')
          return;
        }
        this.logoAndButton.inert = true;
        this.main.inert = true;
        this.footer.inert = true;
      },
      off: function () {
        if (!this.logoAndButton || !this.main || !this.footer) {
          console.error('logo, main or footer not found.')
          return;
        }
        this.logoAndButton.inert = false;
        this.main.inert = false;
        this.footer.inert = false;      }
    }

    function menuSlide(checkboxElement) {
      if (checkboxElement) {
        menuVisibleToggle.displayFlex();
        menuSlideToggle.slideIn();
        blackOutToggle.displayBlockOpacity1();
        inertToggle.on()
      } else {
        menuVisibleToggle.displayNoneTimeOut350();
        menuSlideToggle.slideOut();
        blackOutToggle.displayNoneOpacity0();
        inertToggle.off()
      }
    }

    checkbox.addEventListener('change', () => {
      menuSlide(checkbox.checked)
    })

    toggleButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        checkbox.checked = !checkbox.checked
        menuSlide(checkbox.checked)
      } else if (event.key === 'Escape') {
        checkbox.checked = false
        menuSlide(checkbox.checked)
      }
    })

    toggleButtonClose.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        checkbox.checked = !checkbox.checked
        menuSlide(checkbox.checked)
      } else if (event.key === 'Escape') {
        checkbox.checked = false
        menuSlide(checkbox.checked)
      }
    })

    blackOut.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;
      menuSlide(checkbox.checked)
    });

    menuItem.forEach(item => item.addEventListener('click', () => {
      checkbox.checked = !checkbox.checked
      menuSlide(checkbox.checked)
    }))

  }

  makeDropdown();
  stepSelect();
  noUpdateSite();
  scrollBlur();
  makeSideBar();
  dragEllipse();

});
