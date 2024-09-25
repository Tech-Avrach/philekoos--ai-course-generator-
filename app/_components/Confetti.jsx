import { useWindowSize } from '@react-hook/window-size';
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

function ConfettiShow() {
  const [width, height] = useWindowSize();
  const [recycle, setRecycle] = useState(true);

  useEffect(() => {
    // Stop generating more confetti after 3 seconds
    const timer = setTimeout(() => {
      setRecycle(false);
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={300} // Show 500 pieces
      gravity={0.2}
      recycle={recycle}
    />
  );
}

export default ConfettiShow;