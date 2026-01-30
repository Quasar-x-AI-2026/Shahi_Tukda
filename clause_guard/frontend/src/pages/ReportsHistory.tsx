import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  AlertTriangle,
  ChevronRight,
  Brain,
  SortAsc
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

interface Report {
  id: string;
  name: string;
  date: string;
  riskScore: number;
  riskLevel: "high" | "medium" | "low";
  clauseCount: number;
  type: string;
}

const sampleReports: Report[] = [
  {
    id: "1",
    name: "Independent Contractor Agreement - TechCorp",
    date: "2024-01-15",
    riskScore: 72,
    riskLevel: "high",
    clauseCount: 14,
    type: "Contractor Agreement",
  },
  {
    id: "2",
    name: "Freelance Services Contract - StartupXYZ",
    date: "2024-01-10",
    riskScore: 45,
    riskLevel: "medium",
    clauseCount: 11,
    type: "Service Contract",
  },
  {
    id: "3",
    name: "NDA - Acme Corporation",
    date: "2024-01-08",
    riskScore: 28,
    riskLevel: "low",
    clauseCount: 8,
    type: "NDA",
  },
  {
    id: "4",
    name: "Consulting Agreement - FinanceHub",
    date: "2024-01-05",
    riskScore: 68,
    riskLevel: "high",
    clauseCount: 16,
    type: "Consulting Agreement",
  },
  {
    id: "5",
    name: "Partnership Agreement - LocalBiz",
    date: "2024-01-02",
    riskScore: 52,
    riskLevel: "medium",
    clauseCount: 12,
    type: "Partnership Agreement",
  },
  {
    id: "6",
    name: "Employment Contract - GlobalTech",
    date: "2023-12-28",
    riskScore: 35,
    riskLevel: "low",
    clauseCount: 9,
    type: "Employment Contract",
  },
];

const ReportsHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string | null>(null);

  const filteredReports = sampleReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = !selectedRiskFilter || report.riskLevel === selectedRiskFilter;
    return matchesSearch && matchesRisk;
  });

  const getRiskBadgeStyles = (level: string) => {
    switch (level) {
      case "high": return "bg-risk-high/10 text-risk-high border-risk-high/20";
      case "medium": return "bg-risk-medium/10 text-risk-medium border-risk-medium/20";
      case "low": return "bg-risk-low/10 text-risk-low border-risk-low/20";
      default: return "";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <motion.nav
        className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0, transition: { duration: 0.5, ease: easeOutExpo } }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Contract Reports</h1>
          <p className="text-muted-foreground">
            Access your complete risk analysis history
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: easeOutExpo }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={selectedRiskFilter === null ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedRiskFilter(null)}
            >
              All
            </Button>
            <Button
              variant={selectedRiskFilter === "high" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedRiskFilter("high")}
              className={selectedRiskFilter === "high" ? "border-risk-high text-risk-high" : ""}
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              High Risk
            </Button>
            <Button
              variant={selectedRiskFilter === "medium" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedRiskFilter("medium")}
            >
              Moderate
            </Button>
            <Button
              variant={selectedRiskFilter === "low" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedRiskFilter("low")}
            >
              Low Risk
            </Button>
          </div>

          <Button variant="outline" size="sm">
            <SortAsc className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </motion.div>

        {/* Stats Summary */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: easeOutExpo }}
        >
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <p className="text-2xl font-bold text-foreground">{sampleReports.length}</p>
            <p className="text-sm text-muted-foreground">Total Reports</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <p className="text-2xl font-bold text-risk-high">
              {sampleReports.filter(r => r.riskLevel === "high").length}
            </p>
            <p className="text-sm text-muted-foreground">High Risk</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <p className="text-2xl font-bold text-risk-medium">
              {sampleReports.filter(r => r.riskLevel === "medium").length}
            </p>
            <p className="text-sm text-muted-foreground">Moderate Risk</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border/50">
            <p className="text-2xl font-bold text-risk-low">
              {sampleReports.filter(r => r.riskLevel === "low").length}
            </p>
            <p className="text-sm text-muted-foreground">Low Risk</p>
          </div>
        </motion.div>

        {/* Reports List */}
        <motion.div 
          className="bg-card rounded-2xl border border-border/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: easeOutExpo }}
        >
          {filteredReports.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">No reports found</p>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {filteredReports.map((report, index) => (
                <motion.button
                  key={report.id}
                  className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors text-left"
                  onClick={() => navigate("/contract-report")}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      report.riskLevel === "high" ? "bg-risk-high/10" :
                      report.riskLevel === "medium" ? "bg-risk-medium/10" :
                      "bg-risk-low/10"
                    }`}>
                      <FileText className={`w-6 h-6 ${
                        report.riskLevel === "high" ? "text-risk-high" :
                        report.riskLevel === "medium" ? "text-risk-medium" :
                        "text-risk-low"
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{report.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(report.date)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {report.clauseCount} clauses analyzed
                        </span>
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getRiskBadgeStyles(report.riskLevel)}`}>
                          <Brain className="w-3 h-3" />
                          AI Analyzed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-xl font-bold ${
                        report.riskLevel === "high" ? "text-risk-high" :
                        report.riskLevel === "medium" ? "text-risk-medium" :
                        "text-risk-low"
                      }`}>
                        {report.riskScore}
                      </p>
                      <p className="text-xs text-muted-foreground">Risk Score</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReportsHistory;
