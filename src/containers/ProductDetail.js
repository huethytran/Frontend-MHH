import { connect } from 'react-redux';
import ProductDetail from '../views/ProductDetailsPage/Sections/ProductDetails';
import * as actions from '../actions/index';
const mapDispatchToProps = dispatch=> {
    return {
        addCart: (cart) => {
          dispatch(actions.addCart(cart));
        }
      };
};

export default connect(
  null, mapDispatchToProps
)(ProductDetail);