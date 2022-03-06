import store from "@/store";
import Swal from "sweetalert2";
import useAuth from "../composables/useAuth"

const supervisor = async(to, from, next) => {

    const {user} = await store.dispatch('auth/readToken')

    if ( user === undefined ) {
        next({name: 'select-login'})
    }

    if ( user.role === 'SUPERVISOR_ROLE' ) {
        next()
    } else {
        Swal.fire({
            title: "Error",
            text: "No tiene los permisos",
            icon: "error"
        });
        next(from.fullPath)
    }

}

export default supervisor