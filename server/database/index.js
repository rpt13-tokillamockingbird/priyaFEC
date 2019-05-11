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

    var colorArray = [];
    for (let i = 0; i <= 50; i++) {
        colorArray.push(faker.commerce.color())
    }
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


    dbConnection.end(function (err) {
        if (err) {
            return console.error('Error in disConnecting Database FEC :' + err);
        }
    });
});


