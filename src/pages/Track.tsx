import BottomNav from "@/components/BottomNav";
import { MapPin, Bus } from "lucide-react";

const Track = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        <div className="bg-card p-4 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Live Tracking</h1>
          <p className="text-sm text-primary mt-1">ETA at Main Campus: 5 mins</p>
        </div>

        <div className="relative h-[calc(100vh-200px)] bg-secondary">
          {/* Simplified map visualization */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary">
            {/* Grid lines for map effect */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full h-px bg-border" style={{ top: `${i * 10}%` }} />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full w-px bg-border" style={{ left: `${i * 10}%` }} />
              ))}
            </div>

            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              <path
                d="M 50 400 Q 150 300, 250 200 T 450 100"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
              />
            </svg>

            {/* Bus icon */}
            <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-primary rounded-full p-4 glow-cyan-strong animate-pulse">
                <Bus className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            {/* Pickup point */}
            <div className="absolute right-1/4 top-1/4 transform translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-destructive rounded-full p-3 shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className="bg-card px-3 py-1 rounded-lg border border-border">
                  <p className="text-xs font-medium text-foreground">Pickup Point</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info card */}
          <div className="absolute bottom-6 left-4 right-4 bg-card rounded-2xl p-4 border border-border shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Route to Main Campus</h3>
              <span className="text-sm text-primary font-medium">Bus #204</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Currently approaching Math Gate</span>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">ETA at pickup: 5 mins</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Track;
