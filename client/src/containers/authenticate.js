import { connect } from 'react-redux';
import Authenticate from '../components/authenticate';
import { setIsAuthenticated } from '../actions/auth_actions';

/*
This is a redux specific function.
What is does is: It gets the state specified in here from the global redux state.
For example, here we are retrieving the list of items from the redux store.
Whenever this list changes, any component that is using this list of item will re-render.
 */
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authorizeUri: state.auth.authorizeUri,
});

/*
This is a redux specific function.
http://redux.js.org/docs/api/bindActionCreators.html
 */
const mapDispatchToProps = dispatch => ({

});

/*
Here we are creating a Higher order component
https://facebook.github.io/react/docs/higher-order-components.html
 */
export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);

