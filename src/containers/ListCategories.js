import { connect } from 'react-redux';
import ListCategories from '../views/ProductsListPage/Sections/ListCategories';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  listCategories: state.viewCategory.listCategories
});

export default connect(
  mapStateToProps
)(ListCategories);