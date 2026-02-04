document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.getElementById("products-container");

    fetch("../api/products.php")
        .then(response => response.json())
        .then(products => {
            console.log(products); // <-- debug log
            if(products.error){
                productsContainer.innerHTML = "<p>Could not load products</p>";
                return;
            }
            
            let html = "";
            products.forEach(product => {
                html += `
                    <div class="product-card">
                        <img src="${product.image_url}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Price: $${product.price}</p>
                        <p>Stock: ${product.stock}</p>
                    </div>
                `;
            });
            productsContainer.innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            productsContainer.innerHTML = "<p>Error loading products</p>";
        });
});
