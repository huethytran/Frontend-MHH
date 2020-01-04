/*eslint-disable*/
import React, {useState} from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import { Drawer, Col, Row, Avatar, Menu, Dropdown, Card, notification } from 'antd';
// @material-ui/icons
import { Apps, RemoveShoppingCart } from "@material-ui/icons";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import * as callApi from "../../utils/apiCaller";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { types } from '../../core/constants';
const useStyles = makeStyles(styles);
const openNotificationWithIcon = (type, text, title) => {
  notification[type]({
    message: title,
    description: text,
    style: {
      marginTop: 100,
    },
  });
};
export default function HeaderLinks() {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart.cart);
  if (localStorage.getItem("usertoken")!== null && user.role === null) {
    callApi.callApiGetUser().then((data)=>{
      console.log(data.data, "haahahahah")
      if (data.data.status !== "ERROR") {
      var data1 = {
        fullName: data.data.data.fullName,
        userRole: data.data.data.userRole,
        avatar: data.data.data.avatar
      }
      dispatch({ type: types.LOGIN, data: data1 });
      }
    }).catch(err=>{
      console.log(err);
    })
    
  }
  const removeCart = (i)=>{
    dispatch({type: types.REMOVE_CART, data: i})
  }
  const renderCart =()=>{
    var kq=[];
    if (cart !== [] && cart !== undefined){
    for (let i=0;i<cart.length;i++){
      kq.push(
    <Card style={{ width: "100%" }} extra={<a onClick={()=>removeCart(i)}>Xóa</a>}>
     <Row gutter={16}>
              <Col span={7}>
              <img src={cart[i].imageUrl} style={{width: "120px", height: "150px"}}></img>
              </Col>
              <Col span={15}>
                <h4>{cart[i].name}</h4>
                <p>Size {cart[i].size}, màu {cart[i].colorName} x{cart[i].amount}</p>
                <b style={{fontWeight:"bold"}}>Tổng giá tiền: &nbsp;{parseInt(cart[i].price*(1-(cart[i].discount/100)))*cart[i].amount}đ</b>
              </Col>
              </Row>
  </Card>
      )
    }
  }
    return kq;
  }
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    console.log("close");
    setVisible(false)
  };
  const logout =()=>{
    localStorage.removeItem("usertoken");
    dispatch({type: types.LOGOUT})
  }
  const payButton = () =>{
    if (cart === []) return  (<Button onClick={()=>openNotificationWithIcon("warning", "Không có sản phẩm nào trong giỏ hàng", "Không thể thanh toán")}>Thanh toán</Button>)
else return (<Link to='/pay'> <Button>Thanh toán</Button></Link>)
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile-page">Chỉnh sửa thông tin</Link>
      </Menu.Item>
      <Menu.Item>
       <Link to='/order'>Lịch sử đơn hàng</Link>
      </Menu.Item><hr/>
      <Menu.Item>
        <a onClick={logout}>Đăng xuất</a>
      </Menu.Item>
    </Menu>
  );
  const menuAdmin =(
    <Menu>
    <Menu.Item>
      <Link to="/profile-page">Chỉnh sửa thông tin</Link>
    </Menu.Item>
    <Menu.Item>
     <Link to='/order'>Lịch sử đơn hàng</Link>
    </Menu.Item>
    <Menu.Item>
     <a href="https://thy-boutique-admin.herokuapp.com/">Quản lí admin</a>
    </Menu.Item><hr/>
    <Menu.Item>
      <a onClick={logout}>Đăng xuất</a>
    </Menu.Item>
  </Menu>
  );
  const classes = useStyles();
  const categories = useSelector(state => state.viewCategory.listCategories);

    var list = [];
    for (let i = 0; i < categories.length; i += 1)
    {
      list.push(<Link to={`/productslist/${categories[i].name}/new`} className={classes.dropdownLink}>
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
        <Tooltip
          id="shopping-cart"
          title="Shopping Cart"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        ><div>
          <Button
            color="transparent"
           onClick={showDrawer}
            target="_blank"
            className={classes.navLink}
          >
          <ShoppingCartIcon/>
          </Button>
          <Drawer
          title="Giỏ hàng"
          placement="left"
          width={620}
          onClose={onClose}
          closable={true}
          visible={visible}
          
        >
          <div style={{margin:"auto", textAlign:"center"}}>{renderCart()}<br/>
          {payButton()}
          
         
          </div>
        </Drawer></div>
        </Tooltip>
      </ListItem>
      {user.role === null? <ListItem className={classes.listItem}>
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
      </ListItem> :
      <ListItem className={classes.listItem}>

        <Dropdown overlay={ user.role === "ADMIN"? menuAdmin : menu} placement="bottomRight">
      <Button  color="transparent"
          target="_blank"
          className={classes.navLink} style={{padding: "8px"}}> <Avatar  src={user.avatar} />&nbsp;&nbsp;{user.fullName}</Button>
    </Dropdown>
       
      </ListItem>
        }
    </List>
  );
      
}
