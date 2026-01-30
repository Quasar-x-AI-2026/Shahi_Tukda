import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  History, 
  Shield, 
  ArrowRight, 
  Bell, 
  Settings, 
  LogOut,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import UploadContractModal from "@/components/dashboard/UploadContractModal";
import AIAnalysisExperience from "@/components/dashboard/AIAnalysisExperience";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = "Alex";
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleLogout = () => {
    navigate("/");
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleStartAnalysis = (file: File) => {
    setUploadedFileName(file.name);
    setShowUploadModal(false);
    setShowAnalysis(true);
  };

  const handleAnalysisComplete = () => {
    setShowAnalysis(false);
    navigate("/contract-report");
  };

  const actionCards = [
    {
      title: "Upload Contract",
      description: "Analyze a new agreement for hidden risks",
      icon: Upload,
      color: "accent",
      primary: true,
      onClick: handleUploadClick,
    },
    {
      title: "View Reports",
      description: "Access your completed risk analyses",
      icon: FileText,
      color: "secondary",
      onClick: () => navigate("/reports"),
    },
    {
      title: "Risk History",
      description: "Track patterns across all your contracts",
      icon: History,
      color: "muted-foreground",
      onClick: () => navigate("/reports"),
    },
  ];

  const stats = [
    { label: "Contracts Analyzed", value: "12", icon: FileText, trend: "+3 this month" },
    { label: "High Risks Found", value: "7", icon: AlertTriangle, color: "text-risk-high" },
    { label: "Issues Resolved", value: "5", icon: CheckCircle, color: "text-risk-low" },
    { label: "Avg. Analysis Time", value: "2.4s", icon: Clock },
  ];

  const recentActivity = [
    { name: "NDA - TechCorp Inc.", status: "High Risk", time: "2 hours ago", riskLevel: "high" },
    { name: "Freelance Agreement", status: "Moderate Risk", time: "1 day ago", riskLevel: "medium" },
    { name: "Service Contract - StartupXYZ", status: "Low Risk", time: "3 days ago", riskLevel: "low" },
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Navigation Bar */}
        <motion.nav
          className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border"
          initial={{ y: -100 }}
          animate={{ y: 0, transition: { duration: 0.5, ease: easeOutExpo } }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-sm">CG</span>
                </div>
                <span className="text-xl font-semibold text-foreground">ClauseGuard</span>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-border" />
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <motion.main
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }}
        >
          {/* Welcome Header */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome back, <span className="text-accent">{userName}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Your contract intelligence dashboard is ready.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease: easeOutExpo } }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="p-5 rounded-2xl bg-card border border-border/50 hover:border-border transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color || "text-muted-foreground"}`} />
                  {stat.trend && (
                    <span className="text-xs text-risk-low flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.trend}
                    </span>
                  )}
                </div>
                <p className={`text-3xl font-bold ${stat.color || "text-foreground"}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Cards */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: easeOutExpo } }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {actionCards.map((card, index) => (
                <motion.button
                  key={card.title}
                  onClick={card.onClick}
                  className={`group relative p-6 rounded-2xl text-left transition-all overflow-hidden ${
                    card.primary 
                      ? "bg-gradient-to-br from-accent to-secondary text-accent-foreground" 
                      : "bg-card border border-border/50 hover:border-border"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {card.primary && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      card.primary 
                        ? "bg-white/20" 
                        : "bg-muted"
                    }`}>
                      <card.icon className={`w-6 h-6 ${
                        card.primary ? "text-white" : "text-muted-foreground"
                      }`} />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      card.primary ? "text-white" : "text-foreground"
                    }`}>
                      {card.title}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      card.primary ? "text-white/80" : "text-muted-foreground"
                    }`}>
                      {card.description}
                    </p>
                    <div className={`inline-flex items-center gap-2 text-sm font-medium ${
                      card.primary ? "text-white" : "text-accent"
                    }`}>
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3, ease: easeOutExpo } }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => navigate("/reports")}>
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              {recentActivity.map((activity, index) => (
                <motion.button
                  key={activity.name}
                  className="w-full flex items-center justify-between p-5 border-b border-border/50 last:border-b-0 hover:bg-muted/30 transition-colors cursor-pointer text-left"
                  onClick={() => navigate("/contract-report")}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.riskLevel === "high" ? "bg-risk-high/10" :
                      activity.riskLevel === "medium" ? "bg-risk-medium/10" :
                      "bg-risk-low/10"
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        activity.riskLevel === "high" ? "text-risk-high" :
                        activity.riskLevel === "medium" ? "text-risk-medium" :
                        "text-risk-low"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.riskLevel === "high" ? "bg-risk-high/10 text-risk-high" :
                    activity.riskLevel === "medium" ? "bg-risk-medium/10 text-risk-medium" :
                    "bg-risk-low/10 text-risk-low"
                  }`}>
                    {activity.status}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Security Badge */}
          <motion.div 
            className="mt-10 flex items-center justify-center gap-3 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4, ease: easeOutExpo } }}
          >
            <Shield className="w-5 h-5 text-risk-low" />
            <span>Your data is protected with enterprise-grade encryption</span>
          </motion.div>
        </motion.main>
      </div>

      {/* Upload Modal */}
      <UploadContractModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onStartAnalysis={handleStartAnalysis}
      />

      {/* AI Analysis Experience */}
      <AnimatePresence>
        {showAnalysis && (
          <AIAnalysisExperience 
            fileName={uploadedFileName}
            onComplete={handleAnalysisComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
