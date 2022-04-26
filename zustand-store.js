import create from "zustand";
import { persist } from 'zustand/middleware';
import Router from 'next/router'
import {addItemToCart, addItemsToCart, removeItemFromCart} from './utils/cart.utils'
import {loginWithEmail, signupWithEmail, logoutMeOut} from './utils/auth.utils'
const useStore = create( persist((set, get) => ({
  user: "",
  uid: "",
  data: null,
  cartItems: [],
  chechoutItems: [],
  error: "",
  cartCount: 0,
  searchField: "",
  dark: false,
  buttonState: {save: true, edit: true},
  
  setToggleSaveButton: (status)=>{set((state) => ({buttonState: (state.toggle["save"]=status, state.toggle["edit"]=!status)}))},
  setToggleEditButton: (status)=>{set((state) => ({buttonState: (state.toggle["edit"]=status, state.toggle["save"]=!status)}))},

  setToggle: ()=>{set((state) => ({ dark: !state.dark }))},
  setSearchField: ({searchItem})=>{set(() => ({ searchField: searchItem }))},
  addItemsToCart: (cartItemToAdd) => set((state) => ({ cartItems: addItemsToCart(state.cartItems, cartItemToAdd)})),
  addItemsToChechoutCart: (cartItemsToAdd) => set((state) => ({ chechoutItems: cartItemsToAdd})),

  login: async ({email, password}) => { 
      let res = await loginWithEmail(email, password)
      if (!res.error) {
        set(() => ({user: res.user?.split('@')[0]}))
        set((state) => ({...state.uid, uid:res.uid }))
      Router.push('/')
      } else set(() => ({ error: res.errorMs }))
  },
  signup:  async({ email, password, displayName} ) => {
    let res = await signupWithEmail(email, password, displayName)
    if (!res.error) {
      set(() => ({user: res.user?.split('@')[0]}))
      set((state) => ({...state.uid, uid:res.uid }))
    Router.push('/')
    } else set(() => ({ error: res.errorMs }))
  }, 
  logout: async () => {
    let res = await logoutMeOut()
    if (res.loggedout) set((state) => ({...state.user, user: "" }))
},
  addToCart: (cartItemToAdd) => set((state) => ({ cartItems: addItemToCart(state.cartItems, cartItemToAdd)})),
  removeFromCart: (cartItemToRemove) => set((state) => ({ cartItems: removeItemFromCart(state.cartItems, cartItemToRemove)})),
  clearCart: () => set((state) => ({ cartItems: [] })),
  injectData: (data) => {set((state) => ({ data: data}));},
})));
export const UserData = () => useStore(state => state.user)
export const uidData = () => useStore(state => state.uid)
export const useLogin = () => useStore((state) => state.login);
export const useSginup = () => useStore((state) => state.signup);
export const useLogout = () => useStore((state) => state.logout);
export const useAddToCart = () => useStore((state) => state.addToCart);
export const useAddItemToCart = () => useStore((state) => state.addItemsToCart);

export const useToggleSaveButton = () => useStore((state) => state.setToggleSaveButton);
export const useToggleEditButton = () => useStore((state) => state.setToggleEditButton);
export const getButtonToggle = () => useStore((state) => state.buttonState);

export const useAddItemsToChechoutCart = () => useStore((state) => state.addItemsToChechoutCart);
export const useChechoutCart = () => useStore((state) => state.chechoutItems);
export const useRemoveFromCart = () => useStore((state) => state.removeFromCart);
export const useClearCart = () => useStore((state) => state.clearCart);
export const useCartItems = () => useStore((state) => state.cartItems);
export const useFetchedData = () => useStore((state) => state.injectData);
export const getData = () => useStore((state) => state.data);
export const useSearchField = () => useStore((state) => state.setSearchField);
export const useToggle = () => useStore((state) => state.setToggle);
export const getToggle = () => useStore((state) => state.dark);
export const useSearchItem = () => useStore((state) => state.searchField);
