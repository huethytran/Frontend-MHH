
import React from "react";
import { Redirect } from 'react-router-dom';
import Header from "components/Header/Header.js";
import OrderList from "./Sections/OrderList";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import { Layout, Breadcrumb } from "antd";
import UserMenu from '../UserMenu/UserMenu.js';
const { Content, Sider } = Layout;


export default class OrderHistory extends React.Component{
    render(){
        const {getUser, username, role} = this.props;
        if (localStorage.getItem("usertoken") !== null && username === null)  { console.log("Thy");getUser();}
        if (localStorage.getItem("usertoken")=== null) return <Redirect to='/login'/>
        return(            
            <Layout className="layout">
            <Header brand="Thy Boutique"
                  rightLinks={<HeaderLinks />}
                  fixed
                  color="white"/>
          <Layout>
          <Sider width={200} style={{ background: '#fff',marginTop:"6.5%" }}>
              <UserMenu style={{marginTop:"5%"}} picture="" name="Huệ Thy" activeKey="2"/>
            </Sider>
            <Layout>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
              <Breadcrumb.Item>Lịch sử đơn hàng</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24,marginTop:"5%", minHeight: 280 }}>
          <OrderList role={role}/>
          </div>
          </Content>
    </Layout>
    </Layout>
    <Footer/>
  </Layout>
        )
    }
    }