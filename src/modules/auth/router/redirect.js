import store from "@/store";
import Swal from "sweetalert2";

const revisor = async(to, from, next) => {

    const {user} = await store.dispatch('auth/readToken')

    if ( user === undefined ) {
        next({name: 'select-login'})
        return
    }

    if ( user.role === 'REVISOR_ROLE' ) {
        next({ name: 'rev-front-menu' })
        return
    }
    
    if ( user.role === 'SUPERVISOR_ROLE' ) {
        next({ name: 'front-menu' })
        return
    } else {
        Swal.fire({
            title: "Error",
            text: "No tiene los permisos",
            icon: "error"
        });
        next({name: 'select-login'})
    }

}

export default revisor