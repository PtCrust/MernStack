import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        // remove the user from the Storage 
        localStorage.removeItem('user')

        // update the Auth Context 
        dispatch({ type: "LOGOUT" })
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })
    }

    return { logout }
}