var mysql = require('mysql');
var faker = require('faker');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
dbConnection = mysql.createConnection({
    user: 'root',
    password: 'rootPriya1211',
    database: 'fec'
});

dbConnection.connect(function (err) {
    if (err) {
        return console.error('Error in connecting Database FEC :' + err);
    }
    console.log("Connected to MySQL server FEC Database")
    //Drops the table if present at initalization 
    let deleteProductInventoryTable = `DROP TABLE IF EXISTS ProductInventory`;
    dbConnection.query(deleteProductInventoryTable, function (err, results, fields) {
        if (err) {
            console.log('deleteProductInventoryTable:', err.message);
        }
    });
    let deleteSizeTable = `DROP TABLE IF EXISTS Size`;
    dbConnection.query(deleteSizeTable, function (err, results, fields) {
        if (err) {
            console.log('deleteSizeTable:', err.message);
        }
    });
    let deleteWidthTable = `DROP TABLE IF EXISTS Width`;
    dbConnection.query(deleteWidthTable, function (err, results, fields) {
        if (err) {
            console.log('deleteWidthTable:', err.message);
        }
    });
    let deleteColorTable = `DROP TABLE IF EXISTS Color`;
    dbConnection.query(deleteColorTable, function (err, results, fields) {
        if (err) {
            console.log('deleteColorTable:', err.message);
        }
    });

    //Create the tables at initalization 

    let createSizeTable = `CREATE TABLE if not exists Size(
                            SizeId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                            USSize varchar(50),
                            EUSize varchar(50)
                        )`;
    dbConnection.query(createSizeTable, function (err, results, fields) {
        if (err) {
            console.log('createSizeTable:', err.message);
        }
    });



    let createWidthTable = `CREATE TABLE if not exists Width(
                            WidthId int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
                            WidthType varchar(50)
                        )`;
    dbConnection.query(createWidthTable, function (err, results, fields) {
        if (err) {
            console.log('createWidthTable:', err.message);
        }
    });

    let createColorTable = `CREATE TABLE if not exists Color(
                            ColorId int NOT NULL  AUTO_INCREMENT PRIMARY KEY,
                            ColorsName  varchar(50),
                            Color varchar(50)
                        )`;

    dbConnection.query(createColorTable, function (err, results, fields) {
        if (err) {
            console.log('createColorTable', err.message);
        }
    });

    let createProductInventoryTable = `CREATE TABLE if not exists ProductInventory (
                                       RecId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                       ProductId int, 
                                       Quantity int, 
                                       SizeId  int,
                                       WidthId int, 
                                       ColorId  int,
                                       FOREIGN KEY (SizeId) REFERENCES Size (SizeId),
                                       FOREIGN KEY (WidthId) REFERENCES Width (WidthId),
                                       FOREIGN KEY (ColorId) REFERENCES Color(ColorId)
                                    )`;
    dbConnection.query(createProductInventoryTable, function (err, results, fields) {
        if (err) {
            console.log('ProductInventory', err.message);
        }
    });

    //Feeds the tables with data;

    //gets color data from faker;
    var colorArray = [];
    for (let i = 0; i <= 50; i++) {
        colorArray.push(faker.commerce.color())
    }
    //avoids duplicate color names
    let uniqueArray = [...new Set(colorArray)]
    uniqueArray.forEach(color => {
        if (color.split(" ").length < 2) {
            let inserColorStmt = `INSERT INTO Color (ColorsName, Color) VALUE ('${color}', '${color}')`;
            dbConnection.query(inserColorStmt, (err, results, fields) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Color Id:' + results.insertId);
            });
        }
    });

    // Add the Size table with standard US SIZE
    let USSize = ['5-5.5US', '6-6.5US', '7-7.5US', '8-8.5US', '9-9.5US', '10-10.5US', '11-11.5US', '12-12.5US', '13-13.5US', '14-14.5US', '15-15.5US'];
    let EUSize = ['39EU', '40EU', '41EU', '42EU', '43EU', '44EU', '45EU', '46EU', '47EU', '48EU', '49EU'];
    USSize.forEach((size, index) => {
        let inserSizeStmt = `INSERT INTO Size (USSize, EUSize) VALUE ('${USSize[index]}', '${EUSize[index]}')`;
        dbConnection.query(inserSizeStmt, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Size Id:' + results.insertId);
        });
    });

    //Adds the width Standars
    let Width = ['M(Medium)', 'W(Wide)', 'N(Narrow)', 'EW(Extra-Wide)', 'S(Small)'];

    Width.forEach((width, index) => {
        let insertWidtheStmt = `INSERT INTO Width (WidthType) VALUE ('${width}')`;
        dbConnection.query(insertWidtheStmt, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Width Id:' + results.insertId);
        });
    });

    //Feeds the product inventory table with data
    let productId = 4999;
    for (let i = 0; i < 100; i++) {
        // Each product alteast have 5 differetn types of configuration
        productId++;
        for (let i = 0; i < 5; i++) {
            // genrate random Id from different table
            let colorId = Math.floor(Math.random() * (23)) + 1;
            let SizeId = Math.floor(Math.random() * (11)) + 1;
            let WidthId = Math.floor(Math.random() * (5)) + 1;
            let Quantity = Math.floor(Math.random() * (50)) + 50;
            let insertProductStmt = `INSERT INTO ProductInventory (ProductId, Quantity, SizeId, WidthId, ColorId) VALUE ('${productId}', '${Quantity}', '${SizeId}', '${WidthId}', '${colorId}' )`;
            dbConnection.query(insertProductStmt, (err, results, fields) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('ProductInventory Id:' + results.insertId);
            });
        }
    }

    dbConnection.end(function (err) {
        if (err) {
            return console.error('Error in disConnecting Database FEC :' + err);
        }
    });
});


