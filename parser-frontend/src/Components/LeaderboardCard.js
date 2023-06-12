export const LeaderboardCard = (props) => {
    return(
        <div className = "md:w-1/4 w-3/4 my-2">
            <div className="rounded overflow-hidden shadow-lg">
                <div className="px-6 py-2">
                    <div className="font-bold text-xl mb-4">{props.applicant.applicant_name}: {props.applicant.applicant_score} points</div>
                </div>
                <p className="text-center font-light mb-1">Keywords</p>
                <div className="px-6 pt-3 pb-2">
                    {props.applicant.applicant_keywords.length > 0 && props.applicant.applicant_keywords.map(keyword => (
                        <span key={keyword} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{keyword}</span>
                    ))}
                    {props.applicant.applicant_keywords.length === 0 &&
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">None</span>
                    }
                </div>
            </div>
        </div>
    );
}