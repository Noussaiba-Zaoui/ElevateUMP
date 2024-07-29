import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

const VantaFogEffect = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      highlightColor: 0x3ff,
      midtoneColor: 0x5b1988,
      lowlightColor: 0x968ec0,
      baseColor: 0x9999bb
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} style={{ width: '100vw', height: '100vh' }}>
      {/* Other content can go here */}
    </div>
  );
};

export default VantaFogEffect;
