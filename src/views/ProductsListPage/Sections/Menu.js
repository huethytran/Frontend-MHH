import React from "react";
import {Link, withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListCategories from '../../../containers/ListCategories';
export class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          sortedBy: "new",
          price: "all"
        };
      }
      
    useStyles =() =>{
        return makeStyles(theme => ({
        root: {
          width: '100%',
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
        },
        formControl: {
            margin: theme.spacing(3)
          }
      }));}
      handleSortedByChange = event =>{
          this.setState({sortedBy: event.target.value});
      }
      handlePriceChange = event =>{
        this.setState({price: event.target.value});
    }
    componentDidUpdate(prevProps, prevState, snapshot){
      const {sortedBy} = this.state;
      const {category, history} = this.props;
      if (prevState.sortedBy !== sortedBy) history.push(`/productslist/${category}/${sortedBy}`);
    }
    render(){
        const classes = this.useStyles();
        const {sortedBy, price} = this.state;
        return (
            <div className={classes.root} style={{position: "sticky", top:"15%"}}>
            <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Danh mục sản phẩm</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
         <ListCategories sortedBy={sortedBy}/>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Sắp xếp theo</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup aria-label="sortedby" name="sortedby" value={sortedBy} onChange={this.handleSortedByChange}>
          <FormControlLabel style={{color: "black"}} value="new" control={<Radio />} label="Mới nhất" />
          <FormControlLabel style={{color: "black"}} value="bestsell" control={<Radio />} label="Bán chạy nhất" />
          <FormControlLabel style={{color: "black"}} value="pricefromhightolow" control={<Radio />} label="Giá tiền từ cao đến thấp" />
          <FormControlLabel style={{color: "black"}} value="pricefromlowtohigh" control={<Radio />} label="Giá tiền từ thấp đến cao" />
        </RadioGroup>
      </FormControl>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Giá tiền</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup aria-label="price" name="price" value={price} onChange={this.handlePriceChange}>
          <FormControlLabel style={{color: "black"}} value="all" control={<Radio />} label="Tất cả" />
          <FormControlLabel style={{color: "black"}} value="lessthan100k" control={<Radio />} label="Dưới 100.000đ" />
          <FormControlLabel style={{color: "black"}} value="from100kto300k" control={<Radio />} label="Từ 100.000đ đến 300.000đ" />
          <FormControlLabel style={{color: "black"}} value="from300kto500k" control={<Radio />} label="Từ 300.000đ đến 500.000đ" />
          <FormControlLabel style={{color: "black"}} value="morethan500k" control={<Radio />} label="Trên 500.000đ" />
        </RadioGroup>
      </FormControl>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
        )
    }
} 
export default withRouter(Menu);