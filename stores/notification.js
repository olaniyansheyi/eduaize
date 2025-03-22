import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [],
  }),
  actions: {
    async getNotifications(userId) {
      try {
        const { $supabase } = useNuxtApp();
        const query = `sender_id.eq.${userId},receiver_id.eq.${userId}`;

        const { data, error } = await $supabase
          .from("notifications")
          .select("*")
          .or(query);

        if (error) {
          console.error("Supabase error:", error);
        } else {
          this.notifications = data || [];
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },

    async createNotification({ senderId, receiverId, message }) {
      try {
        const { $supabase } = useNuxtApp();

        const { data, error } = await $supabase.from("notifications").insert([
          {
            sender_id: senderId,
            receiver_id: receiverId,
            message: message,
            is_read: false,
          },
        ]);

        if (error) {
          console.error("Error creating notification:", error);
          return false;
        }

        return data;
      } catch (error) {
        console.error("Unexpected error while creating notification:", error);
        return false;
      }
    },
  },
});
