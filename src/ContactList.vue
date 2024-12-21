<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Список контактов</h1>
    <div v-if="store.message" class="mb-4 text-green-500">
      {{ store.message }}
    </div>
    <input
      v-model="searchQuery"
      placeholder="Поиск..."
      class="mb-4 p-2 border"
    />
    <div
      v-for="(contact, index) in filteredContacts"
      :key="index"
      class="border p-4 mb-2"
    >
      <p><strong>Имя:</strong> {{ contact.name }}</p>
      <p><strong>Телефон:</strong> {{ contact.phone }}</p>
      <p><strong>Email:</strong> {{ contact.email }}</p>
      <button
        @click="setEditContact(contact, index)"
        class="bg-blue-500 text-white p-2"
      >
        Редактировать
      </button>
      <button @click="deleteContact(index)" class="bg-red-500 text-white p-2">
        Удалить
      </button>
    </div>
    <ContactForm
      @addContact="addContact"
      :editContact="editContactData"
      :isEditing="isEditing"
      @clearEdit="clearEdit"
      @deleteContact="deleteContact"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useContactStore } from "./store.js";
import ContactForm from "./ContactForm.vue";

export default {
  components: { ContactForm },
  setup() {
    const store = useContactStore();
    const searchQuery = ref("");
    const isEditing = ref(false);
    const editContactData = ref(null);

    const filteredContacts = computed(() => {
      return store.contacts.filter(
        (contact) =>
          contact.name.includes(searchQuery.value) ||
          contact.phone.includes(searchQuery.value) ||
          contact.email.includes(searchQuery.value)
      );
    });

    const addContact = (contact) => {
      store.addContact(contact);
      store.clearMessage();
    };

    const deleteContact = (index) => {
      store.deleteContact(index);
      store.clearMessage();
    };

    const setEditContact = (contact, index) => {
      editContactData.value = { ...contact, index };
      isEditing.value = true;
    };

    const clearEdit = () => {
      editContactData.value = null;
      isEditing.value = false;
    };

    return {
      searchQuery,
      filteredContacts,
      addContact,
      deleteContact,
      setEditContact,
      editContactData,
      isEditing,
      clearEdit,
      store,
    };
  },
};
</script>
