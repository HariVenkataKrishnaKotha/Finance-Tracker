<template>
    <UCard v-if="!success">
      <template #header>
        Finance Tracker Sign-in
      </template>
  
      <form @submit.prevent="handleLogin">
        <UFormGroup label="Email" name="email" class="mb-4" :required="true"
          help="Confirmation link will be sent to your email">
          <UInput type="email" placeholder="Email" required v-model="email" />
        </UFormGroup>
  
        <UButton type="submit" variant="solid" color="black" :loading="pending" :disabled="pending">Sign-in</UButton>
      </form>
    </UCard>
    <UCard v-else>
      <template #header>
        You received an email ;)
      </template>
  
      <div class="text-center">
        <p class="mb-4">Email has been set to <strong>{{ email }}</strong> with a sign-in link</p>
        <p>
          <strong>Important:</strong> The link will expire in 5 minutes.
        </p>
      </div>
    </UCard>
  </template>
  
  <script setup>
  const success = ref(false)
  const email = ref('')
const pending = ref(false)
const { toastError } = useAppToast()
const supabase = useSupabaseClient()

useRedirectIfAuthenticated()

const handleLogin = async () => {
  pending.value = true
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: 'http://localhost:3000/confirm'
      }
    })
    if (error) {
        toastError({
        title: 'Authentication Error!!!',
        description: error.message
      })
    } else {
      success.value = true
    }
  } finally {
    pending.value = false
  }
}
  </script>