import React from "react";
import Product from '../../Products/Product';
import LazyLoad from 'react-lazyload';
import QueueAnim from 'rc-queue-anim';
import * as callApi from '../../../utils/apiCaller';
class BestSellers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          products: [{}]
        };
      }
      componentWillMount(){
        callApi.callApiGetProducts("TOP_SELLER").then((data)=>{
          this.setState({products: data.data.data})
        }).catch(err=>{
          console.log(err);
        })
      }
    renderProduct(i){
        const {products} = this.state;
        return (
            <Product imageUrl = {products[i].imageUrl} name={products[i].name} price={products[i].price} discount={products[i].discount} id={products[i].id} />
        );
    }
    renderAllProducts=()=>{
      const {products} = this.state;
        const matrixSize = 4;
    const listProducts = Array(matrixSize).fill(null);
    for (let i = 0; i < 2; i++) {
      if (products.length > 4*i){
      const cellProducts = Array(matrixSize).fill(null);
      for (let j = 0; j < matrixSize; j++) {
        const productKey = i * matrixSize + j;
        if (products.length > productKey){
        cellProducts.push(
          <span key={productKey}>{this.renderProduct(productKey)}</span>
        );
        }
      }
      listProducts.push(<LazyLoad height={50} once debounce={500} key={i} ><QueueAnim>{cellProducts}</QueueAnim></LazyLoad>);
    }
    }
    return listProducts;
    }
    render() {
      console.log(this.state.products)
        return (
          <div style={{padding: "70px 0"}}>
          <div className="newproducts">
          <LazyLoad height={10} once debounce={500}>

            <div className="title"><br/><br/>
            <h2 style={{textAlign:"center"}}>Sản phẩm bán chạy nhất</h2>
            </div></LazyLoad>
            <div>{this.renderAllProducts()}</div>
          </div></div>
        );
      }
}
export default BestSellers;