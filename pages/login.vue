<template>
  <UCard>
    <template #header>
      Finance Tracker Sign-in / Sign-up
    </template>

    <UButton 
      variant="outline" 
      color="black" 
      :loading="googlePending" 
      :disabled="googlePending" 
      @click="handleGoogleAuth"
      class="flex items-center space-x-2"
    >
      <UIcon name="i-mdi-google" class="w-5 h-5" /> 
      <span>Continue with Google</span>
    </UButton>
  </UCard>
</template>

<script setup>
const googlePending = ref(false)
const { toastError } = useAppToast()
const supabase = useSupabaseClient()

useRedirectIfAuthenticated() // Redirects if already authenticated

const handleGoogleAuth = async () => {
  googlePending.value = true;
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}` },
    });

    if (error) {
      console.error('Authentication Error:', error.message);
    } else {
      console.log('Login successful, fetching user...');
      setTimeout(async () => {
        const { data, error } = await supabase.auth.getUser();
        console.log('Fetched User:', data, error);
        if (data?.user) {
          console.log('User exists, reloading page...');
          window.location.reload();
        }
      }, 1500);
    }
  } finally {
    googlePending.value = false;
  }
};

</script>
