import React, { useState, useEffect } from 'react';
import '../css/player_selec_style.css';
import { useNavigate } from 'react-router-dom';
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

const PlayerSelection = ({ matchId, username, contestId, team1Name, team2Name, isEditing, setIsEditing }) => {
  const [team1Data, setTeam1Data] = useState({});
  const [team2Data, setTeam2Data] = useState({});
  const navigate = useNavigate();

  const getTeamIdsByMatchId = async (matchId, retryCount = 0) => {
    const options = {
      method: 'GET',
      url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}`,
      headers: {
        'x-rapidapi-key': '33692e1a65mshb5409f761d142bfp1fbc64jsn057b114ebff9',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const match = response.data;

      if (match) {
        const team1Id = match.matchInfo.team1.id;
        const team2Id = match.matchInfo.team2.id;
        return { team1Id, team2Id };
      } else {
        return null;
      }
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < 3) {
        console.error('Rate limit exceeded, retrying in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        return getTeamIdsByMatchId(matchId, retryCount + 1);
      } else {
        console.error('Error fetching match data:', error);
        return null;
      }
    }
  };

  const fetchTeam = async (teamId, setTeamData) => {
    const options = {
      method: 'GET',
      url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/team/${teamId}`,
      headers: {
        'x-rapidapi-key': '33692e1a65mshb5409f761d142bfp1fbc64jsn057b114ebff9',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setTeamData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAllTeams = async () => {
      const teamIds = await getTeamIdsByMatchId(matchId);
      if (teamIds) {
        await Promise.all([
          fetchTeam(teamIds.team1Id, setTeam1Data),
          fetchTeam(teamIds.team2Id, setTeam2Data)
        ]);
      }
    };

    fetchAllTeams();
  }, [matchId]);

  const players1 = team1Data.players ? team1Data.players.Squad : [];
  const players2 = team2Data.players ? team2Data.players.Squad : [];

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

  useEffect(() => {
    if (captain && viceCaptain && captain === viceCaptain) {
      setViceCaptain("");
      alert("Captain and vice-captain cannot be the same!");
    }
  }, [captain, viceCaptain]);

  const handleConfirm = () => {
    const dataToUpdate = {
      username: username,
      matchId: matchId,
      contestId: contestId,
      captain: captain,
      viceCaptain: viceCaptain,
      players: selectedPlayers,
    };

    axios.post('https://fantasy11-umil.onrender.com/team_page/update', dataToUpdate)
      .then((response) => {
        setIsEditing(false);
        alert('Players data updated successfully!');
        navigate('/mymatches');
      })
      .catch((error) => {
        console.error('Error updating players data: ', error);
        alert('Failed to update players data. Please try again later.');
      });
  };

  return (
    <div className='team_page'>
      <div className="team-page">
        <div className="team">
          <h3><strong>{team1Name}</strong></h3>
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
          <h3><strong>{team2Name}</strong></h3>
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
              <option key={player.id} value={player.id}>{player.name}</option>
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
                <option key={player.id} value={player.id}>{player.name}</option>
              ))}
          </select>
        </div>
        <div className='buttons-container'>
          <button onClick={handleConfirm} id='confirm_btn'>Confirm</button>
          <button onClick={() => setIsEditing(false)} id='cancel_btn'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSelection;
