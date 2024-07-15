function addToCart(productId) {
    fetch(`/add_to_cart/${productId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: productId }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Товар успешно добавлен в корзину');
        } else {
            console.error('Не удалось добавить товар в корзину');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}


function loadProducts(categoryId) {
    document.querySelector('.hits__product-wrapper').innerHTML = '';

    fetch(`/get_products/${categoryId}`)
        .then(response => response.json())
        .then(products => {

            products.forEach(product => {
                const productHtml = `
                    <div class="hits__product-slide">
                        <div id="product-${product.id}" class="product-card">
                            <div class="product-card__top">
                                <p class="product-card__code">Код: <span>${product.id}</span></p>
                                ${product.image ? `<img src="/resource/${product.image}" alt="product" class="product-card__img open_modal"
                                data-modal-target="#modal-product-${product.id}">` : ''}
                                <h3 class="product-card__title">${product.name}</h3>
                            </div>
                            <div class="product-card__bottom">
                                <div class="product-card__descr">${product.description}</div>
                                <div class="product-card__status">В наличии</div>
                                <div class="product-card__buy">
                                    <span class="product-card__current-price">${product.price}</span>
                                    <button class="product-card__cart-btn add_to_cart_btn" data-product-id="${product.id}">
                                        <img src="static/img/icons/add-to-cart.svg" alt="cart button" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.querySelector('.hits__product-wrapper').innerHTML += productHtml;
            });
            document.querySelectorAll('.open_modal').forEach(function(img) {
                img.addEventListener('click', function() {
                    const modalId = this.getAttribute('data-modal-target');
                    const modal = document.querySelector(modalId);
                    if (modal) {
                        modal.classList.add('modal-card--active');
                    }
                });

            });
            document.querySelectorAll('.add_to_cart_btn').forEach(function(button) {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-product-id');
                    addToCart(productId);
                });
            });
        })


        .catch(error => console.error('Error loading products:', error));


}
