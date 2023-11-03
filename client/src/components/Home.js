import React, { useState, useEffect } from 'react';
import styles from '../css/Home.module.css'; // Import the CSS module

function MatchCard(props) {
  const { team1Name, team2Name, city, status } = props;

  return (
    <div className={styles.card}>
      <div className={styles["team-names"]}>
        <span className={styles["team-1"]}>{team1Name}</span>
        <span className={styles["team-2"]}>{team2Name}</span>
      </div>
      <div className={styles["city-name"]}>{city}</div>
      <div className={styles.status}>{status}</div>
      <div className={styles["score"]}>
        <span className={styles["team-1"]}>score1 (overs)</span>
        <span className={styles["team-2"]}>score2 (overs)</span>
      </div>
    </div>
  );
}

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const jsonDataURL =
      'data:application/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify([{
        "matchId": 75413,
        "match_desc": "1st Match",
        "team1Name": "ENG",
        "team1Id": 9,
        "team2Name": "NZ",
        "team2Id": 13,
        "status": "Match starts at Oct 05, 08:30 GMT",
        "city": "Ahmedabad"
      },
      {
        "matchId": 75420,
        "match_desc": "2nd Match",
        "team1Name": "PAK",
        "team1Id": 3,
        "team2Name": "NED",
        "team2Id": 24,
        "status": "Match starts at Oct 06, 08:30 GMT",
        "city": "Hyderabad"
      },
      {
        "matchId": 75427,
        "match_desc": "3rd Match",
        "team1Name": "BAN",
        "team1Id": 6,
        "team2Name": "AFG",
        "team2Id": 96,
        "status": "Match starts at Oct 07, 05:00 GMT",
        "city": "Dharamsala"
      },
      {
        "matchId": 75437,
        "match_desc": "5th Match",
        "team1Name": "IND",
        "team1Id": 2,
        "team2Name": "AUS",
        "team2Id": 4,
        "status": "Match starts at Oct 08, 08:30 GMT",
        "city": "Chennai"
      },
      {
        "matchId": 75444,
        "match_desc": "6th Match",
        "team1Name": "NZ",
        "team1Id": 13,
        "team2Name": "NED",
        "team2Id": 24,
        "status": "Match starts at Oct 09, 08:30 GMT",
        "city": "Hyderabad"
      },
      {
        "matchId": 75451,
        "match_desc": "7th Match",
        "team1Name": "ENG",
        "team1Id": 9,
        "team2Name": "BAN",
        "team2Id": 6,
        "status": "Match starts at Oct 10, 08:30 GMT",
        "city": "Dharamsala"
      },
      {
        "matchId": 75458,
        "match_desc": "9th Match",
        "team1Name": "IND",
        "team1Id": 2,
        "team2Name": "AFG",
        "team2Id": 96,
        "status": "Match starts at Oct 11, 08:30 GMT",
        "city": "Delhi"
      },
      {
        "matchId": 75465,
        "match_desc": "10th Match",
        "team1Name": "AUS",
        "team1Id": 4,
        "team2Name": "RSA",
        "team2Id": 11,
        "status": "Match starts at Oct 13, 08:30 GMT",
        "city": "Lucknow"
      },
      {
        "matchId": 75469,
        "match_desc": "11th Match",
        "team1Name": "NZ",
        "team1Id": 13,
        "team2Name": "BAN",
        "team2Id": 6,
        "status": "Match starts at Oct 13, 08:30 GMT",
        "city": "Chennai"
      },
      {
        "matchId": 75476,
        "match_desc": "12th Match",
        "team1Name": "IND",
        "team1Id": 2,
        "team2Name": "PAK",
        "team2Id": 3,
        "status": "Match starts at Oct 14, 08:30 GMT",
        "city": "Ahmedabad"
      },
      {
        "matchId": 75472,
        "match_desc": "13th Match",
        "team1Name": "ENG",
        "team1Id": 9,
        "team2Name": "AFG",
        "team2Id": 96,
        "status": "Match starts at Oct 15, 08:30 GMT",
        "city": "Delhi"
      },
      {
        "matchId": 75479,
        "match_desc": "14th Match",
        "team1Name": "AUS",
        "team1Id": 4,
        "team2Name": "Sri Lanka",
        "team2Id": 5,
        "status": "Match starts at Oct 16, 08:30 GMT",
        "city": "Lucknow"
      },
      {
        "matchId": 75486,
        "match_desc": "15th Match",
        "team1Name": "RSA",
        "team1Id": 11,
        "team2Name": "NED",
        "team2Id": 24,
        "status": "Match starts at Oct 17, 08:30 GMT",
        "city": "Dharamsala"
      },
      {
        "matchId": 75490,
        "match_desc": "16th Match",
        "team1Name": "NZ",
        "team1Id": 13,
        "team2Name": "AFG",
        "team2Id": 96,
        "status": "Match starts at Oct 18, 08:30 GMT",
        "city": "Chennai"
      },
      {
        "matchId": 75493,
        "match_desc": "17th Match",
        "team1Name": "IND",
        "team1Id": 2,
        "team2Name": "BAN",
        "team2Id": 6,
        "status": "Match starts at Oct 19, 08:30 GMT",
        "city": "Pune"
      },
      {
        "matchId": 75497,
        "match_desc": "18th Match",
        "team1Name": "AUS",
        "team1Id": 4,
        "team2Name": "PAK",
        "team2Id": 3,
        "status": "Match starts at Oct 20, 08:30 GMT",
        "city": "Bengaluru"
      },
      {
        "matchId": 75507,
        "match_desc": "19th Match",
        "team1Name": "NED",
        "team1Id": 24,
        "team2Name": "Sri Lanka",
        "team2Id": 5,
        "status": "Match starts at Oct 21, 05:00 GMT",
        "city": "Lucknow"
      },
      {
        "matchId": 75511,
        "match_desc": "21st Match",
        "team1Name": "IND",
        "team1Id": 2,
        "team2Name": "NZ",
        "team2Id": 13,
        "status": "Match starts at Oct 22, 08:30 GMT",
        "city": "Dharamsala"
      },
      {
        "matchId": 75518,
        "match_desc": "22nd Match",
        "team1Name": "PAK",
        "team1Id": 3,
        "team2Name": "AFG",
        "team2Id": 96,
        "status": "Match starts at Oct 23, 08:30 GMT",
        "city": "Chennai"
      },
      {
        "matchId": 75521,
        "match_desc": "23rd Match",
        "team1Name": "RSA",
        "team1Id": 11,
        "team2Name": "BAN",
        "team2Id": 6,
        "status": "Match starts at Oct 24, 08:30 GMT",
        "city": "Mumbai"
      },
      {
        "matchId": 75525,
        "match_desc": "24th Match",
        "team1Name": "AUS",
        "team1Id": 4,
        "team2Name": "NED",
        "team2Id": 24,
        "status": "Match starts at Oct 25, 08:30 GMT",
        "city": "Delhi"
      },
      {
        "matchId": 75539,
        "match_desc": "25th Match",
        "team1Name": "ENG",
        "team1Id": 9,
        "team2Name": "Sri Lanka",
        "team2Id": 5,
        "status": "Match starts at Oct 26, 08:30 GMT",
        "city": "Bengaluru"
      },
      {
        "matchId": 75535,
        "match_desc": "26th Match",
        "team1Name": "PAK",
        "team1Id": 3,
        "team2Name": "RSA",
        "team2Id": 11,
        "status": "Match starts at Oct 27, 08:30 GMT",
        "city": "Chennai"
      },
      {
        "matchId": 75532,
        "match_desc": "27th Match",
        "team1Name": "AUS",
        "team1Id": 4,
        "team2Name": "NZ",
        "team2Id": 13,
        "status": "Match starts at Oct 28, 05:00 GMT",
        "city": "Dharamsala"
      },
      {
        "matchId": 75542,
        "match_desc": "29th Match",
        "team1Name": "IND",
        "team1Id": 2,
        "team2Name": "ENG",
        "team2Id": 9,
        "status": "Match starts at Oct 29, 08:30 GMT",
        "city": "Lucknow"
      },
      {
        "matchId": 75549,
        "match_desc": "30th Match",
        "team1Name": "AFG",
        "team1Id": 96,
        "team2Name": "Sri Lanka",
        "team2Id": 5,
        "status": "Match starts at Oct 30, 08:30 GMT",
        "city": "Pune"
      },
      {
        "matchId": 75560,
        "match_desc": "31st Match",
        "team1Name": "PAK",
        "team1Id": 3,
        "team2Name": "BAN",
        "team2Id": 6,
        "status": "Match starts at Oct 31, 08:30 GMT",
        "city": "Kolkata"
      },
      {
        "matchId": 75567,
        "match_desc": "32nd Match",
        "team1Name": "NZ",
        "team1Id": 13,
        "team2Name": "RSA",
        "team2Id": 11,
        "status": "Match starts at Nov 01, 08:30 GMT",
        "city": "Pune"
      },
      {
        "matchId": 75563,
        "match_desc": "33rd Match",
        "team1Name": "IND",
        "team1Id": 2,
        "team2Name": "Sri Lanka",
        "team2Id": 5,
        "status": "Match starts at Nov 02, 08:30 GMT",
        "city": "Mumbai"
      },
      {
        "matchId": 75570,
        "match_desc": "34th Match",
        "team1Name": "NED",
        "team1Id": 24,
        "team2Name": "AFG",
        "team2Id": 96,
        "status": "Match starts at Nov 03, 08:30 GMT",
        "city": "Lucknow"
      },
      {
        "matchId": 75577,
        "match_desc": "35th Match",
        "team1Name": "NZ",
        "team1Id": 13,
        "team2Name": "PAK",
        "team2Id": 3,
        "status": "Match starts at Nov 04, 05:00 GMT",
        "city": "Bengaluru"
      },
      {
        "matchId": 75581,
        "match_desc": "37th Match",
        "team1Name": "IND",
        "team1Id": 2,
        "team2Name": "RSA",
        "team2Id": 11,
        "status": "Match starts at Nov 05, 08:30 GMT",
        "city": "Kolkata"
      },
      {
        "matchId": 75588,
        "match_desc": "38th Match",
        "team1Name": "BAN",
        "team1Id": 6,
        "team2Name": "Sri Lanka",
        "team2Id": 5,
        "status": "Match starts at Nov 06, 08:30 GMT",
        "city": "Delhi"
      },
      {
        "matchId": 75609,
        "match_desc": "39th Match",
        "team1Name": "AUS",
        "team1Id": 4,
        "team2Name": "AFG",
        "team2Id": 96,
        "status": "Match starts at Nov 07, 08:30 GMT",
        "city": "Mumbai"
      },
      {
        "matchId": 75595,
        "match_desc": "40th Match",
        "team1Name": "ENG",
        "team1Id": 9,
        "team2Name": "NED",
        "team2Id": 24,
        "status": "Match starts at Nov 08, 08:30 GMT",
        "city": "Pune"
      },
      {
        "matchId": 75602,
        "match_desc": "41st Match",
        "team1Name": "NZ",
        "team1Id": 13,
        "team2Name": "Sri Lanka",
        "team2Id": 5,
        "status": "Match starts at Nov 09, 08:30 GMT",
        "city": "Bengaluru"
      },
      {
        "matchId": 75616,
        "match_desc": "42nd Match",
        "team1Name": "RSA",
        "team1Id": 11,
        "team2Name": "AFG",
        "team2Id": 96,
        "status": "Match starts at Nov 10, 08:30 GMT",
        "city": "Ahmedabad"
      },
      {
        "matchId": 75633,
        "match_desc": "43rd Match",
        "team1Name": "AUS",
        "team1Id": 4,
        "team2Name": "BAN",
        "team2Id": 6,
        "status": "Match starts at Nov 11, 05:00 GMT",
        "city": "Pune"
      },
      {
        "matchId": 75623,
        "match_desc": "45th Match",
        "team1Name": "IND",
        "team1Id": 2,
        "team2Name": "NED",
        "team2Id": 24,
        "status": "Match starts at Nov 12, 08:30 GMT",
        "city": "Bengaluru"
      },
      {
        "matchId": 75640,
        "match_desc": "1st Semi-Final (1st v 4th)",
        "team1Name": "TBC",
        "team1Id": 106,
        "team2Name": "TBC",
        "team2Id": 106,
        "status": "Match starts at Nov 15, 08:30 GMT",
        "city": "Mumbai"
      },
      {
        "matchId": 75647,
        "match_desc": "2nd Semi-Final (2nd v 3rd)",
        "team1Name": "TBC",
        "team1Id": 106,
        "team2Name": "TBC",
        "team2Id": 106,
        "status": "Match starts at Nov 16, 08:30 GMT",
        "city": "Kolkata"
      },
      {
        "matchId": 75651,
        "match_desc": "Final",
        "team1Name": "TBC",
        "team1Id": 106,
        "team2Name": "TBC",
        "team2Id": 106,
        "status": "Match starts at Nov 19, 08:30 GMT",
        "city": "Ahmedabad"
      }]));

    fetch(jsonDataURL)
      .then((response) => response.json())
      .then((matches) => {
        setMatches(matches);
      })
      .catch((error) => console.error('Error loading match data:', error));
  }, []);

  return (
    <div>
      <div className={styles["match-cards-container"]}>
        <div id="match-cards">
          {matches.map((match, index) => (
            <MatchCard key={index} {...match} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
