DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(11) NULL,
  PRIMARY KEY(item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bully Dog Food", "Pet Supplies", 20, 60),
				("Gumby Toy", "Pet Supplies", 5, 30),
                ("Big Red Lipstick", "Beauty Supplies", 10, 45),
                ("Smoky Eye Shadow", "Beauty Supplies", 8, 34),
                ("Kitty Whiskers Cat Food", "Pet Supplies", 2, 55),
                ("Wing Eye Liner", "Beauty Supplies", 6, 65),
                ("Mousy Cat Toy", "Pet Supplies", 3, 54),
                ("The Beatles Greatest Hits CD", "Music", 20, 15),
                ("The Clash London Calling Vinyl", "Music", 22, 33),
                ("Skullcandy Headphones", "Music", 30, 70);

SELECT * FROM products;                