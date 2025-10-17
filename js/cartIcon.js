document.addEventListener('DOMContentLoaded', function () {


  // Cart (icon) 
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', function () {
      showCartModal();
    });

  }
  updateCartIcon();
});

function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]'); //Reads the cart from browser storage (localStorage).
  const icon = document.querySelector('.cart-icon'); //Finds the cart icon.
  if (icon) {
    let badge = icon.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge'; //If the badge (number) isn't there, creates it.
      icon.appendChild(badge);
    }
    badge.innerText = cart.length; //Sets the number to however many items are in the cart.
    badge.style.display = cart.length ? "inline-block" : "none"; //If cart is empty, hides the badge.
  }
}

//Cart modal(icon)
function showCartModal() {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]'); //Reads cart from local storage.

  //Makes a background and modal for the cart.
  const modalBg = document.createElement('div');
  modalBg.className = 'cart-modal-bg';
  const modal = document.createElement('div');
  modal.className = 'cart-modal';


  // Sets up the modal's HTML, showing every item in cart (or a message if empty).
  // Shows total price at the bottom.
  modal.innerHTML = `
    <button class="cart-modal-close">&times;</button>
    <div class="cart-modal-title">Your Cart</div>
    <div class="cart-modal-list">
      ${cart.length === 0
      ? '<p>Your cart is empty.</p>'
      : cart.map(item => `
            <div class="cart-modal-item">
              <img src="${item.img}" alt="${item.name}">
              <div class="cart-modal-item-details">
                <div class="cart-modal-item-title">${item.name}</div>
                <div class="cart-modal-item-sub">${item.size ? 'Size: ' + item.size : ''}</div>
                ${item.addons && item.addons.length ? `<div class="cart-modal-item-addons">Add-ons: ${item.addons.map(a => `${a.name} x${a.count}`).join(', ')}</div>` : ''}
                ${item.condiments && item.condiments.length ? `<div class="cart-modal-item-condiments">Condiments: ${item.condiments.map(c => `${c.name} x${c.count}`).join(', ')}</div>` : ''}
              </div>
              <div class="cart-modal-item-price">₱${item.price * (item.qty || 1)}</div>
            </div>
          `).join('')
    }
    
    </div>
    <div class="cart-modal-total-row">
      <span>Total:</span>
      <span class="cart-modal-total-price">₱${cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0)}</span>
    </div>
  `;
  document.body.appendChild(modalBg);
  document.body.appendChild(modal);


  //Clicking close button or outside the modal closes it.
  modal.querySelector('.cart-modal-close').onclick = () => {
    modal.remove();
    modalBg.remove();
  };
  modalBg.onclick = () => {
    modal.remove();
    modalBg.remove();
  };
}
