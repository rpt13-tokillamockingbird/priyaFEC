var mysql = require('mysql');

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
    // Create Tables if not exist
    dbConnection.end(function (err) {
        if (err) {
            return console.error('Error in disConnecting Database FEC :' + err);
        }
    });
});


