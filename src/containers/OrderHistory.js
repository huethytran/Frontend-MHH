import { connect } from 'react-redux';
import OrderHistory from '../views/OrderHistory/OrderHistory';

const mapStateToProps = state => ({
  role: state.user.role
});

export default connect(
  mapStateToProps
)(OrderHistory);