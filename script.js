// State management
const state = {
  cart: [],
  selectedColor: "purple",
  selectedSize: "M",
  selectedPrice: 79,
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
    state.selectedPrice = parseInt(
      option.querySelector("span").textContent.replace("$", "")
    );
    updatePrice();
  });
});

// Quantity controls
quantityBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.action === "increase") {
      state.quantity++;
    } else if (btn.dataset.action === "decrease" && state.quantity > 1) {
      state.quantity--;
    }
    quantityDisplay.textContent = state.quantity;
    updatePrice();
  });
});

// Update price
function updatePrice() {
  const total = state.selectedPrice * state.quantity;
  document.querySelector(".current-price").textContent = `$${total.toFixed(2)}`;
}

// Add to cart
addToCartBtn.addEventListener("click", () => {
  const item = {
    id: Date.now(),
    color: state.selectedColor,
    size: state.selectedSize,
    quantity: state.quantity,
    price: state.selectedPrice,
    totalPrice: state.selectedPrice * state.quantity,
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

  const totalPrice = state.cart.reduce((sum, item) => sum + item.totalPrice, 0);

  cartItems.innerHTML = state.cart
    .map(
      (item) => `
                <div class="cart-item">
                    <div class="item-info">
                        <img src="${item.image}" alt="Smart Watch">
                        <div>Classy Modern Smart watch</div>
                    </div>
                    <div>${item.color}</div>
                    <div>${item.size}</div>
                    <div class="text-center">${item.quantity}</div>
                    <div class="font-bold">$${item.totalPrice.toFixed(2)}</div>
                    <div>
                        <button class="remove-item" onclick="removeFromCart(${
                          item.id
                        })">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `
    )
    .join("");

  document.getElementById("totalQuantity").textContent = totalItems;
  document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(
    2
  )}`;
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
  cartModal.style.display = "flex";
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

window.addEventListener("load", () => {
  cartModal.style.display = "none";
});
