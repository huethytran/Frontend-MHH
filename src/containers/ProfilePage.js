import { connect } from 'react-redux';
import ProfilePage from '../views/ProfilePage/ProfilePage';
import * as actions from '../actions/index';
const mapStateToProps = state=>{
    return {
        email: state.user.email,
        avatar: state.user.avatar,
        fullName: state.user.fullName
    }
}
const mapDispatchToProps = dispatch=> {
    return {
        getUser: () => {
          dispatch(actions.getUser());
        }
      };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(ProfilePage);