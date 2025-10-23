import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet as WalletIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Wallet = () => {
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [transactions] = useState([
    { id: 1, desc: "Added 5 tokens (Card)", amount: 5, cost: 250 },
    { id: 2, desc: "Trip to Main Campus", amount: -1, cost: 0 },
    { id: 3, desc: "Trip to Maths Gate", amount: -1, cost: 0 },
  ]);

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
        toast.error("Failed to load your token balance.");
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
  }, [navigate]);

  const handleRecharge = async (amount: number, cost: number) => {
    if (!userId) return;

    const newTokens = tokens + amount;
    
    const { error } = await supabase
      .from("profiles")
      .update({ tokens: newTokens })
      .eq("user_id", userId);

    if (error) {
      toast.error("Failed to recharge tokens.");
    } else {
      setTokens(newTokens);
      toast.success(`Added ${amount} token${amount > 1 ? 's' : ''} successfully!`);
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
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Wallet</h1>
          <div className="bg-gradient-to-br from-primary to-cyan-400 rounded-2xl p-6 glow-cyan">
            <div className="flex items-center gap-3 mb-2">
              <WalletIcon className="w-6 h-6 text-primary-foreground" />
              <p className="text-sm text-primary-foreground/80">Token Balance</p>
            </div>
            <p className="text-5xl font-bold text-primary-foreground">{tokens}</p>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Recharge</h2>
          <div className="flex gap-3">
            {[
              { tokens: 1, cost: 50 },
              { tokens: 3, cost: 140 },
              { tokens: 5, cost: 220 },
            ].map((option) => (
              <Button
                key={option.tokens}
                onClick={() => handleRecharge(option.tokens, option.cost)}
                variant="outline"
                className="flex-1 h-auto py-4 rounded-2xl border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold">{option.tokens}</p>
                  <p className="text-xs mt-1">Token{option.tokens > 1 ? 's' : ''}</p>
                </div>
              </Button>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Payment Method</h2>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 rounded-xl border-border hover:border-primary">
              <CreditCard className="w-4 h-4 mr-2" />
              Card
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl border-border hover:border-primary">
              <span className="mr-2">📱</span>
              UPI
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Transaction History</h2>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-card rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tx.cost > 0 ? `₹${tx.cost}` : 'Token used'}
                  </p>
                </div>
                <div className={`text-lg font-bold ${tx.amount > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Wallet;
