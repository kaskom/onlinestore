import React from 'react';
import { connect } from 'react-redux';
// import './header.styles.scss';
import { ReactComponent as Logo } from '../../crown.svg';
import { auth } from '../../firebase/firebase.utils';
import Cart from '../cart-component/cart.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles.jsx';

const Header = ({ currentUser, hidden }) => (
 	<HeaderContainer>
 		<LogoContainer to = "/">
 			<Logo className = 'logo' />
 		</LogoContainer>

 		<OptionsContainer>
 		  <OptionLink to = '/shop'>
 		  	SHOP
 		  </OptionLink>
 		  <OptionLink to = '/contact'>
 		  	CONTACT
 		  </OptionLink>
 		  {
 		  	currentUser ? (     
 		  	<OptionLink 
 		  		as = 'div'
 		  		onClick = {() => auth.signOut()} >
 		  		 SIGN OUT 
 		  	</OptionLink>
 		  	) : (
 		  	<OptionLink to = '/signin'>
 		  		 SIGN IN 
 		  	</OptionLink>
 		  )}
 		  	<Cart />
 	  </OptionsContainer>
 	  {
 	  	hidden ? null :
 	  	<CartDropdown />	
 	  }
 	   	  
 	</HeaderContainer>
	);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser, 
	hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);