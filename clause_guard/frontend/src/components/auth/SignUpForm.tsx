import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
  onSuccess: () => void;
  onBack: () => void;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const SignUpForm = ({ onSwitchToSignIn, onSuccess, onBack }: SignUpFormProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { score, label: "Weak", color: "bg-risk-high" };
    if (score <= 3) return { score, label: "Fair", color: "bg-risk-medium" };
    if (score <= 4) return { score, label: "Good", color: "bg-accent" };
    return { score, label: "Strong", color: "bg-risk-low" };
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup
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
          Create Your Account
        </h2>
        <p className="text-muted-foreground">
          Start analyzing contracts in minutes
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2, ease: easeOutExpo } }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              focusedField === "name" ? "text-accent" : "text-muted-foreground"
            }`} />
            <Input
              type="text"
              placeholder="John Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className={`pl-12 h-12 bg-card/50 border-border/50 rounded-xl transition-all duration-200 ${
                focusedField === "name" 
                  ? "border-accent ring-2 ring-accent/20" 
                  : "hover:border-border"
              }`}
              required
            />
          </div>
        </motion.div>

        {/* Email Field */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.25, ease: easeOutExpo } }}
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

        {/* Mobile Field */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3, ease: easeOutExpo } }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Mobile Number
          </label>
          <div className="relative">
            <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              focusedField === "mobile" ? "text-accent" : "text-muted-foreground"
            }`} />
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              onFocus={() => setFocusedField("mobile")}
              onBlur={() => setFocusedField(null)}
              className={`pl-12 h-12 bg-card/50 border-border/50 rounded-xl transition-all duration-200 ${
                focusedField === "mobile" 
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
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.35, ease: easeOutExpo } }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              focusedField === "password" ? "text-accent" : "text-muted-foreground"
            }`} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
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
          
          {/* Password Strength Indicator */}
          {password && (
            <motion.div 
              className="mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <motion.div
                      key={level}
                      className={`flex-1 rounded-full ${
                        level <= passwordStrength.score 
                          ? passwordStrength.color 
                          : "bg-muted"
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: level <= passwordStrength.score ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: level * 0.05 }}
                    />
                  ))}
                </div>
                <span className={`text-xs font-medium ${
                  passwordStrength.score <= 2 ? "text-risk-high" :
                  passwordStrength.score <= 3 ? "text-risk-medium" :
                  passwordStrength.score <= 4 ? "text-accent" :
                  "text-risk-low"
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          className="pt-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4, ease: easeOutExpo } }}
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
              Create Account
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

        {/* Security Note */}
        <motion.div 
          className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.45, ease: easeOutExpo } }}
        >
          <Shield className="w-4 h-4" />
          <span>Your data is encrypted and never shared</span>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="relative py-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.5, ease: easeOutExpo } }}
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

        {/* Sign In Link */}
        <motion.p 
          className="text-center text-muted-foreground"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.55, ease: easeOutExpo } }}
        >
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-accent hover:text-accent/80 font-medium transition-colors"
          >
            Sign in
          </button>
        </motion.p>
      </form>
    </motion.div>
  );
};

export default SignUpForm;
