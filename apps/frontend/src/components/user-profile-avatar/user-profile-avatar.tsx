import { useState, useEffect } from "react";

interface AvatarProps {
  colorScheme: string[];
  delay: number;
}

const UserProfileAvatar: React.FC<AvatarProps> = ({ colorScheme, delay }) => (
  <div
    className="w-4 h-8 relative"
    style={{
      animation: `moveRight 10s ${delay}s linear forwards`,
      position: "absolute",
      left: `0vw`,
    }}
  >
    <div
      className="w-6 h-6 rounded-full absolute top-0 left-1/4 bg-[#FFD700] shadow-lg"
      style={{
        border: `3px solid ${colorScheme[0]}`,
        imageRendering: "pixelated",
      }}
    />
    <div
      className="w-6 h-8 absolute top-6 left-1/2 transform -translate-x-1/2"
      style={{
        border: `2px solid ${colorScheme[0]}`,
        borderRadius: "5px",
        imageRendering: "pixelated",
      }}
    />
    <div
      className="w-10 h-1.5 absolute top-8 left-1/4"
      style={{
        background: colorScheme[1],
        borderRadius: "2px",
        imageRendering: "pixelated",
      }}
    />
    <div
      className="w-10 h-1.5 absolute top-8 right-1/4"
      style={{
        background: colorScheme[1],
        borderRadius: "2px",
        imageRendering: "pixelated",
      }}
    />
    <div
      className="w-1.5 h-6 absolute bottom-0 left-1/3"
      style={{
        background: colorScheme[2],
        animation: "moveLeftLeg 0.5s infinite alternate",
        borderRadius: "5px",
        imageRendering: "pixelated",
      }}
    />
    <div
      className="w-1.5 h-6 absolute bottom-0 right-1/3"
      style={{
        background: colorScheme[2],
        animation: "moveRightLeg 0.5s infinite alternate-reverse",
        borderRadius: "5px",
        imageRendering: "pixelated",
      }}
    />
  </div>
);

export default function RaceTrack() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 11000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const colorSchemes = [
    ["#FFD700", "#FF6347", "#FF4500"],
    ["#20B2AA", "#48D1CC", "#40E0D0"],
    ["#9370DB", "#8A2BE2", "#9400D3"],
    ["#3CB371", "#2E8B57", "#228B22"],
  ];

  return (
    <div className="w-full h-16 flex flex-col items-center justify-center">
      <div
        className="w-full h-16 relative overflow-hidden"
        aria-label="Animated line and circle avatars moving from left to right"
      >
        {isAnimating &&
          colorSchemes.map((scheme, index) => (
            <UserProfileAvatar
              key={index}
              colorScheme={scheme}
              delay={index * 0.5}
            />
          ))}
      </div>
      <style>{`
        @keyframes moveRight {
          from {
            transform: translateX(-64px);
          }
          to {
            transform: translateX(calc(100vw));
          }
        }
        @keyframes moveLeftLeg {
          from {
            transform: rotate(15deg);
          }
          to {
            transform: rotate(-15deg);
          }
        }
        @keyframes moveRightLeg {
          from {
            transform: rotate(-15deg);
          }
          to {
            transform: rotate(15deg);
          }
        }
      `}</style>
    </div>
  );
}
