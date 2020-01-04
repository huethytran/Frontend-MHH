import { connect } from 'react-redux';
import UserAvatar from '../views/ProfilePage/Sections/UserAvatar';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  avatar: state.user.avatar,
  fullName: state.user.fullName
});
const mapDispatchToProps = dispatch=>{
  return {
    updateAvatar: (data)=>{
      dispatch(actions.updateAvatar(data));
    }
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(UserAvatar);