let mysql = require('mysql');
let inquirer = require('inquirer');

// initializing the connection
let connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'blank',
        database: 'bamazon'
});

// testing the connection
connection.connect(function(err){
    if (err) {
        console.error('error connecting: ' + err.stack);
    }
    //console.log(connection.threadId);
    loadProducts()
});

function loadProducts() {
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res){
    //showing the products
    console.table(res);

    //time 2 prompt
    promptCustomerForItem(res);
    });
}

function promptCustomerForItem(Inventory) {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'What is the ID of your desired item for purchase?'
    }]).then(function(val) {
        var choiceID = parseInt(val.choice);
        //query for objects to see if they are in stock
        let product = checkInventory(choiceId, inventory);
        //console(product);
        if (product) {
            promptCustomerForQuantity(product);
        } else {
            console.log('That item is not in our inventory');
        loadProducts();
        }
    });
}
function promptCustomerforQuantity(product) {
   inquirer.prompt([{

    //prompt for quantity here
   }]).then(function(val) {
       var quantity = parseInt (val.quantity);
       //stock quantity is inside the object (in the table)
       if (quantity > product.stock_quantity) {
           console.log('not enough');
           loadProducts();
       } else {
           makePurchase(product, quantity);
       }

       })
   }


function makePurchase (product, quantity) {
    connection.query(
        //update database
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?',
        [quantity, product.item_id],
        function(err, res) {

        }
    )
}



function checkInventory(choiceID, inventory) {
    console.log(invetory);
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === choiceID){
            return inventory[i];
        }    
    }
    return null;
}