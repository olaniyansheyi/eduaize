import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    avatar_url: null,
    userDetails: null,
  }),
  actions: {
    async signup({ fullName, email, password, address, id, role }) {
      const { $supabase } = useNuxtApp();
      this.loading = true;
      this.error = null;
      let response;
      try {
        response = await $supabase.auth.signUp({
          email,
          password,
          options: {
            data: { fullName, address, id, role },
          },
        });
        const { data, error } = response;
        if (error) throw error;
        this.user = data.user;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
      return response;
    },
    loadUser() {
      if (process.client) {
        const storedUser = localStorage.getItem("user");
        const storedUserDetails = localStorage.getItem("userDetails");

        if (storedUser) {
          this.user = JSON.parse(storedUser);
        }
        if (storedUserDetails) {
          this.userDetails = JSON.parse(storedUserDetails);
        }
      }
    },

    async login({ email, password }) {
      const { $supabase } = useNuxtApp();
      this.loading = true;
      this.error = null;
      let response;

      try {
        // Sign in user
        response = await $supabase.auth.signInWithPassword({ email, password });

        const { data, error } = response;
        if (error) throw error;

        // Store session data
        if (data?.session) {
          this.user = data.user; // Store in Pinia state
          localStorage.setItem("user", JSON.stringify(data.user)); // Save in localStorage
        }

        // Fetch user metadata from auth
        const { data: userData, error: userError } =
          await $supabase.auth.getUser();
        if (userError) throw userError;

        // Extract user metadata from the auth object
        this.userDetails = userData?.user?.user_metadata || null;

        // Save user metadata in localStorage
        localStorage.setItem("userDetails", JSON.stringify(this.userDetails));

        console.log("User Metadata:", this.userDetails);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }

      return response;
    },

    async logout() {
      const { $supabase } = useNuxtApp();
      this.loading = true;
      let response;
      try {
        response = await $supabase.auth.signOut();
        const { error } = response;
        if (error) throw error;
        this.user = null;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
      return response;
    },
    async getCurrentUser() {
      const { $supabase } = useNuxtApp();
      this.loading = true;

      try {
        const {
          data: { session },
        } = await $supabase.auth.getSession();

        if (session) {
          const { data: userData, error } = await $supabase.auth.getUser();
          if (error) throw error;
          this.user = userData.user;
        } else {
          this.user = null;
        }
      } catch (error) {
        this.error = error.message;
        this.user = null;
      } finally {
        this.loading = false;
      }
    },
    async fetchUser() {
      const { $supabase } = useNuxtApp();
      const {
        data: { user },
      } = await $supabase.auth.getUser();
      this.user = user;
    },

    async updateProfile({ fullName, address, email }) {
      const { $supabase } = useNuxtApp();
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await $supabase.auth.updateUser({
          data: { fullName, address, email },
        });
        if (error) throw error;
        this.user = data.user;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async uploadAvatar(file) {
      const { $supabase } = useNuxtApp();
      this.loading = true;
      this.error = null;

      try {
        if (!this.user) throw new Error("No user logged in");

        const fileExt = file.name.split(".").pop();
        const fileName = `${this.user.id}.${fileExt}`;
        const filePath = `${fileName}`;

        await $supabase.storage.from("avatars").upload(filePath, file, {
          cacheControl: "0",
          upsert: true,
        });

        await this.updateUserProfileWithAvatar(filePath);

        await this.getAvatarUrl();

        return { success: true };
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async getAvatarUrl() {
      const { $supabase } = useNuxtApp();
      this.loading = true;
      this.error = null;

      try {
        if (!this.user) return null;

        const { data: userData, error: userError } =
          await $supabase.auth.getUser();

        if (userError) throw userError;

        if (userData.user.user_metadata.avatar_url) {
          const { data: avatarData, error: avatarError } =
            await $supabase.storage
              .from("avatars")
              .getPublicUrl(userData.user.user_metadata.avatar_url);

          if (avatarError) throw avatarError;

          this.avatar_url = avatarData.publicUrl;
          return avatarData.publicUrl;
        } else {
          this.avatar_url = null;
          return null;
        }
      } catch (error) {
        this.error = error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async updateUserProfileWithAvatar(filePath) {
      const { $supabase } = useNuxtApp();
      this.loading = true;
      this.error = null;

      try {
        const { error: updateError } = await $supabase.auth.updateUser({
          data: { avatar_url: filePath },
        });

        if (updateError) throw updateError;

        const { data: avatarData } = await $supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        this.avatar_url = avatarData.publicUrl;

        return { success: true };
      } catch (error) {
        this.error = error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
