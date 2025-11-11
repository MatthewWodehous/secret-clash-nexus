import { useState } from "react";
import Logo from "@/components/Logo";
import ConnectWallet from "@/components/ConnectWallet";
import DuelBoard from "@/components/DuelBoard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <div>
              <h1 className="text-2xl font-bold text-primary glow-cyan">DuelLock</h1>
              <p className="text-xs text-muted-foreground">Blockchain Dueling</p>
            </div>
          </div>
          <ConnectWallet />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse-glow">
          Lock Your Move.<br />Claim Your Victory.
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Choose your move secretly. Lock it on-chain. Decrypt at round end to reveal the winner.
          Welcome to the future of strategic combat.
        </p>
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan text-lg px-8 py-6"
          onClick={() => setIsWalletConnected(true)}
        >
          Start Dueling
        </Button>
      </section>

      {/* Duel Board Section */}
      {isWalletConnected && (
        <section className="container mx-auto px-4 py-16">
          <DuelBoard />
        </section>
      )}

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card/30 rounded-lg border border-primary/20 backdrop-blur-sm hover:border-primary/50 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center glow-cyan">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Secret Moves</h3>
            <p className="text-muted-foreground">
              Lock your strategy on-chain with cryptographic security
            </p>
          </div>

          <div className="text-center p-6 bg-card/30 rounded-lg border border-secondary/20 backdrop-blur-sm hover:border-secondary/50 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center glow-purple">
              <span className="text-3xl">⚔️</span>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">Fair Combat</h3>
            <p className="text-muted-foreground">
              Simultaneous reveal ensures no one has an unfair advantage
            </p>
          </div>

          <div className="text-center p-6 bg-card/30 rounded-lg border border-accent/20 backdrop-blur-sm hover:border-accent/50 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center glow-magenta">
              <span className="text-3xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-accent mb-2">Glowing Shields</h3>
            <p className="text-muted-foreground">
              Futuristic UI with animated shields and neon effects
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
