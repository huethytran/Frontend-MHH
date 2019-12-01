/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps } from "@material-ui/icons";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
  const classes = useStyles();
  const categories = useSelector(state => state.viewCategory.listCategories);
  
    var list = [];
    for (let i = 0; i < categories.length; i += 1)
    {
      list.push(<Link to={`/productslist/${categories[i].name}`} className={classes.dropdownLink}>
      {categories[i].name} ({categories[i].amount})
    </Link>);
    }
  
  return (
    <List className={classes.list}>
       <ListItem className={classes.listItem}>
       <Link to="/" style={{color:"inherit"}}> <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
           Trang chủ
        </Button></Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Sản phẩm"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={list}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
       <Link to='/landing-page' style={{color:"inherit"}}><Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
           Giới thiệu
        </Button></Link> 
      </ListItem>
      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        <Tooltip
          id="store-location"
          title="Store Location"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <LocationOnIcon/>
          </Button>
        </Tooltip>
      </ListItem>
         <ListItem className={classes.listItem}>
         <Link to='/login-page' style={{color:"inherit"}}>  <Tooltip
          id="sign-in"
          title="Sign in"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <PersonIcon/>
          </Button>
        </Tooltip></Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="shopping-cart"
          title="Shopping Cart"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
          <ShoppingCartIcon/>
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
      
}
