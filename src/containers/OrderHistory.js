import { connect } from 'react-redux';
import OrderHistory from '../views/OrderHistory/OrderHistory';
import * as actions from '../actions/index';
const mapStateToProps = state => ({
  role: state.user.role,
  username: state.user.username
});

const mapDispatchToProps = dispatch=>{
  return{
    getUser: () => {
      dispatch(actions.getUser());
    },
  }
}
export default connect(
  mapStateToProps,mapDispatchToProps
)(OrderHistory);