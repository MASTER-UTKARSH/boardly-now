import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "@/components/BottomNav";
import { MapPin, Loader2 } from "lucide-react";
import LiveBusMap from "@/components/LiveBusMap";

const Track = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        <div className="bg-card p-4 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Live Tracking</h1>
          <p className="text-sm text-primary mt-1">ETA at Main Campus: 5 mins</p>
        </div>

        <div className="relative h-[calc(100vh-200px)] bg-secondary">
          <LiveBusMap />

          {/* Info card */}
          <div className="absolute bottom-6 left-4 right-4 bg-card rounded-2xl p-4 border border-border shadow-lg z-10">
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
