import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Microscope } from "lucide-react";

const SignupResearcher = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Activity className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CuraLink
            </span>
          </Link>
        </div>

        <Card className="animate-fade-in">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Microscope className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Researcher Sign Up</CardTitle>
            <CardDescription className="text-center">
              Create your account to connect with collaborators and manage clinical trials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Dr. Jane" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Smith" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@university.edu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input id="institution" placeholder="University or Research Center" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Research Specialization</Label>
              <Input id="specialization" placeholder="e.g., Oncology, Cardiology, Neuroscience" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Brief Bio (Optional)</Label>
              <Textarea 
                id="bio" 
                placeholder="Describe your research interests and experience"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button variant="researcher" className="w-full" size="lg">
              Create Account
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupResearcher;
