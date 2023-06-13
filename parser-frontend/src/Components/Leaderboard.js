import { LeaderboardCard } from './LeaderboardCard'
import  axios  from 'axios';
import { useEffect, useState } from 'react'
import { useLeaderboardContext } from '../Hooks/useLeaderboardContext'
import { useAuthContext } from '../Hooks/useAuthContext';

export const Leaderboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const {leaderboard, dispatch}= useLeaderboardContext([]);
    const {user} = useAuthContext();
    
    const getApplicants = () => {
        axios.get(`${process.env.REACT_APP_API_URL}applicants`,{
        headers:{
            'Authorization':`Bearer ${user.token}`
        }
    })
        .then(result => {
            dispatch({type:'SET_LEADERBOARD', payload:result.data})
        })
        .catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        if (user){
            getApplicants();
        }
        
    }, [dispatch, user]);

    const filteredApplicants = leaderboard.filter(applicant =>
        applicant.applicant_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return(
        <div className = "m-2">
            {leaderboard.length > 0 && <h1 className="text-center text-5xl font-bold mb-10">Top 10 Applicants</h1>}
            {leaderboard.length > 0 && <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" md:w-1/3 w-3/4 text-base p-2 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Search your leaderboard"
            />}
            <div className="flex grid justify-items-center align-center">
                {leaderboard && filteredApplicants.map(applicant => (
                    <LeaderboardCard key={applicant._id} applicant = {applicant}/>
                ))}
            </div>
               
        </div>
    )
    
}