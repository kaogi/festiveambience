"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Season } from '@/types';

interface GameItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  type: string;
  caught: boolean;
}

interface FestiveGameProps {
  season: Season;
}

const FestiveGame = ({ season = 'christmas' }: FestiveGameProps) => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [items, setItems] = useState<GameItem[]>([]);
  const [highScore, setHighScore] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  
  // Définir les éléments du jeu en fonction de la saison
  const seasonalItems = {
    christmas: ['gift', 'ornament', 'candy-cane', 'snowflake'],
    halloween: ['pumpkin', 'ghost', 'bat', 'candy'],
    easter: ['egg', 'bunny', 'carrot', 'flower'],
    thanksgiving: ['turkey', 'pie', 'corn', 'leaf'],
    standard: ['star', 'heart', 'circle', 'square'],
  };
  
  const itemTypes = seasonalItems[season];
  
  // Démarrer le jeu
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setItems([]);
    setGameActive(true);
    lastTimeRef.current = Date.now();
    requestRef.current = requestAnimationFrame(updateGame);
  };
  
  // Mettre à jour le jeu à chaque frame
  const updateGame = () => {
    const now = Date.now();
    const deltaTime = now - lastTimeRef.current;
    lastTimeRef.current = now;
    
    // Mettre à jour le temps restant
    if (timeLeft > 0) {
      setTimeLeft(prev => Math.max(0, prev - deltaTime / 1000));
    } else {
      endGame();
      return;
    }
    
    // Ajouter de nouveaux éléments aléatoirement
    if (Math.random() < 0.05 && items.length < 10) {
      const gameArea = gameAreaRef.current;
      if (gameArea) {
        const width = gameArea.clientWidth;
        const newItem: GameItem = {
          id: Date.now(),
          x: Math.random() * (width - 50),
          y: -50,
          rotation: Math.random() * 360,
          speed: 2 + Math.random() * 3,
          type: itemTypes[Math.floor(Math.random() * itemTypes.length)],
          caught: false
        };
        setItems(prev => [...prev, newItem]);
      }
    }
    
    // Déplacer les éléments existants
    setItems(prev => 
      prev
        .map(item => ({
          ...item,
          y: item.y + item.speed,
          rotation: item.rotation + 1
        }))
        .filter(item => item.y < (gameAreaRef.current?.clientHeight || 600) && !item.caught)
    );
    
    requestRef.current = requestAnimationFrame(updateGame);
  };
  
  // Terminer le jeu
  const endGame = () => {
    setGameActive(false);
    if (score > highScore) {
      setHighScore(score);
      // Dans une application réelle, on sauvegarderait le score dans une base de données
    }
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };
  
  // Attraper un élément
  const catchItem = (id: number) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, caught: true } : item
      )
    );
    setScore(prev => prev + 10);
  };
  
  // Nettoyer l'animation lorsque le composant est démonté
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  // Rendu des éléments du jeu
  const renderItems = () => {
    return items.map(item => (
      <motion.div
        key={item.id}
        className="absolute cursor-pointer"
        style={{
          left: `${item.x}px`,
          top: `${item.y}px`,
          width: '50px',
          height: '50px',
        }}
        animate={{
          rotate: item.rotation,
          scale: item.caught ? [1, 1.5, 0] : 1,
        }}
        onClick={() => catchItem(item.id)}
      >
        <div className="w-full h-full flex items-center justify-center text-3xl">
          {getItemEmoji(item.type)}
        </div>
      </motion.div>
    ));
  };
  
  // Obtenir l'emoji correspondant au type d'élément
  const getItemEmoji = (type: string) => {
    const emojiMap: Record<string, string> = {
      // Christmas
      'gift': '🎁',
      'ornament': '🎄',
      'candy-cane': '🍬',
      'snowflake': '❄️',
      // Halloween
      'pumpkin': '🎃',
      'ghost': '👻',
      'bat': '🦇',
      'candy': '🍫',
      // Easter
      'egg': '🥚',
      'bunny': '🐰',
      'carrot': '🥕',
      'flower': '🌷',
      // Thanksgiving
      'turkey': '🦃',
      'pie': '🥧',
      'corn': '🌽',
      'leaf': '🍂',
      // Standard
      'star': '⭐',
      'heart': '❤️',
      'circle': '🔵',
      'square': '🟩',
    };
    
    return emojiMap[type] || '❓';
  };
  
  return (
    <div className="w-full bg-gradient-to-b from-indigo-900 to-purple-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Festive Catch Game</h2>
      <p className="text-gray-200 mb-6">
        Catch as many festive items as you can before time runs out!
      </p>
      
      <div className="flex justify-between items-center mb-4">
        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 text-white">
          <span className="font-bold">Score:</span> {score}
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 text-white">
          <span className="font-bold">Time:</span> {Math.ceil(timeLeft)}s
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 text-white">
          <span className="font-bold">High Score:</span> {highScore}
        </div>
      </div>
      
      <div 
        ref={gameAreaRef}
        className="w-full h-[400px] bg-gray-800 bg-opacity-50 rounded-lg relative overflow-hidden"
      >
        {gameActive ? (
          renderItems()
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              {score > 0 ? `Game Over! Your score: ${score}` : 'Ready to Play?'}
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold"
              onClick={startGame}
            >
              {score > 0 ? 'Play Again' : 'Start Game'}
            </motion.button>
          </div>
        )}
      </div>
      
      <div className="mt-6 bg-purple-800 bg-opacity-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-2">How to Play</h3>
        <ul className="text-gray-200 list-disc list-inside space-y-1">
          <li>Click or tap on the falling items to catch them</li>
          <li>Each caught item gives you 10 points</li>
          <li>Try to get the highest score before time runs out</li>
          <li>Items change based on the current season</li>
        </ul>
      </div>
    </div>
  );
};

export default FestiveGame; 