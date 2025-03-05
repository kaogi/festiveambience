"use client";

import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Composant pour le modèle de fenêtre
const WindowModel = ({ projectionTexture }: { projectionTexture: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Utilisez une texture de couleur unie comme fallback si l'image n'est pas trouvée
  const texture = new THREE.Color('#f1c40f');
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Structure de la maison */}
      <mesh position={[0, 0, -0.5]} receiveShadow>
        <boxGeometry args={[5, 3.5, 4]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Fenêtre */}
      <mesh position={[0, 0, 1.51]} castShadow>
        <boxGeometry args={[2.5, 2, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Projection sur la fenêtre */}
      <mesh ref={meshRef} position={[0, 0, 1.56]}>
        <planeGeometry args={[2.3, 1.8]} />
        <meshBasicMaterial color="#f1c40f" emissive="#f1c40f" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Source de lumière à l'intérieur */}
      <pointLight position={[0, 0, 0]} intensity={1} color="#FFA500" />
      
      {/* Source de lumière ambiante */}
      <ambientLight intensity={0.2} />
    </group>
  );
};

const WindowVisualizer = () => {
  const [currentProjection, setCurrentProjection] = useState('/assets/images/placeholder-projection.jpg');
  
  const projectionOptions = [
    { id: 'christmas', src: '/assets/images/placeholder-projection.jpg', name: 'Christmas Tree' },
    { id: 'halloween', src: '/assets/images/placeholder-projection.jpg', name: 'Halloween Ghost' },
    { id: 'easter', src: '/assets/images/placeholder-projection.jpg', name: 'Easter Bunny' },
  ];

  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div className="h-[400px] bg-gray-800">
        <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }}>
          <WindowModel projectionTexture={currentProjection} />
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
      
      <div className="bg-white p-6">
        <h3 className="text-xl font-bold mb-4">3D Window Projection Visualizer</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {projectionOptions.map((option) => (
            <button
              key={option.id}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentProjection === option.src
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
              onClick={() => setCurrentProjection(option.src)}
            >
              {option.name}
            </button>
          ))}
        </div>
        
        <p className="text-gray-600 mb-4">
          Visualize how projections would look on your windows. Rotate the view to see from different angles.
        </p>
        
        <ul className="list-disc pl-6 text-gray-600">
          <li>Test different projections</li>
          <li>View from various angles</li>
          <li>See how the projection would look on your window</li>
        </ul>
      </div>
    </div>
  );
};

export default WindowVisualizer; 