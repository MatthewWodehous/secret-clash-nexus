import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Swords, Zap, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";

type Move = "attack" | "defend" | "special" | null;

const DuelBoard = () => {
  const [playerMove, setPlayerMove] = useState<Move>(null);
  const [opponentMove, setOpponentMove] = useState<Move>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [round, setRound] = useState(1);
  const [revealed, setRevealed] = useState(false);

  const moves = [
    { id: "attack", icon: Swords, label: "Attack", color: "text-accent" },
    { id: "defend", icon: Shield, label: "Defend", color: "text-primary" },
    { id: "special", icon: Zap, label: "Special", color: "text-secondary" },
  ];

  const lockMove = () => {
    if (!playerMove) {
      toast.error("Select a move first!");
      return;
    }
    setIsLocked(true);
    // Simulate opponent choosing move
    const opponentChoice = moves[Math.floor(Math.random() * moves.length)].id as Move;
    setOpponentMove(opponentChoice);
    toast.success("Move locked! Waiting for reveal...");
  };

  const revealMoves = () => {
    setRevealed(true);
    toast.info("Moves revealed!");
    
    setTimeout(() => {
      determineWinner();
    }, 2000);
  };

  const determineWinner = () => {
    if (!playerMove || !opponentMove) return;
    
    // Simple game logic
    if (playerMove === opponentMove) {
      toast("Draw! Try again!");
    } else if (
      (playerMove === "attack" && opponentMove === "special") ||
      (playerMove === "defend" && opponentMove === "attack") ||
      (playerMove === "special" && opponentMove === "defend")
    ) {
      toast.success("Victory! 🎉");
    } else {
      toast.error("Defeat!");
    }
    
    setTimeout(resetRound, 3000);
  };

  const resetRound = () => {
    setPlayerMove(null);
    setOpponentMove(null);
    setIsLocked(false);
    setRevealed(false);
    setRound(round + 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Round Counter */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-primary glow-cyan">Round {round}</h2>
      </div>

      {/* Duel Arena */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Player Side */}
        <Card className="relative bg-card/50 border-primary/30 backdrop-blur-sm p-8 glow-cyan">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold glow-cyan">
              YOU
            </span>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full gradient-shield border-2 border-primary flex items-center justify-center animate-pulse-glow">
                {playerMove && revealed ? (
                  <>
                    {moves.find(m => m.id === playerMove)?.icon && (
                      <div className={moves.find(m => m.id === playerMove)?.color}>
                        {(() => {
                          const Icon = moves.find(m => m.id === playerMove)!.icon;
                          return <Icon className="w-16 h-16" strokeWidth={1.5} />;
                        })()}
                      </div>
                    )}
                  </>
                ) : (
                  <Shield className="w-16 h-16 text-primary" strokeWidth={1.5} />
                )}
              </div>
            </div>

            {!isLocked && (
              <div className="grid grid-cols-3 gap-4">
                {moves.map((move) => (
                  <Button
                    key={move.id}
                    onClick={() => setPlayerMove(move.id as Move)}
                    variant={playerMove === move.id ? "default" : "outline"}
                    className={`h-20 flex flex-col gap-2 ${
                      playerMove === move.id
                        ? "bg-primary text-primary-foreground glow-cyan"
                        : "bg-card/50 border-primary/30 hover:bg-card hover:border-primary"
                    }`}
                  >
                    <move.icon className="w-6 h-6" />
                    <span className="text-xs">{move.label}</span>
                  </Button>
                ))}
              </div>
            )}

            {isLocked && !revealed && (
              <div className="text-center py-8">
                <Lock className="w-12 h-12 text-primary mx-auto mb-2 glow-cyan animate-pulse" />
                <p className="text-muted-foreground">Move Locked</p>
              </div>
            )}
          </div>
        </Card>

        {/* Opponent Side */}
        <Card className="relative bg-card/50 border-accent/30 backdrop-blur-sm p-8 glow-magenta">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold glow-magenta">
              OPPONENT
            </span>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full gradient-secondary border-2 border-accent flex items-center justify-center animate-pulse-glow">
                {opponentMove && revealed ? (
                  <>
                    {moves.find(m => m.id === opponentMove)?.icon && (
                      <div className="text-accent">
                        {(() => {
                          const Icon = moves.find(m => m.id === opponentMove)!.icon;
                          return <Icon className="w-16 h-16" strokeWidth={1.5} />;
                        })()}
                      </div>
                    )}
                  </>
                ) : (
                  <Shield className="w-16 h-16 text-accent" strokeWidth={1.5} />
                )}
              </div>
            </div>

            <div className="text-center py-8">
              {isLocked && !revealed && (
                <>
                  <Lock className="w-12 h-12 text-accent mx-auto mb-2 glow-magenta animate-pulse" />
                  <p className="text-muted-foreground">Move Locked</p>
                </>
              )}
              {!isLocked && (
                <p className="text-muted-foreground">Waiting for your move...</p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {!isLocked && (
          <Button
            onClick={lockMove}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan px-8"
          >
            <Lock className="w-5 h-5 mr-2" />
            Lock Move
          </Button>
        )}
        
        {isLocked && !revealed && (
          <Button
            onClick={revealMoves}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 glow-magenta px-8"
          >
            <Unlock className="w-5 h-5 mr-2" />
            Reveal Moves
          </Button>
        )}
      </div>
    </div>
  );
};

export default DuelBoard;
