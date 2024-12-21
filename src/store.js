import { defineStore } from "pinia";

export const useContactStore = defineStore("contacts", {
  state: () => ({
    contacts: JSON.parse(localStorage.getItem("contacts")) || [],
    message: "",
  }),
  actions: {
    addContact(contact) {
      this.contacts.push(contact);
      this.saveContacts();
    },
    deleteContact(index) {
      this.contacts.splice(index, 1);
      this.saveContacts();
    },
    saveContacts() {
      localStorage.setItem("contacts", JSON.stringify(this.contacts));
    },
    clearMessage() {
      this.message = "";
    },
  },
});
