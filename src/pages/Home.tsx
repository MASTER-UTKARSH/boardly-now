import { useState } from "react";
import TokenBalance from "@/components/TokenBalance";
import TapButton from "@/components/TapButton";
import SeatAllocationDialog from "@/components/SeatAllocationDialog";
import BottomNav from "@/components/BottomNav";
import { MapPin } from "lucide-react";

const Home = () => {
  const [tokens, setTokens] = useState(8);
  const [showSeatDialog, setShowSeatDialog] = useState(false);
  const [allocatedSeat, setAllocatedSeat] = useState(12);

  const handleTap = () => {
    if (tokens > 0) {
      setTokens(tokens - 1);
      setAllocatedSeat(Math.floor(Math.random() * 18) + 1);
      setShowSeatDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto p-6">
        <TokenBalance tokens={tokens} />

        <TapButton onTap={handleTap} />

        <div className="bg-card rounded-2xl p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Live Bus Location</h3>
          <div className="bg-secondary rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
            {/* Simplified map placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted"></div>
            <div className="relative z-10 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">ETA: 5 mins</p>
              <p className="text-xs text-muted-foreground mt-1">Main Campus Pickup</p>
            </div>
          </div>
        </div>
      </div>

      <SeatAllocationDialog
        open={showSeatDialog}
        onOpenChange={setShowSeatDialog}
        seatNumber={allocatedSeat}
      />

      <BottomNav />
    </div>
  );
};

export default Home;
