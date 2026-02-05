import requests

API_URL = "http://localhost/mini_ecommerce/api/products.php"

def test_products_api_status_code():
    response = requests.get(API_URL)
    assert response.status_code == 200

def test_products_api_returns_list():
    response = requests.get(API_URL)
    assert isinstance(response.json(), list)

def test_product_fields_exist():
    response = requests.get(API_URL)
    products = response.json()

    assert len(products) > 0

    product = products[0]
    required_fields = ["id", "name", "price", "description", "image_url"]

    for field in required_fields:
        assert field in product
