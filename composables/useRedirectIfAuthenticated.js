export const useRedirectIfAuthenticated = (url = '/') => {
  const user = useSupabaseUser();
  const router = useRouter();
  const supabase = useSupabaseClient();

  watch(user, (newUser) => {
    console.log('User state changed:', newUser); // Debugging log
    if (newUser) {
      console.log('Redirecting to:', url);
      router.push(url);
    }
  }, { immediate: true });

  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth State Changed:', event, session);
    if (session?.user) {
      console.log('Redirecting due to session:', url);
      router.push(url);
    }
  });

  return { user };
};
