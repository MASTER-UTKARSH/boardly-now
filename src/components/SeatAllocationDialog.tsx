import { Dialog, DialogContent } from "./ui/dialog";
import { CheckCircle2, Armchair } from "lucide-react";

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
      <DialogContent className="bg-card border-primary border-2 rounded-3xl p-6 max-w-sm glow-cyan-strong">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Token Deducted</h2>
          </div>

          <div className="flex items-center justify-center gap-3 bg-secondary rounded-2xl p-4">
            <Armchair className="w-8 h-8 text-primary" />
            <div>
              <p className="text-muted-foreground text-sm">Your Seat</p>
              <p className="text-3xl font-bold text-foreground">{seatNumber}</p>
            </div>
          </div>

          <div className="bg-secondary rounded-2xl p-4">
            <div className="grid grid-cols-6 gap-2">
              {seats.map((seat) => (
                <div
                  key={seat}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center
                    ${seat === seatNumber 
                      ? 'bg-primary text-primary-foreground border-2 border-primary glow-cyan text-lg font-bold' 
                      : 'bg-muted text-muted-foreground text-xs'
                    }
                  `}
                >
                  {seat === seatNumber ? seatNumber : ''}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SeatAllocationDialog;
