import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Input from '@material-ui/core/Input';
import Rating from '@material-ui/lab/Rating';
import Button from "components/CustomButtons/Button.js";
import SameProducts from "./SameProducts";
export default class ProductDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
         name: "ĐẦM ĐẮP CHÉO XẾP TÙNG BÈO HÔNG",
         price: 100000,
         discount: 20,
         size: ["S","M","L"],
          color: ["black","yellow","orange"],
          description: "Miêu tả: Khoác kiểu tay dài túi hộp.\nSize: S/M/L.\nĐặc tính: Thanh lịch – sang trọng.\nThể loại: Trang phục tiệc.\nMàu sắc: Đỏ - Đen.\nChất liệu: Bố caro kim tuyến.",
          img:["https://product.hstatic.net/200000000131/product/nau-1_ff1565610f5b42c2bf95897dd464c120_master.jpg",
        "https://product.hstatic.net/200000000131/product/nau-2_88c9b0c5a7f4455899faa4c36f94e617_master.jpg",
      "https://product.hstatic.net/200000000131/product/nau-3_aa0fc7b1bb2e4118b4739041a219c819_master.jpg",
    "https://product.hstatic.net/200000000131/product/xanh-reu-1_3c444110dcc24767b9b26876b11b3c40_master.jpg",
  "https://product.hstatic.net/200000000131/product/xanh-reu-2_f260043db9414849b1be3eacc6585087_master.jpg",
"https://product.hstatic.net/200000000131/product/xanh-reu-4_d4cc971c0add474a839a7c4599725d29_master.jpg"],
          material: "Plastic",
          sold: 12,
          rate: 4.5,
          choosingColor: "black",
          choosingSize: "S",
          quantity: 10
        };
    }
    handleChangeColor=(e)=>{
      const {quantity} = this.state;
      this.setState({choosingColor: e.target.value, quantity: quantity + 1});
    }
    handleChangeSize=(e)=>{
      const {quantity} = this.state;
      this.setState({choosingSize: e.target.value, quantity: quantity + 1});
    }
    carousel = () =>{
      var kq = [];
      const {img} = this.state;
      for (let i =0;i<img.length;i+=1)
      {
        kq.push(<div>
          <img src={img[i]} />
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
  isDiscount = ()=>{
      const {discount} = this.state;
      if (discount !== 0 )
          return (<div style={{position:"absolute", width:"65px", height:"20px", color:"red", backgroundColor: "yellow",fontWeight:"600", textAlign:"center"}}>
          -{discount}%
      </div>);
      else return(<div></div>);
  }
  isDiscountPrice = () =>{
      const {discount, price} = this.state;
      if (discount !== 0 )
          return (<div className="price" style={{display: "flex", marginLeft:"10%"}}>
              <div>{this.changePriceNumToPriceString(price*((100-discount)/100))}đ</div>&nbsp;&nbsp;&nbsp;
             <i> <del style={{color: "grey", fontSize:"14px"}}>{this.changePriceNumToPriceString(price)}đ</del></i>
      </div>);
      else return(<div className="price" style={{color: "black"}}>{this.changePriceNumToPriceString(price)}đ</div>);
  }
  color = () =>{
    var kq = [];
    const {color} = this.state;
    var kq1 = [];
    
    for (let i =0;i<color.length; i+=1)
    {
      kq.push(<div className="color"><input className="color" id={100-i} type="radio" value={color[i]} name="radio-2" onChange={this.handleChangeColor}/><label id={`c${1998-i}`} className="color"  for={100-i}></label></div>);
      let sheet = new CSSStyleSheet();
      sheet.replaceSync(`#c${1998-i}::before, #c${1998-i}::after  {background-color: ${color[i]}}`);
      kq1.push(sheet);
    }
document.adoptedStyleSheets = kq1;
    return kq;
  }
  size = () =>{
    var kq = [];
    const {size} = this.state;
    for (let i =0;i<size.length; i+=1)
    {
      kq.push(<div style={{marginRight: "4%"}}> <input className="size" type="radio" name="radio1" id={i} value={size[i]} style={{display: "none"}} onChange={this.handleChangeSize}/><label className="size" for={i}>{size[i]}</label></div>)
    }
    return kq;
  }

    render() {
        const {id} = this.props;
        const {name, description,material, sold, rate, quantity}=this.state;
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
     <div style={{marginTop:"20px", display:"flex"}}><div style={{marginRight: "70px"}} >{this.isDiscount()}</div><div>{this.isDiscountPrice()}</div><div style={{color:"grey", marginLeft:"40px"}}>Đã bán {sold} sản phẩm.</div></div><hr/>
    <p><span style={{fontSize:"12px", fontWeight:"bold", marginRight:"10px"}}>CHẤT LIỆU:</span>{material}</p> 
    <p> <p style={{fontSize:"12px", fontWeight:"bold", marginRight:"30px"}}>MÔ TẢ SẢN PHẨM:</p>{description}</p><hr/>
     <p style={{fontSize:"12px", fontWeight:"bold"}}>MÀU SẮC</p>
     <form>{this.color()}</form><hr/>
            <p style={{fontSize:"12px", fontWeight:"bold"}}>SIZE</p>
            <form className="size">
              {this.size()}</form><hr/>
            <p style={{fontSize:"12px"}}>Hiện tại còn {quantity} sản phẩm.</p>
            <Input id="amount" type="number"  inputProps={ { min: 0, max: quantity }} defaultValue={0} />
          <Button style={{width:"100%", backgroundColor:"black", marginTop:"50px"}}>THÊM VÀO GIỎ</Button>
  </div>
  </div>
  <div style={{width: "100%", marginTop:"50px"}}>
          <h2 style={{textAlign:"center", fontSize:"bold"}}>SẢN PHẨM LIÊN QUAN</h2>
          <SameProducts/>
  </div>
  </div>
        );
    }
}