import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    try {
      // Simulate wallet connection
      // In production, this would integrate with Rainbow Kit or similar
      const mockAddress = "0x" + Math.random().toString(16).substr(2, 8).toUpperCase();
      setAddress(mockAddress);
      setIsConnected(true);
      toast.success("Wallet connected successfully!");
    } catch (error) {
      toast.error("Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
    toast.info("Wallet disconnected");
  };

  if (isConnected) {
    return (
      <Button
        onClick={disconnectWallet}
        variant="outline"
        className="bg-card/50 border-primary/30 text-foreground hover:bg-card hover:border-primary glow-cyan transition-all"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan transition-all"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
