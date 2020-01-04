import React from "react";
import Product from "../../Products/Product";
import LazyLoad from 'react-lazyload';
import QueueAnim from 'rc-queue-anim';
import {Result} from 'antd';
import * as callApi from "../../../utils/apiCaller";
export default class ListProducts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          products: [{}]
        };
      }
      componentWillMount(){
        const {category, sortedBy} = this.props;
        var temp;
        if (sortedBy === "new") temp = "TIME_DESC";
        else if (sortedBy === "bestsell") temp = "TOP_SELLER";
        else if (sortedBy === "pricefromhightolow") temp = "PRICE_DESC";
        else temp = "PRICE_ASC";
        callApi.callApiGetListProducts(temp, category).then(data=>{
            console.log(data);
             this.setState({products: data.data.data});
        }).catch(err=>{
          console.log(err);
        })
      }
      componentDidUpdate(prevProps){
          if (prevProps.sortedBy !== this.props.sortedBy) {
            const {category, sortedBy} = this.props;
            var temp;
            if (sortedBy === "new") temp = "TIME_DESC";
            else if (sortedBy === "bestsell") temp = "TOP_SELLER";
            else if (sortedBy === "pricefromhightolow") temp = "PRICE_DESC";
            else temp = "PRICE_ASC";
            callApi.callApiGetListProducts(temp, category).then(data=>{
                console.log(data);
                 this.setState({products: data.data.data});
            }).catch(err=>{
              console.log(err);
            })
          }
      }
    renderProduct(i){
        const {products} = this.state;
        return (
            <Product imageUrl = {products[i].imageUrl} name={products[i].name} price={products[i].price} discount={products[i].discount} id={products[i].id}/>
        );
    }
    renderAllProducts(){
        const {products} = this.state;
    var kq=[];
    for (let i =0; i < products.length; i +=3)
    {
        var listProducts = [];
        for (let j = 0;j<3;j+=1)
        {
            if (i+j>=products.length) break;
            listProducts.push( <span key={i+j}>{this.renderProduct(i+j)}</span>);
        }
        kq.push(<p><LazyLoad height={50} debounce={500} key={i/3} >{listProducts}</LazyLoad></p>)
    }
    return kq;
    }
    render(){
        const {category} = this.props;
        const {products} = this.state;
        return (
            <div>
                <div className="title1">
                    <h3>{category}</h3>
                </div>
                <div style={{marginLeft: "7%"}}>
                    <QueueAnim>
                 {products === null? <Result
    status="404"
    title="204"
    subTitle="Không tìm thấy sản phẩm nào."
  /> : this.renderAllProducts()}
                </QueueAnim>
                </div>
            </div>
        );
    }
}