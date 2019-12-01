import React from "react";
import { Link } from 'react-router-dom';

class Product extends React.Component{
    changePriceNumToPriceString(price){
        var i = 0;
        var pricestring = "";
        while (price >= 1)
        {
            pricestring = price%10 + pricestring;
            price = Math.floor(price/10);
            i = i+1;
            if (i === 3) pricestring = "." + pricestring;
        }
        return pricestring;
    }
    isDiscount = ()=>{
        const {discount} = this.props;
        if (discount !== 0 )
            return (<div style={{position:"absolute", width:"50px", height:"20", color:"white", backgroundColor: "red",fontWeight:"600", textAlign:"center"}}>
            -{discount}%
        </div>);
        else return(<div></div>);
    }
    isDiscountPrice = () =>{
        const {discount, price} = this.props;
        if (discount !== 0 )
            return (<div className="price" style={{display: "flex", marginLeft:"10%"}}>
                <div>{this.changePriceNumToPriceString(price*((100-discount)/100))}đ</div>&nbsp;&nbsp;&nbsp;
               <i> <del style={{color: "grey", fontSize:"14px"}}>{this.changePriceNumToPriceString(price)}đ</del></i>
        </div>);
        else return(<div className="price" style={{color: "black"}}>{this.changePriceNumToPriceString(price)}đ</div>);
    }
    render() {
        const {imgUrl, name, id} = this.props;
        return (
            <div className="product">
                <Link to={`/productdetails/${id}`}>
                    <div style={{position: "relative"}}>
                        {this.isDiscount()}
    <img src={imgUrl} alt="Product Image" width="280" height="300"/>
    </div>
        <div class="productinfo">
            <div className="name">{name}</div>
            {this.isDiscountPrice()}
            </div>
  </Link>
</div>
        );
    }
}
export default Product;