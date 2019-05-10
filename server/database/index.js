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
});


dbConnection.end(function (err) {
    if (err) {
        return console.error('Error in disConnecting Database FEC :' + err);
    }
});