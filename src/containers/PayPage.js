import { connect } from 'react-redux';
import PayPage from '../views/PayPage/PayPage';
import * as actions from '../actions/index';
const mapStateToProps = state=>{
    return {
        address: state.user.address,
        phoneNumber: state.user.phoneNumber,
        username: state.user.username,
        fullName: state.user.fullName,
        cart: state.cart.cart
    }
}
const mapDispatchToProps = dispatch=> {
    return {
        getUser: () => {
          dispatch(actions.getUser());
        },
        deleteCart: ()=>{
            dispatch(actions.deleteCart());
    }
      };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(PayPage);