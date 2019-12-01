import React from "react";
import Product from '../../Products/Product';
import LazyLoad from 'react-lazyload';
import QueueAnim from 'rc-queue-anim';
class BestSellers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          products: [{ name: "abc",  imgUrl: "https://product.hstatic.net/1000197303/product/pro_trang_1_3bb1a823844b4b449029e3dfe026f45c_2048x2048.jpg" , price: 100000,discount: 0},
          { name: "edfdas",  imgUrl: "https://product.hstatic.net/1000197303/product/pro_da_2_5c76075c7c32483794f3402ce88fb22c_2048x2048.jpg" , price: 200000, discount: 10},
          { name: "fghsa",  imgUrl: "https://product.hstatic.net/1000197303/product/pro_den_2_9c82ef7c9ee249af8b6d4747a0ba8fe0_2048x2048.jpg" , price: 150000,discount: 0},
          { name: "fghsa",  imgUrl: "https://product.hstatic.net/1000197303/product/pro_den_2_9c82ef7c9ee249af8b6d4747a0ba8fe0_2048x2048.jpg" , price: 150000,discount: 50},
          { name: "fghsa",  imgUrl: "https://product.hstatic.net/1000197303/product/pro_den_2_9c82ef7c9ee249af8b6d4747a0ba8fe0_2048x2048.jpg" , price: 150000,discount: 0},
          { name: "fghsa", imgUrl: "https://product.hstatic.net/1000197303/product/pro_den_2_9c82ef7c9ee249af8b6d4747a0ba8fe0_2048x2048.jpg" , price: 150000,discount: 30},
          { name: "fghsa", imgUrl: "https://product.hstatic.net/1000197303/product/pro_den_2_9c82ef7c9ee249af8b6d4747a0ba8fe0_2048x2048.jpg" , price: 150000,discount: 0},
          { name: "fghsa",  imgUrl: "https://product.hstatic.net/1000197303/product/pro_den_2_9c82ef7c9ee249af8b6d4747a0ba8fe0_2048x2048.jpg" , price: 150000,discount: 0}]
        };
      }
    renderProduct(i){
        const {products} = this.state;
        console.log(products[i].name);
        return (
            <Product imgUrl = {products[i].imgUrl} name={products[i].name} price={products[i].price} discount={products[i].discount} />
        );
    }
    renderAllProducts(){
        const matrixSize = 4;
    const listProducts = Array(matrixSize).fill(null);
    for (let i = 0; i < 2; i++) {
      const cellProducts = Array(matrixSize).fill(null);
      for (let j = 0; j < matrixSize; j++) {
        const productKey = i * matrixSize + j;
        cellProducts.push(
          <span key={productKey}>{this.renderProduct(productKey)}</span>
        );
      }
      listProducts.push(<LazyLoad height={50} once debounce={500} key={i} ><QueueAnim>{cellProducts}</QueueAnim></LazyLoad>);
    }
    return listProducts;
    }
    render() {
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