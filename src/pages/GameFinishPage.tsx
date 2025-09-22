import React, { useEffect, useState } from 'react';

// --- Mock Data for a Finished Game ---
// In a real application, this data would come from your backend after the match ends.
const gameResult = {
  winningTeam: 'Team A',
  currentUserTeam: 'Team A', // To determine if the player won or lost
  teamA: {
    name: 'Team A',
    score: 250,
    players: [
      { id: 'challenger-a1b2c3d4', problemsSolved: 2, points: 150 },
      { id: 'challenger-e5f6g7h8', problemsSolved: 1, points: 100 },
    ],
    solvedProblems: ['Two Sum', 'Container With Most Water'],
  },
  teamB: {
    name: 'Team B',
    score: 100,
    players: [
      { id: 'challenger-i9j0k1l2', problemsSolved: 1, points: 100 },
      { id: 'challenger-m3n4o5p6', problemsSolved: 0, points: 0 },
    ],
    solvedProblems: ['Valid Palindrome'],
  },
  allProblems: ['Two Sum', 'Valid Palindrome', 'Merge Sorted Array', 'Container With Most Water'],
};
// --- End of Mock Data ---
export interface gameRes {
    winningTeam: string;
    teamA: {
        name: string;
        score: number;
        players: {
            id: string;
            problemsSolved: number;
            points: number;
        }[]
        solvedProblems: string[];
    };
    teamB: {
        name: string;
        score: number;
        players: {
            id: string;
            problemsSolved: number;
            points: number;
        }[]
        solvedProblems: string[];
    };
    allProblems: string[];
}

// --- Sub-components for better structure ---

const ResultBanner: React.FC<{ didWin: boolean }> = ({ didWin }) => {
  if (didWin) {
    return (
      <h1 className="text-6xl font-bold text-green-400 mb-2" style={{ textShadow: '0 0 15px #2f0, 0 0 20px #2f0' }}>
        VICTORY
      </h1>
    );
  }
  return (
    <h1 className="text-6xl font-bold text-red-500 mb-2" style={{ textShadow: '0 0 15px #f22, 0 0 20px #f22' }}>
      DEFEAT
    </h1>
  );
};

const TeamCard: React.FC<{ teamData: typeof gameResult.teamA, allProblems: string[] }> = ({ teamData, allProblems }) => {
  const teamColor = teamData.name === 'Team A' ? 'cyan' : 'purple';

  return (
    <div className="bg-gray-900/40 border border-gray-700/50 rounded-lg p-4">
      <h3 className={`text-2xl font-bold text-${teamColor}-400 mb-3 text-center`}>{teamData.name}</h3>
      <div className="mb-4 text-center">
        <p className="text-4xl font-bold text-white">{teamData.score}</p>
        <p className="text-gray-400">Total Points</p>
      </div>
      
      {/* Player Stats */}
      <div className="mb-4">
        {teamData.players.map(player => (
          <div key={player.id} className="flex justify-between items-center bg-gray-800/50 p-2 rounded mb-2">
            <span className="text-sm truncate text-gray-300 w-2/5">{player.id}</span>
            <div className="text-right">
              <p className="font-bold text-white">{player.points} pts</p>
              <p className="text-xs text-gray-400">{player.problemsSolved} solved</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Solved Problems */}
      <div>
        <h4 className="text-lg font-semibold text-gray-300 mb-2 text-center border-t border-gray-700 pt-3">Problems Solved</h4>
        <ul className="space-y-1">
          {allProblems.map(problem => {
            const solved = teamData.solvedProblems.includes(problem);
            return (
              <li key={problem} className={`flex items-center gap-2 ${solved ? 'text-green-400' : 'text-gray-600'}`}>
                {solved ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                }
                <span>{problem}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};


// --- Main GameFinish Component ---

const GameFinishPage: React.FC = () => {
  const didUserWin = gameResult.winningTeam === gameResult.currentUserTeam;
  const [gameData, setGameData] = useState<gameRes | null>(null);

  useEffect(() => {
    const fillData = async () => {
        
    }
  },[])


  return (
    <div className='flex justify-center items-center bg-gray-900' >
    <div className="z-10 flex flex-col p-8 max-w-5xl w-full
      bg-black/30 backdrop-blur-md 
      border border-cyan-400/20 rounded-xl
      shadow-2xl shadow-cyan-500/10">
      
      {/* Header */}
      <div className="text-center mb-6">
        <ResultBanner didWin={didUserWin} />
        <p className="text-lg text-gray-300">The match has concluded.</p>
      </div>

      {/* Main Results Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <TeamCard teamData={gameResult.teamA} allProblems={gameResult.allProblems} />
        <TeamCard teamData={gameResult.teamB} allProblems={gameResult.allProblems} />
      </div>

      {/* Footer Navigation */}
      <button 
        // onClick={() => onNavigate('mainmenu')}
        className="w-full max-w-sm mx-auto font-bold text-gray-900 bg-cyan-300 border-2 border-cyan-300 rounded-lg py-3 text-xl
        transition-all duration-300 transform hover:scale-105
        hover:bg-transparent hover:text-cyan-300
        hover:shadow-[0_0_20px_rgba(56,189,248,0.7)]"
      >
        Return to Main Menu
      </button>
      
    </div>
    </div>
  );
};

export default GameFinishPage;