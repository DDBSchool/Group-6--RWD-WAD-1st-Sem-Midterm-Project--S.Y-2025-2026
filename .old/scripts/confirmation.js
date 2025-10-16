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