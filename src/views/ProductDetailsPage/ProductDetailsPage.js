import React from "react";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import ProductDetails from "../../containers/ProductDetail";
import Comments from "./Sections/Comments";
import Footer from "components/Footer/Footer.js";

export default class ProductDetailsPage extends React.Component{
    render(){
        const {id} = this.props.match.params;
        return(
            <div>
                 <Header brand="Thy Boutique"
            rightLinks={<HeaderLinks />}
            fixed
            color="white"/>
             <div style={{display: "block", margin: "100px 50px", marginBottom:"15px"}}>
                 <div style={{display:"flex"}}>
                <ProductDetails id = {id}/>
                 </div>
            <Comments/>
             </div>
            <Footer/>
            </div>
        );
    }
}