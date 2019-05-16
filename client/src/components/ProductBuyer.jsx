import axios from 'axios';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';

const reviewNumberStyle = {
    display: 'inline-block',
    fontFamily: 'Brandon Text',
    fontWeight: '400',
    lineHeight: '1.4',
    fontSize: '1.3rem',
    position: 'relative',
    bottom: '5px'
};



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
            prodcutSubTitle: 'THE RAIL',
            productOriginalPrice: 99.94,
            productDiscountPrice: 99.94,
            productDiscountPercent: 33,
            prodcutSingleLinDesc: "Burnished fine-grain leather and precision-stitched welting add polished versatility to an essential shoe for every man's wardrobe."
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
        return (
            <div >
                <h1>The product buyer Component</h1>
                <StarRatingComponent
                    name="productRate"
                    starCount={5}
                    starColor="black"
                    emptyStarColor="grey"
                    value={this.state.productReviewInfo.productRating}
                />
                <span style={reviewNumberStyle}>({this.state.productReviewInfo.productNumberOfRating})</span>

            </div>
        )
    }
}