// Обработчик для кнопки "Добавить в корзину"
document.querySelectorAll('.cart__item-plus').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.closest('.cart__item').getAttribute('data-product-id');
        if (productId) { // Проверка на null
            addToCart(productId);
        } else {
            console.error('Product id is null');
        }
    });
});


// Обработчик для кнопки "Удалить из корзины"
document.querySelectorAll('.cart__item-minus').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.closest('.cart__item').getAttribute('data-product-id');
        removeFromCart(productId);
    });
});

function addToCart(productId) {
    fetch(`/add_to_cart/${productId}/`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Выводим сообщение об успешном добавлении товара в консоль
        // Дополнительные действия, если нужно
    })
    .catch(error => console.error('Error:', error));
}

function removeFromCart(productId) {
    fetch(`/remove_from_cart/${productId}/`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Выводим сообщение об успешном удалении товара из корзины в консоль
        // Дополнительные действия, если нужно
    })
    .catch(error => console.error('Error:', error));
}
