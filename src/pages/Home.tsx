import { useState } from "react";
import TokenBalance from "@/components/TokenBalance";
import TapButton from "@/components/TapButton";
import SeatAllocationDialog from "@/components/SeatAllocationDialog";
import BottomNav from "@/components/BottomNav";
import LiveBusMap from "@/components/LiveBusMap";

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
    <div className="min-h-screen bg-background pb-28">
      <div className="max-w-4xl mx-auto p-6 mb-8">
        <TokenBalance tokens={tokens} />

        <TapButton onTap={handleTap} />

        <div className="bg-card rounded-2xl p-4 space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Live Bus Location</h3>
            <span className="text-xs text-primary font-medium">ETA: 5 mins</span>
          </div>
          <div className="rounded-xl h-64 md:h-80 overflow-hidden">
            <LiveBusMap />
          </div>
          <p className="text-xs text-muted-foreground text-center">Main Campus Pickup</p>
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
