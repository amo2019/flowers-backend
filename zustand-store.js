import create from "zustand";
import Router from 'next/router'
import {addItemToCart, removeItemFromCart} from './utils/cart.utils'
import {loginWithEmail, signupWithEmail, logoutMeOut} from './utils/auth.utils'

const useStore = create((set, get) => ({
  user: "",
  cartItems: [],
  error: "",
  cartCount: 0,
  searchField: "",
  setSearchField: ({searchItem})=>{set(() => ({ searchField: searchItem }))},
  addToCart: (cartItemToAdd) => set((state) => ({ cartItems: addItemToCart(state.cartItems, cartItemToAdd)})),

  login: async ({email, password}) => { 
      let res = await loginWithEmail(email, password)
      if (!res.error) {
      set(() => ({ user: res.user.split('@')[0] }))
      Router.push('/')
      } else set(() => ({ error: res.errorMs }))
  },
  signup:  async({ email, password, displayName} ) => {
    let res = await signupWithEmail(email, password, displayName)
    if (!res.error) {
    set(() => ({ user: res.user.split('@')[0] }))
    Router.push('/')
    } else set(() => ({ error: res.errorMs }))
  }, 
  logout: async () => {
    let res = await logoutMeOut()
    if (res.loggedout) set(() => ({ user: "" }))
},
//  addToCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  addToCart: (cartItemToAdd) => set((state) => ({ cartItems: addItemToCart(state.cartItems, cartItemToAdd)})),
  removeFromCart: (cartItemToRemove) => set((state) => ({ cartItems: removeItemFromCart(state.cartItems, cartItemToRemove)})),
  clearCart: () => set((state) => ({ cartItems: [] })),
}));
export const UserData = () => useStore(state => state.user)
export const useLogin = () => useStore((state) => state.login);
export const useSginup = () => useStore((state) => state.signup);
export const useLogout = () => useStore((state) => state.logout);
//export const useCartItems = () => useStore((state) => state.addItemToCart);
export const useAddToCart = () => useStore((state) => state.addToCart);
export const useRemoveFromCart = () => useStore((state) => state.removeFromCart);
export const useClearCart = () => useStore((state) => state.clearCart);
export const useUser = () => useStore((state) => state.user);
export const useCartItems = () => useStore((state) => state.cartItems);
export const useSearchField = () => useStore((state) => state.setSearchField);
export const useSearchItem = () => useStore((state) => state.searchField);
