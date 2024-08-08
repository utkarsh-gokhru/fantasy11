import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/matches.css'; // Ensure you have created this CSS file for styling

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState('upcoming');
    const navigate = useNavigate();

    const fetchData = async (type) => {
        const endpoints = {
            recent: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
            upcoming: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming',
            live: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live',
        };

        const options = {
            method: 'GET',
            url: endpoints[type],
            headers: {
                'x-rapidapi-key': '33692e1a65mshb5409f761d142bfp1fbc64jsn057b114ebff9',
                'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            if (response.data && Array.isArray(response.data.typeMatches)) {
                setMatches(response.data.typeMatches);
            } else {
                throw new Error('Data structure error');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData(selectedType);
    }, [selectedType]); // Fetch data whenever the selectedType changes

    const handleButtonClick = (type) => {
        setSelectedType(type);
    };

    const getIdAndNav = (matchId, team1Id, team2Id, team1Name, team2Name) => {
        if (selectedType === 'upcoming') {
            const contestData = {
                matchId,
                team1Id,
                team2Id,
                team1Name,
                team2Name
            }
            navigate('/contest', { state: { contestData } })
        } else {
            alert('You cannot join the contest now!');
        }
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if there are no live matches
    const noLiveMatches = selectedType === 'live' && matches.length === 0;

    return (
        <div className="match-cards-container">
            <div className="button-group">
                <button onClick={() => handleButtonClick('live')} className={selectedType === 'live' ? 'active' : ''}>Live</button>
                <button onClick={() => handleButtonClick('upcoming')} className={selectedType === 'upcoming' ? 'active' : ''}>Upcoming</button>
                <button onClick={() => handleButtonClick('recent')} className={selectedType === 'recent' ? 'active' : ''}>Recent</button>
            </div>

            {noLiveMatches && (
                <div className="no-matches-message">
                    <p>No live matches available at the moment.</p>
                </div>
            )}

            {matches.map((typeMatch, index) => (
                <div key={index} className="type-match">
                    <h2>{typeMatch.matchType}</h2>
                    {typeMatch.seriesMatches && typeMatch.seriesMatches.map((seriesMatch, seriesIndex) => {
                        const series = seriesMatch.seriesAdWrapper;
                        if (!series) {
                            // console.error('seriesAdWrapper is undefined for seriesMatch:', seriesMatch);
                            return null;
                        }
                        return (
                            <div key={seriesIndex} className="series-match">
                                <h3>{series.seriesName}</h3>
                                {series.matches && series.matches.map((match, matchIndex) => {
                                    const matchInfo = match.matchInfo;
                                    const matchScore = match.matchScore;
                                    return (
                                        <div key={matchIndex} className="card" onClick={() => getIdAndNav(matchInfo.matchId, matchInfo.team1.teamId, matchInfo.team2.teamId, matchInfo.team1.teamName, matchInfo.team2.teamName)}>
                                            <div className="team-names">
                                                <span className="team-1">{matchInfo.team1.teamSName}</span>
                                                <span className="team-2">{matchInfo.team2.teamSName}</span>
                                            </div>
                                            <div className="city-name">{matchInfo.venueInfo.city}</div>
                                            {selectedType !== 'upcoming' && matchScore && (
                                                <div className='match-details'>
                                                    <div className='status'>{matchInfo.status}</div>
                                                    <div className="score">
                                                        <span className="team-1">
                                                            {matchScore.team1Score && matchScore.team1Score.inngs1 ?
                                                                `${matchScore.team1Score.inngs1.runs}/${matchScore.team1Score.inngs1.wickets || 0} (${matchScore.team1Score.inngs1.overs})`
                                                                : ''}
                                                        </span>
                                                        <span className="team-2">
                                                            {matchScore.team2Score && matchScore.team2Score.inngs1 ?
                                                                `${matchScore.team2Score.inngs1.runs}/${matchScore.team2Score.inngs1.wickets || 0} (${matchScore.team2Score.inngs1.overs})`
                                                                : ''}
                                                        </span>
                                                    </div>
                                                    {matchScore.team1Score && matchScore.team1Score.inngs2 && (
                                                        <div>
                                                            <div className="score">
                                                                <span className="team-1">
                                                                    {matchScore.team1Score.inngs2 ?
                                                                        `${matchScore.team1Score.inngs2.runs}/${matchScore.team1Score.inngs2.wickets || 0} (${matchScore.team1Score.inngs2.overs})`
                                                                        : ''}
                                                                </span>
                                                                <span className="team-2">
                                                                    {matchScore.team2Score && matchScore.team2Score.inngs2 ?
                                                                        `${matchScore.team2Score.inngs2.runs}/${matchScore.team2Score.inngs2.wickets || 0} (${matchScore.team2Score.inngs2.overs})`
                                                                        : ''}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            <p>{new Date(parseInt(matchInfo.startDate)).toLocaleString()}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Matches;
