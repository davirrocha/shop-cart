let list = document.querySelector('#all-products');


fetch('./data.json').then(response => response.json()).then(menuOptions => {
  let myList = '';

  menuOptions.forEach(item => {
    const formatPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    myList += `
    <li class='items'>
        <div class="div-img">
          <img src="${item.image.desktop}" alt="${item.name}" class="img-products">
          <button class="btn add-to-cart">
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


  const btnProducts = document.querySelectorAll('.add-to-cart');


  btnProducts.forEach(btn => {
    const listItem = btn.closest('li')
    const quantityProducts = listItem.querySelector('.quantity-products');
    const qauntityText = listItem.querySelector('.quantity');
    const btnPlus = listItem.querySelector('.plus');
    const btnMinus = listItem.querySelector('.minus');
    const borderImg = listItem.querySelector('.img-products')
    let quantity = 1;


    btn.addEventListener('click', () => {
      btn.style.display = 'none';
      quantityProducts.style.display = 'flex';
      borderImg.style.border = '2px solid rgb(199,58,15)'

    });

    btnPlus.addEventListener('click', () => {
      quantity++;
      qauntityText.textContent = quantity;
    })

    btnMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        qauntityText.textContent = quantity;
      }

    });
  });



});



