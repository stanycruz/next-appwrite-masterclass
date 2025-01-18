import { IUser } from '@/interfaces';
import { create } from 'zustand';

export const usersStore = create((set) => ({
  loggedInUser: null,
  setLoggedInUser: (user: IUser) => set({ loggedInUser: user }),
}));

export interface IUsersStore {
  loggedInUser: IUser | null;
  setLoggedInUser: (user: IUser) => void;
}
