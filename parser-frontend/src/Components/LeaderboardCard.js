export const LeaderboardCard = (props) => {
    return(
        <div className = "md:w-1/4 w-1/3 m-4">
            <div class="rounded overflow-hidden shadow-lg">
                <div class="px-6 py-2">
                    <div class="font-bold text-xl mb-4">{props.applicant.applicant_name}: {props.applicant.applicant_score} points</div>
                </div>
                <div class="px-6 pt-3 pb-2">
                    {props.applicant.applicant_keywords.map(keyword => (
                        <span key={keyword} class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{keyword}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}