import React from "react";
import {Link} from "react-router-dom";
import * as callApi from "../../../utils/apiCaller";
import { List, Button, Skeleton, Icon, message } from 'antd';
//import * as callApi from '../../../utils/apiCaller';
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
const count = 3;
export default class Orders extends React.Component{
    state = {
        initLoading: /*true*/ false,
        loading: false,
        status: "Đang xử lí",
        data: [{}],
        list: [{}],
      };
      componentDidMount() {
        this.getData(res => {
          this.setState({
            initLoading: false,
            data: res,
            list: res
          });
        });
      }
    
      getData = callback => {
        const {tab} = this.props;
        const data={
          status: tab
      }
         callApi.callApiGetOrder(data).then((res)=>{
           console.log(res);
          callback(res.data.data);
        }).catch(err=>{
          console.log(err);
        })
      };
      handleUpdateOrder=(id, status)=>{
        const {username} =this.props;
        var data;
        if (status === "Nhận đơn hàng")  
        data={
          id: id,
          status: "DELIVERING",
          shipper:username
        }
        else if (status === "Hủy đơn hàng")
        data={
          id: id,
          status: "CANCEL",
          shipper: null
        }
        else if (status==="Xác nhận đã giao")
        data={
          id: id,
          status: "DELIVERED",
          shipper: null
        }
        callApi.callApiUpdateOrder(data).then(temp=>{
          this.getData(res => {
            this.setState({
              initLoading: false,
              data: res,
              list: res
            });
          });
        }).catch(err=>{
          console.log(err);
        })
      }
      actions=(item)=>{
          const {tab, role} = this.props;
          console.log(role)
          if (tab === "ORDERED" && role === "SHIPPER")
            return [<Button size="default" style={{backgroundColor:"#4BB543", marginLeft:"13px", color: "white"}} onClick={()=>this.handleUpdateOrder(item, "Nhận đơn hàng")}><IconText  type="check" text="Nhận đơn hàng" key="accept" /></Button>,
            <Button type="primary" onClick={()=>this.handleViewDetailOrder(item)}><IconText  type="eye" text="Xem chi tiết" key="view1" /></Button>]
            if (tab === "ORDERED" && role === "CUSTOMER")
            return [<Button type="danger" style={{marginLeft: "13px"}} onClick={()=>this.handleUpdateOrder(item, "Hủy đơn hàng")}><IconText  type="close" text="Hủy đơn hàng" key="cancel" /></Button>,
            <Button type="primary"onClick={()=>this.handleViewDetailOrder(item)}><IconText  type="eye" text="Xem chi tiết" key="view2" /></Button>]
            if (tab === "DELIVERING" && role === "SHIPPER")
            return [<Button type="danger" style={{marginLeft: "13px"}} onClick={()=>this.handleUpdateOrder(item, "Hủy đơn hàng")}><IconText  type="close" text="Hủy đơn hàng" key="cancel" /></Button>,
            <Button  style={{backgroundColor:"#4BB543", color: "white"}} onClick={()=>this.handleUpdateOrder(item, "Xác nhận đã giao")}><IconText  type="check" text="Xác nhận đã giao" key="finished" /></Button>,
            <Button type="default" onClick={()=>this.handleUpdateDeliveryDate(item)}><IconText text="Dự kiến ngày giao tới" key="deliveryDate" /></Button>,
            <Button type="primary"  onClick={()=>this.handleViewDetailOrder(item)}><IconText  type="eye" text="Xem chi tiết" key="view3" /></Button>
            ]
            if (tab === "DELIVERING" && role === "CUSTOMER")
              return [ <Button type="primary" style={{marginLeft: "13px"}} onClick={()=>this.handleViewDetailOrder(item)}><IconText  type="eye" text="Xem chi tiết" key="view4" /></Button>]
            if (tab === "DELIVERED" && role === "SHIPPER")
            return [ <Button type="primary" style={{marginLeft: "13px"}} onClick={()=>this.handleViewDetailOrder(item)}><IconText  type="eye" text="Xem chi tiết" key="view5" /></Button>]
            if (tab === "DELIVERED" && role === "CUSTOMER" && item.isRate === false)
              return [ <Button type="default" style={{marginLeft: "13px"}} onClick={()=>this.handleRateItem(item)}><IconText  text="Đánh giá" key="rate" /></Button>,
            <Button type="primary" onClick={()=>this.handleViewDetailOrder(item)}><IconText  type="eye" text="Xem chi tiết" key="view6" /></Button>]
            if (tab === "CANCEL")
            return [ <Button type="primary" style={{marginLeft: "13px"}} onClick={()=>this.handleViewDetailOrder(item)}><IconText  type="eye" text="Xem chi tiết" key="view5" /></Button>]
          }
      onLoadMore = () => {
        this.setState({
          loading: true,
          list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, 
            name: null,
            address: {
                address: null,
                district: null,
                province: null
            },
            phoneNumber: null,
            products: [{}],
            price: 0,
            orderDate: null,
            deliveryDate: null,
            idShipper: null,
            isRate: false,
            rate: 0
        }))),
        });
        this.getData(res => {
          const data = this.state.data.concat(res);
          this.setState(
            {
              data,
              list: data,
              loading: false,
            },
            () => {
              // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
              // In real scene, you can using public method of react-virtualized:
              // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
              window.dispatchEvent(new Event('resize'));
            },
          );
        });
      };
    render(){
        const { initLoading, loading, list} = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
        </div>
      ) : null;
        if (list === [] || list === null) { 
        return (<div></div>)}
        else return(
            <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item =>{
                var temp = new Date(item.createdTime);
                 return (
              <List.Item 
              key={item._id}
                actions={this.actions(item)}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <div style={{padding:"0px 30px"}}>
                  <p><b>Người đặt:</b>&nbsp;&nbsp; {item.userName}</p>
                  <p><b>Địa chỉ giao tới:</b>&nbsp;&nbsp; {item.deliverAddress}</p>
                  <p><b>Số điện thoại:</b>&nbsp;&nbsp; {item.phoneNumber}</p>
                        <p><b>Ngày đặt hàng:</b>&nbsp;&nbsp; {temp.getDate()}/{temp.getMonth()+1}/{temp.getFullYear()}</p>
                        <p><b>Tổng giá tiền:</b>&nbsp;&nbsp; {item.totalPrice}</p>
                        </div>
                </Skeleton>
              </List.Item>
            )}}
          /> 

            )
    }
}