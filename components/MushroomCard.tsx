import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MushroomVariety } from '../types';
import { EASE_ORGANIC, OYSTER_MUSHROOM_IMAGES, BUTTON_MUSHROOM_IMAGES, MILKY_MUSHROOM_IMAGES } from '../constants';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface MushroomCardProps {
  mushroom: MushroomVariety;
}

export const MushroomCard: React.FC<MushroomCardProps> = ({ mushroom }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get the image gallery for the current mushroom
  const getImageGallery = () => {
    switch (mushroom.id) {
      case '1':
        return OYSTER_MUSHROOM_IMAGES;
      case '2':
        return BUTTON_MUSHROOM_IMAGES;
      case '3':
        return MILKY_MUSHROOM_IMAGES;
      default:
        return [mushroom.imageUrl];
    }
  };

  const imageGallery = getImageGallery();
  const currentImage = imageGallery[currentImageIndex];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageGallery.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageGallery.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <motion.div
      className="group relative bg-white rounded-2xl overflow-hidden cursor-none-if-custom-cursor"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: { y: 0, boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" },
        hover: { 
          y: -8, 
          boxShadow: "0px 20px 40px rgba(33, 83, 59, 0.15)",
          transition: { duration: 0.4, ease: EASE_ORGANIC }
        },
        tap: { scale: 0.98, y: 0 }
      }}
    >
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-earth-100">
        <motion.img
          key={currentImage}
          src={currentImage}
          alt={mushroom.name}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.06, transition: { duration: 0.6, ease: EASE_ORGANIC } },
            tap: { scale: 1.02 }
          }}
        />
        
        {/* Overlay Gradient on Hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-moss-900/60 to-transparent opacity-0"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1, transition: { duration: 0.4 } }
          }}
        />

        {/* Tag - Top Left */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {mushroom.isBestSeller && (
            <span className="px-3 py-1 bg-moss-500 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Image Navigation - Only show if gallery has multiple images */}
        {imageGallery.length > 1 && (
          <>
            {/* Previous Button */}
            <motion.button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-earth-900 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-earth-900 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={20} />
            </motion.button>

            {/* Image Counter - Bottom Right */}
            <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium">
              {currentImageIndex + 1}/{imageGallery.length}
            </div>

            {/* Dot Indicators - Bottom Center */}
            <motion.div 
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 }
              }}
            >
              {imageGallery.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={(e) => handleDotClick(e, index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Border Glow Effect */}
        <motion.div 
          className="absolute inset-0 border-2 border-moss-200 rounded-2xl pointer-events-none"
          variants={{
            rest: { opacity: 0, scale: 0.95 },
            hover: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
          }}
        />

        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-2xl font-serif text-earth-900 group-hover:text-moss-700 transition-colors duration-300">
              {mushroom.name}
            </h3>
            <p className="text-xs text-earth-500 italic font-serif">{mushroom.scientificName}</p>
          </div>
          <span className="text-lg font-medium text-moss-700 bg-moss-50 px-3 py-1 rounded-lg">
            {mushroom.price}
          </span>
        </div>

        <p className="text-earth-600 text-sm leading-relaxed mb-6 border-b border-earth-100 pb-4">
          {mushroom.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {mushroom.tags.map(tag => (
              <span key={tag} className="text-xs text-earth-500 bg-earth-100 px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Action Icon */}
          <motion.button 
            className="w-8 h-8 rounded-full bg-moss-100 text-moss-700 flex items-center justify-center"
            variants={{
              rest: { backgroundColor: "#e1f7e7", color: "#246846" },
              hover: { backgroundColor: "#246846", color: "#ffffff" }
            }}
          >
            <Plus size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
