CREATE DATABASE bamazon;

USE bamazon;

create table products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
);