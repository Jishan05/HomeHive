import { create } from 'zustand';

interface UserState {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  coverImage: string;
  updateUser: (data: Partial<UserState>) => void;
}

const useUserStore = create<UserState>((set) => ({
  name: 'Monish Khan',
  email: 'monishkhan.dev@email.com',
  phone: '9999999999',
  profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop',
  updateUser: (data) => set((state) => ({ ...state, ...data })),
}));

export default useUserStore;
