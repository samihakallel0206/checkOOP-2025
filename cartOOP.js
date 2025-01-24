class Product {
  constructor(id, name, price,image) {
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
    this.liked = !this.liked; // Inverse la valeur de liked
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    const item = new ShoppingCartItem(product, quantity);
    this.items.push(item);
    this.displayCart();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayCart();
  }

  increaseQuantity(productId) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) item.quantity++;
    this.displayCart();
  }

  decreaseQuantity(productId) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) item.quantity--;
    this.displayCart();
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  displayCart() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = "";

    this.items.forEach((item) => {
      // Créer un élément de carte pour chaque produit
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.style.width = "18rem";

      // Ajouter l'image du produit
      
      const img = document.createElement("img");
      img.src = item.product.image; 
      img.classList.add("card-img-top");
      img.alt = item.product.name;

      // Créer le corps de la carte
      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body");

      // Ajouter le nom du produit
      const productTitle = document.createElement("h5");
      productTitle.classList.add("card-title");
      productTitle.textContent = item.product.name;

      // Ajouter la description du produit
      const productText = document.createElement("p");
      productText.classList.add("card-text");
      productText.textContent = "Description du produit";

      // Ajouter le prix unitaire
      const unitPrice = document.createElement("h4");
      unitPrice.classList.add("unit-price");
      unitPrice.textContent = item.product.price;

      // Ajouter la devise
      const dollarSign = document.createElement("span");
      dollarSign.textContent = " $";

      // Créer les icônes pour augmenter/diminuer la quantité
      const quantityDiv = document.createElement("div");
      const plusIcon = document.createElement("i");
      plusIcon.classList.add("fas", "fa-plus-circle");
      plusIcon.addEventListener("click", () =>
        this.increaseQuantity(item.product.id)
      );

      const quantitySpan = document.createElement("span");
      quantitySpan.classList.add("quantity");
      quantitySpan.textContent = item.quantity;

      const minusIcon = document.createElement("i");
      minusIcon.classList.add("fas", "fa-minus-circle", "fas-xl");
      minusIcon.addEventListener("click", () =>
        this.decreaseQuantity(item.product.id)
      );

      quantityDiv.appendChild(plusIcon);
      quantityDiv.appendChild(quantitySpan);
      quantityDiv.appendChild(minusIcon);

      // Créer les icônes pour supprimer ou liker
      const actionsDiv = document.createElement("div");
      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fas", "fa-trash-alt", "fas-xl");
      trashIcon.addEventListener("click", () =>
        this.removeItem(item.product.id)
      );

      const heartIcon = document.createElement("i");
      heartIcon.classList.add(
          "fa-heart",
          "fas-xl",
          item.liked ? "fa-solid" : "fa-regular"
        
      );
      heartIcon.addEventListener("click", () =>
        this.toggleLike(item.product.id)
      );

      actionsDiv.appendChild(trashIcon);
      actionsDiv.appendChild(heartIcon);

      // Ajouter tous les éléments à la carte
      cardBodyDiv.appendChild(productTitle);
      cardBodyDiv.appendChild(productText);
      cardBodyDiv.appendChild(unitPrice);
      cardBodyDiv.appendChild(dollarSign);
      cardBodyDiv.appendChild(quantityDiv);
      cardBodyDiv.appendChild(actionsDiv);

      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBodyDiv);

      // Ajouter la carte au panier
      cartList.appendChild(cardDiv);
    });

    // Afficher le total
    cartTotal.textContent = `${this.getTotal()} $`;
  }

  toggleLike(productId) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.toggleLike();
      this.displayCart();
    }
  }
}

// Exemple d'ajout de produits
const cart = new ShoppingCart();

// Ajout des produits dans le panier 
const basket = new Product(1, "Baskets", 100, "/assets/baskets.png");
const socks = new Product(2, "Socks", 20, "/assets/socks.png");
const bag = new Product(3, "Bag", 50, "/assets/bag.png");


cart.addItem(basket, 1);
cart.addItem(socks, 2);
cart.addItem(bag, 1);
