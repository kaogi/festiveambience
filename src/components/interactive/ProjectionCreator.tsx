"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ProjectionAsset } from '@/types';

// Éléments disponibles pour la création de projections
const availableAssets: ProjectionAsset[] = [
  // Éléments de Noël
  { id: 'christmas-tree', name: 'Christmas Tree', src: '/assets/images/projections/elements/christmas-tree.png', category: 'christmas' },
  { id: 'santa', name: 'Santa Claus', src: '/assets/images/projections/elements/santa.png', category: 'christmas' },
  { id: 'snowman', name: 'Snowman', src: '/assets/images/projections/elements/snowman.png', category: 'christmas' },
  { id: 'reindeer', name: 'Reindeer', src: '/assets/images/projections/elements/reindeer.png', category: 'christmas' },
  
  // Éléments d'Halloween
  { id: 'ghost', name: 'Ghost', src: '/assets/images/projections/elements/ghost.png', category: 'halloween' },
  { id: 'pumpkin', name: 'Pumpkin', src: '/assets/images/projections/elements/pumpkin.png', category: 'halloween' },
  { id: 'witch', name: 'Witch', src: '/assets/images/projections/elements/witch.png', category: 'halloween' },
  { id: 'bat', name: 'Bat', src: '/assets/images/projections/elements/bat.png', category: 'halloween' },
  
  // Éléments de Pâques
  { id: 'bunny', name: 'Easter Bunny', src: '/assets/images/projections/elements/bunny.png', category: 'easter' },
  { id: 'egg', name: 'Easter Egg', src: '/assets/images/projections/elements/egg.png', category: 'easter' },
  { id: 'chick', name: 'Chick', src: '/assets/images/projections/elements/chick.png', category: 'easter' },
  { id: 'basket', name: 'Easter Basket', src: '/assets/images/projections/elements/basket.png', category: 'easter' },
];

// Interface pour les éléments placés sur le canevas
interface PlacedAsset {
  id: string;
  assetId: string;
  src: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

const ProjectionCreator = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('christmas');
  const [placedAssets, setPlacedAssets] = useState<PlacedAsset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Filtrer les éléments par catégorie
  const filteredAssets = availableAssets.filter(asset => asset.category === selectedCategory);
  
  // Ajouter un élément au canevas
  const addAssetToCanvas = (asset: ProjectionAsset) => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (canvasRect) {
      const newAsset: PlacedAsset = {
        id: `placed-${asset.id}-${Date.now()}`,
        assetId: asset.id,
        src: asset.src,
        x: canvasRect.width / 2 - 50,
        y: canvasRect.height / 2 - 50,
        scale: 1,
        rotation: 0
      };
      setPlacedAssets([...placedAssets, newAsset]);
      setSelectedAsset(newAsset.id);
    }
  };
  
  // Gérer le déplacement d'un élément
  const handleDrag = (id: string, x: number, y: number) => {
    setPlacedAssets(
      placedAssets.map(asset => 
        asset.id === id ? { ...asset, x, y } : asset
      )
    );
  };
  
  // Supprimer un élément
  const deleteAsset = (id: string) => {
    setPlacedAssets(placedAssets.filter(asset => asset.id !== id));
    if (selectedAsset === id) {
      setSelectedAsset(null);
    }
  };
  
  // Modifier l'échelle d'un élément
  const changeScale = (id: string, scaleDelta: number) => {
    setPlacedAssets(
      placedAssets.map(asset => 
        asset.id === id 
          ? { ...asset, scale: Math.max(0.2, Math.min(3, asset.scale + scaleDelta)) } 
          : asset
      )
    );
  };
  
  // Modifier la rotation d'un élément
  const changeRotation = (id: string, rotationDelta: number) => {
    setPlacedAssets(
      placedAssets.map(asset => 
        asset.id === id 
          ? { ...asset, rotation: asset.rotation + rotationDelta } 
          : asset
      )
    );
  };
  
  // Effacer le canevas
  const clearCanvas = () => {
    setPlacedAssets([]);
    setSelectedAsset(null);
  };
  
  // Télécharger la projection (dans une application réelle, cela générerait une image)
  const downloadProjection = () => {
    alert('Dans une application réelle, cette fonction générerait une image de votre projection que vous pourriez télécharger.');
  };
  
  return (
    <div className="w-full bg-gradient-to-b from-purple-900 to-indigo-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Projection Creator</h2>
      <p className="text-gray-200 mb-6">
        Create your own custom window projection by adding and arranging elements.
      </p>
      
      {/* Sélecteur de catégorie */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Select Category</h3>
        <div className="flex flex-wrap gap-2">
          {['christmas', 'halloween', 'easter'].map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg capitalize ${
                selectedCategory === category 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Éléments disponibles */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Available Elements</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
          {filteredAssets.map(asset => (
            <motion.div
              key={asset.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg p-2 cursor-pointer text-center"
              onClick={() => addAssetToCanvas(asset)}
            >
              <div className="h-16 flex items-center justify-center">
                <img 
                  src={asset.src} 
                  alt={asset.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-800 truncate">{asset.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Canevas de création */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Canvas</h3>
        <div 
          ref={canvasRef}
          className="w-full h-[400px] bg-black rounded-lg relative overflow-hidden"
        >
          {placedAssets.map(asset => (
            <motion.div
              key={asset.id}
              className={`absolute cursor-move ${selectedAsset === asset.id ? 'ring-2 ring-purple-500' : ''}`}
              style={{
                width: '100px',
                height: '100px',
                x: asset.x,
                y: asset.y,
                scale: asset.scale,
                rotate: asset.rotation,
              }}
              drag
              dragMomentum={false}
              onDragStart={() => {
                setIsDragging(true);
                setSelectedAsset(asset.id);
              }}
              onDrag={(_, info) => {
                handleDrag(asset.id, asset.x + info.delta.x, asset.y + info.delta.y);
              }}
              onDragEnd={() => setIsDragging(false)}
              onClick={() => !isDragging && setSelectedAsset(asset.id)}
            >
              <img 
                src={asset.src} 
                alt={`Placed ${asset.assetId}`} 
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Contrôles pour l'élément sélectionné */}
      {selectedAsset && (
        <div className="mb-6 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Element Controls</h3>
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-white mb-1">Scale</p>
              <div className="flex items-center">
                <button 
                  className="bg-gray-200 text-gray-800 w-8 h-8 rounded-l-lg flex items-center justify-center"
                  onClick={() => changeScale(selectedAsset, -0.1)}
                >
                  -
                </button>
                <button 
                  className="bg-gray-200 text-gray-800 w-8 h-8 rounded-r-lg flex items-center justify-center"
                  onClick={() => changeScale(selectedAsset, 0.1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-white mb-1">Rotation</p>
              <div className="flex items-center">
                <button 
                  className="bg-gray-200 text-gray-800 w-8 h-8 rounded-l-lg flex items-center justify-center"
                  onClick={() => changeRotation(selectedAsset, -15)}
                >
                  ↺
                </button>
                <button 
                  className="bg-gray-200 text-gray-800 w-8 h-8 rounded-r-lg flex items-center justify-center"
                  onClick={() => changeRotation(selectedAsset, 15)}
                >
                  ↻
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-white mb-1">Actions</p>
              <button 
                className="bg-red-500 text-white px-4 py-1 rounded-lg"
                onClick={() => deleteAsset(selectedAsset)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Actions globales */}
      <div className="flex flex-wrap gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          onClick={clearCanvas}
        >
          Clear Canvas
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          onClick={downloadProjection}
          disabled={placedAssets.length === 0}
        >
          Download Projection
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectionCreator; 