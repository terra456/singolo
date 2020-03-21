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
var submit = document.querySelector('.btn-submit');
var popup = document.querySelector(".modal");

submit.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
    console.log('cl sm');
});

var close = popup.querySelector(".modal-close");
close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    
});
