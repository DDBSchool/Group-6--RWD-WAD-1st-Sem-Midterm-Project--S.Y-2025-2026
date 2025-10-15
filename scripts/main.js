const drinks = [  //creating variable called drinks and set it an array
  {
    name: 'Caffe Latte',
    img: 'https://images.unsplash.com/photo-1464306076886-debede14d7b1?auto=format&fit=crop&w=800&q=80',
    desc: 'Rich espresso with steamed milk and a light layer of foam',
    price: 150,
    sizes: [
      { label: 'Small', price: 150 },
      { label: 'Medium', price: 180 },
      { label: 'Large', price: 210 }
    ],
    addons: [
      { name: 'Vanilla Syrup', price: 20 },
      { name: 'Hazelnut Syrup', price: 20 },
      { name: 'Caramel Syrup', price: 20 }
    ],
    condiments: ['White Sugar', 'Brown Sugar']
  },
  {
    name: 'Cappuccino',
    img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    desc: 'Classic Italian coffee with equal parts espresso, steamed milk, and foam',
    price: 160,
    sizes: [
      { label: 'Small', price: 160 },
      { label: 'Medium', price: 190 },
      { label: 'Large', price: 220 }
    ],
    addons: [
      { name: 'Vanilla Syrup', price: 20 },
      { name: 'Hazelnut Syrup', price: 20 },
      { name: 'Caramel Syrup', price: 20 }
    ],
    condiments: ['White Sugar', 'Brown Sugar']
  },
  {
    name: 'Espresso',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    desc: 'Bold and intense shot of pure coffee perfection',
    price: 120,
    sizes: [
      { label: 'Single', price: 120 },
      { label: 'Double', price: 150 }
    ],
    addons: [
      { name: 'Vanilla Syrup', price: 20 },
      { name: 'Hazelnut Syrup', price: 20 }
    ],
    condiments: ['White Sugar', 'Brown Sugar']
  }
];

const pastries = [
  {
    name: 'Croissant',
    img: 'https://images.unsplash.com/photo-1505250461400-81d3c8f9c8b4?auto=format&fit=crop&w=800&q=80',
    desc: 'Buttery, flaky pastry',
    price: 95,
    sizes: [{ label: 'Regular', price: 95 }],
    addons: [{ name: 'Chocolate', price: 25 }],
    condiments: []
  },
  {
    name: 'Blueberry Muffin',
    img: 'https://images.unsplash.com/photo-1464306076886-debede14d7b1?auto=format&fit=crop&w=800&q=80',
    desc: 'Sweet muffin loaded with blueberries',
    price: 85,
    sizes: [{ label: 'Regular', price: 85 }],
    addons: [{ name: 'Extra Blueberry', price: 20 }],
    condiments: []
  },
  {
    name: 'Pain au Chocolat',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    desc: 'Flaky pastry filled with rich chocolate',
    price: 110,
    sizes: [{ label: 'Regular', price: 110 }],
    addons: [],
    condiments: []
  }
];



// Burger menu ffor mobile dropdown




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





// --- Cart icon badge ---(Shows how many items are in your cart.)

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

















//Cart modal for mobile
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









//Menu Page Logic

// --- Menu page logic ---
if (document.getElementById('menu-buttons')) { //Checks if the element with ID menu-buttons exists. If it does, this page is the menu page, so run this block.
  const menuButtons = document.getElementById('menu-buttons');  //The area with buttons to pick "Drinks" or "Pastries".
  const menuListContainer = document.getElementById('menu-list-container'); //The area with buttons to pick "Drinks" or "Pastries".
  const menuList = document.getElementById('menu-list'); //The list where menu items will go.
  const categoryTitle = document.getElementById('category-title'); //The title showing what category is being viewed.
  const btnBack = document.getElementById('btn-back'); //The "back" button.
  const searchInput = document.getElementById('search-input'); // The search box for filtering items.

  let currentCategory = ''; //Will store whether you're looking at "drinks" or "pastries".
  let currentItems = [];//The items (drinks or pastries) currently being shown.

  function renderMenuItems(items) {
    menuList.innerHTML = ''; //Clears the menuList area.
    if (items.length === 0) { //If no items, show a "No items found" message.

      menuList.innerHTML = '<p style="color:#7d4218;">No items found.</p>';
      return;
    }

    //for-each loop ( for each item:
    //Adds a card showing the item's image, name, description, and price.)
    items.forEach(item => {
      menuList.innerHTML += `
        <div class="menu-card">
          <img src="${item.img}" alt="${item.name}">
          <div class="menu-card-content">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="price">₱${item.price}</div>
          </div>
        </div>
      `;
    });
  }

  function handleCategory(category) {
    currentCategory = category;  //Sets the current category (drinks or pastries).
    currentItems = category === 'drinks' ? drinks : pastries;  //Picks the right items array.
    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1); //Updates the category title on the page.
    renderMenuItems(currentItems); //Calls renderMenuItems() to display the list.
    menuButtons.style.display = 'none'; //Hides the main menu buttons and shows the list container.
    menuListContainer.style.display = 'block';
    searchInput.value = ''; //Clears the search box.
  }


  //Button Event Listeners

  document.getElementById('btn-drinks').onclick = () => handleCategory('drinks'); //When the "Drinks" button is clicked, show the drinks menu.
  document.getElementById('btn-pastries').onclick = () => handleCategory('pastries');//When the "Pastries" button is clicked, show the pastries menu.
  //back button (Clicking the back button hides the menu list and shows the main buttons again.)
  btnBack.onclick = () => {
    menuButtons.style.display = 'flex';
    menuListContainer.style.display = 'none';
  };

  //search input
  searchInput.oninput = function () {  //global event handler for input
    const val = searchInput.value.toLowerCase(); //Gets the input value in lowercase.
    const filtered = currentItems.filter(item => //Filters the current menu items to only those whose name or description includes the search string.
      item.name.toLowerCase().includes(val) ||
      item.desc.toLowerCase().includes(val)
    );
    renderMenuItems(filtered); //Displays the filtered list.
  };







  // --- Menu item modal ---
  menuList.onclick = function (e) {
    const card = e.target.closest('.menu-card');//Checks if you clicked on a menu card.
    if (card) { //If so, figures out which card you clicked by its position in the list.
      const index = Array.from(menuList.children).indexOf(card); //Gets the right data object (from drinks or pastries).
      const items = currentCategory === 'drinks' ? drinks : pastries; //Calls showMenuItemModal() to open a popup with item details.
      showMenuItemModal(items[index]);
    }
  };
}








// --- Modal for menu item details ---
function showMenuItemModal(item) { //Defines a function that will show a pop-up modal for a menu item.
  const modalBg = document.createElement('div'); //Creates a new <div> for the background overlay.
  modalBg.className = 'modal-bg'; //Gives it a CSS class so it looks like a faded overlay.
  document.body.appendChild(modalBg); //Adds the overlay to the page.


  const modal = document.createElement('div'); //Creates the modal window.
  modal.className = 'menu-modal'; //Assigns it a CSS class for styling.


  //Prepare Data for the Modal(storing the data)
  const sizes = item.sizes || [{ label: 'Regular', price: item.price }]; //Use the sizes from the item, or default to "Regular" if not available.
  const addons = item.addons || []; //Use item's add-ons, or empty array if none.
  const condiments = item.condiments || []; //Use item's condiments, or empty array if none.



  let selectedSize = 0; //Start with the first size selected.
  let addonCounts = Array(addons.length).fill(0); //Array to track how many of each add-on is chosen — starts at 0 for all.
  let condimentCounts = Array(condiments.length).fill(0); //Array to track how many of each add-on is chosen — starts at 0 for all.
  let qty = 1; //Number of this item to add 

  //Total Price Calculation
  function getTotalPrice() {  //Adds up price for the selected size and all selected add-on
    let total = sizes[selectedSize].price;
    addonCounts.forEach((count, i) => total += count * addons[i].price);
    return total * qty; //multiplied by quantity
  }


  // 
  //Sets the modal’s HTML.
  modal.innerHTML = ` 
    <button class="modal-close" title="Close">&times;</button>
    <h2 class="modal-title">${item.name}</h2>
    <img src="${item.img}" alt="${item.name}" class="modal-img">
    <p class="modal-desc">${item.desc}</p>
    <div class="modal-section">
      <label class="modal-label">Size</label>
      <div class="modal-sizes">
        ${sizes.map((s, i) => `
          <button class="size-btn${i === selectedSize ? ' selected' : ''}" data-idx="${i}">
            ${s.label} - ₱${s.price}
          </button>
        `).join('')}
      </div>
    </div>
    ${addons.length ? `
    <div class="modal-section">
      <label class="modal-label">Add-ons</label>
      <div class="modal-addons">
        ${addons.map((a, i) => `
          <div class="addon-row">
            <span>${a.name} (+₱${a.price})</span>
            <div class="addon-qty-controls">
              <button class="addon-minus" data-idx="${i}">−</button>
              <span class="addon-count" id="addon-count-${i}">${addonCounts[i]}</span>
              <button class="addon-plus" data-idx="${i}">+</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
    ${condiments.length ? `
    <div class="modal-section">
      <label class="modal-label">Condiments</label>
      <div class="modal-condiments">
        ${condiments.map((c, i) => `
          <div class="condiment-row">
            <span>${c}</span>
            <div class="condiment-qty-controls">
              <button class="condiment-minus" data-idx="${i}">−</button>
              <span class="condiment-count" id="condiment-count-${i}">${condimentCounts[i]}</span>
              <button class="condiment-plus" data-idx="${i}">+</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
    <div class="modal-section modal-actions">
      <button class="reset-btn">Reset Recipe</button>
      <button class="add-cart-btn">Add to Cart - ₱${getTotalPrice()}</button>
    </div>
  `;
  document.body.appendChild(modal); //Adds the modal to the page.


  // Close modal (for bg and button)
  modal.querySelector('.modal-close').onclick = () => { modal.remove(); modalBg.remove(); };  //Clicking close removes the modal and background.
  modalBg.onclick = () => { modal.remove(); modalBg.remove(); };//licking on the background also closes the modal.

  // Size selection (When clicked, updates selectedSize, highlights it, and updates the price.)
  modal.querySelectorAll('.size-btn').forEach(btn => {
    btn.onclick = function () {
      selectedSize = Number(this.getAttribute('data-idx'));
      modal.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      updatePrice();
    };
  });

  // Add-on quantity controls
  addons.forEach((a, i) => {
    modal.querySelector(`.addon-plus[data-idx="${i}"]`).onclick = function () {
      addonCounts[i]++;
      modal.querySelector(`#addon-count-${i}`).innerText = addonCounts[i];
      updatePrice();
    };
    modal.querySelector(`.addon-minus[data-idx="${i}"]`).onclick = function () {
      if (addonCounts[i] > 0) addonCounts[i]--;
      modal.querySelector(`#addon-count-${i}`).innerText = addonCounts[i];
      updatePrice();
    };
  });

  // Condiment quantity controls
  condiments.forEach((c, i) => {
    modal.querySelector(`.condiment-plus[data-idx="${i}"]`).onclick = function () {
      condimentCounts[i]++;
      modal.querySelector(`#condiment-count-${i}`).innerText = condimentCounts[i];
    };
    modal.querySelector(`.condiment-minus[data-idx="${i}"]`).onclick = function () {
      if (condimentCounts[i] > 0) condimentCounts[i]--;
      modal.querySelector(`#condiment-count-${i}`).innerText = condimentCounts[i];
    };
  });

  // Reset
  modal.querySelector('.reset-btn').onclick = () => {
    selectedSize = 0;
    addonCounts = Array(addons.length).fill(0);
    condimentCounts = Array(condiments.length).fill(0);
    modal.querySelectorAll('.size-btn').forEach((b, i) => b.classList.toggle('selected', i === 0));
    addons.forEach((a, i) => modal.querySelector(`#addon-count-${i}`).innerText = 0);
    condiments.forEach((c, i) => modal.querySelector(`#condiment-count-${i}`).innerText = 0);
    updatePrice();
  };

  //Updates the "Add to Cart" button label to show the current total.
  function updatePrice() {
    modal.querySelector('.add-cart-btn').innerText = `Add to Cart - ₱${getTotalPrice()}`;
  }

  // Add to cart
  modal.querySelector('.add-cart-btn').onclick = () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
      name: item.name,
      img: item.img,
      size: sizes[selectedSize].label,
      basePrice: sizes[selectedSize].price,
      addons: addons.map((a, i) => ({ name: a.name, count: addonCounts[i], price: a.price })).filter(a => a.count > 0),
      condiments: condiments.map((c, i) => ({ name: c, count: condimentCounts[i] })).filter(c => c.count > 0),
      qty: qty,
      price: getTotalPrice()
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    modal.remove();
    modalBg.remove();
    updateCartIcon();
    alert('Added to cart!');
  };
}






// --- Cart rendering logic ---
if (document.getElementById('cart-items')) { //Checks if the element with ID cart-items exists. If it does, this is the cart page, so run the following code.
  function renderCart() { //will display the items in the cart.
    let cart = JSON.parse(localStorage.getItem('cart') || '[]'); //array from browser storage (localStorage). If nothing is saved, uses an empty array.
    const cartItems = document.getElementById('cart-items'); //Gets the element where cart items are shown.
    cartItems.innerHTML = '';
    let total = 0; //Sets up a total variable to keep track of the total price.
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty.</p>';
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





// --- Checkout Page Rendering ---
if (document.getElementById('order-summary')) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]'); //Loads the cart from browser storage (or uses an empty array if nothing found).
  let total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0); //Adds up the total price for all items in the cart, taking into account each item's quantity.

  //building the summary html
  let summaryHtml = '';
  cart.forEach(item => {
    summaryHtml += `
      <div class="summary-item-row">
        <span>${item.name} (${item.size}) x${item.qty || 1}</span>
        <span>₱${item.price * (item.qty || 1)}</span>
      </div>
    `;
  });
  summaryHtml += `
    <div class="summary-total-row">
      <span>Total</span>
      <span>₱${total}</span>
    </div>
  `;
  document.getElementById('order-summary').innerHTML = summaryHtml;

  document.getElementById('checkout-form').onsubmit = function (e) {
    e.preventDefault(); // stops the page from reloading.

    //Reads the values the user entered for name, email, address, and selected payment.
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    localStorage.setItem('orderInfo', JSON.stringify({ //saves all the user data ,plus the cart and the total, in browser storage as rrderInfo
      name, email, address, payment, cart, total
    }));
    localStorage.removeItem('cart'); //Removes the cart (clears it out for next time).
    window.location.href = 'confirmation.html'; //redirecting to confirmation page
  };
}











// --- Confirmation Page Rendering ---
if (document.getElementById('conf-name')) {
  // Retrieve latest order info
  const order = JSON.parse(localStorage.getItem('orderInfo') || '{}'); //Loads the orderInfo object from browser storage (set on the checkout page).
  //If nothing is found, uses an empty object.


  //Sets the text in each confirmation page field:
  document.getElementById('conf-name').innerText = order.name || '';
  document.getElementById('conf-email').innerText = order.email || '';
  document.getElementById('conf-address').innerText = order.address || '';
  document.getElementById('conf-payment').innerText = order.payment === 'cash' ? 'Cash' : order.payment === 'card' ? 'Credit/Debit Card' : 'GCash';

  // Items (Builds the HTML to show each item in the order (name, size, quantity, price).

  let itemsHtml = '';
  order.cart.forEach(item => {
    itemsHtml += `
      <div class="confirmation-item-row">
        <span>${item.name} (${item.size}) x${item.qty || 1}</span>
        <span>₱${item.price * (item.qty || 1)}</span>
      </div>
    `;
  });
  document.getElementById('conf-items').innerHTML = itemsHtml; //Puts that HTML inside the conf-items element
  document.getElementById('conf-total').innerText = `₱${order.total}`;

  // Optionally clear orderInfo after display
  localStorage.removeItem('orderInfo');
}



