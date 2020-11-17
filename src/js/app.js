// Animate when scrolled to that position
(function() {
  var elements;
  var windowHeight;

  function init() {
    elements = document.querySelectorAll('.hidden');
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= -10) {
        element.classList.add('slideInUp');
        element.classList.remove('hidden');
      }
    }
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);

  init();
  checkPosition();
})();

// Sticky header
const mainHeader = document.getElementById('mainHeader');
var sticky = window.innerHeight;
window.addEventListener('scroll', makeHeaderSticky);
function makeHeaderSticky() {
  if (window.pageYOffset > sticky) {
    mainHeader.classList.add("sticky");
  } else {
    mainHeader.classList.remove("sticky");
  }
}

// Hamburger Icon
const hamburgerIcon = document.querySelector('.hamburger-icon');
const mainNav = document.querySelector(".collapse-nav");
let isNavOpen = false;

hamburgerIcon.addEventListener('click', () => {
  if(!isNavOpen) {
    mainNav.style.display = "flex";
    hamburgerIcon.classList.add('close-icon');
    isNavOpen = true;
  }

  else {
    mainNav.style.display = "none";
    hamburgerIcon.classList.remove('close-icon');
    isNavOpen = false;
  }

});

// Modal

const investNowBtn = document.getElementById('investNow');
const modal = document.querySelector('.modal');
const closeModal = document.getElementById('closeModal');
const myVideo = document.getElementById('myvideo');
let isClose = true;


function toggleModal() {
  if (isClose) {
    modal.style.display = "flex";
    isClose = false;
  }
  else {
    modal.style.display = "none";
    isClose = true;
  }
}
investNowBtn.addEventListener('click', () => {
  console.log("hello im invest now event listener");
  toggleModal();
})

closeModal.addEventListener('click', () => {
  let myVideoSrc = myVideo.src;
        myVideo.src = myVideoSrc;
  toggleModal();
})

// Show and hide investment Process Steps
const investmentProcess = document.getElementById('investmentProcess');

let currentlyShownStep = document.querySelector('.steps').children[0];
investmentProcess.addEventListener('click', (e) => {
  let li = e.target.closest('li');
  if (e.target && e.target.closest('li')) {
    let noOfStepsSelected = Array.prototype.indexOf.call(investmentProcess.children, li) + 1;


    for (let i = 0; i < investmentProcess.childElementCount; i++) {
      let listItem = investmentProcess.children[i];
      if (i < noOfStepsSelected) {
        listItem.classList.add('active');
      }
      else if (listItem.classList.contains('active')) {
        listItem.classList.remove('active');
      }
    }
    let step = document.querySelector('.investment-step' + noOfStepsSelected);
    if (!step.classList.contains('show-step')) {
      currentlyShownStep.classList.remove('show-step');
      step.classList.add('show-step');
      currentlyShownStep = step;
    }
  }
})

// Review Carousel

const carousel = document.querySelector('.carousel');
const moveLeft = document.getElementById('moveLeft');
const moveRight = document.getElementById('moveRight');

const FlexSlider = {
  // total no of items
  num_items: carousel.childElementCount,

  // position of current item in view
  current: 1,

  init: function () {
    // set CSS order of each item initially
    [...carousel.children].forEach(function (element, index) {
      element.style.order = index + 1;
    });

    this.addEvents();
  },

  addEvents: function () {
    var that = this;

    // click on move item button
    moveRight.addEventListener('click', () => {
      moveLeft.classList.remove('active');
      moveRight.classList.add('active');
      this.gotoNext();
    });
    moveLeft.addEventListener('click', () => {
      moveRight.classList.remove('active');
      moveLeft.classList.add('active');
      this.gotoPrev();
    });

    // after each item slides in, slider container fires transitionend event
    carousel.addEventListener('transitionend', () => {
      this.changeOrder();
    });
  },

  changeOrder: function () {
    // change current position
    if (this.current == this.num_items)
      this.current = 1;
    else
      this.current++;

    let order = 1;

    // change order from current position till last
    for (let i = this.current; i <= this.num_items; i++) {
      document.querySelector(".review[data-position='" + i + "']").style.order = order;
      order++;
    }

    // change order from first position till current
    for (let i = 1; i < this.current; i++) {
      document.querySelector(".review[data-position='" + i + "']").style.order = order;
      order++;
    }

    // translate back to 0 from -100%
    // we don't need transitionend to fire for this translation, so remove transition CSS
    carousel.classList.remove('slider-transition');
    carousel.style.transform = 'translateX(0)';
  },

  gotoNext: function () {
    // translate from 0 to -100% 
    // we need transitionend to fire for this translation, so add transition CSS
    carousel.classList.add('slider-transition');
    carousel.style.transform = 'translateX(-408px)';
  },

  gotoPrev: function () {
    // translate from 0 to -100% 
    // we need transitionend to fire for this translation, so add transition CSS
    carousel.classList.add('slider-transition');
    carousel.style.transform = 'translateX(408px)';
  }
};

FlexSlider.init();


const button = document.querySelector(".btn-hover");

button.addEventListener('click', () => {
  console.log("undefined button");
})