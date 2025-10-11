import React, { useState } from 'react'


interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey, need help with this problem?", sender: "User1", timestamp: new Date() },
    { id: 2, text: "Yeah, I'm stuck on the array part", sender: "User2", timestamp: new Date() }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: message,
      sender: "User1",
      timestamp: new Date()
    }]);
    setMessage('');
  };

  return (
    <div className="h-full flex flex-col backdrop-blur-md bg-gray-900/70 border border-gray-800 rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="shrink-0 px-4 py-3 border-b border-gray-800 bg-gray-900/50">
        <h3 className="text-lg font-bold text-cyan-400">Team Chat</h3>
      </div>

      {/* Messages Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-gray-900/30">
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`flex flex-col ${msg.sender === "User1" ? "items-end" : "items-start"}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.sender === "User1" 
                ? "bg-cyan-500/20 border border-cyan-500/30" 
                : "bg-gray-800/50 border border-gray-700"
            }`}>
              <p className="text-sm text-white">{msg.text}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {msg.sender} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="shrink-0 p-4 border-t border-gray-800 bg-gray-900/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
