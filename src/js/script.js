import $ from 'jquery';
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

    visible() {
      this.element.style.display = "flex";
      setTimeout(() => {
        this.element.style.opacity = "1";
      }, 10);
    }

    hidden() {
      setTimeout(() => {
        this.element.style.display = "none";
      }, 350);
      this.element.style.opacity = "0";
    }
  }

  class RightSlideToggle {
    constructor(element) {
      this.element = element;
    }

    slideIn() {
      this.element.style.transform = "translateX(0%)";
    }

    slideOut() {
      this.element.style.transform = "translateX(100%)";
    }
  }

  function makeSideBar() {
    const menu = document.getElementById("menu");
    const toggleButton = document.getElementById("header-toggle");
    const blackOut = document.querySelector(".blackout");
    const blackOutToggle = new VisibleToggle(blackOut);
    const menuToggle = new RightSlideToggle(menu);

    if (!menu || !toggleButton || !blackOut) {
      console.error("Menu, toggle button, or blackout element not found.");
      return;
    }

    blackOut.addEventListener("click", () => {
      blackOutToggle.hidden();
      menuToggle.slideOut();
      toggleButton.checked = false;
    });

    toggleButton.addEventListener("change", () => {
      if (toggleButton.checked) {
        menuToggle.slideIn();
        blackOutToggle.visible();
      } else {
        menuToggle.slideOut();
        blackOutToggle.hidden();
      }
    });
  }

  makeDropdown();
  stepSelect();
  noUpdateSite();
  scrollBlur();
  makeSideBar();
  dragEllipse();

});
