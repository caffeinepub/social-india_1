import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginPage() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8 p-10 bg-card rounded-2xl border border-border shadow-[0_8px_40px_rgba(0,0,0,0.5)] max-w-sm w-full mx-4"
      >
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/uploads/black_and_white_modern_personal_logo-019d3425-4c26-710f-8fd1-3d8297e1d3a9-1.png"
            alt="Social India"
            className="w-24 h-24 rounded-full object-cover shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Social India
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Connect, share, and explore moments from across India
          </p>
          <p
            className="text-xs font-semibold tracking-wide"
            style={{
              background: "linear-gradient(90deg, #FF9933, #138808)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Made in India 🇮🇳
          </p>
        </div>

        <Button
          data-ocid="login.submit_button"
          onClick={login}
          disabled={isLoggingIn}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 font-semibold"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in with Internet Identity"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Secure, decentralized identity on the Internet Computer
        </p>
      </motion.div>
    </div>
  );
}
