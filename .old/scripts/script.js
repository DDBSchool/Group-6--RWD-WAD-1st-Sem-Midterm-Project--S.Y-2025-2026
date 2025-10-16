// App Initialization
document.addEventListener('DOMContentLoaded', function () {
  // Cart icon click handler
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', function () {
      showCartModal();
    });
  }

  // Update cart badge on page load
  updateCartIcon();
});