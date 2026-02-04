import requests

#Test 1: Verifying if the Api responded successfylly
#HTTP 200 = OK
def  test_product_api_returns_list():
    response = requests.get("http://localhost/mini_ecommerce/api/products.php")
    assert response.status_code == 200
    products = response.json()
    assert isinstance(products, list)

#Test 2: Checking if each product has required fields
def test_product_fields_exist():
    response = requests.get("http://localhost/mini_ecommerce/api/products.php")
    products = response.json()
    # Only run the field checks if atleast one product exists
    assert len(products) > 0
    product = products[0] # Takes first product from the list

    # Verify required fields exist in product object
    assert "id" in product
    assert "name" in product
    assert "price" in product
    assert "description" in product
    assert "stock" in product
    assert "image_url" in product