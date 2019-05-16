var mysql = require('mysql');

dbConnection1 = mysql.createConnection({
    user: 'root',
    password: 'rootPriya1211',
    database: 'fec'
});

let buyerData = {};
buyerData.getBuyerInfo = function (cb) {
    let getBuyerInfo = `select i.ProductId, c.ColorsName, c.Color , s.USSize , s.EUSize ,  w.WidthType,  i.Quantity 
    from ProductInventory as i inner join Size as s on i.SizeId = s.SizeId 
    inner join  Width  as w on i.WidthId = w.WidthId
    inner join Color as c on i.ColorId = c.ColorId
    where i.ProductId = 5000 and i.Quantity > 0
    ORDER BY ProductId asc LIMIT 100`;
    dbConnection1.query(getBuyerInfo, (err, results) => {
        if (err) {
            console.log("GetBuyerInfo", err)
        }
        cb(results);
    })
};

module.exports.buyerData = buyerData;