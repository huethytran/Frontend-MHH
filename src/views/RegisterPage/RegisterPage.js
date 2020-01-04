import React, { useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import MenuItem from '@material-ui/core/MenuItem';
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import * as callApi from '../../utils/apiCaller';
import data from '../../core/data';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import {Link} from "react-router-dom";
import { Modal} from 'antd';
import image from "assets/img/bg7.jpg";
const useStyles = makeStyles(styles);
export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [role, setRole] = React.useState('CUSTOMER');
  const [provinces, setProvinces] = React.useState([]);
  const [province, setProvince] = React.useState('');
  const [districts, setDistricts] = React.useState([]);
  const [district, setDistrict] = React.useState('');
  const [birthday, setBirthday] = React.useState(null);
  const registerRequest = () =>{
    var temp = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      dateOfBirth: new Date(birthday).toISOString(),
      userRole: role,
      address: {
        address: document.getElementById("address").value,
        district: district,
        province: data[`${parseInt(province,10)+1}`].name
      },
      email: document.getElementById("email").value,
      fullName: document.getElementById("name").value,
      phoneNumber: document.getElementById("phoneNumber").value
    }
    console.log(temp, "dataaaa");
    callApi.callApiRegister(temp).then(data=>{
      Modal.success({
        content: 'Register successfully! Press OK to Login.',
        onOk: <Link to='/login-page'/>
      });
    }).catch(err=>{
      console.log(err)
    })
  }
  const handleChangeBirthday = date => {
    console.log("Birthday", date.target.value)
    setBirthday(date.target.value);
  };
  const handleChangeProvince = e => {
    var temp =[];
    for (let j = 0 ; j<Object.keys(data[`${parseInt(e.target.value,10)+1}`].districts).length; j++)
    {
      temp.push(<MenuItem key={j} value={data[`${parseInt(e.target.value,10)+1}`].districts[`${Object.keys(data[`${parseInt(e.target.value,10)+1}`].districts)[j]}`]}>{data[`${parseInt(e.target.value,10)+1}`].districts[`${Object.keys(data[`${parseInt(e.target.value,10)+1}`].districts)[j]}`]}</MenuItem>);
    }
    setDistricts(temp);
    setProvince(e.target.value)
  }
 const handleChangeDistrict = value =>{
    setDistrict(value.target.value)
  }
  useEffect(() => {
    let isSubscribed = true
    console.log("willmount");
    var tempProvinces = [];
    for (let i =0 ; i< Object.keys(data).length; i++){
      tempProvinces.push(<MenuItem key={i} value={i}>{data[`${i+1}`].name}</MenuItem>);
    }
    if (isSubscribed) setProvinces(tempProvinces);
    return () => isSubscribed = false
  }, []);
  const handleChange = event => {
    setRole(event.target.value);
  };
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Thy Boutique"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4 style={{color:"white"}}>Đăng ký</h4>
                  </CardHeader>
                  <p className={classes.divider} style={{color: "red"}} id="error"></p>
                  <CardBody>
                   
                    <CustomInput
                      labelText="Tên đăng nhập"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Mật khẩu"
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                     <CustomInput
                      labelText="Họ tên"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                          </InputAdornment>
                        )
                      }}
                    />
                   <CustomInput
                      labelText="Số điện thoại"
                      id="phoneNumber"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
    id="dateOfBirth"
    label="Ngày sinh"
    type="date"
    onChange={handleChangeBirthday}
    fullWidth={true}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
                     
                      <CustomInput
                      labelText="Địa chỉ"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                          </InputAdornment>
                        )
                      }}
                    />
                    <FormControl className={classes.formControl}>
        <InputLabel id="province-label">Chọn thành phố/tỉnh của bạn</InputLabel>
        <Select
          labelId="province-label"
          id="province"
          value={province}
          onChange={handleChangeProvince}
        >
          {provinces}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} style={{marginTop:"15px"}}>
        <InputLabel id="district-label">Chọn quận/huyện của bạn</InputLabel>
        <Select
          labelId="district-label"
          id="district"
          value={district}
          onChange={handleChangeDistrict}
        >
          {districts}
        </Select>
      </FormControl>
       
                    <TextField
          id="role"
          select
          style={{width: "100%", marginTop:"20px"}}
          label="Chọn vai trò của bạn"
          value={role}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
        >
            <option key="Khách hàng" value="CUSTOMER">
              Khách hàng
            </option>
            <option key="Shipper" value="SHIPPER">
              Shipper
            </option>
        </TextField>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={registerRequest}>
                      Bắt đầu
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
