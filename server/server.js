const express = require('express');
const app = express();
const port = 4001;
const dbConnect = require("../server/database/getBuyerInfo");
const path = require('path');
var proxy = require('http-proxy-middleware');
const bodyParser = require("body-parser");
var cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//app.use(express.static('client/dist'));
app.use('/:id', express.static(path.join(__dirname, '../client/dist')));



app.get('/productInfo/:id', function (req, res) {
    debugger;
    dbConnect.buyerData.getBuyerInfo(req.params.id, function (data) {
        res.send(data);
    });
});

app.post('/productQtyInfo', function (req, res) {
    dbConnect.buyerData.getProductQuantity(req.body.productObj, function (data) {
        res.send(data);
    });
});
app.listen(port, () => console.log(`Product Buyer is  running on port 127.0.0.1:${port}`));
