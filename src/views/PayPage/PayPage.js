import React from "react";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import {Redirect, withRouter} from 'react-router-dom';
import {Layout ,Form, Input, Button,Select, Card, Row, Col} from 'antd';
import * as callApi from '../../utils/apiCaller';
import data from '../../core/data';
const { Sider, Content } = Layout;
const { Option } = Select;

class PayPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            provinces: [],
            districts: [],
            province: null,
            district: null
        }
    }
    renderCart =()=>{
        var kq=[];
        const {cart} = this.props;
        console.log(cart, "thanhhhh toan");
        if (cart !== [] && cart !== undefined){
        for (let i=0;i<cart.length;i++){
          kq.push(
        <Card style={{ width: "100%",marginBottom:"13px" }} >
         <Row gutter={16}>
                  <Col span={9}>
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
    handleChangeProvince = e => {
        var temp =[];
        for (let j = 0 ; j<Object.keys(data[`${parseInt(e,10)+1}`].districts).length; j++)
        {
          temp.push(<Option key={j}>{data[`${parseInt(e,10)+1}`].districts[`${Object.keys(data[`${parseInt(e,10)+1}`].districts)[j]}`]}</Option>);
        }
        this.setState({districts: temp, province: data[`${parseInt(e,10)+1}`].name});
      }
      handleChangeDistrict = value =>{
        const {districts} = this.state;
        this.setState({district: districts[value].props.children});
      }
      componentWillMount= ()=>{
        console.log("willmount");
        var tempProvinces = [];
        for (let i =0 ; i< Object.keys(data).length; i++){
          tempProvinces.push(<Option key={i}>{data[`${i+1}`].name}</Option>);
        }
        this.setState({ provinces: tempProvinces});
      }
      componentDidMount(){
        console.log("didmount")
        const {username, address, phoneNumber} = this.props;
           this.props.form.setFieldsValue({
             name: username,
             address: address.address,
             district: address.district,
             province: address.province,
            phoneNumber: phoneNumber,
           });
           this.setState({district: address.district, province: address.province})
      }
      componentDidUpdate(prevProps){
        const {username, address, phoneNumber} = this.props;
        if (prevProps.username !== username && prevProps.username === null){
           this.props.form.setFieldsValue({
            name: username,
             address: address.address,
             district: address.district,
             province: address.province,
            phoneNumber: phoneNumber,
           });
           this.setState({district: address.district, province: address.province})
          }
        }
        sumPrice=()=>{
            const {cart} = this.props;
            var kq = 0;
            for (let i =0;i<cart.length;i++){
                kq += parseInt(cart[i].price*(1-(cart[i].discount/100)))*cart[i].amount; 
            }
            return kq;
        }
        orderRequest=(e)=>{
          e.preventDefault();
            const {username, cart, deleteCart, history} = this.props;
            const {district, province} = this.state;
            var data = {
                products: cart,
                username: username,
                deliverAddress: `${document.getElementById("address").value}, ${district}, ${province}`,
                totalPrice: this.sumPrice() + 20000,
                status: "ORDERED",
               // phoneNumber: document.getElementById("phoneNumber").value
            }
            console.log(data,"qqqqqq")
            callApi.callApiOrder(data).then(data=>{
              console.log(data)
                deleteCart();
                history.push('/ordersuccess');
            }).catch(err=>{
                console.log(err);
            })
        }
    render() {
        const {getUser, username, phoneNumber} = this.props;
      if (localStorage.getItem("usertoken") !== null && phoneNumber === null)  getUser();
        if (localStorage.getItem("usertoken")=== null) return <Redirect to='/login-page'/>
        const { getFieldDecorator } = this.props.form;
        const { provinces, districts} = this.state;
        const formItemLayout = {
            labelCol: {
              xs: { span: 22 },
              sm: { span: 6 }
            },
            wrapperCol: {
              xs: { span: 22 },
              sm: { span: 14 }
            }
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0
              },
              sm: {
                span: 16,
                offset: 8
              }
            }
          };
        return (
            <div>
                 <Layout>
                 <Header brand="Thy Boutique"
            rightLinks={<HeaderLinks />}
            fixed
            color="white"/>
      <Layout>
        <Content>
        <div style={{display: "block", margin: "100px 50px", marginBottom:"15px", backgroundColor:"#fff", padding:"30px 30px"}}>
                <h3>Thanh toán</h3>
                <Form {...formItemLayout}  onSubmit={this.orderRequest}>
                  <p id="msg" style={{ color: 'red' }} />
                  <Form.Item label="Người đặt">
                    {getFieldDecorator('name', {
                    })(<b style={{fontWeight:"bold"}}>{username}</b>)}
                  </Form.Item>
                  <Form.Item label="Số điện thoại người nhận">
                    {getFieldDecorator('phoneNumber', {
                      rules: [
                        { required: true, message: 'Hãy nhập số điện thoại của người nhận!' }
                      ]
                    })(<Input id="phoneNumber"/>)}
                  </Form.Item>
                  <Form.Item label="Địa chỉ giao tới">
                    {getFieldDecorator('address', {
                      rules: [
                        { required: true, message: 'Hãy nhập địa chỉ giao tới!' }
                      ]
                    })(<Input id="address"/>)}
                  </Form.Item>
                  <Form.Item label="Thành phố/Tỉnh">
                    {getFieldDecorator('province', {
                      rules: [
                        { required: true, message: 'Hãy chọn thành phố/tỉnh!' }
                      ]
                    })(<Select
                      placeholder="Chọn thành phố/tỉnh"
                      onChange={this.handleChangeProvince}
                      style={{ width: '100%' }}
                      id="province"
                    >
                      {provinces}
                    </Select>)}
                  </Form.Item>
                  <Form.Item label="Quận/Huyện">
                    {getFieldDecorator('district', {
                      rules: [{ required: true, message: 'Hãy chọn quận/huyện!' }]
                    })(<Select
                      placeholder="Chọn quận/huyện"
                      style={{ width: '100%' }}
                      id="district"
                      onChange={this.handleChangeDistrict}
                    >
                      {districts}
                    </Select>)}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                <Button style={{backgroundColor:"black", color:"white"}} htmlType="submit">
                  Xác nhận đặt hàng
                </Button>
              </Form.Item>
                </Form>
             </div>
        </Content>
        <Sider width="500" style={{backgroundColor:"black"}}>
            <Content style={{padding:"30px 30px"}}>
           <h4 style={{color:"white", marginTop:"70px"}}>GIỎ HÀNG</h4>
                        {this.renderCart()}
                        <hr/>
                        <div>
                        <p style={{color:"white"}}>
                            <span style={{float:"left"}}>Tạm tính</span>
                            <span style={{float:"right", fontWeight:"bold"}}>{this.sumPrice()}đ</span>
                        </p><br/>
                        <p style={{color:"white"}}>
                            <span style={{float:"left"}}>Phí ship</span>
                            <span style={{float:"right", fontWeight:"bold"}}>20000đ</span>
                        </p><br/></div><hr/>
                        <p style={{color:"white"}}>
                            <span style={{float:"left"}}>Tổng cộng</span>
                            <span style={{float:"right", fontWeight:"bold",fontSize:"17px"}}>{this.sumPrice() + 20000}đ</span>
                        </p><br/>
               </Content>
        </Sider>
      </Layout>
      <Footer/>
    </Layout>
                
           
            </div>
        )
    }
}
const PayPageForm = Form.create({})(PayPage);

export { PayPageForm };
export default withRouter(PayPageForm);