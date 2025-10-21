import { Wifi } from "lucide-react";
import { useState } from "react";

interface TapButtonProps {
  onTap: () => void;
}

const TapButton = ({ onTap }: TapButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    onTap();
    setTimeout(() => setIsPressed(false), 200);
  };

  return (
    <div className="flex flex-col items-center gap-6 my-12">
      <button
        onClick={handlePress}
        className={`
          relative w-48 h-48 rounded-full 
          bg-gradient-to-br from-primary to-cyan-400
          border-4 border-primary
          flex flex-col items-center justify-center
          transition-all duration-200
          animate-pulse-glow
          ${isPressed ? "scale-95" : "hover:scale-105"}
        `}
      >
        <Wifi className="w-16 h-16 text-primary-foreground mb-2" />
        <span className="text-foreground font-semibold">Tap ID to Board</span>
      </button>
    </div>
  );
};

export default TapButton;
