// --- Cart rendering logic ---
if (document.getElementById('cart-items')) { //Checks if the element with ID cart-items exists. If it does, this is the cart page, so run the following code.
  function renderCart() { //will display the items in the cart.
    let cart = JSON.parse(localStorage.getItem('cart') || '[]'); //array from browser storage (localStorage). If nothing is saved, uses an empty array.
    const cartItems = document.getElementById('cart-items'); //Gets the element where cart items are shown.
    cartItems.innerHTML = '';
    let total = 0; //Sets up a total variable to keep track of the total price.
    
    const checkoutBtn = document.getElementById('checkout-btn'); // <--- Get the button
    
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty.</p>';
     
         if (checkoutBtn) {
        checkoutBtn.classList.add('disabled'); // Optionally style as disabled
        checkoutBtn.setAttribute('aria-disabled', 'true');
        checkoutBtn.setAttribute('tabindex', '-1');
        checkoutBtn.style.pointerEvents = 'none';
        checkoutBtn.style.opacity = '0.5'; // visually indicate disabled
      }
    
    } else {
      cart.forEach((item, idx) => { //for each item :
        total += item.price * (item.qty || 1); //Adds its price (times quantity) to the total.

        //Appends a "cart card" with item image, name, size, add-ons, condiments, quantity controls, and price
        //The "+" and "−" buttons have data-idx to tell which cart item they control.
        cartItems.innerHTML += `

          <div class="cart-card">
            <img src="${item.img}" class="cart-card-img" alt="${item.name}">
            <div class="cart-card-details">
              <div class="cart-card-title-row">
                <span class="cart-card-title">${item.name}</span>
                <button class="cart-remove-btn" data-idx="${idx}">&times;</button>
              </div>
              <div class="cart-card-sub">${item.size ? 'Size: ' + item.size : ''}</div>
              ${item.addons && item.addons.length
            ? `<div class="cart-card-addons">
                      Add-ons: ${item.addons.map(a => `${a.name} x${a.count}`).join(', ')}
                    </div>`
            : ''
          }
              ${item.condiments && item.condiments.length
            ? `<div class="cart-card-condiments">
                      Condiments: ${item.condiments.map(c => `${c.name} x${c.count}`).join(', ')}
                    </div>`
            : ''
          }
              <div class="cart-card-qty-controls">
                <button class="cart-qty-btn" data-idx="${idx}" data-action="minus">−</button>
                <span class="cart-card-qty">${item.qty || 1}</span>
                <button class="cart-qty-btn" data-idx="${idx}" data-action="plus">+</button>
              </div>
            </div>
            <div class="cart-card-price">₱${item.price * (item.qty || 1)}</div>
          </div>

        `;
      });
      if (checkoutBtn) {
        checkoutBtn.classList.remove('disabled');
        checkoutBtn.removeAttribute('aria-disabled');
        checkoutBtn.removeAttribute('tabindex');
        checkoutBtn.style.pointerEvents = '';
        checkoutBtn.style.opacity = '';
      }

    }
    //Updates the total price area with the sum of everything in the cart.
    document.getElementById('cart-total').innerHTML = `
      <div class="cart-total-row">
        <span>Total:</span>
        <span class="cart-total-price">₱${total.toFixed(0)}</span>
      </div>
    `;
  }
  renderCart(); //Calls the function so the cart appears as soon as the page loads.


  //If you click a "remove" button, gets the index, removes that item from the cart, saves to storage, updates the cart and icon.
  document.getElementById('cart-items').onclick = function (e) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (e.target.classList.contains('cart-remove-btn')) {
      const idx = +e.target.getAttribute('data-idx');
      cart.splice(idx, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateCartIcon();
    }
    //If you click a "plus" or "minus" button, gets the index and action, increases or decreases the quantity (not below 1), saves, and re-renders cart.
    if (e.target.classList.contains('cart-qty-btn')) {
      const idx = +e.target.getAttribute('data-idx');
      const action = e.target.getAttribute('data-action');
      if (action === 'plus') cart[idx].qty = (cart[idx].qty || 1) + 1;
      else if (action === 'minus' && cart[idx].qty > 1) cart[idx].qty--;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  };
  updateCartIcon(); //Ensures the cart icon badge is updated to match the current cart.
}




