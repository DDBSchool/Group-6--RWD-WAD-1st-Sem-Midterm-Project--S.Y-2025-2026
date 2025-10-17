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


