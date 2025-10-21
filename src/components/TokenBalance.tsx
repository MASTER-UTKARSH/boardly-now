import { User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface TokenBalanceProps {
  tokens: number;
}

const TokenBalance = ({ tokens }: TokenBalanceProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-card rounded-2xl mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-5 h-5 text-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Tokens</p>
          <p className="text-2xl font-bold text-foreground">{tokens}</p>
        </div>
      </div>
      <Link to="/wallet">
        <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Recharge
        </Button>
      </Link>
    </header>
  );
};

export default TokenBalance;
