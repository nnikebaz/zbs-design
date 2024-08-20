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
      const prevActiveItem = document.querySelector(".way-section__right.active");
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

    stepButtons.forEach(btn => btn.addEventListener('click', function(event) {
      event.preventDefault()

      changeBorder(btn)
      makeActiveContent(btn)
      updateDropdownText(btn)
    }))

  }

  function noUpdateSite() {
    $("form").submit(function (event) {
      event.preventDefault();
    });
  }

  function validate() {
    function maskNumber() {
      $("#phone").mask("+7(000)000-00-00");
    }

    maskNumber();

    $(".validate").validate({
      rules: {
        name: {
          required: true,
          minlength: 3,
        },
        phone: {
          required: true,
          minlength: 16,
        },
      },
      messages: {
        name: "Пожалуйста, заполните своё имя.",
        phone: "Пожалуйста, заполните корректно номер телефона.",
      },
      highlight: function (element) {
        $(element).addClass("inputError");
      },
      unHighlight: function (element) {
        $(element).removeClass("inputError");
      },
    });

    $("#btn-form").click(function () {
      console.log($("form").valid());
    });
  }

  function Smooth() {
    SmoothScroll({
      // Время скрола 400 = 0.4 секунды
      animationTime: 400,
      // Размер шага в пикселях
      stepSize: 75,

      // Дополнительные настройки:

      // Ускорение
      accelerationDelta: 30,
      // Максимальное ускорение
      accelerationMax: 2,

      // Поддержка клавиатуры
      keyboardSupport: true,
      // Шаг скролла стрелками на клавиатуре в пикселях
      arrowScroll: 50,

      // Pulse (less tweakAble)
      // ratio of "tail" to "acceleration"
      pulseAlgorithm: true,
      pulseScale: 4,
      pulseNormalize: 1,

      // Поддержка тачпада
      touchpadSupport: true,
    });
  }

  function dragEllipse() {
    let parallaxScene1 = document.getElementById("parallax-scene-1");
    let parallaxInstance1 = new Parallax(parallaxScene1, {
      limitX: false,
      limitY: false,
      scalarX: 20,
      scalarY: 60,
      invertX: false,
      invertY: false,
    });
    let parallaxScene2 = document.getElementById("parallax-scene-2");
    let parallaxInstance2 = new Parallax(parallaxScene2, {
      limitX: 150,
      limitY: false,
      scalarX: 5,
      scalarY: 20,
      invertX: false,
      invertY: false,
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

  function scrollBlur() {
    window.addEventListener('scroll', function() {
      // Получаем текущее положение скролла
      let scrollPosition = window.scrollY;
  
      // Пороговое значение для смены положения и добавления blur
      let threshold = 700;
  
      // Получаем элемент background
      let bg = document.querySelector('.bg');
  
      // Если скролл превышает пороговое значение, меняем позицию на absolute и добавляем blur
      if (scrollPosition > threshold) {
          bg.style.transform = 'scale(1.2)';
          bg.style.filter = 'blur(5px)';
  
      } else {
          bg.style.filter = `blur(0)`;
          bg.style.transform = 'scale(1)';
      }
  });
  }

  class visibleToggle {
    constructor(element) {
      this.element = element;
    }

    visible() {
      this.element.style.display = "flex"; 
      setTimeout(() => {
        this.element.style.opacity = "1";
      }, 10)
    }

    hidden () {
      setTimeout(() => {
        this.element.style.display = "none";
      }, 500)
      this.element.style.opacity = "0";
    }
  }

  function toggleVisibleMenu() {
    const menu = new visibleToggle(document.getElementById("menu"));
    const toggle =  document.getElementById("header-toggle")
    console.log(menu, toggle)

    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        menu.visible();
        console.log("toggle pos checked")
      } else {
        menu.hidden();
        console.log("toggle pos unchecked")
      }
    })
  }

  makeDropdown();
  stepSelect();
  noUpdateSite();
  validate();
  Smooth();
  dragEllipse();
  scrollBlur();
  toggleVisibleMenu();
});
