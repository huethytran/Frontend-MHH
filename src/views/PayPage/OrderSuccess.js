import React from 'react';
import {Link} from 'react-router-dom';
import {Result, Button} from 'antd';
export default class OrderSuccess extends React.Component{
    render(){
        return(
            <Result
            status="success"
            title="Đặt hàng thành công"
            subTitle="Đơn đặt hàng đã được tạo thành công. "
            extra={[
              <Link to='/order'><Button type="primary" key="console">
                Xem lịch sử đơn hàng
              </Button></Link>,
              <Link to='/'><Button key="home">Về trang chủ</Button></Link>
            ]}
          />
        )
    }
}