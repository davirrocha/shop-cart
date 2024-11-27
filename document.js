let list = document.querySelector('#all-products');

const formatPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
fetch('./data.json')
  .then(response => response.json())
  .then(menuOptions => {
    let myList = '';

    // Gerar os itens da lista
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
              <p class="quantity" style="color: #fff">1</p>
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
    });

    list.innerHTML = myList;

    // Seletores principais
    const quantityCart = document.querySelector('#quantity');
    const carrinhoLista = document.querySelector('#cart-products');
    const totalPrice = document.querySelector('.total');

    let totalItemsInCart = 0;
    let total = 0;

    // Atualiza o total do carrinho e itens
    function updateCartTotals(priceChange, itemChange = 1) {
      total += priceChange;
      totalItemsInCart += itemChange;

      totalPrice.textContent = formatPrice.format(total);
      quantityCart.textContent = totalItemsInCart;
    }


    let numberCart = 1
    // Função para adicionar ao carrinho
    function addInCart(event) {
      const btn = event.target;
      const listItem = btn.closest('li');
      const quantityProducts = listItem.querySelector('.quantity-products');
      const borderImg = listItem.querySelector('.img-products');

      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute('data-price'));

      const cartItem = document.createElement('li');
      cartItem.innerHTML = `
        <div class="name-item">
          <p class='name-product'>${name}</p>
        </div>
        <div class="price-items">
          <p class="cart-quantity" style="color: #c73a0f; font-weight: 600;" >${numberCart}X</p>
            <p style="color: #ad8985; font-weight: 400;">${formatPrice.format(price)}</p>
            <p style="color: #87635a;  font-weight: 400;">${formatPrice.format(price)}</p>
            <button class="delete-item"><i class="fa-solid fa-x"></i></button>

        </div>
      `;

      carrinhoLista.appendChild(cartItem);

      // Evento para remover do carrinho
      cartItem.querySelector('.delete-item').addEventListener('click', () => {
        removeFromCart(cartItem, price, listItem, btn, quantityProducts, borderImg);
      });

      // Atualiza estados visuais
      btn.style.display = "none";
      quantityProducts.style.display = "flex";
      borderImg.style.border = "2px solid rgb(199,58,15)";

      // Atualiza totais
      updateCartTotals(price);
    }

    // Função para remover do carrinho
    function removeFromCart(cartItem, price, listItem, addBtn, quantityProducts, borderImg) {
      const quantityText = listItem.querySelector('.quantity');
      const itemQuantity = parseInt(quantityText.textContent);

      if (itemQuantity > 1) {
        // Reduz a quantidade visualmente
        quantityText.textContent = itemQuantity - 1;
      } else {
        // Remove item do carrinho
        cartItem.remove();
        quantityProducts.style.display = "none";
        addBtn.style.display = "flex";
        borderImg.style.border = "none";
      }

      // Atualiza totais
      updateCartTotals(-price, -1);
    }

    // Botões de quantidade
    function handleQuantityButtons() {
      document.querySelectorAll('.add-to-cart').forEach(btn => {
        const listItem = btn.closest('li');

        const quantityText = listItem.querySelector('.quantity');
        const btnPlus = listItem.querySelector('.plus');
        const btnMinus = listItem.querySelector('.minus');
        const cartQuantity = listItem.querySelectorAll('.cart-quantity');

        btnPlus.addEventListener('click', () => {

          if (parseInt(quantityText.textContent) < 75) {
            quantityText.textContent = parseInt(quantityText.textContent) + 1;
            cartQuantity.textContent = numberCart += 1
          }
        });

        btnMinus.addEventListener('click', () => {
          if (parseInt(quantityText.textContent) > 1) {
            quantityText.textContent = parseInt(quantityText.textContent) - 1;
          }
        });
      });
    }





    // Inicializa os eventos
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', addInCart);
    });

    handleQuantityButtons();
  });
