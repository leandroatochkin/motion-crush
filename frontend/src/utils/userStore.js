import {create} from 'zustand'

export const userStore = create((set) => ({
    loggedIn: false,
    

    setLoginStatus: (status) => set({
      loggedIn: status,
    }),
  
  }));