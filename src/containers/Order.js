import { connect } from 'react-redux';
import Orders from '../views/OrderHistory/Sections/Orders';

const mapStateToProps = state => ({
  username: state.user.username

});

export default connect(
  mapStateToProps
)(Orders);