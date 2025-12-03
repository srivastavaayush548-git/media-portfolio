import React from 'react';

const DotMatrix = () => {
  return (
    <>
      {/* Pixel Grid - Static, no transitions */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.35) 0px,
              transparent 1px,
              transparent 2px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.35) 0px,
              transparent 1px,
              transparent 2px
            )
          `,
          backgroundSize: '3px 3px',
          imageRendering: 'pixelated'
        }}
      />

      {/* Crosshatch - Static, no transitions */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.12) 0px,
              transparent 1px,
              transparent 2px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(0, 0, 0, 0.12) 0px,
              transparent 1px,
              transparent 2px
            )
          `,
          backgroundSize: '4px 4px',
          imageRendering: 'pixelated'
        }}
      />

      {/* Dot Matrix - Static, no transitions */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.2) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '3px 3px',
          imageRendering: 'pixelated'
        }}
      />
    </>
  );
};

export default DotMatrix;

