import React, { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

type Player = {
  id: string;
  username: string;
  symbol: 'X' | 'O';
};

type GameState = {
  board: (string | null)[][];
  currentPlayer: string | null;
  players: Player[];
  winner: string | null;
  isDraw: boolean;
  winningLine?: number[][];
};

const TicTacToe: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    board: Array(3).fill(null).map(() => Array(3).fill(null)),
    currentPlayer: null,
    players: [],
    winner: null,
    isDraw: false,
  });
  const [status, setStatus] = useState('Connecting to server...');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      withCredentials: true,
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      setStatus('Connected! Click "Find Match" to start playing.');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setStatus('Disconnected from server. Trying to reconnect...');
      setIsConnected(false);
    });

    newSocket.on('waitingForOpponent', () => {
      setStatus('Waiting for an opponent...');
    });

    newSocket.on('gameStart', (data: {
      roomId: string;
      players: Player[];
      currentPlayer: string;
      board: (string | null)[][];
    }) => {
      setGameState({
        board: data.board,
        currentPlayer: data.currentPlayer,
        players: data.players,
        winner: null,
        isDraw: false,
      });
      
      const currentPlayer = data.players.find(p => p.id === newSocket.id);
      const opponent = data.players.find(p => p.id !== newSocket.id);
      
      if (currentPlayer?.id === data.currentPlayer) {
        setStatus(`Your turn (${currentPlayer.symbol})`);
      } else if (opponent) {
        setStatus(`Waiting for ${opponent.username}'s move (${opponent.symbol})`);
      }
    });

    newSocket.on('moveMade', (data: {
      row: number;
      col: number;
      symbol: string;
      currentPlayer: string;
      board: (string | null)[][];
    }) => {
      setGameState(prev => {
        const currentPlayer = prev.players.find(p => p.id === newSocket.id);
        const opponent = prev.players.find(p => p.id !== newSocket.id);
        
        let newStatus = prev.status;
        if (data.currentPlayer === newSocket.id) {
          newStatus = `Your turn (${currentPlayer?.symbol})`;
        } else if (opponent) {
          newStatus = `Waiting for ${opponent.username}'s move (${opponent.symbol})`;
        }
        
        return {
          ...prev,
          board: data.board,
          currentPlayer: data.currentPlayer,
        };
      });
    });

    newSocket.on('gameOver', (data: {
      winner: string | null;
      board: (string | null)[][];
      winningLine?: number[][];
      isDraw?: boolean;
    }) => {
      setGameState(prev => ({
        ...prev,
        board: data.board,
        winner: data.winner,
        isDraw: data.isDraw || false,
        winningLine: data.winningLine,
      }));

      if (data.isDraw) {
        setStatus('Game over! It\'s a draw!');
      } else if (data.winner === newSocket.id) {
        setStatus('You won! 🎉');
      } else {
        setStatus('You lost! Better luck next time!');
      }
    });

    newSocket.on('playerLeft', (data: { playerId: string }) => {
      setStatus('Your opponent has left the game.');
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleFindMatch = useCallback(() => {
    if (!socket) return;
    socket.emit('findMatch');
  }, [socket]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (!socket || 
        gameState.winner !== null || 
        gameState.isDraw || 
        gameState.currentPlayer !== socket.id) {
      return;
    }
    
    socket.emit('makeMove', { row, col });
  }, [socket, gameState.currentPlayer, gameState.winner, gameState.isDraw]);

  const isWinningCell = useCallback((row: number, col: number) => {
    if (!gameState.winningLine) return false;
    return gameState.winningLine.some(([r, c]) => r === row && c === col);
  }, [gameState.winningLine]);

  const renderCell = (row: number, col: number) => {
    const cellValue = gameState.board[row][col];
    const isWinning = isWinningCell(row, col);
    
    return (
      <button
        key={`${row}-${col}`}
        className={`w-16 h-16 border border-gray-400 flex items-center justify-center text-2xl font-bold ${
          isWinning ? 'bg-green-200' : 'hover:bg-gray-100'
        }`}
        onClick={() => handleCellClick(row, col)}
        disabled={!!cellValue || gameState.currentPlayer !== socket?.id}
      >
        {cellValue}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Tic Tac Toe</h1>
        
        <div className="mb-6">
          <div className="text-center text-lg font-medium text-gray-700 mb-2">
            {status}
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-6">
            {Array(3).fill(null).map((_, row) => (
              <React.Fragment key={row}>
                {Array(3).fill(null).map((_, col) => renderCell(row, col))}
              </React.Fragment>
            ))}
          </div>
          
          {!gameState.players.length && (
            <button
              onClick={handleFindMatch}
              disabled={!isConnected}
              className={`w-full py-2 px-4 rounded-md font-medium text-white ${
                isConnected 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isConnected ? 'Find Match' : 'Connecting...'}
            </button>
          )}
          
          {(gameState.winner !== null || gameState.isDraw) && (
            <button
              onClick={handleFindMatch}
              className="w-full mt-4 py-2 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
            >
              Play Again
            </button>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Players</h2>
          <div className="space-y-2">
            {gameState.players.length > 0 ? (
              gameState.players.map((player) => (
                <div 
                  key={player.id} 
                  className={`flex items-center p-2 rounded ${
                    player.id === socket?.id ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="font-medium">
                    {player.username} ({player.symbol}) 
                    {player.id === socket?.id && '(You)'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No players in game</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
