import axios from 'axios';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';

const productInfo = {
    fontFamily: "Arial",
    lineHeight: '1.4',
    color: '#393939',
    width: '25%'
}
const reviewNumberStyle = {
    display: 'inline-block',
    fontSize: '1.3rem',
    position: 'relative',
    bottom: '5px'
};

const productTitle = {
    fontSize: '1.3rem',
};

const productSubTitle = {
    fontSize: '1.1rem',
};
const productPrice = {
    fontSize: '1rem',
    lineHeight: '2',
    fontWeight: '600'
}

const strikePrice = {
    fontWeight: '400'
}

const productDesc = {
    fontSize: '0.8rem',
}


export default class ProductBuyer extends React.Component {
    constructor() {
        super();
        this.state = {
            productInfo: {},
            productReviewInfo: {},

        }
    }
    componentDidMount() {
        debugger;
        let productServiceData = {
            productTitle: 'Everett Plain Toe Derby',
            productSubTitle: 'THE RAIL',
            productOriginalPrice: 99.94,
            productDiscountPrice: 89.94,
            productDiscountPercent: 33,
            productSingleLinDesc: "Burnished fine-grain leather and precision-stitched welting add polished versatility to an essential shoe for every man's wardrobe."
        }

        let reviewServiceData = {
            productRating: 3.5,
            productNumberOfRating: 100
        }
        this.setState({
            productInfo: productServiceData,
            productReviewInfo: reviewServiceData
        });

        // get productID from url

        $.ajax({
            url: '/productBuyerInfo',
            method: 'GET',
            success: function (data) {
                console.log(data);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    render() {
        const isDiscounted = this.state.productInfo.productDiscountPrice;
        let productPriceInfo;
        if (isDiscounted) {
            productPriceInfo = <p>$<strike style={strikePrice}>{this.state.productInfo.productOriginalPrice}</strike>&nbsp;${this.state.productInfo.productDiscountPrice}&nbsp;  {this.state.productInfo.productDiscountPercent}% off</p>
        }
        else {
            productPriceInfo = <p>${this.state.productInfo.productOriginalPrice}</p>
        }
        return (
            <div style={productInfo}>
                <h3>NORDSTORM Product Buyer</h3>
                <div id="prdReview">
                    <StarRatingComponent
                        name="productRate"
                        starCount={5}
                        starColor="black"
                        emptyStarColor="grey"
                        value={this.state.productReviewInfo.productRating}
                    />
                    <span style={reviewNumberStyle}>({this.state.productReviewInfo.productNumberOfRating})</span>
                </div>
                <div id="prdInfo">
                    <div style={productTitle}>
                        {this.state.productInfo.productTitle}
                    </div>
                    <div style={productSubTitle}>
                        {this.state.productInfo.productSubTitle}
                    </div>
                    <div style={productPrice}>
                        {productPriceInfo}
                    </div>
                    <p style={productDesc}>
                        {this.state.productInfo.productSingleLinDesc}
                    </p>
                </div>

            </div>
        )
    }
}