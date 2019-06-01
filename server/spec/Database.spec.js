var mysql = require('mysql');

test('Check connection', done => {
    var dbConnection = mysql.createConnection({
        user: 'root',
        password: 'rootPriya1211',
        database: 'fec'
    });
    dbConnection.connect();
    var queryString = 'select * FROM productInventory LIMIT 1';
    var queryArgs = [];
    dbConnection.query(queryString, queryArgs, function (err, results) {
        // Should have one result:
        expect(results.length).toBe(1);
        // TODO: If you don't have a column named text, change this test.
        expect(results[0].ProductId).toBe(5000);
        done();
    });
    dbConnection.end();
});

