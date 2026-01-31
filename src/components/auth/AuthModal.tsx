import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Building2, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthStep = "choice" | "signin" | "signup";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [step, setStep] = useState<AuthStep>("choice");
  const navigate = useNavigate();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset to choice when modal closes
      setTimeout(() => setStep("choice"), 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleEnterpriseClick = () => {
    onClose();
    navigate("/enterprise");
  };

  const handleAuthSuccess = () => {
    onClose();
    navigate("/dashboard");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-[rgba(10,15,25,0.55)] backdrop-blur-[24px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative z-10 w-full max-w-3xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { duration: 0.4, ease: easeOutExpo }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 20,
              transition: { duration: 0.3, ease: easeOutExpo }
            }}
          >
            {/* Close Button */}
            <motion.button
              className="absolute -top-12 right-0 md:right-0 p-2 rounded-full bg-card/20 backdrop-blur-sm border border-border/20 text-muted-foreground hover:text-foreground hover:bg-card/40 transition-all"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            <AnimatePresence mode="wait">
              {step === "choice" && (
                <ChoiceStep
                  key="choice"
                  onContinueToAuth={() => setStep("signin")}
                  onEnterpriseClick={handleEnterpriseClick}
                />
              )}
              {step === "signin" && (
                <SignInForm
                  key="signin"
                  onSwitchToSignUp={() => setStep("signup")}
                  onSuccess={handleAuthSuccess}
                  onBack={() => setStep("choice")}
                />
              )}
              {step === "signup" && (
                <SignUpForm
                  key="signup"
                  onSwitchToSignIn={() => setStep("signin")}
                  onSuccess={handleAuthSuccess}
                  onBack={() => setStep("choice")}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ChoiceStepProps {
  onContinueToAuth: () => void;
  onEnterpriseClick: () => void;
}

const ChoiceStep = ({ onContinueToAuth, onEnterpriseClick }: ChoiceStepProps) => {
  return (
    <motion.div
      className="glass-modal rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOutExpo } }}
      >
        <motion.div 
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <Shield className="w-8 h-8 text-accent" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Welcome to ClauseGuard
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose how you want to continue.
        </p>
      </motion.div>

      {/* Option Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Access Card */}
        <motion.button
          className="glass-card group relative overflow-hidden rounded-2xl p-6 text-left border border-border/30 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2, ease: easeOutExpo } }}
          whileHover={{ y: -6, boxShadow: "0 40px 100px rgba(37,99,235,0.2)" }}
          onClick={onContinueToAuth}
        >
          {/* Gradient overlay on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <motion.div
                className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <ArrowRight className="w-4 h-4 text-accent" />
              </motion.div>
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Sign In / Create Account
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Access your dashboard, analyze contracts, and track risk reports securely.
            </p>
            
            <div className="inline-flex items-center gap-2 text-accent font-medium text-sm">
              Continue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/30 transition-all duration-300"
          />
        </motion.button>

        {/* Enterprise Card */}
        <motion.button
          className="glass-card group relative overflow-hidden rounded-2xl p-6 text-left border border-border/30 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3, ease: easeOutExpo } }}
          whileHover={{ y: -6, boxShadow: "0 40px 100px rgba(30,58,138,0.2)" }}
          onClick={onEnterpriseClick}
        >
          {/* Coming soon badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs font-medium rounded-full">
            Coming Soon
          </div>

          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-secondary" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Enterprise Workspace
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Team collaboration, bulk contract analysis, admin controls, and compliance dashboards.
            </p>
            
            <div className="inline-flex items-center gap-2 text-secondary font-medium text-sm">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-secondary/0 group-hover:border-secondary/30 transition-all duration-300"
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AuthModal;
