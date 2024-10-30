// components/StarRating.tsx
import React, { useState } from 'react';
import Star from './star';


interface StarRatingProps {
  maxRating?: number;
  color?: string;
  size?: number;
  rating: number;
  onRate?: (rating: number) => void; // Add onRate prop
}

const StarRating: React.FC<StarRatingProps> = ({ maxRating = 5, color = '#fcc419', size = 24 , onRate,rating=0 }) => {
  // const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  // const handleRating = (rating: number) => {
  //   setRating(rating);
  // };
  const handleRating = (rating: number) => {
    if (onRate) {
      onRate(rating); // Call onRate prop if it's provided
    }
  };
  // const handleRating = (rating: number) => {
  //   setRating(rating);
  //   if (onRate) {
  //     onRate(rating); // Call the onRate callback when the rating is set
  //   }
  // };

  return (
    <div className="flex items-center gap-4">
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
           
          />
        ))}
      </div>
      <p className="m-0" style={{ lineHeight: '1', color, fontSize: `${size / 1.5}px` }}>
        {tempRating || rating || ""}
      </p>
    </div>
  );
};

export default StarRating;
