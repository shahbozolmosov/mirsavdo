$(document).ready(function () {
  //History prev btn
  $(".history-prev").click(() => window.history.back());
  //Swiper gallery
  var galleryThumbs = new Swiper(".gallery-thumbs", {
    centeredSlides: true,
    centeredSlidesBounds: true,
    slidesPerView: 3,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: "vertical",
  });

  var galleryMain = new Swiper(".gallery-main", {
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    preventInteractionOnTransition: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  });

  galleryMain.on("slideChangeTransitionStart", function () {
    galleryThumbs.slideTo(galleryMain.activeIndex);
  });

  galleryThumbs.on("transitionStart", function () {
    galleryMain.slideTo(galleryThumbs.activeIndex);
  });

  //Slider
  let width = true;
  if (screen.width < 480) {
    width = false;
  }
  $(".slick-slider").slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000,
    variableWidth: width,
    prevArrow:
      "<button class='btn arrow-btn btn-prev'><i class='fas fa-angle-left'></i></button>",
    nextArrow:
      "<button class='btn arrow-btn btn-next'><i class='fas fa-angle-right'></i></button>",
  });
  $(".slider-head").slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000,
    variableWidth: true,
    prevArrow:
      "<button class='btn arrow-btn btn-prev'><i class='fas fa-angle-left'></i></button>",
    nextArrow:
      "<button class='btn arrow-btn btn-next'><i class='fas fa-angle-right'></i></button>",
  });
  // Window scroll
  $(window).on("scroll", function () {
    if (document.documentElement.scrollTop > 0)
      $(".auto-content").addClass("site-top");
    else $(".auto-content").removeClass("site-top");
  });

  //Categore modal
  const categoreBtn = document.querySelector(".categore-btn"),
    categoreBtnIcon = document.querySelector(".categore-btn > i"),
    body = document.querySelector("body"),
    overlay = document.querySelector(".overlay");
  let searchInput = document.querySelector("#search-input"),
    searchBtn = document.querySelector("#search-btn");

  if (categoreBtn) {
    categoreBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);

    function toggleMenu() {
      $(categoreBtnIcon).toggleClass("fa-times");
      $(".large-menu").toggle();
      $(".overlay").toggle();
      stopScroll();
    }

    searchBtn.addEventListener("click", function () {
      searchInput.classList.toggle("open");
      this.classList.toggle("active");
    });
  }

  $(".dropdown-toggle").click(() => stopScroll());
  function stopScroll() {
    body.classList.toggle("stop-scrolling");
  }

  //Add Card to select basket and basket
  const bookmarkCart = document.querySelectorAll(".bookmark-basket");
  const selectCart = document.querySelectorAll(".select-basket");
  const btn = document.querySelectorAll(".heart");
  let count = {
    bookmark: 0,
    select: 0,
  };
  const dataSelect = [];

  // function running
  btn.forEach((item) => {
    item.addEventListener("click", addCartAnim);
  });

  //if add to cart btn clicked
  function addCartAnim() {
    let cartType = $(this).attr("id");
    let cart = $(bookmarkCart);
    if (cartType == "select") {
      cart = $(selectCart);
    }
    let val = dataId($(this).parent(".card"), cartType);
    if (!dataSelect.includes(val)) {
      $(this).addClass("active");
      // find the img of that card which button is clicked by user
      let imgtodrag = $(this).parent(".card").find("img").eq(0);
      if (imgtodrag) {
        // duplicate the img
        var imgclone = imgtodrag
          .clone()
          .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left,
          })
          .css({
            opacity: "0.8",
            position: "absolute",
            height: "150px",
            width: "150px",
            "z-index": "1053",
          })
          .appendTo($("body"))
          .animate(
            {
              top: cart.offset().top + 20,
              left: cart.offset().left + 30,
              width: 75,
              height: 75,
            },
            1000,
            "easeInOutExpo"
          );

        setTimeout(function () {
          if (cartType == "bookmark") {
            count.bookmark++;
            $(".bookmark-basket .count").text(count.bookmark);
          } else {
            count.select++;
            $(".select-basket .count").text(count.select);
          }
        }, 1200);

        imgclone.animate(
          {
            width: 0,
            height: 0,
          },
          function () {
            $(this).detach();
          }
        );
      }
      dataSelect.push(val);
    } else {
      let index = dataSelect.indexOf(val);
      dataSelect.splice(index, 1);
      if (cartType == "bookmark") {
        count.bookmark--;
        $(".bookmark-basket .count").text(count.bookmark);
      } else {
        count.select--;
        $(".select-basket .count").text(count.select);
      }
      $(this).removeClass("active");
    }
  }

  function dataId(a, b) {
    let idVal = a.attr("data-id") + b;
    return idVal;
  }

  const cartButtons = document.querySelectorAll(".cart-button");

  cartButtons.forEach((button) => {
    button.addEventListener("click", cartClick);
  });

  function cartClick() {
    let button = this;
    button.classList.add("clicked");
  }

  // Disable form submissions if there are invalid fields
  (function () {
    "use strict";
    window.addEventListener(
      "load",
      function () {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  })();

  let readUrl = function (input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $("#upload-img").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  $("#upload-file").on("change", function () {
    readUrl(this);
  });

  $("#upload-btn").on("click", function () {
    $("#upload-file").click();
  });

  // stream
  const copyBtn = document.querySelectorAll("button[id='stream-copy']");
  $("span.delete").click(function () {
    $(this).parent("div").parent("div").parent("div").remove();
  });
  if (copyBtn) {
    copyBtn.forEach(function (e) {
      e.addEventListener("click", copyInputValue);
    });
  }
  function copyInputValue() {
    let element = $(this)
      .parent(".card-footer")
      .prev(".card-body")
      .children(".form-copy-input")
      .children("input");
    copyToClipboard(element);
  }
  function copyToClipboard(element) {
    let input = element;
    input.select();
    document.execCommand("copy");
  }

  // carousel
  const carousel = document.querySelector("#carousel");
  if (carousel) {
    const carouselInnerItemImg = carousel.querySelectorAll(
      "#carousel .carousel-item img"
    );

    let carouselIndicatorItemActive = false;
    let carouselIndicatorItemCount = 0;
    let carouselIndicator = document.createElement("ul");
    carouselIndicator.classList.add("carousel-indicators");

    carouselInnerItemImg.forEach(function (e) {
      let src = e.getAttribute("src");

      let carouselIndicatorItem = document.createElement("li");
      carouselIndicatorItem.setAttribute("data-target", "#" + carousel.id);
      carouselIndicatorItem.setAttribute(
        "data-slide-to",
        carouselIndicatorItemCount
      );
      if (!carouselIndicatorItemActive) {
        carouselIndicatorItem.classList.add("active");
        carouselIndicatorItemActive = !carouselIndicatorItemActive;
      }

      let img = document.createElement("img");
      img.setAttribute("src", src);
      carouselIndicatorItemCount++;

      carouselIndicatorItem.appendChild(img);
      carouselIndicator.appendChild(carouselIndicatorItem);
      carousel.appendChild(carouselIndicator);
    });
  }
});
