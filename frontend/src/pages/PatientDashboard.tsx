import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">CuraLink</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.firstName}!</h1>
          <p className="text-muted-foreground">Patient Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Saved Trials</CardTitle>
              <CardDescription>Clinical trials you're interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experts</CardTitle>
              <CardDescription>Health specialists you follow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publications</CardTitle>
              <CardDescription>Saved medical publications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Get Started
            </CardTitle>
            <CardDescription>Explore CuraLink features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Discover Clinical Trials</p>
                  <p className="text-sm text-muted-foreground">Find trials relevant to your condition</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Find Health Experts</p>
                  <p className="text-sm text-muted-foreground">Connect with specialists in your field</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Browse Publications</p>
                  <p className="text-sm text-muted-foreground">Access latest medical research</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Join Community Forums</p>
                  <p className="text-sm text-muted-foreground">Ask questions and get answers</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-center text-muted-foreground">
            <span className="font-semibold">Phase 1 Complete!</span> Authentication is working. Dashboard features coming in Phase 3.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
