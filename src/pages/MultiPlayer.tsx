import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { db } from '../../firebaseConfig';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';

interface activeRoom {
  name: string;
  numberOfPeople: number;
  public: boolean;
  roomId: number
}

const MultiPlayer: React.FC = () => {
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [code, setCode] = useState();
  const [activeRooms, setActiveRooms] = useState<activeRoom[]>([]);

  const navigate = useNavigate();

  // const activeRooms = [
  //   {
  //     roomId: 100000,
  //     roomName: "MyRoom",
  //     numberOfPeople: 2
  //   },
  //   {
  //     roomId: 200000,
  //     roomName: "NotMyRoom",
  //     numberOfPeople: 5
  //   }
  // ]

  const { user, loading } = useUser()
    
  useEffect(() => {
    if(!user && !loading) navigate("/login");
  })

  useEffect(() => {
    fetchRooms();
  })

  const fetchRooms = async () => {
    const collectionRef = collection(db, "rooms");
    const querySnapshot = await getDocs(collectionRef);

    const rooms: activeRoom[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as activeRoom),
    }));

    setActiveRooms(rooms)
  }

  const handleCreateRoom = () => {
    const roomId = Math.floor(Math.random() * 100000) + 100000;
    populateFirebase(roomId)
    navigate(`/room/${roomId}`);
  }

  const populateFirebase = async (roomId: number) => {
    const docRef = doc(db, "rooms", roomId.toString())

    await setDoc(docRef, {
      name: "New Room", 
      roomId: roomId,
      numberOfPeople: 0,
      public: true
    })

  }

  const handleJoin = () => {
    navigate(`/room/${code}`);
  }

  const handleChange = (e : any) => {
    setCode(e.target.value);
  }

  return (
    <div className='bg-gray-900 flex justify-center items-center h-dvh w-dvw ' >
    <div className="z-10 flex flex-col items-center p-8 max-w-2xl w-full
      bg-black/30 backdrop-blur-md 
      border border-cyan-400/20 rounded-xl
      shadow-2xl shadow-cyan-500/10">
      
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="text-5xl font-bold text-cyan-300" style={{ textShadow: `0 0 8px #0ff` }}>Multiplayer</h2>
        <Link to="/">
        <button className="text-purple-300 hover:text-white transition-colors duration-300 text-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Menu
        </button>
        </Link>
      </div>

      {/* Main Options */}
      <div className="w-full flex flex-col gap-6">
        <button 
          onClick={handleCreateRoom}
          className="w-full font-bold text-gray-900 bg-cyan-300 border-2 border-cyan-300 rounded-lg py-4 text-2xl
          transition-all duration-300 transform hover:scale-105
          hover:bg-transparent hover:text-cyan-300
          hover:shadow-[0_0_20px_rgba(56,189,248,0.7)]"
        >
          Create Room
        </button>

        {!showJoinInput && (
          <button 
            onClick={() => setShowJoinInput(true)}
            className="w-full font-bold text-cyan-300 bg-transparent border-2 border-cyan-400/50 rounded-lg py-4 text-2xl
            transition-all duration-300 transform hover:scale-105
            hover:bg-cyan-300 hover:text-gray-900
            hover:shadow-[0_0_20px_rgba(56,189,248,0.7)]"
          >
            Join Room
          </button>
        )}

        {/* Conditional Input for Joining a Room */}
        {showJoinInput && (
          <div className="w-full flex flex-col gap-4 p-4 border border-gray-700/50 rounded-lg bg-gray-900/30">

            <h3 className="text-xl text-cyan-300 font-semibold text-center">Join an Active Room</h3>
            <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2">
              { activeRooms.map((room) => (
                <div 
                  key={room.roomId}
                  // onClick={() => handleJoinFromList(room.roomId)}
                  className='flex justify-between items-center bg-gray-800/60 border border-cyan-400/20 rounded-lg p-3 transition-all duration-300 hover:bg-cyan-900/40 hover:border-cyan-400/60 cursor-pointer'
                >
                  <div>
                    <p className='text-lg text-cyan-200 font-bold tracking-wider'>{ room.name }</p>
                    <p className='text-sm text-cyan-500' >{ room.numberOfPeople }/8 Players</p>
                  </div>
                  <div className='bg-cyan-400/80 text-gray-900 font-bold py-1 px-4 text-sm rounded-md'>
                    Join
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-600/50"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-600/50"></div>
            </div>

            <input 
              type="text" 
              value={code}
              onChange={handleChange}
              className="w-full bg-gray-900/50 border-2 border-gray-700/50 rounded-lg px-4 py-3 text-white text-center text-xl tracking-[.2em]
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300"
              placeholder="ENTER ROOM CODE"
            />
            <button 
              onClick={handleJoin}
              className="w-full font-bold text-gray-900 bg-purple-400 border-2 border-purple-400 rounded-lg py-3 text-xl
              transition-all duration-300 
              hover:bg-transparent hover:text-purple-300
              hover:shadow-[0_0_20px_rgba(192,132,252,0.5)]"
            >
              Join Now
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MultiPlayer;