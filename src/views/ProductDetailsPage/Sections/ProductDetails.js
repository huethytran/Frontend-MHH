import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Input from '@material-ui/core/Input';
import Rating from '@material-ui/lab/Rating';
import Button from "components/CustomButtons/Button.js";
import SameProducts from "./SameProducts";
import * as callApi from "../../../utils/apiCaller";
import {notification} from 'antd';
const openNotificationWithIcon = (type, text, title) => {
  notification[type]({
    message: title,
    description: text,
    style: {
      marginTop: 100,
    },
  });
};
export default class ProductDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          product: {
          name: null,
            price: 0,
            discount: 0,
            description: null,
            quantity: 0,
            imageArray: [],
            size: [],
            colorName: [],
            colorCode: [],
            material: null,
            rate: 0,
            categoryName: null,
            selledAmount: 0,
            imageUrl: null
          },
          choosingColor: null,
          choosingSize: null
        };
    }
    componentWillMount(){
      const {id} = this.props;
      console.log("willmounttttt")
      callApi.callApiGetProduct(id).then(data=>{
        this.setState({product: data.data.data})
      }).catch(err=>{
        console.log(err);
      })
    }
    componentDidUpdate(prevProps){
      const {id} = this.props;
      if (prevProps.id !== id){
        console.log("ooooo", id)
        callApi.callApiGetProduct(id).then(data=>{
          console.log(data);
         
          this.setState({product: data.data.data})
        }).catch(err=>{
          console.log(err);
        })
      }
    }
    handleChangeColor=(e)=>{
      this.setState({choosingColor: e.target.value});
    }
    handleChangeSize=(e)=>{
      this.setState({choosingSize: e.target.value});
    }
    carousel = () =>{
      var kq = [];
     const {imageArray, name} = this.state.product;
     console.log("Huhuhuhu", imageArray, name)
      for (let i =0;i<imageArray.length;i+=1)
      {
        kq.push(<div>
          <img src={imageArray[i]} />
        </div>)
      }
      return kq;
    }
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
  addToCart=()=>{
    const {addCart, id} = this.props;
    const {product, choosingColor, choosingSize} = this.state;
    var cart ={
      name: product.name,
      amount: parseInt(document.getElementById("amount").value),
      price: product.price,
      colorName: choosingColor,
      size: choosingSize,
      imageUrl: product.imageUrl,
      discount: product.discount
    }
    if (cart.colorName === null) openNotificationWithIcon("warning", "Xin hãy chọn màu sản phẩm","Chưa chọn màu");
    else if (cart.size === null) openNotificationWithIcon("warning","Xin hãy chọn kích cỡ của sản phẩm", "Chưa chọn kích cỡ");
    else if (cart.amount === 0) openNotificationWithIcon("warning", "Xin hãy chọn số lượng sản phẩm cần thêm vào giỏ hàng", "Chưa chọn số lượng");
    else { addCart(cart); openNotificationWithIcon("success", "Thêm vào giỏ hàng thành công!", "Đã thêm");}
  }
  isDiscount = ()=>{
      const {discount} = this.state.product;
      if (discount !== 0 )
          return (<div style={{position:"absolute", width:"65px", height:"20px", color:"red", backgroundColor: "yellow",fontWeight:"600", textAlign:"center"}}>
          -{discount}%
      </div>);
      else return(<div></div>);
  }
  isDiscountPrice = () =>{
      const {discount, price} = this.state.product;
      if (discount !== 0 )
          return (<div className="price" style={{display: "flex", marginLeft:"10%", fontWeight: "bold",fontSize:"17px"}}>
              <div>{this.changePriceNumToPriceString(parseInt(price*((100-discount)/100)))}đ</div>&nbsp;&nbsp;&nbsp;
             <i> <del style={{color: "grey", fontSize:"15px"}}>{this.changePriceNumToPriceString(price)}đ</del></i>
      </div>);
      else return(<div style={{color: "black", fontWeight:"bold", fontSize:"17px"}}>{this.changePriceNumToPriceString(price)}đ</div>);
  }
  color = () =>{
    var kq = [];
    const {colorCode, colorName} = this.state.product;
    var kq1 = [];
    
    for (let i =0;i<colorCode.length; i+=1)
    {
      kq.push(<div className="color"><input className="color" id={100-i} type="radio" value={colorName[i]} name="radio-2" onChange={this.handleChangeColor}/><label id={`c${1998-i}`} className="color"  for={100-i}></label></div>);
      let sheet = new CSSStyleSheet();
      sheet.replaceSync(`#c${1998-i}::before, #c${1998-i}::after  {background-color: ${colorCode[i]}}`);
      kq1.push(sheet);
    }
document.adoptedStyleSheets = kq1;
    return kq;
  }
  size = () =>{
    var kq = [];
    const {size} = this.state.product;
    for (let i =0;i<size.length; i+=1)
    {
      kq.push(<div style={{marginRight: "4%"}}> <input className="size" type="radio" name="radio1" id={i} value={size[i]} style={{display: "none"}} onChange={this.handleChangeSize}/><label className="size" for={i}>{size[i]}</label></div>)
    }
    return kq;
  }

    render() {
        const {id} = this.props;
        const {name, description,material, selledAmount, rate, quantity, categoryName}=this.state.product;
        return (
            <div style={{display:"block", padding: "20px 40px", backgroundColor:"white"}}>
            <div style={{display: "flex" }}>
                <div style={{width:"100%"}}>
            <Carousel autoPlay>
    {this.carousel()}
  </Carousel>
  </div>
  <div style={{width:"100%", marginLeft:"5%"}}>
     <h3 style={{fontWeight: "600"}}>{name}</h3>
   <p><span style={{color:"grey", marginRight:"60px"}}>MÃ SP: {id}</span><sup><ins style={{color:"orange", fontWeight:"bold", marginRight:"10px", fontSize:"18px"}}>{rate}</ins></sup><Rating name="read-only" value={rate} readOnly precision={0.5} /></p>  
     <div style={{marginTop:"20px", display:"flex"}}><div style={{marginRight: "70px"}} >{this.isDiscount()}</div><div>{this.isDiscountPrice()}</div><div style={{color:"grey", marginLeft:"40px"}}>Đã bán {selledAmount} sản phẩm.</div></div><hr/>
    <p><span style={{fontSize:"12px", fontWeight:"bold", marginRight:"10px"}}>CHẤT LIỆU:</span>{material}</p> 
    <p> <p style={{fontSize:"12px", fontWeight:"bold", marginRight:"30px"}}>MÔ TẢ SẢN PHẨM:</p>{description}</p><hr/>
     <p style={{fontSize:"12px", fontWeight:"bold"}}>MÀU SẮC</p>
     <form>{this.color()}</form><hr/>
            <p style={{fontSize:"12px", fontWeight:"bold"}}>SIZE</p>
            <form className="size">
              {this.size()}</form><hr/>
            <p style={{fontSize:"12px"}}>Hiện tại còn {quantity} sản phẩm.</p>
            <Input id="amount" type="number"  inputProps={ { min: 0, max: quantity }} defaultValue={0} />
          <Button style={{width:"100%", backgroundColor:"black", marginTop:"50px"}} onClick={this.addToCart}>THÊM VÀO GIỎ</Button>
  </div>
  </div>
  <div style={{width: "100%", marginTop:"50px"}}>
          <h2 style={{textAlign:"center", fontSize:"bold"}}>SẢN PHẨM LIÊN QUAN</h2>
          {categoryName !== null? <SameProducts category={categoryName} id={id}/>: null}
  </div>
  </div>
        );
    }
}