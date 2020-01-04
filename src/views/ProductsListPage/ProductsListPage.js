import React from 'react';
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Menu from "./Sections/Menu";
import ListProducts from "./Sections/ListProducts";
import Footer from "components/Footer/Footer.js";
class ProductsListPage extends React.Component{
    
    render(){
        const {category, sortedBy} =this.props.match.params;
        return(
            <div>
            <Header brand="Thy Boutique"
            rightLinks={<HeaderLinks />}
            fixed
            color="white"/>
            <div style={{display: "flex", margin: "100px 50px",  marginBottom:"15px"}}>
                <div className="filter">
            <Menu category={category} sortedBy={sortedBy}/>
           </div>
           <div className="listproducts">
            <ListProducts category={category} sortedBy={sortedBy} />
           </div>
           </div>
           <Footer/>
           </div>
        );
    }
}
export default ProductsListPage;