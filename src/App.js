import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import CheckoutPage from './pages/checkoutpage/checkout.component';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/signinpage/signinpage'; 
// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
// import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';



class App extends React.Component {   

	unsubscribeFromAuth = null;

	 componentDidMount(){

	 	const {checkUserSession } = this.props;
	 	checkUserSession();


	}
	componentWillUnmount() {
		this.unsubscribeFromAuth();  
	}
 
	render() {
		return (
		    <div >
		    	<Header />
		    	<Switch>
		    		<Route exact path ='/' component = {HomePage} />
		    		<Route  path = '/shop' component = {ShopPage} />
		    		<Route  path = '/checkout' component = {CheckoutPage} />
		    		<Route  exact path = '/signin' 
		    				render ={ () => this.props.currentUser ? (
		    					<Redirect to = '/' />
		    					) : (
		    					<SignInAndSignUpPage/>
		    					)
		    				}
		    		/>
		    	</Switch>
		    </div>
		  ); 
	}
  
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser 

});

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
