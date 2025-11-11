import { Shield, Swords } from "lucide-react";

const Logo = () => {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 flex items-center justify-center">
        <Shield className="w-16 h-16 text-primary glow-cyan" strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Swords className="w-8 h-8 text-accent glow-magenta" strokeWidth={2} />
      </div>
    </div>
  );
};

export default Logo;
