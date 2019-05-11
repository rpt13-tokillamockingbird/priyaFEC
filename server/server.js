const express = require('express');
const app = express();
const port = 4000;
const dbConnect = require("../server/database/getBuyerInfo");

app.use(express.static('client'));
app.get('/productBuyerInfo', function (req, res) {
    dbConnect.buyerData.getBuyerInfo(function (data) {
        res.send(data);
    });
});
app.listen(port, () => console.log(`Product Buyer is  running on port 127.0.0.1:${port}`));
