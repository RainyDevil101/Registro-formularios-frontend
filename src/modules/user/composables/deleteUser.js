import backendConnect from '../../../api/backend';

const deleteUser = () => {

    const deleteUserDb = async (id = '') => {
        if (!id) {
            return
        } else {

            try {
                const { data } = await backendConnect.delete(`/api/users/${id}`, {
                    headers: { 'x-token': localStorage.getItem('token') }
                })
                return {data, ok: true, message: 'Eliminado'}

            } catch (error) {
                console.log(error);
            }

        }

    }

    deleteUserDb()

    return {
        deleteUserDb,
    }
}

export default deleteUser