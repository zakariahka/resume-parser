import { useAuthContext } from './useAuthContext'
import { useLeaderboardContext } from './useLeaderboardContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: leaderboardDispatch } = useLeaderboardContext()

    const logout = () => {
        //remove user from local storage
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})

        leaderboardDispatch({type:'SET_MESSAGES', payload:[]})
    }

    return {logout}
}