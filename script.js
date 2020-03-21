//подсветка пунктов меню при переходе в данную секцию
document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const cursorPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    const menuLinks = document.querySelectorAll('.navigation__list a');

    sections.forEach((el) => {
        if (el.offsetTop <= cursorPosition && (el.offsetTop + el.offsetHeight) > cursorPosition) {
            menuLinks.forEach((a) => {
                a.classList.remove('navigation__item--current');
                if (el.getAttribute('id')===a.getAttribute('href').substring(1)) {
                    a.classList.add('navigation__item--current');
                }
            })
        }
    });
}

//change phone display
const phone = document.querySelectorAll('.phone');
// const phoneDisplay = phone.querySelector('.phone__display');

phone.forEach((el) => {
    el.addEventListener('click', function (event) {
        console.log('cl sm');
        const phoneDisplay = el.querySelector('.phone__display');
        phoneDisplay.classList.toggle("hidden");
})
});


//переключение активнных пунктов меню
const TAGS = document.querySelector('.portfolio__tags');
const portfolio = document.querySelector('.portfolio__items');
const portfolioItems = document.querySelector('.portfolio__items').children;
const arrPortfolioItems = Array.from(portfolioItems);

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
};

TAGS.addEventListener('click', (event) => {
    TAGS.querySelectorAll('li').forEach(el => el.classList.remove('portfolio__tag--active'));
        event.target.classList.add('portfolio__tag--active');

    shuffle(arrPortfolioItems); //перемешивает картинки
    portfolio.appendChild(arrPortfolioItems[0]);

}
);

//рамки вокруг изображений
const portfolioImg = document.querySelectorAll('.portfolio__item')
portfolioImg.forEach((el) => {
    el.addEventListener('click', function(event) {
        event.preventDefault();
        el.classList.toggle("portfolio__item--border");
})

});


//открвывает модалку по клику на сабмит
const submit = document.querySelector('.btn-submit');
const popup = document.querySelector(".modal");
const modalText = document.querySelector('.modal-description');
const form = document.querySelector('.feedback__form');
const subject = form.querySelector('input[name=subject]');
const desk = form.querySelector('textarea');




submit.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");

    //заполнение значений в модальном окне p.textContent = форма.имя-инпута.value

    if (subject.value === '') {
        subjectValue = 'No subject';
    } else {
        subjectValue = 'Subject: ' + subject.value;
    }

    if (desk.value === '') {
        deskValue = 'No description';
    } else {
        deskValue = 'Description: ' + desk.value;
    }

    const res = 'The letter was sent <br>' + subjectValue + '<br>' + deskValue;
    modalText.innerHTML = res;


});

//modal close and reset form
var close = popup.querySelector(".modal-close");
close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");

    form.reset();
});


//slider
let items = document.querySelectorAll('.slider__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('slider__item--active', direction);

    });
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        console.log('eihfewk');
        this.classList.remove('next', direction);
        this.classList.add('slider__item--active');
        isEnabled = true;

    });
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

document.querySelector('.slider__btn-arrow--left').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.querySelector('.slider__btn-arrow--right').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem);
    }
});

const swipedetect = (el) => {

    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;

    surface.addEventListener('mousedown', function(e){
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    surface.addEventListener('mouseup', function(e){
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
                if ((distX > 0)) {
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }
        e.preventDefault();
    }, false);

    surface.addEventListener('touchstart', function(e){
        if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
            if (e.target.classList.contains('left')) {
                if (isEnabled) {
                    previousItem(currentItem);
                }
            } else {
                if (isEnabled) {
                    nextItem(currentItem);
                }
            }
        }
        var touchobj = e.changedTouches[0];
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    surface.addEventListener('touchmove', function(e){
        e.preventDefault();
    }, false);

    surface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
                if ((distX > 0)) {
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }
        e.preventDefault();
    }, false);
}

var el = document.querySelector('.slider');
swipedetect(el);


