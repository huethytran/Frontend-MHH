import React from "react";
import Product from "../../Products/Product";
export default class SameProducts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          products: [{ name: "abc",  imgUrl: "https://product.hstatic.net/1000197303/product/pro_trang_1_3bb1a823844b4b449029e3dfe026f45c_2048x2048.jpg" , price: 100000,discount: 0},
          { name: "edfdas",  imgUrl: "https://product.hstatic.net/1000197303/product/pro_da_2_5c76075c7c32483794f3402ce88fb22c_2048x2048.jpg" , price: 200000, discount: 10},
          { name: "fghsa",  imgUrl: "https://product.hstatic.net/1000197303/product/pro_den_2_9c82ef7c9ee249af8b6d4747a0ba8fe0_2048x2048.jpg" , price: 150000,discount: 0},
          { name: "fghsa",  imgUrl: "https://product.hstatic.net/1000197303/product/pro_den_2_9c82ef7c9ee249af8b6d4747a0ba8fe0_2048x2048.jpg" , price: 150000,discount: 50}]
        };
      }
    renderProduct(i){
        const {products} = this.state;
        return (
            <Product imgUrl = {products[i].imgUrl} name={products[i].name} price={products[i].price} discount={products[i].discount}/>
        );
    }
    renderAllProducts(){
        const {products} = this.state;
    const listProducts = [];
    for (let i =0; i < products.length; i +=1)
    {
        listProducts.push( <span key={i}>{this.renderProduct(i)}</span>);
    }
    return listProducts;
    }
    render(){
        return (
            <div>
                <div style={{marginLeft: "0%"}}>
                {this.renderAllProducts()}
                </div>
            </div>
        );
    }
}