import React from "react";
import {Input, Form, notification, Select, Button, DatePicker} from "antd";
import { withRouter, Redirect } from 'react-router-dom';
import * as callApi from '../../../utils/apiCaller';
import data from '../../../core/data';
import moment from "moment";
const { Option } = Select;
const openNotificationWithIcon = (type, text, title) => {
  notification[type]({
    message: title,
    description: text,
    style: {
      marginTop: 100,
    },
  });
};
class MainInformation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isChange: false,
            loading: false,
            provinces: [],
            districts: [],
            province: null,
            district: null,
            birthday: null
        }
    }
    
    enterLoading = () => {
        this.setState({ loading: true });
      };
    updateInfoRequest = e => {
        const {district, province, birthday} = this.state;
        const {updateUser} = this.props;
        e.preventDefault();
        var user = {
        fullName: document.getElementById('name').value,
        address: {
            address: document.getElementById('address').value,
           district: district,
           province: province
        },
        phoneNumber: document.getElementById('phoneNumber').value,
        dateOfBirth: new Date(birthday).toISOString(),
        email: document.getElementById('email').value
      };
         callApi.callApiUpdateUser(user)
           .then((data) => {
             console.log(data, "hahahahahhahaha")
             if (data.data.status === "OK"){
               updateUser(user);
              openNotificationWithIcon('success', "Update info successfully!", "Success")
             }
             else openNotificationWithIcon('error', "Update info failed.", "Error")
            this.setState({isChange: false, loading: false})
           })
           .catch(err => {
             console.log(err)
             this.setState({isChange: false, loading: false})
           });
    }
    handleChange = e => {
      if (e.target.value === "") this.setState({isChange: false});
      else this.setState({isChange: true});
    }
    handleChangeProvince = e => {
      var temp =[];
      for (let j = 0 ; j<Object.keys(data[`${parseInt(e,10)+1}`].districts).length; j++)
      {
        temp.push(<Option key={j}>{data[`${parseInt(e,10)+1}`].districts[`${Object.keys(data[`${parseInt(e,10)+1}`].districts)[j]}`]}</Option>);
      }
      this.setState({districts: temp, isChange: true, province: data[`${parseInt(e,10)+1}`].name});
    }
    handleChangeDistrict = value =>{
      const {districts} = this.state;
      this.setState({district: districts[value].props.children});
    }
    handleChangeBirthday = (date, dateString)=>{
      this.setState({birthday: dateString, isChange: true})
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
      const {fullName, address, email, phoneNumber, dateOfBirth} = this.props;
         this.props.form.setFieldsValue({
           name: fullName,
           address: address.address,
           district: address.district,
           province: address.province,
           email: email,
          phoneNumber: phoneNumber,
          dateOfBirth: moment(dateOfBirth)
         });
         this.setState({district: address.district, province: address.province})
    }
    componentDidUpdate(prevProps){
      const {fullName, address, email, phoneNumber, dateOfBirth} = this.props;
      if (prevProps.fullName !== fullName && prevProps.fullName === null){
         this.props.form.setFieldsValue({
          name: fullName,
          address: address.address,
          district: address.district,
          province: address.province,
          email: email,
          phoneNumber: phoneNumber,
          dateOfBirth: moment(dateOfBirth)
         });
         this.setState({district: address.district, province: address.province})
        }
         if (prevProps.email !== email && prevProps.email === null){
           this.props.form.setFieldsValue({
            name: fullName,
            address: address.address,
            district: address.district,
            province: address.province,
            email: email,
            phoneNumber: phoneNumber,
            dateOfBirth:  moment(dateOfBirth)
           });
           this.setState({district: address.district, province: address.province})
    }
  }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {isChange, loading, provinces, districts} = this.state;
        const formItemLayout = {
            labelCol: {
              xs: { span: 22 },
              sm: { span: 6 }
            },
            wrapperCol: {
              xs: { span: 22 },
              sm: { span: 16 }
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
        return(
            <div className="update-profile-section">
                <h4>Thông tin cá nhân</h4>
            <Form {...formItemLayout}  onSubmit={this.updateInfoRequest} onChange={this.handleChange}>
                  <p id="msg" style={{ color: 'red' }} />
                  <Form.Item label="Họ tên">
                    {getFieldDecorator('name', {
                      rules: [
                        { required: true, message: 'Hãy nhập họ tên của bạn!' }
                      ]
                    })(<Input id="name"/>)}
                  </Form.Item>
                  <Form.Item label="Email">
                    {getFieldDecorator('email', {
                      rules: [
                        { required: true, message: 'Hãy nhập email của bạn!' }
                      ]
                    })(<Input id="email"/>)}
                  </Form.Item>
                  <Form.Item label="Số điện thoại">
                    {getFieldDecorator('phoneNumber', {
                      rules: [
                        { required: true, message: 'Hãy nhập số điện thoại của bạn!' }
                      ]
                    })(<Input id="phoneNumber"/>)}
                  </Form.Item>
                  <Form.Item label="Ngày sinh">
                    {getFieldDecorator('dateOfBirth', {
                      rules: [
                        { required: true, message: 'Hãy nhập ngày sinh của bạn!' }
                      ]
                    })( <DatePicker id="dateOfBirth" onChange={this.handleChangeBirthday} />)}
                  </Form.Item>
                  <Form.Item label="Địa chỉ">
                    {getFieldDecorator('address', {
                      rules: [
                        { required: true, message: 'Hãy nhập địa chỉ của bạn!' }
                      ]
                    })(<Input id="address"/>)}
                  </Form.Item>
                  <Form.Item label="Thành phố/Tỉnh">
                    {getFieldDecorator('province', {
                      rules: [
                        { required: true, message: 'Hãy chọn thành phố/tỉnh của bạn!' }
                      ]
                    })(<Select
                      placeholder="Chọn thành phố/tỉnh của bạn"
                      onChange={this.handleChangeProvince}
                      style={{ width: '100%' }}
                      id="province"
                    >
                      {provinces}
                    </Select>)}
                  </Form.Item>
                  <Form.Item label="Quận/Huyện">
                    {getFieldDecorator('district', {
                      rules: [{ required: true, message: 'Hãy chọn quận/huyện của bạn!' }]
                    })(<Select
                      placeholder="Chọn quận/huyện của bạn"
                      style={{ width: '100%' }}
                      id="district"
                      onChange={this.handleChangeDistrict}
                    >
                      {districts}
                    </Select>)}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={loading} onClick={this.enterLoading} disabled={!(isChange)}>
                  Lưu thay đổi
                </Button>
              </Form.Item>
                </Form>
             </div>
        );
    }
}
const MainInformationForm = Form.create({})(MainInformation);

export { MainInformationForm };
export default withRouter(MainInformationForm);