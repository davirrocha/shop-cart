let list = document.querySelector('#all-products');

const formatPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
fetch('./data.json').then(response => response.json()).then(menuOptions => {
  let myList = '';

  menuOptions.forEach(item => {

    myList += `
    <li class='items'>
        <div class="div-img">
          <img src="${item.image.desktop}" alt="${item.name}" class="img-products">
          <button class="btn add-to-cart" data-name="${item.name}" data-price="${item.price}">
            <img src="./assets/images/icon-add-to-cart.svg" alt="" class="img-cart-add">
            Add to Cart
          </button>
          <div class="quantity-products" style="display: none;">
            <button class="btn-quantity minus"><i class="fa-solid fa-minus"></i></button>
            <p class="quantity">1</p>
            <button class="btn-quantity plus"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <div class="infos">
          <p class="sub-title">${item.category}</p>
          <h4>${item.name}</h4>
          <p class="price">${formatPrice.format(item.price)}</p>
        </div>
      </li>
    `;
  })

  list.innerHTML = myList;



  const quantityCart = document.querySelector('#quantity');
  let totalItemsInCart = 0;

  let quantity = 1;
  const btnProducts = document.querySelectorAll('.add-to-cart');
  btnProducts.forEach(btn => {
    const listItem = btn.closest('li')
    const quantityProducts = listItem.querySelector('.quantity-products');
    const quantityText = listItem.querySelector('.quantity');
    const btnPlus = listItem.querySelector('.plus');
    const btnMinus = listItem.querySelector('.minus');
    const borderImg = listItem.querySelector('.img-products')

    btn.addEventListener('click', () => {
      btn.style.display = 'none';
      quantityProducts.style.display = 'flex';
      borderImg.style.border = '2px solid rgb(199,58,15)';

      totalItemsInCart++
      quantityCart.textContent = totalItemsInCart;
    });

    btnPlus.addEventListener('click', () => {
      quantity++;
      quantityText.textContent = quantity;
    });

    btnMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        quantityText.textContent = quantity;
      }
    });
  });


  const carrinhoLista = document.querySelector('#cart-products');
  const totalPrice = document.querySelector('.total')
  let total = 0
  function addInCart(event) {
    const btn = event.target;
    const name = btn.getAttribute("data-name");
    const price = btn.getAttribute('data-price');

    const item = document.createElement('li');
    item.innerHTML = `${name} ${formatPrice.format(price)}`;
    carrinhoLista.appendChild(item)

    total += price
    totalPrice.textContent = formatPrice.format(total)
  };

  btnProducts.forEach(btn => {
    btn.addEventListener('click', addInCart)
  })

});


