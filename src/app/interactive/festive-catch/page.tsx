"use client";

import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GameItem {
  id: number;
  type: 'good' | 'bad';
  x: number;
  y: number;
  speed: number;
  rotation: number;
  image: string;
}

interface Score {
  current: number;
  best: number;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 100;
const ITEM_SIZE = 60;
const GRAVITY = 0.2;
const MAX_ITEMS = 10;
const GAME_DURATION = 60; // secondes

const GOOD_ITEMS = [
  '/assets/images/game/ornament1.png',
  '/assets/images/game/ornament2.png',
  '/assets/images/game/gift.png',
];

const BAD_ITEMS = [
  '/assets/images/game/coal.png',
  '/assets/images/game/ghost.png',
];

export default function FestiveCatchGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState<Score>({ current: 0, best: 0 });
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [playerPosition, setPlayerPosition] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [items, setItems] = useState<GameItem[]>([]);
  const [playerImage, setPlayerImage] = useState('/assets/images/game/basket.png');
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const itemGenerationInterval = useRef<NodeJS.Timeout | undefined>(undefined);
  const gameTimerInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  // Fonction pour démarrer le jeu
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore({ ...score, current: 0 });
    setTimeLeft(GAME_DURATION);
    setItems([]);
    
    // Initialiser le minuteur
    gameTimerInterval.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Créer périodiquement de nouveaux objets
    itemGenerationInterval.current = setInterval(() => {
      if (items.length < MAX_ITEMS) {
        createNewItem();
      }
    }, 1000);
    
    // Démarrer la boucle d'animation
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  // Fonction pour terminer le jeu
  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    
    // Mettre à jour le meilleur score si nécessaire
    if (score.current > score.best) {
      setScore(prev => ({ ...prev, best: prev.current }));
    }
    
    // Nettoyer les intervalles et l'animation
    if (itemGenerationInterval.current) {
      clearInterval(itemGenerationInterval.current);
    }
    
    if (gameTimerInterval.current) {
      clearInterval(gameTimerInterval.current);
    }
    
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  // Créer un nouvel objet avec des propriétés aléatoires
  const createNewItem = () => {
    const isGood = Math.random() > 0.3; // 70% de chance d'avoir un bon objet
    const randomX = Math.random() * (GAME_WIDTH - ITEM_SIZE);
    const images = isGood ? GOOD_ITEMS : BAD_ITEMS;
    const randomImageIndex = Math.floor(Math.random() * images.length);
    
    const newItem: GameItem = {
      id: Date.now() + Math.random(),
      type: isGood ? 'good' : 'bad',
      x: randomX,
      y: -ITEM_SIZE,
      speed: 2 + Math.random() * 3, // Vitesse entre 2 et 5
      rotation: Math.random() * 360,
      image: images[randomImageIndex]
    };
    
    setItems(prev => [...prev, newItem]);
  };

  // Gérer le mouvement de la souris pour déplacer le joueur
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameAreaRef.current || !gameStarted) return;
    
    const gameArea = gameAreaRef.current.getBoundingClientRect();
    const relativeX = e.clientX - gameArea.left;
    
    // Limiter la position du joueur dans les limites du jeu
    let newPosition = relativeX - PLAYER_WIDTH / 2;
    newPosition = Math.max(0, Math.min(newPosition, GAME_WIDTH - PLAYER_WIDTH));
    
    setPlayerPosition(newPosition);
  };

  // Boucle principale du jeu
  const gameLoop = (time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - (previousTimeRef.current || 0);
    previousTimeRef.current = time;
    
    // Mettre à jour les positions des objets
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => ({
        ...item,
        y: item.y + item.speed,
        rotation: item.rotation + 1
      }));
      
      // Vérifier les collisions avec le joueur
      const playerBottom = GAME_HEIGHT - PLAYER_HEIGHT;
      const playerRight = playerPosition + PLAYER_WIDTH;
      
      // Filtrer les objets qui sont encore dans le jeu
      const remainingItems = updatedItems.filter(item => {
        // Vérifier si l'objet est sorti de l'écran
        if (item.y > GAME_HEIGHT) {
          return false;
        }
        
        // Vérifier s'il y a collision avec le joueur
        const itemBottom = item.y + ITEM_SIZE;
        const itemRight = item.x + ITEM_SIZE;
        
        if (
          item.x < playerRight &&
          itemRight > playerPosition &&
          item.y < playerBottom + PLAYER_HEIGHT &&
          itemBottom > playerBottom
        ) {
          // Collision détectée! Mettre à jour le score
          if (item.type === 'good') {
            setScore(prev => ({ ...prev, current: prev.current + 10 }));
            setPlayerImage('/assets/images/game/basket-happy.png');
            setTimeout(() => setPlayerImage('/assets/images/game/basket.png'), 300);
          } else {
            setScore(prev => ({ ...prev, current: Math.max(0, prev.current - 5) }));
            setPlayerImage('/assets/images/game/basket-sad.png');
            setTimeout(() => setPlayerImage('/assets/images/game/basket.png'), 300);
          }
          return false;
        }
        
        return true;
      });
      
      return remainingItems;
    });
    
    // Continuer la boucle si le jeu est en cours
    if (gameStarted && !gameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  };

  // Nettoyer les ressources lorsque le composant est démonté
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (itemGenerationInterval.current) {
        clearInterval(itemGenerationInterval.current);
      }
      
      if (gameTimerInterval.current) {
        clearInterval(gameTimerInterval.current);
      }
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-indigo-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Jeu Festive Catch
        </motion.h1>

        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden p-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-700 mb-4">
              Attrapez les décorations et cadeaux festifs! Évitez les objets indésirables comme le charbon.
            </p>
            
            <div className="flex justify-center space-x-8 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{score.current}</div>
                <div className="text-sm text-gray-500">Points</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{score.best}</div>
                <div className="text-sm text-gray-500">Meilleur score</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{timeLeft}</div>
                <div className="text-sm text-gray-500">Secondes</div>
              </div>
            </div>
            
            {!gameStarted && !gameOver && (
              <button
                onClick={startGame}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Démarrer le jeu
              </button>
            )}
            
            {gameOver && (
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-indigo-800 mb-2">Partie terminée!</h3>
                <p className="text-lg text-gray-600 mb-4">Votre score: {score.current}</p>
                <button
                  onClick={startGame}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  Jouer à nouveau
                </button>
              </div>
            )}
          </div>
          
          <div 
            ref={gameAreaRef}
            className="relative bg-gradient-to-b from-blue-100 to-indigo-100 border-4 border-indigo-300 rounded-lg overflow-hidden cursor-none"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT, margin: '0 auto' }}
            onMouseMove={handleMouseMove}
          >
            {/* Arrière-plan festif avec des flocons de neige */}
            <div className="absolute inset-0">
              {Array.from({ length: 50 }).map((_, index) => (
                <div
                  key={index}
                  className="absolute bg-white opacity-70 rounded-full"
                  style={{
                    width: 2 + Math.random() * 6 + 'px',
                    height: 2 + Math.random() * 6 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animation: `fall ${5 + Math.random() * 10}s linear infinite`,
                    animationDelay: `-${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Items tombants */}
            {items.map((item) => (
              <div
                key={item.id}
                className="absolute"
                style={{
                  width: ITEM_SIZE,
                  height: ITEM_SIZE,
                  left: item.x,
                  top: item.y,
                  transform: `rotate(${item.rotation}deg)`,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.type === 'good' ? 'Bon objet' : 'Mauvais objet'}
                  width={ITEM_SIZE}
                  height={ITEM_SIZE}
                  className="object-contain"
                />
              </div>
            ))}
            
            {/* Panier du joueur */}
            <div
              className="absolute"
              style={{
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                left: playerPosition,
                bottom: 0,
                transition: 'left 0.1s',
              }}
            >
              <Image
                src={playerImage}
                alt="Panier du joueur"
                width={PLAYER_WIDTH}
                height={PLAYER_HEIGHT}
                className="object-contain"
              />
            </div>
            
            {/* Instructions */}
            {!gameStarted && !gameOver && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-bold text-indigo-800 mb-2">Comment jouer</h3>
                  <p className="text-gray-700 mb-4">
                    Déplacez votre souris pour contrôler le panier.<br />
                    Attrapez les décorations festives pour gagner des points.<br />
                    Évitez les objets indésirables qui réduisent votre score.
                  </p>
                  <button
                    onClick={startGame}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Commencer
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <style jsx global>{`
            @keyframes fall {
              0% {
                transform: translateY(-20px) rotate(0deg);
              }
              100% {
                transform: translateY(${GAME_HEIGHT + 20}px) rotate(360deg);
              }
            }
          `}</style>
        </motion.div>
      </div>
    </Layout>
  );
} 