import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/mymatches_styles.css';

const MyMatches = () => {
  const [teamData, setTeamData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  const handleGetTeamData = () => {
    axios
      .get(`http://localhost:3001/team_page/teams?username=${username}`)
      .then((response) => {
        setTeamData(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch team data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetTeamData();
  }, []);

  const handleCardClick = (team) => {
    setSelectedTeam(team); 
    navigate("/my_teams",{ state: { selectedTeam: team } });
  };

  return (
    <div className="matches-container">
      <h1 className="main-title">My Matches</h1>

      {loading && <p className="loading-message">Loading...</p>}

      <div className="team-list">
        {teamData.map((team, index) => (
          <div
            key={team._id}
            className="team-card"
            onClick={() => handleCardClick(team)} 
          >
            <h3 className="team-title">Match {index + 1}</h3>
            <p className="teams">
              {team.team1Name} vs {team.team2Name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMatches;
