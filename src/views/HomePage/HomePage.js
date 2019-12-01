import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionDownload from "./Sections/SectionDownload.js";
import NewProducts from './Sections/NewProducts';
import styles from "assets/jss/material-kit-react/views/components.js";
import BestSellers from "./Sections/BestSellers";

const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Thy Boutique"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image="https://theme.hstatic.net/200000000131/1000502365/14/slide_df_3.jpg?v=1689">
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div style={{textAlign:"center"}}>
                <Button style={{top:"180px"}}>Xem ngay</Button>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <p><NewProducts/></p>
        <p><BestSellers/></p>
        <SectionDownload />
         
        
      </div>
      <Footer />
    </div>
  );
}
