var mysql = require('mysql');

dbConnection1 = mysql.createConnection({
    user: 'root',
    password: 'rootPriya1211',
    database: 'fec'
});

let buyerData = {};
buyerData.getBuyerInfo = function (id, cb) {
    console.log(id);
    let getBuyerInfo = `select i.ProductId, c.ColorsName, c.Color , s.USSize , s.EUSize ,  w.WidthType,  i.Quantity 
    from ProductInventory as i inner join Size as s on i.SizeId = s.SizeId 
    inner join  Width  as w on i.WidthId = w.WidthId
    inner join Color as c on i.ColorId = c.ColorId
    where i.ProductId = ${id} and i.Quantity > 0
    ORDER BY ProductId asc LIMIT 100`;
    console.log(getBuyerInfo);
    dbConnection1.query(getBuyerInfo, (err, results) => {
        if (err) {
            console.log("GetBuyerInfo", err)
        }
        cb(results);
    });


};
buyerData.getProductQuantity = function (productObj, cb) {
    let getprdQuantity = `select p.Quantity from ProductInventory as p 
    join Color as c on p.ColorId = c.ColorId
    join Size as s on p.SizeId = s.SizeId
    join Width as w on p.WidthId = w.WidthId
    where p.ProductId = ${productObj.productId} and c.Color = '${productObj.Color}' and 
    w.WidthType = '${productObj.Width}' and s.USSize  = '${productObj.Size}'`;
    console.log(getprdQuantity);
    dbConnection1.query(getprdQuantity, (err, results) => {
        if (err) {
            console.log("getprdQuantity", err)
        }
        cb(results);
    });
}
module.exports.buyerData = buyerData;