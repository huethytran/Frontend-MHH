import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter} from "react-router-dom";
export class ListCategories extends React.Component{
    renderListCategories = () =>{
        const {listCategories, sortedBy, history} = this.props;
        console.log(this.props);
        var list = [];
        for (let i =0 ; i < listCategories.length; i+=1)
        {
            list.push(<ListItem button onClick={()=>history.push(`/productslist/${listCategories[i].name}/${sortedBy}`)}>
                <ListItemText primary={listCategories[i].name} />
              </ListItem>)
        }
        return list;
    }
    render(){
        return (
            <List component="nav">
            {this.renderListCategories()}
          </List>
        )
    }
}
export default withRouter(ListCategories);