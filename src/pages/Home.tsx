import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import TokenBalance from "@/components/TokenBalance";
import TapButton from "@/components/TapButton";
import SeatAllocationDialog from "@/components/SeatAllocationDialog";
import BottomNav from "@/components/BottomNav";
import LiveBusMap from "@/components/LiveBusMap";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Home = () => {
  const [tokens, setTokens] = useState(0);
  const [showSeatDialog, setShowSeatDialog] = useState(false);
  const [allocatedSeat, setAllocatedSeat] = useState(12);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthAndFetchTokens = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUserId(session.user.id);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("tokens")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your token balance.",
        });
      } else if (profile) {
        setTokens(profile.tokens);
      }
      setLoading(false);
    };

    checkAuthAndFetchTokens();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleTap = async () => {
    if (tokens > 0 && userId) {
      const newTokens = tokens - 1;
      
      const { error } = await supabase
        .from("profiles")
        .update({ tokens: newTokens })
        .eq("user_id", userId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update tokens.",
        });
      } else {
        setTokens(newTokens);
        setAllocatedSeat(Math.floor(Math.random() * 18) + 1);
        setShowSeatDialog(true);
      }
    } else if (tokens === 0) {
      toast({
        variant: "destructive",
        title: "No tokens",
        description: "Please recharge your tokens to board.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
