const express = require('express');
const app = express();
const port = 4000;
const dbConnect = require("../server/database/getBuyerInfo");
const path = require('path');
//app.use(express.static('client/dist'));

app.use('/productBuyerInfo/:id', express.static(path.join(__dirname, '../client/dist')))

app.get('/productInfo', function (req, res) {
    debugger;
    dbConnect.buyerData.getBuyerInfo(req.query.id, function (data) {
        res.send(data);
    });
});

app.get('/productQtyInfo', function (req, res) {
    debugger;
    console.log(req.query.productObj);
    dbConnect.buyerData.getProductQuantity(req.query.productObj, function (data) {
        res.send(data);
    });
});
app.listen(port, () => console.log(`Product Buyer is  running on port 127.0.0.1:${port}`));
