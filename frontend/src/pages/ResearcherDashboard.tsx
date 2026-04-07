import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Microscope, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResearcherDashboard = () => {
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
          <h1 className="text-4xl font-bold mb-2">Welcome, Dr. {user?.lastName}!</h1>
          <p className="text-muted-foreground">Researcher Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>My Trials</CardTitle>
              <CardDescription>Active clinical trials</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collaborators</CardTitle>
              <CardDescription>Research connections</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publications</CardTitle>
              <CardDescription>Your research publications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5 text-accent" />
              Get Started
            </CardTitle>
            <CardDescription>Explore CuraLink features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Manage Clinical Trials</p>
                  <p className="text-sm text-muted-foreground">Post and manage your research studies</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Find Collaborators</p>
                  <p className="text-sm text-muted-foreground">Connect with researchers worldwide</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Showcase Publications</p>
                  <p className="text-sm text-muted-foreground">Display your research contributions</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Engage with Patients</p>
                  <p className="text-sm text-muted-foreground">Answer questions and build trust</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-center text-muted-foreground">
            <span className="font-semibold">Phase 1 Complete!</span> Authentication is working. Dashboard features coming in Phase 4.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResearcherDashboard;
