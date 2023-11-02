import React, { useState, useEffect } from 'react';
import './team_page_style.css';
import { useLocation,useNavigate, } from 'react-router-dom';
import axios from 'axios';

const PlayerCard = ({ player, isSelected, onSelect, onDeselect }) => {
  if (player.isHeader) {
    return <h3>{player.name}</h3>;
  }

  const { id, name, role, bowlingStyle, battingStyle } = player;

  const handleSelect = () => {
    if (isSelected) {
      onDeselect(id);
    } else {
      onSelect(id, name); 
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
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const matchId = queryParams.get('matchId');
  const contestId = queryParams.get('contestId');
  const team1Id = queryParams.get('team1Id');
  const team2Id = queryParams.get('team2Id');
  const team1Name = queryParams.get('team1Name');
  const team2Name = queryParams.get('team2Name');
  const username = localStorage.getItem("username");

  const team1Data = require(`../team_${team1Id}.json`);
  const team2Data = require(`../team_${team2Id}.json`);

  const players1 = team1Data.player;
  const players2 = team2Data.player;

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [captain, setCaptain] = useState("");
  const [viceCaptain, setViceCaptain] = useState("");

  const handleSelect = (playerId, playerName) => {
    if (selectedPlayers.length < 11) {
      if (!selectedPlayers.find((player) => player.id === playerId)) {
        setSelectedPlayers([...selectedPlayers, { id: playerId, name: playerName }]);
      }
    } else {
      alert('You have already selected 11 players. You cannot select more.');
    }
  };

  const handleDeselect = (playerId) => {
    const updatedPlayers = selectedPlayers.filter((player) => player.id !== playerId);
    setSelectedPlayers(updatedPlayers);
    if (captain === playerId) {
      setCaptain(null);
    }
    if (viceCaptain === playerId) {
      setViceCaptain(null);
    }
  };

  const handleCreateTeam = () => {
    if (selectedPlayers.length === 11 && captain && viceCaptain) {
      const teamData = {
        username: username,
        matchId: matchId,
        contestId:contestId,
        team1Name: team1Name,
        team2Name: team2Name,
        selectedPlayers: selectedPlayers,
        captain: captain,
        viceCaptain: viceCaptain,
      };

      axios.post("http://localhost:3001/team_page/create", teamData)
        .then((response) => {
          alert('Team created with 11 players, captain, and vice-captain.');
          document.getElementById('createbtn').disabled = true;
          navigate('/home');
        })
        .catch((error) => {
          alert('Failed to create a team: ' + error.message);
        });
    } else {
      alert('Please select 11 players, a captain, and a vice-captain to create a team.');
    }
  };

  useEffect(() => {
    if ("captain" && "viceCaptain" === "captain") {
      setViceCaptain("");
      alert("Captain and vice-captain cannot be the same!");
    }
  }, [captain, viceCaptain]);

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
                isSelected={selectedPlayers.some((selected) => selected.id === player.id)}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
                isCaptain={captain === player.id}
                isViceCaptain={viceCaptain === player.id}
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
                isSelected={selectedPlayers.some((selected) => selected.id === player.id)}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
                isCaptain={captain === player.id}
                isViceCaptain={viceCaptain === player.id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='captains-selection'>
        <h2>Select Captain and Vice-Captain</h2>
        <div className='captains'>
          <label htmlFor='captainSelect'>Captain:</label>
          <select
            id='captainSelect'
            onChange={(e) => setCaptain(e.target.value)}
            value={captain || ''}
          >
            <option value=''>Select Captain</option>
            {selectedPlayers.map((player) => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
        </div>
        <div className='captains'>
          <label htmlFor='viceCaptainSelect'>Vice-Captain:</label>
          <select
            id='viceCaptainSelect'
            onChange={(e) => setViceCaptain(e.target.value)}
            value={viceCaptain || ''}
          >
            <option value=''>Select Vice-Captain</option>
            {selectedPlayers
              .filter((player) => player.id !== captain)
              .map((player) => (
                <option key={player.id} value={player.name}>{player.name}</option>
              ))}
          </select>
        </div>
      </div>
      <div className='btn'>
        <button id='createbtn' className='create_btn' onClick={handleCreateTeam}>Create</button>
      </div>
    </div>
  );
};

export default TeamPage;
