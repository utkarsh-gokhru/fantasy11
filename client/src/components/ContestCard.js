import React from 'react';
import styles from './Contestcard.module.css';

function ContestCard({ contest }) {
    return (
      <div className={styles['contest-card']}>
        <h2>{contest.name}</h2>
        <p>Entry Fee: ${contest.entryFee}</p>
        <p>Prize Pool: ${contest.prizePool}</p>
        <p>Participants: {contest.participants}</p>
        <p>Start Time: {new Date(contest.startTime).toLocaleString()}</p>
        <button>Join Contest</button>
      </div>
    );
  }
  
  export default ContestCard;
  
