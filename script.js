document.addEventListener("DOMContentLoaded", () => {
  const productImage = document.getElementById("product-img");
  const bandColorRadios = document.querySelectorAll("input[name='band-color']");
  const sizeButtons = document.querySelectorAll(".size-box");
  const quantityDisplay = document.getElementById("quantity");
  const decreaseBtn = document.getElementById("decrease-btn");
  const increaseBtn = document.getElementById("increase-btn");
  const addToCartBtn = document.getElementById("add-to-cart");
  const checkoutBtn = document.getElementById("checkout-btn");
  const cartCount = document.getElementById("cart-count");
  const cartModal = document.getElementById("cart-modal");
  const closeModal = document.getElementById("close-modal");
  const cartItems = document.getElementById("cart-items");

  let cart = [];

  // Apply color to radio buttons dynamically
  bandColorRadios.forEach((radio) => {
    const label = radio.parentElement;
    const colorName = radio.color;
    const span = document.createElement("span");
    span.classList.add("radio-display");
    label.insertBefore(span, label.firstChild);

    radio.addEventListener("change", () => {
      productImage.src = `images/${radio.value}.jpg`;
    });
  });

  // Highlight selected size
  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sizeButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  // Adjust quantity
  let quantity = 1; // Start at 1 instead of 0

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });

  increaseBtn.addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  // Add to cart functionality
  addToCartBtn.addEventListener("click", () => {
    const selectedColor =
      document.querySelector("input[name='band-color']:checked")?.value ||
      "Not Selected";
    const selectedSize =
      document.querySelector(".size-box.selected")?.dataset.size ||
      "Not Selected";
    const regularPrice = document.getElementById("regular-price").textContent;
    const discountPrice = document.getElementById("discount-price").textContent;

    const cartItem = {
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: discountPrice,
      image: productImage.src,
    };

    cart.push(cartItem);
    updateCartCount();
    showCheckoutButton();
  });

  // Update cart count
  function updateCartCount() {
    cartCount.textContent = cart.length;
  }

  // Show checkout button
  function showCheckoutButton() {
    checkoutBtn.classList.remove("hidden");
  }

  // Show cart modal
  checkoutBtn.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
    renderCartTable(); // Updated to render table
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });

  // Render cart items in modal as a table
  function renderCartTable() {
    cartItems.innerHTML = `
      <table id="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Color</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${cart
            .map(
              (item) => `
            <tr>
              <td><img src="${item.image}" alt="Product Image" width="50"></td>
              <td>${item.color}</td>
              <td>${item.size}</td>
              <td>${item.quantity}</td>
              <td>$${item.price}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }
});
