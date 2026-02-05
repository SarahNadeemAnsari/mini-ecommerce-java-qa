fetch("http://localhost/mini_ecommerce/api/products.php")
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <a href="product.html?id=${product.id}" class="product-link">
          <img src="${product.image_url}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>Rs ${product.price}</strong></p>
        </a>
      `;

      container.appendChild(card);
    });
  });

