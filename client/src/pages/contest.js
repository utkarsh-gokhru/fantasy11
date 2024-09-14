import React from 'react';
import ContestCard from '../components/ContestCard';

const contests = [
  {
    id: 1,
    name: 'Contest 1',
    entryFee: 50,
    prizePool: 1000,
    participants: 50,
    startTime: '2023-11-01T14:00:00Z',
  },
  {
    id: 2,
    name: 'Contest 2',
    entryFee: 100,
    prizePool: 1000,
    participants: 50,
    startTime: '2023-11-02T15:30:00Z',
  },
  {
    id: 3,
    name: 'Contest 3',
    entryFee: 200,
    prizePool: 20000,
    participants: 50,
    startTime: '2023-11-02T15:30:00Z',
  },
  {
    id: 4,
    name: 'Contest 4',
    entryFee: 500,
    prizePool: 50000,
    participants: 50,
    startTime: '2023-11-02T15:30:00Z',
  },
  {
    id: 5,
    name: 'Contest 5',
    entryFee: 'Free',
    prizePool: 0,
    participants: 50,
    startTime: '2023-11-02T15:30:00Z',
  },
];

function ContestPage() {
  return (
    <div>
      <h1>Contests</h1>
      <div className="mt-20 ml-8 md:ml-12 border-rounded ">
        {contests.map((contest) => (
          <ContestCard key={contest.id} contest={contest} contestId={contest.id}
          contestFee ={contest.entryFee} />
        ))}
      </div>
    </div>
  );
}

export default ContestPage;
