TABLE: users
- id (INT, PK)
- username
- email
- password
- role

TABLE: products
- id (INT, PK)
- name
- price
- description
- stock
- image_url

TABLE: cart_items
- id (INT, PK)
- user_id (logical reference to users.id)
- product_id (logical reference to products.id)
- quantity
