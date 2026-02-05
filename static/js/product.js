const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch("http://localhost/mini_ecommerce/api/products.php")
  .then(response => response.json())
  .then(products => {
    const product = products.find(p => p.id === productId);

    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-image").src = product.image_url;
    document.getElementById("product-description").innerText = product.description;
    document.getElementById("product-price").innerText = "Rs " + product.price;

    document.getElementById("add-to-cart").onclick = () => {
      addToCart(product);
    };
  });

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}
