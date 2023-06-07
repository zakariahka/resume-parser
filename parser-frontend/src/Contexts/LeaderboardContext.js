import { createContext, useReducer } from 'react'

export const LeaderboardContext = createContext()

export const leaderboardReducer = (state,action) => {
    switch(action.type) {
        case 'SET_LEADERBOARD':
            return {
                leaderboard: action.payload
            }
        case 'ADD_APPLICANT':
            return{
                leaderboard:[...state.leaderboard, action.payload]
            }
        default:
            return state
    }
}

export const LeaderboardContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(leaderboardReducer, {
        leaderboard:[]
    })

    return(
        <LeaderboardContext.Provider value = {{...state, dispatch}}>
            { children }
        </LeaderboardContext.Provider>
    )
}