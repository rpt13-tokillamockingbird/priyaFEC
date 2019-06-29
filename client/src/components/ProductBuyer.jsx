import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import Dropdown from 'react-dropdown'
import "react-dropdown/style.css"
import dropDownStyle from "../../src/style/DropDown.css";
import swal from 'sweetalert';

const productInfo = {
    fontFamily: "Arial",
    lineHeight: '1.4',
    color: '#393939',
    width: '55%',
    float: "right"
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

const errorStyle = {
    color: 'red',
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
            productId: '',
            productInfo: {},
            productReviewInfo: {},
            productInventoryInfo: {},
            colorArray: [],
            previousColor: '',
            colorValue: {},
            widthValue: {},
            sizeValue: {},
            isSizeErrorVisible: false,
            isColorErrorVisible: false,
            isWidthErrorVisible: false,
            isQtyErrorVisible: false,
            productSelectedSize: 'Size',
            productSelectedWidth: 'Width',
            productSelectedColor: 'Color',
            qty: ''
        }
        this._onSelectSize = this._onSelectSize.bind(this);
        this._onSelectWidth = this._onSelectWidth.bind(this);
        this._onSelectColor = this._onSelectColor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.prdQty = this.prdQty.bind(this);

    }
    componentDidMount() {
        debugger;
        var pathData = window.location.href.split('/')
        let productId = pathData[pathData.length - 2];
        let productServiceData = {};
        let reviewServiceData = {};
        this.setState({
            productId: productId
        });
        $.ajax({
            url: `http://ec2-54-175-0-74.compute-1.amazonaws.com/productBuyerService${window.location.pathname}`,
            // data: {
            //     id: productId
            // },
            method: 'GET',
            success: function (data) {
                debugger;
                let productData = data[0];
                let productServiceData2 = {
                    productTitle: productData.productName.toUpperCase(),
                    productSubTitle: productData.productSubTitle,
                    productOriginalPrice: productData.price.$numberDecimal,
                    productDiscountPrice: productData.discountPrice.$numberDecimal,
                    productDiscountPercent: productData.discountPercent,
                    productSingleLinDesc: productData.productSingleLineDescription
                };
                productServiceData = Object.assign(productServiceData, productServiceData2);;
            },
            error: function (err) {
                console.log(err);
                console.log("pp");
            }
        });

        $.ajax({
            url: `http://ec2-54-196-121-70.compute-1.amazonaws.com/Priya${window.location.pathname}`,
            // data: {
            //     id: productId
            // },
            method: 'GET',
            success: function (data) {
                reviewServiceData = Object.assign(reviewServiceData, data)
            },
            error: function (err) {
                console.log(err);
            }
        });

        this.setState({
            productInfo: productServiceData,
            productReviewInfo: reviewServiceData,
        });
        debugger;
        // get productID from url
        let ri = this;
        console.log(window.location.pathname);
        $.ajax({
            url: `/productInfo${window.location.pathname}`,
            method: 'GET',
            success: function (data) {
                debugger;
                let productInventory = {};
                productInventory.SizesAvailable = data.map(prd => { return { value: `${prd.USSize}/${prd.EUSize}`, label: `${prd.USSize}/${prd.EUSize}` } });
                productInventory.WidthAvaialble = data.map(prd => { return { value: `${prd.WidthType}`, label: `${prd.WidthType}` } });
                productInventory.ColorAvailable = data.map(prd => { return { value: `${prd.Color}`, label: `${prd.Color.toUpperCase()}` } });
                let colorArrayData = data.map(prd => prd.Color);
                console.log(productInventory.ColorAvailable[0]);
                ri.setState({
                    productInventoryInfo: productInventory,
                    colorArray: colorArrayData,
                    colorValue: 'Color',
                    widthValue: 'Width',
                    sizeValue: 'Size'
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    prdQty(event) {
        this.setState({
            qty: event.target.value,
            isQtyErrorVisible: false
        });
    }
    _onSelectColor(event) {
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
            colorValue: data,
            productSelectedColor: data,
            isQtyErrorVisible: false
        });
    }
    _onSelectWidth(event) {
        debugger;
        this.setState({
            productSelectedWidth: event.value,
            widthValue: event.value,
            isQtyErrorVisible: false
        });
    };

    _onSelectSize(event) {
        debugger;
        this.setState({
            productSelectedSize: event.value,
            sizeValue: event.value,
            isQtyErrorVisible: false
        });
    };

    handleSubmit(event) {
        let rm = this;
        event.preventDefault();
        if (this.state.productSelectedSize === 'Size') {
            this.setState({
                isSizeErrorVisible: true,
                isColorErrorVisible: false,
                isWidthErrorVisible: false
            });
            return;
        }
        else if (this.state.productSelectedWidth === 'Width') {
            this.setState({
                isWidthErrorVisible: true,
                isSizeErrorVisible: false,
                isColorErrorVisible: false
            });
            return;
        } else if (this.state.productSelectedColor === 'Color') {
            this.setState({
                isColorErrorVisible: true,
                isSizeErrorVisible: false,
                isWidthErrorVisible: false
            });
            return;
        } else {
            this.setState({
                isColorErrorVisible: false,
                isSizeErrorVisible: false,
                isWidthErrorVisible: false
            });

            let productObj = {
                productId: this.state.productId,
                Size: this.state.productSelectedSize.split('/')[0],
                Width: this.state.productSelectedWidth,
                Color: this.state.productSelectedColor
            }
            this.checkDataPresent(productObj, this.state.qty);
            //check if data
            console.log(rm);
        }
    }

    checkDataPresent(productSelected, qty) {
        let rm = this;
        $.ajax({
            url: `/productQtyInfo`,
            data: {
                productObj: productSelected
            },
            method: 'POST',
            success: function (data) {
                debugger;
                if (data.length > 0) {
                    let checkQty = data[0].Quantity - qty
                    let status = (checkQty > 0) ? false : true
                    rm.setState({
                        isQtyErrorVisible: status
                    });
                    if (!status) {
                        swal({
                            title: "Yay!",
                            text: "Product added to cart",
                            icon: "success"
                        });
                    }
                } else {
                    rm.setState({
                        isQtyErrorVisible: true
                    });
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    render() {
        const isDiscounted = this.state.productInfo.productDiscountPrice;
        const defaultSize = "Size"
        let productPriceInfo;
        if (isDiscounted > 0) {
            productPriceInfo = <p>$<strike style={strikePrice}>{this.state.productInfo.productOriginalPrice}</strike>&nbsp;${this.state.productInfo.productDiscountPrice}&nbsp;  {this.state.productInfo.productDiscountPercent}% off</p>
        }
        else {
            productPriceInfo = <p>${this.state.productInfo.productOriginalPrice}</p>
        }

        return (
            <div className="ProductBuyer" style={productInfo}>
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
                    <Dropdown onChange={this._onSelectSize} style={dropDownStyle} options={this.state.productInventoryInfo.SizesAvailable} value={this.state.sizeValue} placeholder="Size" />
                    {this.state.isSizeErrorVisible ? <p style={errorStyle}>Please select Size</p> : null}
                    <br />
                    <br />
                    <Dropdown onChange={this._onSelectWidth} options={this.state.productInventoryInfo.WidthAvaialble} value={this.state.widthValue} placeholder="Width" />
                    {this.state.isWidthErrorVisible ? <p style={errorStyle}>Please select Width</p> : null}
                    <br />
                    <br />

                    <Dropdown onChange={this._onSelectColor} options={this.state.productInventoryInfo.ColorAvailable} value={this.state.colorValue} placeholder="Color" />
                    {this.state.isColorErrorVisible ? <p style={errorStyle}>Please select Color</p> : null}
                    <br />
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
                        <input style={inputStyle} type="text" onChange={this.prdQty}
                            value={this.state.qty} />
                        {this.state.isQtyErrorVisible ? <p style={errorStyle}>Product selected is out of Stock. Please try  next time </p> : null}
                        <br />
                        <br />
                        <input style={buttonStyle} type="submit" value="Add to Bag" />
                    </form>
                </div>


            </div>
        )
    }
}