export default defineNuxtRouteMiddleware((to, from) => {
    const tempUser = useState('temporaryUser');
    const authUser = useState('authUser');
    const { $hasValidToken } = useNuxtApp();

    if (to.path.startsWith('/auth')) {
        if (authUser.value) {
            return navigateTo('/');
        }
        
        if (process.client && $hasValidToken()) {
            return navigateTo('/');
        }
    } else {
        if (process.client && !$hasValidToken()) {
            return navigateTo('/auth/login');
        }

    }
    return
});