//переключение активнных пунктов меню
const MENU = document.querySelector('.navigation__list');
MENU.querySelectorAll('a');
MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach;
        MENU.classList.remove('.navigation__item--current');
    
}
);

var linkNav = MENU.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 1;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение

        this.classList.add('navigation__item--current');
        var w = window.pageYOffset,  // производим прокрутку
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}



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
