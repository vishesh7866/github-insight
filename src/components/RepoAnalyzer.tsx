import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { analyzeRepository, type AnalyzeResponse } from "@/lib/api";
import { LoadingSpinner } from "./LoadingSpinner";
import { ResultsDisplay } from "./ResultsDisplay";
import { useToast } from "@/hooks/use-toast";

export function RepoAnalyzer() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalyzeResponse | null>(null);
  const { toast } = useToast();

  const isValidGitHubUrl = (url: string) => {
    const githubRegex = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/;
    return githubRegex.test(url);
  };

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a GitHub repository URL",
        variant: "destructive",
      });
      return;
    }

    if (!isValidGitHubUrl(repoUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GitHub repository URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await analyzeRepository({ repo_url: repoUrl });
      setResults(response);
      toast({
        title: "Analysis Complete",
        description: "Repository has been successfully analyzed!",
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the repository. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleAnalyze();
    }
  };

  if (results) {
    return <ResultsDisplay results={results} onBack={() => setResults(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Powered by Advanced AI Analysis</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            RepoFlow
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Understand any GitHub repository instantly. Get comprehensive workflow analysis, 
            interactive mind maps, and detailed execution flows.
          </p>
        </motion.div>

        {/* Main Analyzer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="shadow-elevated border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Github className="h-6 w-6 text-primary" />
                Analyze Repository
              </CardTitle>
              <CardDescription>
                Enter a GitHub repository URL to get instant workflow analysis and visualization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://github.com/username/repository"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 h-12 text-base"
                    disabled={loading}
                  />
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={loading || !repoUrl.trim()}
                  className="h-12 px-6 bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  {loading ? (
                    <LoadingSpinner size="sm" className="text-primary-foreground" />
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">✨ What you'll get:</p>
                <ul className="space-y-1 ml-4">
                  <li>• High-level project summary and workflow explanation</li>
                  <li>• Technology stack analysis</li>
                  <li>• Important files identification</li>
                  <li>• Step-by-step execution flow</li>
                  <li>• Interactive mind map visualization</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            {
              title: "Workflow Understanding",
              description: "Deep analysis of how your code executes and flows",
              icon: "🔍"
            },
            {
              title: "Visual Mind Maps",
              description: "Interactive diagrams showing file relationships",
              icon: "🧠"
            },
            {
              title: "Tech Stack Detection",
              description: "Automatic identification of technologies used",
              icon: "⚡"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center shadow-card border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}