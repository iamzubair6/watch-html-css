// State management
const state = {
  cart: [],
  selectedColor: "purple",
  selectedSize: "M",
  quantity: 1,
};

// DOM Elements
const colorOptions = document.querySelectorAll(".color-option");
const sizeOptions = document.querySelectorAll(".size-option");
const quantityBtns = document.querySelectorAll(".quantity-btn");
const quantityDisplay = document.getElementById("quantity");
const addToCartBtn = document.querySelector(".add-to-cart");
const checkoutButton = document.getElementById("checkoutButton");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const mainImage = document.getElementById("mainImage");

// Color selection
colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    colorOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
    state.selectedColor = option.dataset.color;
    // Update main image
    mainImage.src = option.dataset.image;
  });
});

// Size selection
sizeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    sizeOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");
    state.selectedSize = option.dataset.size;
  });
});

// Quantity controls
quantityBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.action === "increase") {
      state.quantity++;
    } else if (btn.dataset.action === "decrease" && state.quantity > 0) {
      state.quantity--;
    }
    quantityDisplay.textContent = state.quantity;
  });
});

// Add to cart
addToCartBtn.addEventListener("click", () => {
  const item = {
    id: Date.now(),
    color: state.selectedColor,
    size: state.selectedSize,
    quantity: state.quantity,
    price: 79.0,
    image: document.querySelector(".color-option.active").dataset.image,
  };

  state.cart.push(item);
  updateCart();
  checkoutButton.style.display = "block";
});

// Update cart
function updateCart() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = totalItems;

  // Update cart modal content
  cartItems.innerHTML = state.cart
    .map(
      (item) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="Smart Watch">
                    <div>
                        <h3>Smart Watch</h3>
                        <p>Color: ${item.color}</p>
                        <p>Size: ${item.size}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <div>
                        <p>$${(item.price * item.quantity).toFixed(2)}</p>
                        <button onclick="removeFromCart(${
                          item.id
                        })">Remove</button>
                    </div>
                </div>
            `
    )
    .join("");
}

// Remove from cart
function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  updateCart();
  if (state.cart.length === 0) {
    checkoutButton.style.display = "none";
  }
}

// Modal controls
checkoutButton.addEventListener("click", () => {
  cartModal.style.display = "block";
});

function closeModal() {
  cartModal.style.display = "none";
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    closeModal();
  }
});
