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
  const totalPrice = document.querySelector('.total');

  let total = 0;

  function addInCart(event) {
    const btn = event.target;
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute('data-price'));

    const item = document.createElement('li');
    item.innerHTML = `
     <div class="name-item">
            <p class='name-product'>${name}</p>
          </div>
          <div class="price-items">
            <p style="color: #c73a0f; font-weight: 600; ">${1}X</p>
            <p style="color: #ad8985; font-weight: 400;">${formatPrice.format(price)}</p>
            <p style="color: #87635a;  font-weight: 400;">R$ 10.00</p>
            <button class="delete-item"><i class="fa-solid fa-x"></i></button>
          </div> 
    `
    carrinhoLista.appendChild(item);

    //Adiciona o evento para remover o item
    item.querySelector('.delete-item').addEventListener('click', () => {
      removeFromCart(item, price)
    });

    // Função para remover item do carrinho
    function removeFromCart(item, price) {
      let quantityText = document.querySelector('.quantity');
      let itemQuantity = parseInt(quantityText.textContent);

      if (itemQuantity > 1) {
        quantityText.textContent = itemQuantity - 1;
      } else {
        item.remove();
      }

      total -= price;
      totalPrice.textContent = formatPrice.format(total);
      totalItemsInCart = Math.max(0, totalItemsInCart - 1);
      quantityCart.textContent = totalItemsInCart
    }

    // Atualiza o total do carrinho e a quantidade de itens
    total += price;
    totalPrice.textContent = formatPrice.format(total);
  };



  btnProducts.forEach((btn) => {
    btn.addEventListener('click', addInCart)
  })

});


