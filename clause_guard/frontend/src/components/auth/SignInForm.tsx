import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SignInFormProps {
  onSwitchToSignUp: () => void;
  onSuccess: () => void;
  onBack: () => void;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const SignInForm = ({ onSwitchToSignUp, onSuccess, onBack }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    onSuccess();
  };

  return (
    <motion.div
      className="glass-modal rounded-3xl p-8 md:p-10 max-w-md mx-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOutExpo } }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
    >
      {/* Back Button */}
      <motion.button
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        onClick={onBack}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1, ease: easeOutExpo } }}
        whileHover={{ x: -4 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.15, ease: easeOutExpo } }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to access your contract intelligence
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2, ease: easeOutExpo } }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              focusedField === "email" ? "text-accent" : "text-muted-foreground"
            }`} />
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={`pl-12 h-12 bg-card/50 border-border/50 rounded-xl transition-all duration-200 ${
                focusedField === "email" 
                  ? "border-accent ring-2 ring-accent/20" 
                  : "hover:border-border"
              }`}
              required
            />
          </div>
        </motion.div>

        {/* Password Field */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.25, ease: easeOutExpo } }}
        >
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-foreground">
              Password
            </label>
            <button
              type="button"
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              focusedField === "password" ? "text-accent" : "text-muted-foreground"
            }`} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className={`pl-12 pr-12 h-12 bg-card/50 border-border/50 rounded-xl transition-all duration-200 ${
                focusedField === "password" 
                  ? "border-accent ring-2 ring-accent/20" 
                  : "hover:border-border"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3, ease: easeOutExpo } }}
        >
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl font-semibold text-base auth-button relative overflow-hidden"
          >
            <motion.span
              className="flex items-center gap-2"
              initial={false}
              animate={{ opacity: isLoading ? 0 : 1 }}
            >
              Log In
            </motion.span>
            {isLoading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader2 className="w-5 h-5 animate-spin" />
              </motion.div>
            )}
          </Button>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="relative py-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.35, ease: easeOutExpo } }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-transparent px-4 text-sm text-muted-foreground backdrop-blur-sm">
              OR
            </span>
          </div>
        </motion.div>

        {/* Sign Up Link */}
        <motion.p 
          className="text-center text-muted-foreground"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4, ease: easeOutExpo } }}
        >
          New to ClauseGuard?{" "}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-accent hover:text-accent/80 font-medium transition-colors"
          >
            Create an account
          </button>
        </motion.p>
      </form>

      {/* Trust Badge */}
      <motion.div 
        className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.45, ease: easeOutExpo } }}
      >
        <CheckCircle className="w-4 h-4 text-risk-low" />
        <span>256-bit SSL encrypted connection</span>
      </motion.div>
    </motion.div>
  );
};

export default SignInForm;
