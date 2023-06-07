import { LeaderboardCard } from './LeaderboardCard'
import  axios  from 'axios';
import { useEffect } from 'react'
import { useLeaderboardContext } from '../Hooks/useLeaderboardContext'

export const Leaderboard = () => {
    const {leaderboard, dispatch}= useLeaderboardContext([]);
    
    const getApplicants = () => axios.get(`${process.env.REACT_APP_API_LEADERBOARD_URL}`)
        .then(result => {
            dispatch({type:'SET_LEADERBOARD', payload:result.data})
        })
        .catch(err => {
            console.log(err);
        })
    
    useEffect(() => {
        getApplicants();
    }, [dispatch]);
    
    return(
        <div className = "m-2">
            <h1 className="text-center text-5xl font-bold mb-4">Leaderboard</h1>
            <div className="flex grid justify-items-center">
                {leaderboard.map(applicant => (
                    <LeaderboardCard key={applicant._id} applicant = {applicant}/>
                ))}
            </div>
               
        </div>
    )
    
}