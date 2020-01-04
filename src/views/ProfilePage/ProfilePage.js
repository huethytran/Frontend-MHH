import React from "react";
import { Redirect } from 'react-router-dom';
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import UserAvatar from "../../containers/UserAvatar";
import MainInformation from "../../containers/MainInformation";
import ChangePassword from "./Sections/ChangePassword";
//import UserAvatar from "../../containers/Profile/UserAvatar";
//import MainInformation from "../../containers/Profile/MainInformation";
//import ChangePassword from "../../containers/Profile/ChangePassword";
import { Layout, Breadcrumb } from "antd";
import UserMenu from '../UserMenu/UserMenu.js';

const { Content, Sider} = Layout;

export default class ProfilePage extends React.Component{
    render(){
      const {getUser, email, avatar, fullName} = this.props;
      if (localStorage.getItem("usertoken") !== null && email === null)  getUser();
        if (localStorage.getItem("usertoken")=== null) return <Redirect to='/login-page'/>
        return (
            <Layout className="layout">
      <Header brand="Thy Boutique"
            rightLinks={<HeaderLinks />}
            fixed
            color="white"/>
    <Layout>
    <Sider width={200} style={{ background: '#fff',marginTop:"6.5%" }}>
        <UserMenu style={{marginTop:"5%"}} picture={avatar} name={fullName} activeKey="1"/>
      </Sider>
      <Layout>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Tài khoản</Breadcrumb.Item>
        <Breadcrumb.Item>Chỉnh sửa thông tin</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24,marginTop:"5%", minHeight: 280 }}>
        <h3 style={{margin: "10px 35px"}}>Chỉnh sửa thông tin</h3><hr/>
         <UserAvatar/>
         <MainInformation/>
         <ChangePassword/>
      </div>
    </Content>
    </Layout>
    </Layout>
    <Footer/>
  </Layout>
        );
    }
}