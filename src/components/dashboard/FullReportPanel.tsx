import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  FileText, 
  AlertTriangle, 
  DollarSign, 
  Scale, 
  Lightbulb, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullReportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  riskScore: number;
  contractName: string;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const sections = [
  {
    id: "executive",
    title: "Executive Summary",
    icon: FileText,
    content: {
      simple: "This contract has several concerning clauses that could cost you money and limit your career options. The main issues are late payment terms, a long non-compete clause, and unclear termination conditions.",
      detailed: "This Independent Contractor Agreement presents several areas of concern that warrant careful consideration before signing. The contract contains 14 distinct clauses, of which 2 are classified as high-risk, 2 as moderate risk, and the remainder as standard or favorable terms. The cumulative Risk Score of 72/100 indicates elevated financial and professional exposure that exceeds typical industry benchmarks for similar agreements."
    }
  },
  {
    id: "risk",
    title: "Risk Breakdown",
    icon: AlertTriangle,
    content: {
      simple: "You have 2 high-risk and 2 medium-risk items in this contract. The biggest concerns are the 60-day payment wait and 24-month non-compete.",
      detailed: `
        **High Risk Items (2):**
        1. Net-60 Payment Terms - Payment delayed 60 days after invoice, creating significant cash flow risk
        2. Non-Compete Clause - 24-month restriction across 5-state region, severely limiting future opportunities
        
        **Moderate Risk Items (2):**
        1. Termination Without Cause - 7-day notice period with no compensation for work in progress
        2. Liability Waiver - Broad indemnification clause with limited Company liability
        
        **Low Risk Items (1):**
        1. IP Ownership - Standard work-for-hire provisions with clear boundaries
      `
    }
  },
  {
    id: "financial",
    title: "Financial Exposure",
    icon: DollarSign,
    content: {
      simple: "Waiting 60 days for payment on a $10,000 project means you're essentially giving them a $10,000 loan. Over a year of work, this could affect up to $60,000 in cash flow.",
      detailed: `
        **Cash Flow Impact:**
        - Net-60 terms create a 60-day receivables gap
        - Estimated annual impact: $15,000 - $60,000 in delayed payments
        - Opportunity cost at 8% annual rate: $1,200 - $4,800
        
        **Termination Exposure:**
        - Work-in-progress at termination: No guaranteed compensation
        - Maximum exposure per project: Full project value
        
        **Non-Compete Financial Impact:**
        - Potential income loss during 24-month restriction
        - Estimated impact: 20-40% reduction in available opportunities
      `
    }
  },
  {
    id: "clauses",
    title: "Clause Interpretations",
    icon: Scale,
    content: {
      simple: "The contract language is mostly clear, but watch out for vague terms like 'reasonable efforts' and 'industry standard' which can mean different things to different people.",
      detailed: `
        **Section 2.3 - Payment Terms:**
        "Net-60 from invoice receipt" - This means 60 calendar days from when they acknowledge receiving your invoice, not from when you submit it.
        
        **Section 4.1 - Non-Compete:**
        "Substantially similar services" - Broadly defined to include any work in the same industry, not just identical services.
        
        **Section 5.2 - Termination:**
        "For convenience" - Either party can terminate for any reason, but the 7-day notice heavily favors the Company.
        
        **Section 6.1 - Indemnification:**
        "Hold harmless" - You assume liability for claims arising from your work, even if partially caused by Company actions.
      `
    }
  },
  {
    id: "actions",
    title: "Suggested Actions",
    icon: Lightbulb,
    content: {
      simple: "1. Ask for Net-30 instead of Net-60 payment\n2. Request the non-compete be reduced to 12 months\n3. Ask for 30-day termination notice\n4. Get clear definitions of vague terms",
      detailed: `
        **Priority 1 - Payment Terms:**
        Request modification from Net-60 to Net-30 or Net-15. Alternatively, negotiate a retainer structure or milestone-based payments.
        
        **Priority 2 - Non-Compete:**
        Request reduction from 24 months to 12 months maximum. Narrow geographic scope to immediate service area. Define "competing services" more specifically.
        
        **Priority 3 - Termination:**
        Negotiate 30-day notice period. Add compensation clause for work-in-progress at termination. Include mutual termination rights.
        
        **Priority 4 - Liability:**
        Cap indemnification to contract value. Add mutual indemnification clause. Exclude gross negligence and willful misconduct.
      `
    }
  },
  {
    id: "negotiation",
    title: "Negotiation Tips",
    icon: MessageSquare,
    content: {
      simple: "Start by asking about payment terms - companies often agree to Net-30 if you simply ask. Present your requests professionally and explain your reasoning.",
      detailed: `
        **Opening Approach:**
        "I've reviewed the agreement and am excited about working together. I'd like to discuss a few standard adjustments that would help ensure a smooth working relationship."
        
        **Payment Terms Script:**
        "Net-60 creates cash flow challenges for my business. Would you be open to Net-30 terms, or alternatively, a 50% upfront payment structure?"
        
        **Non-Compete Script:**
        "I understand the need to protect your business interests. Could we narrow the non-compete to 12 months and define 'competing services' more specifically?"
        
        **Leverage Points:**
        - Your specialized expertise
        - Market rate comparisons
        - Long-term relationship value
        - Industry standard terms
      `
    }
  },
];

const FullReportPanel = ({ isOpen, onClose, riskScore, contractName }: FullReportPanelProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["executive"]);
  const [simpleMode, setSimpleMode] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-card border-l border-border shadow-2xl overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Intelligence Report</h2>
                  <p className="text-muted-foreground mt-1">{contractName}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSimpleMode(!simpleMode)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                >
                  {simpleMode ? (
                    <ToggleRight className="w-4 h-4 text-accent" />
                  ) : (
                    <ToggleLeft className="w-4 h-4" />
                  )}
                  {simpleMode ? "Simple Mode" : "Detailed Mode"}
                </button>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-auto h-[calc(100%-180px)] p-6 space-y-4">
              {sections.map((section, index) => {
                const isExpanded = expandedSections.includes(section.id);
                const SectionIcon = section.icon;

                return (
                  <motion.div
                    key={section.id}
                    className="rounded-xl border border-border/50 overflow-hidden bg-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <SectionIcon className="w-4 h-4 text-accent" />
                        </div>
                        <span className="font-semibold text-foreground">{section.title}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <div className="p-4 rounded-lg bg-muted/20 text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                              {simpleMode ? section.content.simple : section.content.detailed}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-card via-card to-transparent">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Generated by ClauseGuard AI</span>
                <span>Risk Score: {riskScore}/100</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FullReportPanel;
