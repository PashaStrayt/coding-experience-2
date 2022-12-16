function getByClass(className) {
  return document.getElementsByClassName(className);
}

let lastMethod = 'all';
function sortWorks(event, method) {
  if (method === lastMethod) return;

  getByClass('section-works__filter-button--active')[0]
    .classList.toggle('section-works__filter-button--active');
  event.target.classList.toggle('section-works__filter-button--active');

  let index = 1;
  let display;
  let queryClass;
  if (method === 'all') queryClass = 'section-works__item'
  else if (method === 'posters') queryClass = 'section-works__item--poster'
  else if (method === 'coding') queryClass = 'section-works__item--coding'
  let worksList = getByClass('section-works__item');
  for (let work of worksList) {
    if (work.classList.contains(queryClass)) display = 'block'
    else display = 'none';

    work.setAttribute('style', `display: ${display}`);
    work.classList.remove(`section-works__item--poster--${index}`);
    work.classList.remove(`section-works__item--coding--${index}`);
    work.classList.add(`${queryClass}--${index}`);

    index++;
  }

  if (globalThis.innerWidth <= 1470) {
    worksList[2].setAttribute('style', 'display: none');
  }

  if (globalThis.innerWidth <= 768) {
    worksList[6].setAttribute('style', 'display: none');
  }

  lastMethod = method;
}

function swipeReviewsDesktop(side) {
  let firstClass = 'section-reviews__item--first-order';
  let activeClass = 'section-reviews__item--active';
  let thirdClass = 'section-reviews__item--third-order';

  let first = getByClass(firstClass)[0].classList;
  let active = getByClass(activeClass)[0].classList;
  let third = getByClass(thirdClass)[0].classList;

  if (side === 'left') {
    third.toggle(thirdClass);
    third.toggle(activeClass);

    active.toggle(activeClass);
    active.toggle(firstClass);

    first.toggle(firstClass);
    first.toggle(thirdClass);
  }
  else if (side === 'right') {
    third.toggle(thirdClass);
    third.toggle(firstClass);

    active.toggle(activeClass);
    active.toggle(thirdClass);

    first.toggle(firstClass);
    first.toggle(activeClass);
  }
}

let startPointX;
let currentTranslateX;
let lastTranslateX = 0;

const list = getByClass('section-reviews__list')[0];
const slider = getByClass('section-reviews__slider')[0];

let sliderWidth;
setSliderWidth();
globalThis.addEventListener('resize', setSliderWidth);
function setSliderWidth() {
  let width = globalThis.innerWidth;
  if (width <= 890) manageEventListener(true)
  else manageEventListener(false);
  if (490 < width && width <= 890) sliderWidth = 462;
  else if (width <= 490) sliderWidth = 300;
}

function manageEventListener(condition) {
  if (condition) {
    slider.addEventListener('pointerdown', swipeStart);
    slider.addEventListener('pointerup', swipeEnd);
  } else {
    slider.removeEventListener('pointerdown', swipeStart);
    slider.removeEventListener('pointerup', swipeEnd);
  }
}

function swipeStart(event) {
  slider.addEventListener('pointermove', swipeReviewsMobile);
  startPointX = event.clientX;
}

function swipeEnd() {
  slider.removeEventListener('pointermove', swipeReviewsMobile);
  lastTranslateX = currentTranslateX;
  let remainder = lastTranslateX % sliderWidth;
  if (remainder !== 0) {
    if (-remainder < sliderWidth * 0.6) {
      lastTranslateX -= lastTranslateX % sliderWidth;
    } else {
      lastTranslateX -= lastTranslateX % sliderWidth + sliderWidth;
    }
    list.classList.toggle('section-reviews__list--transition');
    setTranslateX(lastTranslateX);
    setTimeout(() => list.classList.toggle('section-reviews__list--transition'), 300);
  }
}

function swipeReviewsMobile(event) {
  let checkValidTranslate = lastTranslateX + event.clientX - startPointX;
  if (-sliderWidth * 3 + sliderWidth / 2 <= checkValidTranslate && checkValidTranslate <= sliderWidth / 2) {
    currentTranslateX = checkValidTranslate;
  }
  setTranslateX(currentTranslateX);
}

function setTranslateX(translate) {
  list.setAttribute('style', `transform: translateX(${translate}px)`);
}

// Модальное окно

const showModalWindow = () => {
  document.getElementsByClassName('modal-window')[0].classList.toggle('modal-window--active');
}