import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Microscope, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/hooks/useAuth";
import { signupResearcherSchema, SignupResearcherFormData } from "@/lib/validations/auth.validation";

const SignupResearcher = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signupResearcher } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupResearcherFormData>({
    resolver: zodResolver(signupResearcherSchema),
  });

  const onSubmit = async (data: SignupResearcherFormData) => {
    setIsSubmitting(true);
    try {
      await signupResearcher(data);

      toast({
        title: "Account created successfully!",
        description: "Welcome to CuraLink",
      });

      // Redirect to researcher dashboard
      navigate('/researcher/dashboard', { replace: true });
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Unable to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Dr. Jane"
                    {...register("firstName")}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    {...register("lastName")}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@university.edu"
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution (Optional)</Label>
                <Input
                  id="institution"
                  placeholder="University or Research Center"
                  {...register("institution")}
                  disabled={isSubmitting}
                />
                {errors.institution && (
                  <p className="text-sm text-destructive">{errors.institution.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Research Specialization (Optional)</Label>
                <Input
                  id="specialization"
                  placeholder="e.g., Oncology, Cardiology, Neuroscience"
                  {...register("specialization")}
                  disabled={isSubmitting}
                />
                {errors.specialization && (
                  <p className="text-sm text-destructive">{errors.specialization.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Brief Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Describe your research interests and experience"
                  rows={3}
                  {...register("bio")}
                  disabled={isSubmitting}
                />
                {errors.bio && (
                  <p className="text-sm text-destructive">{errors.bio.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              <Button
                type="submit"
                variant="researcher"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-semibold">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupResearcher;
