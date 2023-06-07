import { LeaderboardContext } from "../Contexts/LeaderboardContext";
import { useContext } from 'react'

export const useLeaderboardContext = () => {
    const context = useContext(LeaderboardContext)

    if(!context){
        throw Error('useLeaderboardContext must be used inside a LeaderboardContextProvider')
    }

    return context
}