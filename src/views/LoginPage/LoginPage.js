import React from "react";
import {Link, Redirect} from "react-router-dom";
// @material-ui/core compone
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import * as mhh from "https://www.getpostman.com/collections/80490e3c164ac9983eee";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { useDispatch, useSelector} from "react-redux";
import * as callApi from "../../utils/apiCaller";
import image from "assets/img/bg7.jpg";
import { types } from '../../core/constants';

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  if (localStorage.getItem("usertoken")!== null && user.role === null) {
    callApi.callApiGetUser().then((data)=>{
      if (data.data.status !== "ERROR") {
      var data1 = {
        fullName: data.data.data.fullName,
        userRole: data.data.data.userRole,
        avatar: data.data.data.avatar,
        username: data.data.data.username
      }
      dispatch({ type: types.LOGIN, data: data1 });
      }
    }).catch(err=>{
      console.log(err);
    })
    
  }
  const handleClick=()=>{
    const data ={
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
    callApi.callApiLogin(data).then(data=>{
      if (data.data.status === "ERROR") document.getElementById("error").innerHTML = "Username hoặc password không đúng.";
      else {
        var data1 = {
          fullName: data.data.data.fullName,
          userRole: data.data.data.userRole,
          avatar: data.data.data.avatar,
          username: data.data.data.username
        }
        localStorage.setItem("usertoken", data.data.data.session);
        dispatch({ type: types.LOGIN, data: data1 });
         
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  if (localStorage.getItem("usertoken")!== null && user.role !== null) return(<Redirect to="/"/>)
  else return (
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
                    <h4>Đăng nhập</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Chưa có tài khoản?&nbsp; <Link to='/register'><b>Đăng ký ngay</b></Link></p>
                  <CardBody>
                   <p id="error" style={{color:"red", fontWeight:"bold"}}></p>
                    <CustomInput
                      labelText="Username"
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
                    
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={handleClick}>
                      Đăng nhập
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
