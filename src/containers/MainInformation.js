import { connect } from 'react-redux';
import MainInformation from '../views/ProfilePage/Sections/MainInformation';
import * as actions from '../actions/index';
const mapStateToProps = state => ({
  fullName: state.user.fullName,
  address: state.user.address,
  phoneNumber: state.user.phoneNumber,
  email: state.user.email,
  dateOfBirth: state.user.dateOfBirth
});
const mapDispatchToProps = dispatch=>{
  return {
    updateUser: (data)=>{
      dispatch(actions.updateUser(data));
    }
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(MainInformation);