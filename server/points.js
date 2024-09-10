import https from 'https';

export function calculateBatterPoints(batter) {
  const runsPoints = batter.runs - batter.fours * 4 - batter.sixes * 6;
  const foursPoints = batter.fours * 8;
  const sixesPoints = batter.sixes * 12;
  return runsPoints + foursPoints + sixesPoints;
}

export function calculateBowlerPoints(bowler) {
  const wicketsPoints = bowler.wickets * 30;
  const economyPoints = bowler.economy <= 6.0 ? 20 : -10;
  const runPoints = bowler.runs <= 60 ? 10 : -10;
  const maidenPoints = bowler.maidens * 5;
  return wicketsPoints + economyPoints + maidenPoints + runPoints;
}

export function get_sc(id) {
  const options = {
    method: 'GET',
    hostname: 'cricbuzz-cricket.p.rapidapi.com',
    port: null,
    path: `/mcenter/v1/${id}/scard`,
    headers: {
      'X-RapidAPI-Key': '13bf0cbe32msh10c2779977192edp1d1480jsn5d48a77a8b67',
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, function (res) {
      const chunks = [];

      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        const body = Buffer.concat(chunks);
        const jsonData = JSON.parse(body.toString());

        const batsmen_1_data = jsonData.scoreCard[0].batTeamDetails.batsmenData;
        const batsmen_2_data = jsonData.scoreCard[1].batTeamDetails.batsmenData;

        const bowlers_1_data = jsonData.scoreCard[0].bowlTeamDetails.bowlersData;
        const bowlers_2_data = jsonData.scoreCard[1].bowlTeamDetails.bowlersData;

        const batters_1 = Object.values(batsmen_1_data).map(batter => ({
          id: batter.batId,
          name: batter.batName,
          runs: batter.runs,
          fours: batter.fours,
          sixes: batter.sixes,
        }));

        const batters_2 = Object.values(batsmen_2_data).map(batter => ({
          id: batter.batId,
          name: batter.batName,
          runs: batter.runs,
          fours: batter.fours,
          sixes: batter.sixes,
        }));

        const bowlers_1 = Object.values(bowlers_1_data).map(bowler => ({
          id: bowler.bowlerId,
          name: bowler.bowlName,
          runs: bowler.runs,
          maidens: bowler.maidens,
          wickets: bowler.wickets,
          economy: bowler.economy,
        }));

        const bowlers_2 = Object.values(bowlers_2_data).map(bowler => ({
          id: bowler.bowlerId,
          name: bowler.bowlName,
          runs: bowler.runs,
          maidens: bowler.maidens,
          wickets: bowler.wickets,
          economy: bowler.economy,
        }));

        const batters = [...batters_1, ...batters_2];
        const bowlers = [...bowlers_1, ...bowlers_2];

        const playersWithPoints = {};

        batters.forEach(batter => {
          if (!playersWithPoints[batter.name]) {
            playersWithPoints[batter.name] = {
              name: batter.name,
              points: calculateBatterPoints(batter),
            };
          } else {
            playersWithPoints[batter.name].points += calculateBatterPoints(batter);
          }
        });

        bowlers.forEach(bowler => {
          if (!playersWithPoints[bowler.name]) {
            playersWithPoints[bowler.name] = {
              name: bowler.name,
              points: calculateBowlerPoints(bowler),
            };
          } else {
            playersWithPoints[bowler.name].points += calculateBowlerPoints(bowler);
          }
        });

        const finalPlayersWithPoints = Object.values(playersWithPoints);

        finalPlayersWithPoints.sort((a, b) => b.points - a.points);

        resolve(finalPlayersWithPoints);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}
