import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Microscope, 
  Search, 
  Users, 
  BookOpen, 
  MessageCircle,
  Network,
  FileText,
  Lightbulb,
  Activity,
  Brain,
  Zap,
  Shield,
  Database,
  CheckCircle
} from "lucide-react";

const Index = () => {
  const [showPatientFlow, setShowPatientFlow] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header 
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CuraLink
            </span>
          </Link>
          <Link to="/login">
            <Button variant="login" size="sm">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 bg-gradient-to-b from-blue-50 via-cyan-50 to-background">
        <div className="container mx-auto max-w-5xl text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Connecting Patients and Researchers for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Better Health Outcomes
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            AI-powered platform to discover clinical trials, connect with health experts, and access cutting-edge medical research
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <Link to="/signup/patient" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto text-base py-6 px-8">
                <Heart className="mr-2 h-5 w-5" />
                I am a Patient or Caregiver
              </Button>
            </Link>
            <Link to="/signup/researcher" className="w-full sm:w-auto">
              <Button variant="researcher" size="lg" className="w-full sm:w-auto text-base py-6 px-8">
                <Microscope className="mr-2 h-5 w-5" />
                I am a Researcher
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is CuraLink */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">What is CuraLink?</h2>
          <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
            CuraLink is an innovative platform that bridges the gap between patients seeking treatment options and researchers advancing medical science. Whether you're a patient looking for clinical trials or a researcher seeking collaborators, CuraLink uses AI to personalize your experience and connect you with what matters most.
          </p>
          <div className="mt-12 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center flex-1 animate-scale-in">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-10 w-10 text-primary" />
                  </div>
                  <p className="font-semibold">Patients</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <Activity className="h-12 w-12 text-secondary animate-pulse" />
                </div>
                <div className="flex flex-col items-center flex-1 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Microscope className="h-10 w-10 text-accent" />
                  </div>
                  <p className="font-semibold">Researchers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Patients Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">For Patients & Caregivers</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Empowering you with knowledge and connections</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Search,
                title: "Discover Clinical Trials",
                description: "Search for personalized clinical trials based on your specific condition, location, and eligibility criteria using our AI-powered matching system.",
              },
              {
                icon: Users,
                title: "Find Health Experts",
                description: "Connect directly with specialists and researchers in your area of need. Get answers from those advancing medical science in your field.",
              },
              {
                icon: BookOpen,
                title: "Access Publications",
                description: "Read the latest medical research translated into simple, understandable language. Stay informed about breakthroughs in your condition.",
              },
              {
                icon: MessageCircle,
                title: "Join Forums",
                description: "Ask questions and get expert answers from researchers. Join a supportive community of patients and healthcare professionals.",
              },
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Researchers Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">For Researchers</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Advancing science through collaboration</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Network,
                title: "Find Collaborators",
                description: "Connect with researchers in your field worldwide. Build partnerships, share insights, and accelerate your research through meaningful collaboration.",
              },
              {
                icon: FileText,
                title: "Manage Clinical Trials",
                description: "Post and manage your research studies efficiently. Reach qualified participants and streamline your trial recruitment process.",
              },
              {
                icon: Lightbulb,
                title: "Share Publications",
                description: "Showcase your work and research contributions to a global audience. Increase the visibility and impact of your discoveries.",
              },
              {
                icon: MessageCircle,
                title: "Engage with Patients",
                description: "Answer patient questions and support patient education. Bridge the gap between research and real-world health challenges.",
              },
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">How CuraLink Works</h2>
          <p className="text-center text-muted-foreground mb-8 text-lg">Simple steps to get started</p>
          
          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={showPatientFlow ? "gradient" : "outline"}
              size="lg"
              onClick={() => setShowPatientFlow(true)}
            >
              <Heart className="mr-2 h-5 w-5" />
              For Patients
            </Button>
            <Button
              variant={!showPatientFlow ? "researcher" : "outline"}
              size="lg"
              onClick={() => setShowPatientFlow(false)}
            >
              <Microscope className="mr-2 h-5 w-5" />
              For Researchers
            </Button>
          </div>

          {/* Patient Flow */}
          {showPatientFlow && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
              {[
                {
                  step: "1",
                  title: "Tell Us About Your Condition",
                  description: "Enter your medical condition or symptoms in natural language. Our system understands what you're looking for.",
                },
                {
                  step: "2",
                  title: "Get AI-Powered Recommendations",
                  description: "Our AI analyzes your profile and suggests relevant clinical trials, health experts, and medical publications tailored to you.",
                },
                {
                  step: "3",
                  title: "Connect and Discover",
                  description: "Save your favorites, request meetings with experts, and stay updated on new trials and research in your area of interest.",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6 text-white text-3xl font-bold shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-secondary" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Researcher Flow */}
          {!showPatientFlow && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
              {[
                {
                  step: "1",
                  title: "Build Your Profile",
                  description: "Add your specialties, research interests, and publications. Showcase your expertise and contributions to the field.",
                },
                {
                  step: "2",
                  title: "Discover Opportunities",
                  description: "Find collaborators, connect with patients, and discover clinical trial opportunities that match your research focus.",
                },
                {
                  step: "3",
                  title: "Collaborate and Share",
                  description: "Connect with peers worldwide, contribute to patient education, and expand the impact of your research work.",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center mb-6 text-white text-3xl font-bold shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-primary" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Key Features - AI Powered */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Powered by AI</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Advanced technology for better healthcare connections</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Natural Language Processing",
                description: "Simply describe your condition or research interest in plain language. Our AI understands context and finds exactly what you need.",
              },
              {
                icon: Zap,
                title: "Personalized Matching",
                description: "AI-driven recommendations based on your unique profile, medical history, and preferences. Get results that truly matter to you.",
              },
              {
                icon: Activity,
                title: "Real-Time Updates",
                description: "Stay informed about new clinical trials, publications, and opportunities as they become available in your areas of interest.",
              },
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CuraLink */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Why Choose CuraLink?</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">The comprehensive solution for healthcare connections</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Database,
                title: "All-in-One Platform",
                description: "Clinical trials, health experts, medical publications, and community forums all integrated in one seamless platform.",
              },
              {
                icon: CheckCircle,
                title: "AI-Powered Personalization",
                description: "Get recommendations tailored specifically to your needs, backed by machine learning and medical expertise.",
              },
              {
                icon: Shield,
                title: "Trusted Sources",
                description: "All data sourced from verified medical databases including PubMed, ClinicalTrials.gov, ORCID, and leading medical journals.",
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          {/* Trusted Sources */}
          <div className="text-center">
            <p className="text-sm font-semibold text-muted-foreground mb-6">TRUSTED DATA SOURCES</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <span className="text-lg font-semibold">PubMed</span>
              <span className="text-lg font-semibold">ClinicalTrials.gov</span>
              <span className="text-lg font-semibold">ORCID</span>
              <span className="text-lg font-semibold">NEJM</span>
              <span className="text-lg font-semibold">Nature Medicine</span>
              <span className="text-lg font-semibold">The Lancet</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-blue-50">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join CuraLink today and discover what matters most to you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <Link to="/signup/patient" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto text-base py-6 px-8">
                <Heart className="mr-2 h-5 w-5" />
                I am a Patient or Caregiver
              </Button>
            </Link>
            <Link to="/signup/researcher" className="w-full sm:w-auto">
              <Button variant="researcher" size="lg" className="w-full sm:w-auto text-base py-6 px-8">
                <Microscope className="mr-2 h-5 w-5" />
                I am a Researcher
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">CuraLink</span>
              </div>
              <p className="text-muted-foreground">Connecting healthcare through AI</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/signup/patient" className="hover:text-primary transition-colors">For Patients</Link></li>
                <li><Link to="/signup/researcher" className="hover:text-primary transition-colors">For Researchers</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm pt-8 border-t">
            © 2024 CuraLink. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
