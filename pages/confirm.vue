<template>
    <UCard>
      <template #header>
        Signing in...
      </template>
  
      You are being signed in ;)!
    </UCard>
  </template>
  
  <script setup>
  useRedirectIfAuthenticated()
  </script>