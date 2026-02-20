import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useUserProfile, useAddStressCheckIn } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Progress } from '../components/ui/progress';
import { Calendar, Focus, Activity, TrendingUp, Coffee, Moon } from 'lucide-react';
import { toast } from 'sonner';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading } = useUserProfile();
  const addStressCheckIn = useAddStressCheckIn();
  const [stressLevel, setStressLevel] = useState([5]);
  const [showStressPrompt, setShowStressPrompt] = useState(false);

  useEffect(() => {
    if (!isLoading && !profile && identity) {
      navigate({ to: '/onboarding' });
    }
  }, [profile, isLoading, navigate, identity]);

  useEffect(() => {
    const lastCheckIn = localStorage.getItem('lastStressCheckIn');
    const now = Date.now();
    if (!lastCheckIn || now - parseInt(lastCheckIn) > 4 * 60 * 60 * 1000) {
      setTimeout(() => setShowStressPrompt(true), 2000);
    }
  }, []);

  const handleStressCheckIn = async () => {
    try {
      await addStressCheckIn.mutateAsync(stressLevel[0]);
      localStorage.setItem('lastStressCheckIn', Date.now().toString());
      setShowStressPrompt(false);
      toast.success('Stress level recorded');
    } catch (error) {
      toast.error('Failed to record stress level');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-warmOrange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const meetingLoadScore = 42;
  const focusBlocksUsed = 2;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div
        className="relative rounded-2xl overflow-hidden p-8 md:p-12"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1200x400.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-warmOrange/90 to-mutedGreen/80" />
        <div className="relative z-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-lg opacity-90">
            Let's make today productive and stress-free
          </p>
        </div>
      </div>

      {/* Stress Check-In Prompt */}
      {showStressPrompt && (
        <Card className="border-warmOrange/50 bg-warmOrange/5">
          <CardHeader>
            <CardTitle className="text-lg">Quick Stress Check-In</CardTitle>
            <CardDescription>How are you feeling right now? (1-10)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Calm</span>
                <span className="font-medium text-foreground">{stressLevel[0]}</span>
                <span>Stressed</span>
              </div>
              <Slider
                value={stressLevel}
                onValueChange={setStressLevel}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowStressPrompt(false)}
                className="flex-1"
              >
                Skip
              </Button>
              <Button
                onClick={handleStressCheckIn}
                disabled={addStressCheckIn.isPending}
                className="flex-1"
              >
                {addStressCheckIn.isPending ? 'Saving...' : 'Submit'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-warmOrange" />
              Meeting Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">{meetingLoadScore}%</div>
              <Progress value={meetingLoadScore} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {meetingLoadScore < 50 ? 'Light day ahead' : 'Busy schedule today'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4 text-mutedGreen" />
              Stress Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">{stressLevel[0]}/10</div>
              <Progress value={stressLevel[0] * 10} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {stressLevel[0] <= 4
                  ? 'Feeling good'
                  : stressLevel[0] <= 7
                  ? 'Moderate stress'
                  : 'High stress'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Focus className="w-4 h-4 text-softYellow" />
              Focus Blocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">{focusBlocksUsed}</div>
              <p className="text-xs text-muted-foreground">Completed today</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => navigate({ to: '/focus' })}
              >
                Schedule More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate({ to: '/focus' })}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-warmOrange/10 flex items-center justify-center">
                <Focus className="w-6 h-6 text-warmOrange" />
              </div>
              <h3 className="font-semibold">Focus Mode</h3>
              <p className="text-xs text-muted-foreground">
                Schedule breaks & focus blocks
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate({ to: '/sleep' })}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-mutedGreen/10 flex items-center justify-center">
                <Moon className="w-6 h-6 text-mutedGreen" />
              </div>
              <h3 className="font-semibold">Sleep Mode</h3>
              <p className="text-xs text-muted-foreground">
                Wind-down routine & recovery
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate({ to: '/diet' })}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-softYellow/10 flex items-center justify-center">
                <Coffee className="w-6 h-6 text-softYellow" />
              </div>
              <h3 className="font-semibold">Diet Plan</h3>
              <p className="text-xs text-muted-foreground">
                Meal suggestions & hydration
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate({ to: '/insights' })}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-warmBeige/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warmBeige" />
              </div>
              <h3 className="font-semibold">Insights</h3>
              <p className="text-xs text-muted-foreground">
                Weekly patterns & tips
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
