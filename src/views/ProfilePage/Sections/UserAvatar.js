import React from "react";
import {Redirect} from "react-router-dom";
import * as callApi from "../../../utils/apiCaller";
import {Avatar, message, Upload, Button, Icon} from "antd";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default class UserAvatar extends React.Component {
    render(){
        const {avatar, updateAvatar} = this.props;
        const props = {
          name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
            onChange(info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                getBase64(info.file.originFileObj, imageUrl => {
                  var temp={avatar: imageUrl};
                  callApi.callApiUpdateUser(temp).then((data)=>{
                    message.success("Update avatar successfully!");
                    updateAvatar(imageUrl);
                    
                }).catch(err => {
                  console.log(err)
              });
                });
               
              } else if (info.file.status === 'error') {
                message.error("Update avatar failed.");
              }
            },
            beforeUpload(file) {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                  message.error('You can only upload JPG/PNG file!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                  message.error('Image must smaller than 2MB!');
                }
                return isJpgOrPng && isLt2M;
              }
          };
        return (
            <div className="update-profile-section">
                <h4>Ảnh đại diện</h4>
                <Avatar size={100} src={avatar} style={{marginRight: "25px"}}/>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Tải lên
                    </Button>
                </Upload>
            </div>
        );
    }
}