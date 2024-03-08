import { create } from "zustand";

type Store = {
  selectedConversation: any;
  messages: {_id:string}[];
  setMessages: any;
  setSelectedConversation: any;
};

const useConversation = create<Store>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: null | string) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages: []) => set({ messages }),
}));

export default useConversation;
