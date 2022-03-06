import store from "@/store";

const authGuard = async(to, from, next) => {

    const {ok} = await store.dispatch('auth/readToken')

    if( ok ) {
        next()
    } else {
        next({name: 'select-login'})
    }
}

export default authGuard