import axios from 'axios';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import dropDownStyle from '../../src/style/DropDown.css'

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

const productInv = {
    fontSize: '0.8rem',
}

const prodInvFontSetting = {
    fontWeight: 600,
}

let buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px',
    width: '474px'
}

let inputStyle = {
    height: '50px',
    width: '50px'
}


export default class ProductBuyer extends React.Component {
    constructor() {
        super();
        this.state = {
            productInfo: {},
            productReviewInfo: {},
            productInventoryInfo: {},
            colorArray: [],
            previousColor: ''
        }
        this._onSelect = this._onSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        debugger;
        var pathData = window.location.href.split('/')
        let productId = pathData[pathData.length - 2];
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
            productReviewInfo: reviewServiceData,
        });
        debugger;
        // get productID from url
        let ri = this;
        $.ajax({
            url: `/productInfo`,
            data: {
                id: productId
            },
            method: 'GET',
            success: function (data) {
                debugger;
                let productInventory = {};
                productInventory.SizesAvailable = data.map(prd => { return { value: `${prd.USSize}/${prd.EUSize}`, label: `${prd.USSize}/${prd.EUSize}` } });
                productInventory.WidthAvaialble = data.map(prd => { return { value: `${prd.WidthType}`, label: `${prd.WidthType}` } });
                productInventory.ColorAvailable = data.map(prd => { return { value: `${prd.Color}`, label: `${prd.Color.toUpperCase()}` } });
                let colorArrayData = data.map(prd => prd.Color);
                console.log(productInventory);
                ri.setState({
                    productInventoryInfo: productInventory,
                    colorArray: colorArrayData
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    _onSelect(event) {
        debugger;
        let data = event.value;
        if (this.state.previousColor) {
            this.refs[this.state.previousColor].style['width'] = "50px";
            this.refs[this.state.previousColor].style['height'] = "50px";
            this.refs[this.state.previousColor].style['border'] = "0px";
        }
        this.refs[data].style['width'] = "60px";
        this.refs[data].style['height'] = "60px";
        this.refs[data].style['border'] = "2px solid black";
        this.setState({
            previousColor: data,
        });

    }
    handleSubmit() {

    }

    render() {
        const isDiscounted = this.state.productInfo.productDiscountPrice;
        const defaultSize = "Size"
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
                <div id="prdInv" style={productInv}>
                    <p><span style={prodInvFontSetting}>Fit</span> True to size</p>
                    <Dropdown style={dropDownStyle} options={this.state.productInventoryInfo.SizesAvailable} placeholder="Size" />
                    <br />
                    <br />
                    <Dropdown options={this.state.productInventoryInfo.WidthAvaialble} placeholder="Width" />
                    <br />

                    <Dropdown onChange={this._onSelect} options={this.state.productInventoryInfo.ColorAvailable} placeholder="Color" />
                    <br />
                    <br />

                    {this.state.colorArray.map(function (element, index) {
                        const colorBox = {
                            width: '50px',
                            height: '50px',
                            backgroundColor: element,
                            borderRadius: '50%',
                            display: 'inline-block',
                            margin: '10px',
                            border: '1px solid grey'
                        }
                        return <div ref={element} key={index} style={colorBox}></div>
                    })}

                    <form onSubmit={this.handleSubmit}>
                        <br />
                        <input style={inputStyle} type="text" value={this.state.qty} />
                        <br />
                        <br />
                        <input style={buttonStyle} type="submit" value="Add to Bag" />
                    </form>
                </div>


            </div>
        )
    }
}