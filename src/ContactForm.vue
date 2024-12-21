<template>
  <form @submit.prevent="submitForm" class="mb-4">
    <input v-model="name" placeholder="Имя" class="p-2 border" required />
    <input v-model="phone" placeholder="Телефон" class="p-2 border" required />
    <input v-model="email" placeholder="Email" class="p-2 border" required />
    <button type="submit" class="bg-green-500 text-white p-2">
      {{ isEditing ? "Сохранить изменения" : "Добавить контакт" }}
    </button>
    <button
      v-if="isEditing"
      type="button"
      @click="clearFields"
      class="bg-gray-500 text-white p-2"
    >
      Отменить
    </button>
    <div>
      <span v-if="phoneError" class="text-red-500">{{ phoneError }}</span>
      <span v-if="emailError" class="text-red-500">{{ emailError }}</span>
    </div>
  </form>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    editContact: {
      type: Object,
      default: null,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["addContact", "clearEdit", "deleteContact"],
  setup(props, { emit }) {
    const name = ref("");
    const phone = ref("");
    const email = ref("");
    const phoneError = ref("");
    const emailError = ref("");

    watch(
      () => props.editContact,
      (newValue) => {
        if (newValue) {
          name.value = newValue.name;
          phone.value = newValue.phone;
          email.value = newValue.email;
        }
      }
    );

    const validatePhone = (phone) => {
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const submitForm = () => {
      phoneError.value = "";
      emailError.value = "";

      if (!validatePhone(phone.value)) {
        phoneError.value = "Неверный формат телефона. Пример: +1234567890";
        return;
      }

      if (!validateEmail(email.value)) {
        emailError.value = "Неверный формат email. Пример: name@mail.com";
        return;
      }

      const contactData = {
        name: name.value,
        phone: phone.value,
        email: email.value,
      };

      if (props.isEditing) {
        emit("deleteContact", props.editContact.index);
        emit("addContact", { ...contactData, index: props.editContact.index });
      } else {
        emit("addContact", contactData);
      }
      clearFields();
    };

    const clearFields = () => {
      name.value = "";
      phone.value = "";
      email.value = "";
      emit("clearEdit");
    };

    return {
      name,
      phone,
      email,
      submitForm,
      clearFields,
      phoneError,
      emailError,
    };
  },
};
</script>
