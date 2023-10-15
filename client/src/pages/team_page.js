import React, { useState } from 'react';
import './team_page_style.css';
import { useLocation } from 'react-router-dom';

const PlayerCard = ({ player, isSelected, onSelect, onDeselect }) => {
  if (player.isHeader) {
    // Render the header as an h3 element
    return <h3>{player.name}</h3>;
  }

  const { id, name, role, bowlingStyle, battingStyle } = player;

  const handleSelect = () => {
    if (isSelected) {
      onDeselect(id);
    } else {
      onSelect(id);
    }
  };

  return (
    <div className={`player-card ${isSelected ? 'selected' : ''}`} onClick={handleSelect}>
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Bowling Style: {bowlingStyle || 'N/A'}</p>
      <p>Batting Style: {battingStyle || 'N/A'}</p>
    </div>
  );
};

const TeamPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const matchId = queryParams.get('matchId');
  const team1Id = queryParams.get('team1Id');
  const team2Id = queryParams.get('team2Id');
  const team1Name = queryParams.get('team1Name');
  const team2Name = queryParams.get('team2Name');

  // Use template literals for dynamic imports
  const team1Data = require(`../team_${team1Id}.json`);
  const team2Data = require(`../team_${team2Id}.json`);

  const players1 = team1Data.player;
  const players2 = team2Data.player;

  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleSelect = (playerId) => {
    if (selectedPlayers.length < 11) {
      setSelectedPlayers((prevSelected) => [...prevSelected, playerId]);
    } else {
      alert('You have already selected 11 players. You cannot select more.');
    }
  };

  const handleDeselect = (playerId) => {
    setSelectedPlayers((prevSelected) => prevSelected.filter((id) => id !== playerId));
  };

  return (
    <div className='team_page'>
      <div className="team-page">
        <div className="team">
          <h3>Team {team1Name}</h3>
          <div className="player-cards">
            {players1.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isSelected={selectedPlayers.includes(player.id)}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
              />
            ))}
          </div>
        </div>

        <div className="team">
          <h3>Team {team2Name}</h3>
          <div className="player-cards">
            {players2.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isSelected={selectedPlayers.includes(player.id)}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='btn'><button className='create_btn'>Create</button></div>
    </div>
  );
};

export default TeamPage;
