import React from "react";
import Product from '../../Products/Product';
import LazyLoad from 'react-lazyload';
import QueueAnim from 'rc-queue-anim';
import * as callApi from "../../../utils/apiCaller";
class NewProducts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          products: [{}]
        };
      }
      componentWillMount(){
        callApi.callApiGetProducts("TIME_DESC").then((data)=>{
          this.setState({products: data.data.data})
        }).catch(err=>{
          console.log(err);
        })
      }
    renderProduct(i){
        const {products} = this.state;
        return (
            <Product imageUrl = {products[i].imageUrl} name={products[i].name} price={products[i].price} discount={products[i].discount} id={products[i].id}/>
        );
    }
    renderAllProducts(){
        const matrixSize = 4;
        const {products} = this.state;
        console.log(products,"newpro")
    const listProducts = Array(matrixSize).fill(null);
    for (let i = 0; i < 2; i++) {
      if (products.length > 4*i){
      const cellProducts = Array(matrixSize).fill(null);
      for (let j = 0; j < matrixSize; j++) {
        const productKey = i * matrixSize + j + 100;
        if (products.length + 100 > productKey){
        cellProducts.push(
          <span key={productKey}>{this.renderProduct(productKey-100)}</span>
        );
        }
      }
      listProducts.push(<LazyLoad height={100} once debounce={500} key={i} offset={[-100,100]} ><QueueAnim key={i}>{cellProducts}</QueueAnim></LazyLoad>);
    }
    }
    return listProducts;
    }
    render() {
        return (
          <div style={{paddingBottom: "70px"}}>
          <div className="newproducts">
            <div className="title"><br/><br/>
            <h2>Sản phẩm mới nhất</h2>
            </div>
            <div>{this.renderAllProducts()}</div>
          </div></div>
        );
      }
}
export default NewProducts;