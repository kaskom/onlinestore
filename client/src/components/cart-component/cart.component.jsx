import React from 'react';
import './cart.styles.scss';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import { ReactComponent as ShoppingIcon} from '../../shopping-bag.svg';

const Cart = ({ toggleCartHidden, itemCount }) => (
	<div className = 'cart-icon' onClick ={toggleCartHidden} >
		<ShoppingIcon className = 'shopping-icon' />
		<span className = 'item-count'>{itemCount}</span>
	</div>	
)
     

const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemsCount
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);