import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
export default class ListCategories extends React.Component{
    renderListCategories = () =>{
        const {listCategories} = this.props;
        console.log(this.props);
        var list = [];
        for (let i =0 ; i < listCategories.length; i+=1)
        {
            list.push(<Link to={`/productslist/${listCategories[i].name}`}><ListItem button>
                <ListItemText primary={listCategories[i].name} />
              </ListItem></Link>)
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