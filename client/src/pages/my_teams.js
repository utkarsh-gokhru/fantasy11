import React from 'react';
import { useLocation } from 'react-router-dom';
import './my_teams_css.css';

const MyTeam = () => {
  const location = useLocation();
  const { selectedTeam } = location.state || {};

  return (
    <div>
      <h1 className="team-title">Selected Team</h1>
      {selectedTeam && (
        <div>
          <p className="team-info">
            {selectedTeam.team1Name} vs {selectedTeam.team2Name}
          </p>
          <p className="captain-info">Captain: {selectedTeam.captain}</p>
          <p className="vice-captain-info">Vice Captain: {selectedTeam.vice_captain}</p>
          <p className="players-title">Players:</p>
          <ul className="player-list">
            {selectedTeam.players.map((player, playerIndex) => (
              <li key={playerIndex} className="player-info">
                {player.name}
              </li>
            ))} 
          </ul>
        </div>
      )}    
    </div>
  );
};

export default MyTeam;
