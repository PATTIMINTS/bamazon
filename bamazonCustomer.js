const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');
const prompt = require('prompt');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "I<3BAILEY",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`Connected as Id ${connection.threadId}`)
  showProd();

});

function showProd() {

  connection.query('SELECT * FROM products', function (err, res) {
    if (err) {
      console.log(err);
      throw (err);
    }

    var table = new Table({
      head: ['ITEM ID', 'PRODUCT NAME', 'DEPARTMENT', 'PRICE', 'QUANTITY']

    });

    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, '$' + res[i].price, res[i].stock_quantity])
    }

    console.log(table.toString());

    itemSelect();

  })
}

function itemSelect() {
  let items = [];

  connection.query('SELECT item_id FROM products', function (err, res) {
    if (err) {
      console.log(err);
      throw err;
    }
    for (var i = 0; i < res.length; i++) {
      items.push(res[i].item_id)
    }


    inquirer.prompt([
      {
        type: "input",
        name: "option",
        message: "Please enter the id number of item you wish to purchase."
      }
    ]).then(function (answer) {
      console.log("You selected item: " + answer.option);
      selectedAmount(items, answer.option);
    })
  });

}

function selectedAmount(items, itemsChosen) {
  var item = items.shift();

  var itemsChosen = itemsChosen;
  item = itemsChosen;


  connection.query('SELECT stock_quantity, price, department_name FROM products WHERE ?', {
    item_id: item
  }, function (err, res) {
    if (err) throw err;
    // console.log(res);
    itemQuantity = res[0].stock_quantity;
    itemCost = res[0].price;
    department = res[0].department_name;
  })



  inquirer.prompt([
    {
      type: "input",
      name: "amount",
      message: "How many of selected item " + item + " would you like?"
    }
  ]).then(function (amountIs) {
    console.log("Quantity selected is: " + amountIs.amount + "\n");
    // console.log(amountIs.amount);
    console.log("Available quantity is: " + itemQuantity);
    if (amountIs.amount > itemQuantity) {
      console.log("Sorry, insufficient quantity!");
    }
    else {
      itemQuantity -= amountIs.amount;
      let total = amountIs.amount * itemCost;
      console.log("Total amount due is $ " + total + "\n");
      
    }
    updateProduct(itemQuantity, itemsChosen);
    
  });
}


function updateProduct(itemQuantity, itemsChosen) {

  var quanTotal = itemQuantity;
  var itemsId = itemsChosen;
  var totalQ = quanTotal - itemsId;


  console.log("Quantity amount remaining " + quanTotal);


  console.log("Updating all product quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: quanTotal
      },
      {
        item_id: itemsId
      }
    ],
    function (err, res) {
      console.log(res.affectedRows + " products updated!\n");
      connection.end();
    }
  );
};







