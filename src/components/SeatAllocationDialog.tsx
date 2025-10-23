import { Dialog, DialogContent } from "./ui/dialog";
import { CheckCircle2, Armchair, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface SeatAllocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seatNumber: number;
}

const SeatAllocationDialog = ({ open, onOpenChange, seatNumber }: SeatAllocationDialogProps) => {
  // Generate seat grid (18 seats in 3 rows)
  const seats = Array.from({ length: 18 }, (_, i) => i + 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-primary/50 border-2 rounded-3xl p-0 max-w-md overflow-hidden animate-scale-in">
        {/* Success Header with gradient background */}
        <div className="relative bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 p-8 text-center border-b border-primary/30">
          {/* Sparkle effects */}
          <div className="absolute top-4 left-4 animate-pulse">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="absolute top-6 right-6 animate-pulse delay-150">
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <div className="absolute bottom-6 right-12 animate-pulse delay-300">
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
          
          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4 animate-scale-in glow-cyan">
            <CheckCircle2 className="w-10 h-10 text-primary animate-pulse" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-1 animate-fade-in">
            Boarding Pass Issued!
          </h2>
          <p className="text-sm text-muted-foreground animate-fade-in">
            1 Token Deducted Successfully
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Seat number highlight */}
          <div className="relative bg-gradient-to-br from-primary via-primary to-accent rounded-2xl p-6 glow-cyan-strong animate-scale-in overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="relative flex items-center justify-center gap-4">
              <Armchair className="w-12 h-12 text-white animate-pulse" />
              <div className="text-center">
                <p className="text-white/90 text-sm font-medium mb-1">Your Seat Number</p>
                <p className="text-5xl font-bold text-white drop-shadow-lg">{seatNumber}</p>
              </div>
            </div>
          </div>

          {/* Mini bus seat map */}
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Bus Layout</h3>
              <span className="text-xs text-muted-foreground">18 Total Seats</span>
            </div>
            <div className="bg-secondary/50 rounded-2xl p-4 border border-border">
              <div className="grid grid-cols-6 gap-2">
                {seats.map((seat) => (
                  <div
                    key={seat}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center text-xs font-medium
                      transition-all duration-300
                      ${seat === seatNumber 
                        ? 'bg-primary text-white border-2 border-primary/50 scale-110 shadow-lg glow-cyan animate-pulse' 
                        : 'bg-muted/50 text-muted-foreground border border-border/50 hover:bg-muted'
                      }
                    `}
                  >
                    {seat === seatNumber ? (
                      <span className="font-bold text-sm">{seat}</span>
                    ) : (
                      <Armchair className="w-3 h-3 opacity-50" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action button */}
          <Button 
            onClick={() => onOpenChange(false)} 
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            Got It, Let's Go! 🚌
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SeatAllocationDialog;
