import React from "react";
import Orders from './Orders';
import {Tabs} from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (

  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);
export default class OrderList extends React.Component{
    render(){
      const {role} = this.props;
      console.log("pppp", role)
        return(
            <StickyContainer>
    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
      <TabPane tab="Đang xử lí" key="1" style={{ minHeight: 200 }}>
          <Orders role={role} key="1" tab="ORDERED"/>
      </TabPane>
      <TabPane tab="Đang giao" key="2">
      <Orders role={role} key="2" tab="DELIVERING"/>
      </TabPane>
      <TabPane tab="Đã giao" key="3">
      <Orders role={role} key="3" tab="DELIVERED"/>
      </TabPane>
      <TabPane tab="Đã hủy" key="4">
      <Orders role={role} key="4" tab="CANCELED"/>
      </TabPane>
    </Tabs>
  </StickyContainer>
        )
    }
}