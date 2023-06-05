import { LeaderboardCard } from './LeaderboardCard'
export const Leaderboard = () => {
    //place get request here
    return(
        <div className = "m-2">
            <h1 className="text-center text-5xl font-bold mb-4">Leaderboard</h1>
            <div className="flex grid justify-items-center">
                <LeaderboardCard/>
                <LeaderboardCard/>
                <LeaderboardCard/>
                <LeaderboardCard/>
            </div>
               
        </div>
    )
    
}