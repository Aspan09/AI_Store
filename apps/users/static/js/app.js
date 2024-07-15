// Scripts for document at the bottom of file!

// Prevent typing alphabetic characters in a number input on Firefox browser
const numberInputs = document.querySelectorAll('input[type="number"]');

numberInputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.keyCode != 46 && e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) {
            e.preventDefault()
        }
    })
})

// Correct width of select-city according text length
const selectCity = document.querySelector('#select-city-menu')

let longestOptionWidth;

selectCity.addEventListener('change', function() {
    longestOptionWidth = selectCity.value.length

    selectCity.style.width = (longestOptionWidth * 8) + 'px'
})

// Change search's placeholder
const headerSearchInput = document.querySelector('.header__search-input')
const breakpointForInput = 640;

if(window.innerWidth <= breakpointForInput) {
    headerSearchInput.placeholder = "Поиск по сайту"
};

// Focus on search input when clicking search button
const headerSearchBtn = document.querySelector('.header__search-btn')

headerSearchBtn.onclick = function(){
    headerSearchInput.focus()
}

// Dropdown Menu
const dropdownMenu = document.querySelector('.dropdown-menu__list');
const dropdownMenuBtn = document.querySelector('.dropdown-menu__btn');

dropdownMenuBtn.addEventListener('click', function(e){
    dropdownMenu.classList.toggle('dropdown-menu__list--active');
    e.stopPropagation()
})

dropdownMenu.onclick = (e) => e.stopPropagation()

// Product category switcher
const tabButtons = document.querySelectorAll('.tabs__btn');

for (let btn of tabButtons){
    btn.addEventListener('click', function () {

        tabButtons.forEach((el) => el.classList.remove('tabs__btn--active'));
        this.classList.add('tabs__btn--active');
    })
}

// Add the checkmark of custom checkbox
const customCheckbox = document.querySelector('.contact__checkbox-custom')
const customCheckboxCheckmark = document.querySelector('.contact__checkbox-checkmark')
const customCheckboxLabel = document.querySelector('.contact__send-label')


if(customCheckboxLabel){
    customCheckboxLabel.onclick = function(){
        customCheckboxCheckmark.classList.toggle('none')
    }
}

if(customCheckbox){
    customCheckbox.onclick = function(){
        customCheckboxCheckmark.classList.toggle('none')
    }
}

// Create mini nav component 
const miniNav = document.querySelector('.mini-nav')

if(window.innerWidth <= breakpointForInput) {
    miniNav.style.display = "flex"
};

// Create footer accordeon 
const footerAccIcon = document.querySelectorAll('.footer__acc-icon')
const footerAccBtn = document.querySelectorAll('.footer__acc-btn')
const footerList = document.querySelectorAll('.footer__list')
const accordeonBreakpoint = 470

if (window.innerWidth <= accordeonBreakpoint){
    footerAccIcon.forEach(icon => {
        icon.style.display = "block"
    })

    footerAccBtn.forEach(btn => {

        btn.addEventListener('click', function(){
            
            footerList.forEach(list => {
                list.classList.remove('footer__list--active')
            })

            footerAccIcon.forEach(icon => {
                icon.classList.remove('footer__acc-icon--rotate')
            })

            this.querySelector('.footer__acc-icon').classList.toggle('footer__acc-icon--rotate')
            this.closest('.footer__box').querySelector('.footer__list').classList.toggle('footer__list--active')

        })
        
    })
}

// See password
const seePasswordBtn = document.querySelectorAll(".see-password-btn");

seePasswordBtn.forEach(btn => {
    btn.addEventListener('click', function(){
        if (this.parentNode.querySelector(".registry__input-password").type === "password"){
            this.parentNode.querySelector(".registry__input-password").type = "text";
            this.classList.add('see-password-btn--active')
        } else {
            this.parentNode.querySelector(".registry__input-password").type = "password"
            this.classList.remove('see-password-btn--active')
        }
    })
})

// Check password
const registryBtn = document.querySelector('.registry__btn')
const password = document.getElementById("registry-password");
const confirmPassword = document.getElementById("registry-repeat-password");
const confirmPasswordText = document.querySelector('.conf-password__text')



if(registryBtn){
    registryBtn.addEventListener('click', () => {
    if (password.value !== confirmPassword.value){
        confirmPasswordText.innerText = "Пароли не совпадают!"
        confirmPasswordText.classList.add("conf-password__text--false")
    } else {
        confirmPasswordText.innerText = ""
        confirmPasswordText.classList.remove("conf-password__text--false")
    }

    })
}

// Call registry form
const main = document.querySelector('.main')
const registry = document.querySelector('.registry');
const aboutRegistryBtn = document.querySelector('.about-us__pro-link');
const aboutMainTitle = document.querySelector('.about-us__title')

if(aboutRegistryBtn){
    aboutRegistryBtn.addEventListener('click', function () {
        window.scroll(0,199)
        registry.classList.add("registry--active");
        main.classList.add('none')
    })
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && registry.classList.contains("registry--active")) {
        registry.classList.remove("registry--active");
        main.classList.remove('none')
        aboutMainTitle.scrollIntoView()
    }
})

// Call login form
const login = document.querySelector('.login');
const headerLoginBtn = document.querySelector('.login-btn')


if (headerLoginBtn){
    headerLoginBtn.addEventListener('click', function () {
    login.classList.add("login--active");
    registry.classList.remove("registry--active");
    main.classList.add('none')
    })
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && login.classList.contains("login--active")) {
        window.scroll(0, 0)
        login.classList.remove("login--active");
        main.classList.remove('none')
    }
})

// From registry to login
const toLoginLink = document.querySelector('.registry__tologin-link');

if (toLoginLink){
    toLoginLink.addEventListener('click', function (){
    window.scroll(0, 0)
    login.classList.add("login--active");
    registry.classList.remove("registry--active");
    })
}

// From login to registry
const toRegistryLink = document.querySelector('.login__toregistry-link');



if (toRegistryLink){
    toRegistryLink.addEventListener('click', function (){
    window.scroll(0, 0)
    registry.classList.add("registry--active");
    login.classList.remove("login--active");
    })
}

// Card modal window
const productCard = null;
//const productCard = document.querySelectorAll('.product-card');
//const productCard = document.querySelectorAll('.open_modal');


const modalCard = document.querySelector('.modal-card');
const modalCardInner = document.querySelector('.modal-card__inner')
const cardCloseBtn = document.querySelector('.modal-card__close-btn')

if (productCard){
    productCard.forEach(card => {
        card.addEventListener('click', function(e){
            modalCard.classList.add('modal-card--active')
            e.stopPropagation()
            document.body.classList.add('black-bg')
        })
    })
}

if(modalCardInner){
    modalCardInner.onclick = (e) => e.stopPropagation()

}


if(cardCloseBtn){
    cardCloseBtn.addEventListener('click', function(e){
        modalCard.classList.remove('modal-card--active')
    })
}

// Add Product in Cart
const addProductToCart = document.querySelectorAll('.add_to_cart_btn');
addProductToCart.forEach(card => {
    card.addEventListener('click', function(e){
        e.preventDefault();
        const productId = this.dataset.productId;
        fetch(`/add_to_cart/${productId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: productId }),
        })
        .then(response => {
            if (response.ok) {
                // Обработка успешного добавления товара в корзину
                console.log('Товар успешно добавлен в корзину');
            } else {
                // Обработка ошибок
                console.error('Не удалось добавить товар в корзину');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    });
});


// Modal window image switcher
const modalSwitcherImg = document.querySelector('.modal-card__img')
const modalImgSwitcher1 = document.querySelector('#modal-img-switcher-1')
const modalImgSwitcher2 = document.querySelector('#modal-img-switcher-2')


if(modalImgSwitcher1){
    modalImgSwitcher1.onclick = function() {
        modalSwitcherImg.src = './img/descr-products/descr-product-1.jpg'
        this.classList.add('modal-card__img-btn--active')
        modalImgSwitcher2.classList.remove('modal-card__img-btn--active')
    }
}

if(modalImgSwitcher2){
    modalImgSwitcher2.onclick = function() {
        modalSwitcherImg.src = './img/products/product-1.jpg'
        this.classList.add('modal-card__img-btn--active')
        modalImgSwitcher1.classList.remove('modal-card__img-btn--active')
    }
}

// Descr page image switcher
const descrSwitcherImg = document.querySelector('.descr-item__img')
const descrImgSwitcher1 = document.querySelector('#descr-img-switcher-1')
const descrImgSwitcher2 = document.querySelector('#descr-img-switcher-2')

descrImgSwitcher1.onclick = function() {
    descrSwitcherImg.src = './img/descr-products/descr-product-1.jpg'
    this.classList.add('descr-item__img-btn--active')
    descrImgSwitcher2.classList.remove('descr-item__img-btn--active')
}

descrImgSwitcher2.onclick = function() {
    descrSwitcherImg.src = './img/products/product-1.jpg'
    this.classList.add('descr-item__img-btn--active')
    descrImgSwitcher1.classList.remove('descr-item__img-btn--active')
}

// Total price counter
const descrMinusBtn = document.querySelector('.descr-item__minus')
const descrPlusBtn = document.querySelector('.descr-item__plus')
const descrProdQuant = document.querySelector('.descr-item__prod-quant')
const descrTotalPrice = document.querySelector('#descr-total-price')

let descrTotalP = descrTotalPrice.innerText.replace(/\s/g, '');

descrMinusBtn.addEventListener('click', function(){
    if(descrProdQuant.innerText > 1) {
        descrProdQuant.innerText--
        let totalPrice = calcTotalPrice(descrTotalP, descrProdQuant.innerText)
        descrTotalPrice.innerText = totalPrice.toLocaleString()
    }
    if(descrProdQuant.innerText == 1){
        descrMinusBtn.classList.add('disabled-btn')
    }
})

descrPlusBtn.addEventListener('click', function(){
    descrProdQuant.innerText++

    if(descrProdQuant.innerText != 1){
        descrMinusBtn.classList.remove('disabled-btn')
    }

    let totalPrice = calcTotalPrice(descrTotalP, descrProdQuant.innerText)

    descrTotalPrice.innerText = totalPrice.toLocaleString()
})

function calcTotalPrice(price, quantity){
    return parseInt(price) * parseInt(quantity);    
}

// Product info switcher
const descrTabBtns = document.querySelectorAll('.descr-tabs__btn');

for (let btn of descrTabBtns){
    btn.addEventListener('click', function () {
        descrTabBtns.forEach((el) => el.classList.remove('descr-tabs__btn--active'));
        this.classList.add('descr-tabs__btn--active');
    })
}

// Mobile burger menu for descr-tabs
const descrTab = document.querySelector('.descr-tabs')
const mobileInfoSwitcher = document.querySelector('.descr-info__switcher-btn')

if (window.innerWidth <= 710){
    descrTab.classList.add('none')
}

mobileInfoSwitcher.addEventListener('click', function(){
    descrTab.classList.toggle('none')
    descrTab.classList.toggle('descr-tabs--flex') 
})

// Select active info tab for mobile devices
const mobileInfoActiveTab = document.querySelector('.descr-info__switcher-text')

for (let btn of descrTabBtns){
    btn.addEventListener('click', function () {
        if (window.innerWidth <= 710){
            descrTab.classList.add('none')
            mobileInfoActiveTab.textContent = this.textContent
        }
    })
}

// Init slider for last viewed section with Mutation Observer
const lastViewedSwiper = document.querySelector('.last-viewed__swiper')
const lastViewedWrapper = document.querySelector('.last-viewed__swiper-wrapper')
const lastViewedSlide = document.querySelectorAll('.last-viewed__slide')

const lastViewedObserver = new MutationObserver(lvcallback)

function lvcallback(mutations) {
    if (lastViewedSlide.length > 4) {
        lastViewedWrapper.style.justifyContent = 'flex-start'
    }

    if (lastViewedSlide.length == 2 && window.innerWidth <= 710) {
        lastViewedWrapper.style.justifyContent = 'flex-start'
    } 

    if (lastViewedSlide.length == 3 && window.innerWidth <= 1000) {
        lastViewedWrapper.style.justifyContent = 'flex-start'
    } 

    if (lastViewedSlide.length == 4 && window.innerWidth <= 1240) {
        lastViewedWrapper.style.justifyContent = 'flex-start'
    } 
}

lastViewedObserver.observe(lastViewedSwiper, {
    childList: true,
    characterData: true,
    subtree: true,
})

// Cart total sum
const cartList = document.querySelector('.cart__list')
const cartTotalPrice = document.querySelector('.cart__total-price')
let cartItemTotalP = [...document.querySelectorAll('.cart__item-sum')]

const cartObserver = new MutationObserver(cartCallback)

function cartCallback(mutations) {
    cartItemTotalP = [...document.querySelectorAll('.cart__item-sum')]
}

//cartObserver.observe(cartList, {
//    childList: true,
//    characterData: true,
//    subtree: true,
//})

function sumCartTotal (arr){
    cartTotalPrice.innerText = arr.reduce((acc, el) => {
        return acc += +el.innerText
    }, 0)
}

//sumCartTotal(cartItemTotalP)

//if (cartCounterMinus){
//    cartCounterMinus.forEach(btn => {
//    let cartItemQuant = btn.closest('.cart__item').querySelector('.cart__item-quant')
//    let cartItemPrice = btn.closest('.cart__item').querySelector('.cart__item-price')
//    let cartItemSum = btn.closest('.cart__item').querySelector('.cart__item-sum')
//
//    if(cartItemQuant.innerText == 1){
//        btn.classList.add('disabled-btn')
//    }
//
//    btn.addEventListener('click', function(){
//        if(cartItemQuant.innerText > 1) {
//            cartItemQuant.innerText--
//
//            let totalPrice = calcTotalPrice(cartItemPrice.innerText, cartItemQuant.innerText)
//
//            cartItemSum.innerText = totalPrice
//
//            sumCartTotal(cartItemTotalP)
//        }
//
//        if(cartItemQuant.innerText == 1){
//            btn.classList.add('disabled-btn')
//        }
//        })
//    })
//}

//cartCounterPlus.forEach(btn => {
//    let cartItemQuant = btn.closest('.cart__item').querySelector('.cart__item-quant')
//    let cartItemPrice = btn.closest('.cart__item').querySelector('.cart__item-price')
//    let cartItemSum = btn.closest('.cart__item').querySelector('.cart__item-sum')
//
//    btn.addEventListener('click', function(){
//        cartItemQuant.innerText++
//
//        if(cartItemQuant.innerText != 1){
//            btn.closest('.cart__item').querySelector('.cart__item-minus').classList.remove('disabled-btn')
//        }
//
//        let totalPrice = calcTotalPrice(cartItemPrice.innerText, cartItemQuant.innerText)
//
//        cartItemSum.innerText = totalPrice;
//
//        sumCartTotal(cartItemTotalP)
//    })
//})

// Remove cart item
const removeCartItem = document.querySelectorAll('.cart__item-btn');

removeCartItem.forEach(btn => {
    btn.addEventListener('click', function(e){
        const cartItem = e.target.closest('.cart__item');
        const cartItemId = cartItem.dataset.cartId;
        cartItem.remove();

        // Получаем CSRF-токен из скрытого поля формы
        const csrfTokenInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
        const csrfToken = csrfTokenInput.value;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/remove/' + cartItemId + '/');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        // Добавляем CSRF-токен в заголовок запроса
        xhr.setRequestHeader('X-CSRFToken', csrfToken);

        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
//                alert(data.message);
            } else {
                console.error(xhr.status + ': ' + xhr.responseText);
                alert('Failed to remove product from cart.');
            }
        };
        xhr.onerror = function() {
            console.error(xhr.status + ': ' + xhr.responseText);
            alert('Failed to remove product from cart.');
        };
        xhr.send();

        // Если нужно выполнить дополнительные действия, добавьте их здесь
    });
});



// Sort btn switcher
const sortBtns = document.querySelectorAll('.filter__sorting-btn')
const sortPrice = document.querySelector('#sort-price')

sortBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        sortBtns.forEach((el) => el.classList.remove('filter__sorting-btn--active'))
        this.classList.add('filter__sorting-btn--active')
    })
})

sortPrice.addEventListener('click', function() {
    sortPrice.classList.toggle('sort-by-lower')
})

// Double range sliders
const minGap = 0;

function stopThumbOne(sliderOne, sliderTwo) {
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
}

function stopThumbTwo(sliderOne, sliderTwo) {
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
}

// Double range price slider
const priceSliderOne = document.querySelector("#price-slider-1");
const priceSliderTwo = document.querySelector("#price-slider-2");
const priceDisplayValOne = document.querySelector("#price-value-from");
const priceDisplayValTwo = document.querySelector("#price-value-to");

function slidePriceOne(){
    stopThumbOne(priceSliderOne, priceSliderTwo)

    priceDisplayValOne.textContent = priceSliderOne.value;
}

function slidePriceTwo(){
    stopThumbTwo(priceSliderOne, priceSliderTwo)

    priceDisplayValTwo.textContent = priceSliderTwo.value;
}

priceSliderOne.addEventListener('input', function() {
    return slidePriceOne()
})

priceSliderTwo.addEventListener('input', function() {
    return slidePriceTwo()
})

// Double range amperage slider
const amperageSliderOne = document.querySelector("#amperage-slider-1");
const amperageSliderTwo = document.querySelector("#amperage-slider-2");
const amperageDisplayValOne = document.querySelector("#amperage-value-from");
const amperageDisplayValTwo = document.querySelector("#amperage-value-to");

function slideAmperageOne(){
    stopThumbOne(amperageSliderOne, amperageSliderTwo)

    amperageDisplayValOne.textContent = amperageSliderOne.value;
}

function slideAmperageTwo(){
    stopThumbTwo(amperageSliderOne, amperageSliderTwo)

    amperageDisplayValTwo.textContent = amperageSliderTwo.value;
}

amperageSliderOne.addEventListener('input', function() {
    return slideAmperageOne()
})

amperageSliderTwo.addEventListener('input', function() {
    return slideAmperageTwo()
})

// Reset form button
const filterResetBtn = document.querySelector('.filter__reset-btn')

filterResetBtn.addEventListener('click', function(){
    priceDisplayValOne.textContent = priceSliderOne.min
    priceDisplayValTwo.textContent = priceSliderTwo.max

    amperageDisplayValOne.textContent = amperageSliderOne.min
    amperageDisplayValTwo.textContent = amperageSliderTwo.max
})



// Mobile swiper for hits
const breakpointForSlider = 640;
const hitsProductRender = document.querySelector('.hits__product-top');
const hitsProductWrapper = document.querySelector('.hits__product-wrapper')
//const hitsProductSlide = hitsProductWrapper.querySelectorAll('.hits__product-slide')

if (window.innerWidth <= breakpointForSlider) {
    hitsProductRender.classList.add('swiper')
    hitsProductWrapper.classList.add('swiper-wrapper')

    hitsProductSlide.forEach(slide => {
        slide.classList.add('swiper-slide')
    })

    const swiper5 = new Swiper(".hits__product-top", {
        direction: 'horizontal',
        slidesPerView: 1,

        pagination: {
            el: ".hits__product-pagination ",
            clickable: true,
          },
    })
}

// Mobile swiper for promo
const breakpointForPromo = 900;
const promoSwiper = document.querySelector('.promo__inner');
const promoSwiperWrapper = document.querySelector('.promo__swiper-wrapper')
//const promoSwiperSlide = promoSwiperWrapper.querySelectorAll('.promo__block')
//
//if (window.innerWidth <= breakpointForPromo) {
//    promoSwiper.classList.add('swiper')
//    promoSwiperWrapper.classList.add('swiper-wrapper')
//
//    promoSwiperSlide.forEach(slide => {
//        slide.classList.add('swiper-slide')
//    })
//
//    const swiper6 = new Swiper(".promo__inner", {
//        direction: 'horizontal',
//        slidesPerView: 1,
//        centeredSlides: true,
//
//        pagination: {
//            el: ".promo__swiper-pagination",
//            clickable: true,
//        },
//    })
//}


// Document
document.addEventListener('click', function(){
    dropdownMenu.classList.remove('dropdown-menu__list--active');
//    modalCard.classList.remove('modal-card--active');
})