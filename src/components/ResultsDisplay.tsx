import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Zap, GitBranch, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { type AnalyzeResponse } from "@/lib/api";
import { MindMap } from "./MindMap";

interface ResultsDisplayProps {
  results: AnalyzeResponse;
  onBack: () => void;
}

export function ResultsDisplay({ results, onBack }: ResultsDisplayProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Repository Analysis Results
          </h1>
        </motion.div>

        <div className="grid gap-8">
          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="shadow-elevated border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Project Summary
                </CardTitle>
                <CardDescription>
                  High-level overview of the repository structure and purpose
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{results.summary}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tech Stack and Important Files Row */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-card border-border/50 bg-card/50 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Technology Stack
                  </CardTitle>
                  <CardDescription>
                    Technologies and frameworks detected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.tech_stack.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Important Files */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="shadow-card border-border/50 bg-card/50 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-primary" />
                    Key Files
                  </CardTitle>
                  <CardDescription>
                    Most important files in the codebase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {results.important_files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
                      >
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <code className="text-sm font-mono">{file}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Execution Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-elevated border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  Execution Flow
                </CardTitle>
                <CardDescription>
                  Step-by-step breakdown of how the application works
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-foreground bg-muted/30 p-4 rounded-lg border border-border/50 text-sm leading-relaxed">
                    {results.execution_flow}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mind Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="shadow-elevated border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Interactive Mind Map
                </CardTitle>
                <CardDescription>
                  Visual representation of file relationships and dependencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MindMap 
                  nodes={results.mind_map.nodes} 
                  edges={results.mind_map.edges} 
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}