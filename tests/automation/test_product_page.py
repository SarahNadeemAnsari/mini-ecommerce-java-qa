import requests

API_URL = "http://localhost/mini_ecommerce/api/products.php"

def test_each_product_has_valid_id():
    response = requests.get(API_URL)
    products = response.json()

    for product in products:
        assert product["id"] is not None
        assert product["name"] != ""
        assert float(product["price"]) >= 0
