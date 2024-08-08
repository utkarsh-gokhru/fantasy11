import React, { useState, useEffect } from 'react';
import '../css/team_page_style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const PlayerCard = ({ player, isSelected, onSelect, onDeselect }) => {
  if (Object.keys(player).length === 2) {
    return <h3>{player.fullName}</h3>;
  }

  const { id, fullName, role, bowlingStyle, battingStyle } = player;

  const handleSelect = () => {
    if (isSelected) {
      onDeselect(id);
    } else {
      onSelect(id, fullName);
    }
  };

  return (
    <div className={`player-card ${isSelected ? 'selected' : ''}`} onClick={handleSelect}>
      <h2>{fullName}</h2>
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
  const contestFee = queryParams.get('contestFee');
  const [team1Data, setTeam1Data] = useState({});
  const [team2Data, setTeam2Data] = useState({});
  const [squadError, setSquadError] = useState(false);

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
    fetchTeam(team1Id, setTeam1Data);
  }, []);

  useEffect(() => {
    fetchTeam(team2Id, setTeam2Data);
  }, []);

  const players1 = team1Data.players ? team1Data.players.Squad : [];
  const players2 = team2Data.players ? team2Data.players.Squad : [];

  const [open, setOpen] = useState(false);
  const [cardno, setCardno] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [captain, setCaptain] = useState("");
  const [viceCaptain, setViceCaptain] = useState("");

  const handleSelect = (playerId, playerName) => {
    if (selectedPlayers.length < 11) {
      if (!selectedPlayers.find((player) => player.id === playerId)) {
        setSelectedPlayers([...selectedPlayers, { id: playerId, fullName: playerName }]);
      }
    } else {
      alert('You have already selected 11 players. You cannot select more.');
    }
  };

  const handleDeselect = (playerId) => {
    const updatedPlayers = selectedPlayers.filter((player) => player.id !== playerId);
    setSelectedPlayers(updatedPlayers);
    if (captain === playerId) {
      setCaptain("");
    }
    if (viceCaptain === playerId) {
      setViceCaptain("");
    }
  };

  const validateCaptainSelection = (newCaptain, newViceCaptain) => {
    if (newCaptain === newViceCaptain) {
      alert("Captain and vice-captain cannot be the same!");
      return false;
    }
    return true;
  };

  const handleCaptainChange = (e) => {
    const newCaptain = e.target.value;
    if (validateCaptainSelection(newCaptain, viceCaptain)) {
      setCaptain(newCaptain);
    } else {
      setCaptain("");
    }
  };

  const handleViceCaptainChange = (e) => {
    const newViceCaptain = e.target.value;
    if (validateCaptainSelection(captain, newViceCaptain)) {
      setViceCaptain(newViceCaptain);
    } else {
      setViceCaptain("");
    }
  };

  const handleCreateTeam = () => {
    if (cardno.length !== 14 || cvv.length !== 3) {
      alert("Invalid credentials");
      return;
    }
    if (selectedPlayers.length === 11 && captain && viceCaptain) {
      const teamData = {
        username: username,
        matchId: matchId,
        contestId: contestId,
        team1Name: team1Name,
        team2Name: team2Name,
        selectedPlayers: selectedPlayers,
        captain: captain,
        viceCaptain: viceCaptain,
      };

      axios.post("http://localhost:3001/team_page/create", teamData)
        .then(() => {
          handleClose();
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

  const handleClickOpen = () => {
    if (selectedPlayers.length === 11 && captain && viceCaptain) {
      setOpen(true);
    } else {
      alert('Please select 11 players, a captain, and a vice-captain to proceed.');
    }
  };

  const handleClose = () => {
    setCardno('');
    setCvv('');
    setOpen(false);
  };

  const renderTeam = (teamName, players) => (
    <div className="team">
      <h3>{teamName}</h3>
      <div className="player-cards">
        {players.map((player) => (
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
  );

  return (
    <div className='team_page'>
      <div className="team-page">
        {renderTeam(team1Name, players1)}
        {renderTeam(team2Name, players2)}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Payment"}</DialogTitle>
        <DialogContent>
          <div>
            <h2>Pay {contestFee}</h2>
          </div>
          <DialogContentText id="alert-dialog-description">
            <div>
              <TextField
                label="Card Number"
                type='number'
                variant="outlined"
                value={cardno}
                onChange={(e) => setCardno(e.target.value)}
                sx={{ marginTop: "15px" }}
                fullWidth
              />
              <TextField
                label="Enter CVV"
                type='number'
                variant="outlined"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                sx={{ marginTop: "15px" }}
                fullWidth
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateTeam} autoFocus>Pay now</Button>
        </DialogActions>
      </Dialog>
      <div className='captains-selection'>
        <h2>Select Captain and Vice-Captain</h2>
        <div className='captains'>
          <label htmlFor='captainSelect'>Captain:</label>
          <select
            id='captainSelect'
            onChange={handleCaptainChange}
            value={captain || ''}
          >
            <option value=''>Select Captain</option>
            {selectedPlayers.map((player) => (
              <option key={player.id} value={player.id}>{player.fullName}</option>
            ))}
          </select>
          <label htmlFor='viceCaptainSelect'>Vice-Captain:</label>
          <select
            id='viceCaptainSelect'
            onChange={handleViceCaptainChange}
            value={viceCaptain || ''}
          >
            <option value=''>Select Vice-Captain</option>
            {selectedPlayers.map((player) => (
              <option key={player.id} value={player.id}>{player.fullName}</option>
            ))}
          </select>
        </div>
      </div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} id='createbtn'>
        Create Team
      </Button>
    </div>
  );
};

export default TeamPage;
