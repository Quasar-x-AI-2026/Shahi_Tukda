import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, X, CheckCircle, Sparkles, File } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAnalysis: (file: File) => void;
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const UploadContractModal = ({ isOpen, onClose, onStartAnalysis }: UploadContractModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleStartAnalysis = () => {
    if (file) {
      onStartAnalysis(file);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-card border border-border/50 shadow-elevated"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 pointer-events-none" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative p-8 md:p-10">
                {/* Header */}
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
                    <FileText className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Analyze a New Contract
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Upload your document. ClauseGuard AI will detect risks in seconds.
                  </p>
                </motion.div>

                {/* Upload Zone */}
                <AnimatePresence mode="wait">
                  {!file ? (
                    <motion.div
                      key="dropzone"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                          isDragActive
                            ? "border-accent bg-accent/10 scale-[1.02]"
                            : "border-border hover:border-accent/50 hover:bg-muted/30"
                        }`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("file-input")?.click()}
                      >
                        {/* Animated Icon */}
                        <motion.div
                          className="mx-auto w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6"
                          animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            animate={isDragActive ? { rotate: [0, -10, 10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <Upload className={`w-10 h-10 ${isDragActive ? "text-accent" : "text-muted-foreground"}`} />
                          </motion.div>
                        </motion.div>

                        <p className="text-lg font-medium text-foreground mb-2">
                          {isDragActive ? "Drop your contract here" : "Drag & Drop your contract"}
                        </p>
                        <p className="text-muted-foreground mb-4">or</p>
                        <Button variant="outline" className="mb-6">
                          Choose File
                        </Button>

                        <p className="text-sm text-muted-foreground">
                          Supported: PDF, DOCX, TXT, scanned images, or email exports
                        </p>

                        <input
                          id="file-input"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx,.doc,.txt,.jpg,.jpeg,.png"
                          onChange={handleFileSelect}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="file-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* File Card */}
                      <div className="relative p-6 rounded-2xl bg-muted/30 border border-border/50">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <File className="w-7 h-7 text-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground truncate">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <CheckCircle className="w-4 h-4 text-risk-low" />
                              <span className="text-sm text-risk-low font-medium">Ready for upload</span>
                            </div>
                          </div>
                          <button
                            onClick={removeFile}
                            className="p-2 rounded-lg bg-muted hover:bg-destructive/10 hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* AI Badge */}
                        <motion.div 
                          className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center gap-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Sparkles className="w-3 h-3" />
                          Ready for AI Analysis
                        </motion.div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => document.getElementById("file-input-replace")?.click()}
                        >
                          Replace File
                        </Button>
                        <input
                          id="file-input-replace"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx,.doc,.txt,.jpg,.jpeg,.png"
                          onChange={handleFileSelect}
                        />
                        <motion.button
                          className="flex-1 h-12 rounded-xl auth-button font-semibold flex items-center justify-center gap-2"
                          onClick={handleStartAnalysis}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Sparkles className="w-5 h-5" />
                          Start AI Analysis
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Security Note */}
                <motion.p 
                  className="text-center text-sm text-muted-foreground mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  🔒 Your documents are encrypted and never stored permanently.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UploadContractModal;
