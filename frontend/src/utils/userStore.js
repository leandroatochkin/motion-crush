import {create} from 'zustand'

export const userStore = create((set) => ({
    loggedIn: false,
    username: '',


    setLoginStatus: (status) => set({
      loggedIn: status,
    }),

    setUsername: (username) => set({
        username: username,
        }),
  
  }));