import React from "react";
import Product from "../../Products/Product";
import * as callApi from "../../../utils/apiCaller"; 
export default class SameProducts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          products: [{ name: null,  imageUrl: null , price: 0,discount: 0, id: null}]
        };
      }
      componentWillMount(){
          const {category} = this.props;
          callApi.callApiGetSameCategoryProducts(category).then(data=>{
              console.log(data, "same")
              this.setState({products: data.data.data})
          }).catch(err=>{
              console.log(err);
          })
      }
      componentDidUpdate(prevProps){
          if (prevProps.id !== this.props.id){
            const {category} = this.props;
            callApi.callApiGetSameCategoryProducts(category).then(data=>{
                console.log(data, "same")
                this.setState({products: data.data.data})
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
        const {id} = this.props;
    const listProducts = [];
    for (let i =0; i < products.length; i +=1)
    {
        if (products[i].id !== id)
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