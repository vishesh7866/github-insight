import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Users, Zap, Github, Code, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze code structure, dependencies, and execution flows to provide deep insights.",
    },
    {
      icon: Code,
      title: "Multi-Language Support",
      description: "Support for JavaScript, TypeScript, Python, Java, C++, and dozens of other programming languages and frameworks.",
    },
    {
      icon: BarChart3,
      title: "Interactive Visualizations",
      description: "Beautiful mind maps and flow diagrams that make complex codebases easy to understand at a glance.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get comprehensive analysis results in seconds, not hours. Perfect for code reviews and onboarding.",
    },
  ];

  const stats = [
    { label: "Repositories Analyzed", value: "50,000+" },
    { label: "Developers Served", value: "10,000+" },
    { label: "Languages Supported", value: "40+" },
    { label: "Analysis Accuracy", value: "99.5%" },
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      description: "Former senior engineer at GitHub with 10+ years in code analysis.",
    },
    {
      name: "Sarah Kim",
      role: "Head of AI",
      description: "PhD in Machine Learning, previously at Google DeepMind.",
    },
    {
      name: "Marcus Johnson",
      role: "Lead Developer",
      description: "Full-stack expert with extensive open-source contributions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Target className="h-4 w-4" />
            <span className="text-sm font-medium">Our Mission</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Making Code Comprehensible
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            RepoFlow was born from the frustration of spending hours trying to understand complex codebases. 
            We believe that code analysis should be instant, intuitive, and accessible to everyone.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand, analyze, and visualize any codebase
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="shadow-elevated border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                RepoFlow started in 2023 when our founder, Alex Chen, was leading a team of engineers at a fast-growing startup. 
                The company had acquired several smaller companies, each with their own codebases written in different languages and architectures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The challenge was clear: how do you quickly understand and integrate disparate codebases without spending weeks 
                reading through thousands of files? Traditional documentation was often outdated or missing, and manual code review 
                was too time-consuming.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That's when we realized the need for an AI-powered solution that could automatically analyze any repository and 
                provide instant, comprehensive insights. After months of development and testing with over 10,000 open-source projects, 
                RepoFlow was born.
              </p>
              <div className="flex justify-center">
                <Badge variant="secondary" className="px-4 py-2">
                  Trusted by developers worldwide
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate engineers and researchers dedicated to making code analysis effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="shadow-card border-border/50 bg-card/50 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="h-20 w-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}