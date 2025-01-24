class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
    this.liked = false;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }

  toggleLike() {
    this.liked = !this.liked;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    const item = this.items.find((item) => item.product.id === product.id);
    item
      ? (item.quantity += quantity)
      : this.items.push(new ShoppingCartItem(product, quantity));
    this.displayCart();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayCart();
  }

  updateQuantity(productId, change) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + change);
      this.displayCart();
    }
  }

  toggleLike(productId) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.toggleLike();
      this.displayCart();
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  displayCart() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = this.items
      .map(
        (item) => `
      <div class="card">
        <img src="${item.product.image}" class="card-img-top" alt="${
          item.product.name
        }">
        <div class="card-body">
          <h5>${item.product.name}</h5>
          <p>${item.product.price} $</p>
          <button onclick="cart.updateQuantity(${
            item.product.id
          }, 1)">+</button>
          <span>${item.quantity}</span>
          <button onclick="cart.updateQuantity(${
            item.product.id
          }, -1)">-</button>
          <button onclick="cart.removeItem(${item.product.id})">🗑️</button>
          <button onclick="cart.toggleLike(${item.product.id})">${
          item.liked ? "❤️" : "🤍"
        }</button>
        </div>
      </div>
    `
      )
      .join("");

    cartTotal.textContent = `Total: ${this.getTotal()} $`;
  }
}

// 🔹 Exemple d'ajout de produits
const cart = new ShoppingCart();
const products = [
  new Product(1, "Baskets", 100, "/assets/baskets.png"),
  new Product(2, "Socks", 20, "/assets/socks.png"),
  new Product(3, "Bag", 50, "/assets/bag.png"),
];

products.forEach((product) => cart.addItem(product, 1));
