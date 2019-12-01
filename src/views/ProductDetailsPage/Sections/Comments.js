import React from "react";
import Pagination from 'material-ui-flat-pagination';
import Rating from '@material-ui/lab/Rating';
export default class Comments extends React.Component{
    state = {
        comments :[{time: new Date(),comment: "111111111111",username: "HueThy",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 4.5},
        {time: new Date(),comment: "222222222222",username: "abcd",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 3.5},
        {time: new Date(),comment: "33333333333333",username: "La Thoại",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 5},
        {time: new Date(),comment: "44444444444",username: "Vũ Thịnh",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 3},
        {time: new Date(),comment: "55555555555555",username: "Hửu Tiền",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 4.5},
        {time: new Date(),comment: "6666666666666",username: "HueThy",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 4.5},
        {time: new Date(),comment: "77777777777777",username: "HueThy",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 4},
        {time: new Date(),comment: "8888888888888",username: "HueThy",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 5},
        {time: new Date(),comment: "999999999999",username: "HueThy",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 2},
        {time: new Date(),comment: "10",username: "HueThy",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 2.5},
        {time: new Date(),comment: "11",username: "HueThy",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 4.5},
        {time: new Date(),comment: "12abc",username: "HueThy",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 5},
        {time: new Date(),comment: "Xin chao, 13",username: "HueThy",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 5},
        {time: new Date(),comment: "141414",username: "HueThy",avatar: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png", rate: 1}],
        offset: 1

    };
    handleClick(offset) {
        console.log(offset);
        this.setState({ offset });
      }
    renderCommentsPage(k){
        const {comments} = this.state;
        var kq  =[];
        for (let i = k-1; i< k+3;i++)
        {
            if (i<comments.length)
            kq.push(
                <div className="user_comment">
                    <div className="user_avatar">
                    <img src={comments[i].avatar}/>
                    </div>
                    <div className="comment_body">
                        {comments[i].comment}
                    </div>
                    <div className="comment_toolbar">
                    <div className="comment_details">
                    <ul>
                                            <li>{comments[i].time.toDateString()}</li>
                                            <li> <span
                                                    className="user">{comments[i].username}</span></li>
                                            <li><Rating name="read-only" value={comments[i].rate} readOnly precision={0.5} size="small" /></li>
                                        </ul>
                    </div>
                    </div>
                </div>
            );
            else break;
        }
        return kq;
    }
    render() {
        const {offset, comments} = this.state;
        return(
            <div style={{display:"block", backgroundColor:"white", padding: "20px 100px"}}>
                <h3 style={{fontWeight:"600", width:"100%", color:"white", backgroundColor:"black", padding:"10px 50px"}}>Đánh giá sản phẩm</h3>
            <div className="new_comment">
                {this.renderCommentsPage(offset)}
                                </div>
                                <div style={{textAlign:"center"}}>
                                <Pagination
                                limit = {4}
          total = {comments.length}
          offset = { offset }
          
          onClick={(e, offset) => this.handleClick(offset+1)}
        /></div>
            </div>
        );
    }
}