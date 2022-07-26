import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,

    verificationCode: localStorage.getItem('verificationCode')
        ? JSON.parse(localStorage.getItem('verificationCode'))
        : null,

    cart: {
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
    wishlist: {
        wishlistItems: localStorage.getItem('wishlistItems')
            ? JSON.parse(localStorage.getItem('wishlistItems'))
            : [],
    },
};
function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            // add to cart
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item._id === existItem._id ? newItem : item
                )
                : [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        };
        case 'CART_CLEAR':
            return { ...state, cart: { ...state.cart, cartItems: [] } };
            /////////////////////////////////////////////////////////////
        case 'WISH_LIST_ADD_ITEM':
            // add to wishlist
            const newItemtowishlist = action.payload;
            const existItemwishlist = state.wishlist.wishlistItems.find(
                (item) => item._id === newItemtowishlist._id
            );
            const wishlistItems = existItemwishlist
                ? state.wishlist.wishlistItems.map((item) =>
                    item._id === existItemwishlist._id ? newItemtowishlist : item
                )
                : [...state.wishlist.wishlistItems, newItemtowishlist];
            localStorage.setItem('cartItems', JSON.stringify(wishlistItems));
            return { ...state, wishlist: { ...state.wishlist, wishlistItems } };
        case 'WISH_LIST_REMOVE_ITEM': {
            const wishlistItems = state.wishlist.wishlistItems.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem('cartItems', JSON.stringify(wishlistItems));
            return { ...state, wishlist: { ...state.wishlist, wishlistItems } };
        };
        case 'WISH_LIST_CLEAR':
            return { ...state, WISH_LIST: { ...state.WISH_LIST, wishlistItems: [] } };
    

        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload };

        case 'USER_SIGNOUT':
            return {
                ...state,
                userInfo: null,
                cart: {
                    cartItems: [],
                    shippingAddress: {},
                },
            };
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload,
                },
            };
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children} </Store.Provider>;
}