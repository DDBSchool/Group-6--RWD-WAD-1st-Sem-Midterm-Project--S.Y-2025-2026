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
