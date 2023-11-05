import React from 'react';
import styles from '../css/Contestcard.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

function ContestCard({ contest,contestId,contestFee}) {
  const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const matchId = queryParams.get('matchId');
  // const team1Id = queryParams.get('team1Id');
  // const team2Id = queryParams.get('team2Id');
  // const team1Name = queryParams.get('team1Name');
  // const team2Name = queryParams.get('team2Name');
  const contestData = location.state.contestData;

  const { matchId, team1Id, team2Id, team1Name, team2Name } = contestData;
  
  const navigate = useNavigate();

  return (
    <div className={styles['contest-card']}>
      <h2>{contest.name}</h2>
      <p>Entry Fee: ${contest.entryFee}</p>
      <p>Prize Pool: ${contest.prizePool}</p>
      <p>Participants: {contest.participants}</p>
      <p>Start Time: {new Date(contest.startTime).toLocaleString()}</p>
      <button onClick={() => navigate(`/team_page?matchId=${matchId}&contestId=${contestId}&team1Id=${team1Id}&team2Id=${team2Id}&team1Name=${team1Name}&team2Name=${team2Name} &contestFee= ${contestFee}`)}>Join Contest</button>
    </div>
  );
  }
  
  export default ContestCard;
  
