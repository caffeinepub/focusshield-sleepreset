import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { useCreateOrUpdateProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';
import { DietPreference, Goal } from '../backend';
import { Clock, Briefcase, Coffee, Target } from 'lucide-react';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const createProfile = useCreateOrUpdateProfile();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    wakeTime: '07:00',
    sleepTime: '23:00',
    workStart: '09:00',
    workEnd: '18:00',
    meetingLoad: '5',
    caffeineHabits: 'moderate',
    dietPreference: 'vegetarian' as 'vegetarian' | 'nonVegetarian',
    goals: [] as string[],
  });

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleSubmit = async () => {
    if (!identity) {
      toast.error('Please login to continue');
      return;
    }

    if (formData.goals.length === 0) {
      toast.error('Please select at least one goal');
      return;
    }

    const timeToNano = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return BigInt((hours * 60 + minutes) * 60 * 1_000_000_000);
    };

    const goalMap: Record<string, Goal> = {
      lessStress: Goal.lessStress,
      betterSleep: Goal.betterSleep,
      betterFocus: Goal.betterFocus,
    };

    try {
      await createProfile.mutateAsync({
        userId: identity.getPrincipal(),
        preferences: {
          wakeTime: timeToNano(formData.wakeTime),
          sleepTime: timeToNano(formData.sleepTime),
          workHours: [timeToNano(formData.workStart), timeToNano(formData.workEnd)],
          typicalMeetingLoad: BigInt(formData.meetingLoad),
          caffeineHabits: formData.caffeineHabits,
          dietPreference:
            formData.dietPreference === 'vegetarian'
              ? DietPreference.vegetarian
              : DietPreference.nonVegetarian,
          goals: formData.goals.map((g) => goalMap[g]),
        },
        lastCalendarSync: undefined,
        weeklyInsights: [],
        contentPreferences: {
          useAI: false,
          avoidCertainContent: false,
        },
      });

      toast.success('Profile created successfully!');
      navigate({ to: '/' });
    } catch (error) {
      toast.error('Failed to create profile');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to FocusShield+SleepReset</h1>
        <p className="text-muted-foreground">
          Let's personalize your experience to help you reduce stress and improve sleep
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 w-16 rounded-full transition-all ${
              s <= step ? 'bg-warmOrange' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-warmOrange" />
              Sleep & Wake Schedule
            </CardTitle>
            <CardDescription>Help us understand your daily rhythm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="wakeTime">Wake Time</Label>
              <Input
                id="wakeTime"
                type="time"
                value={formData.wakeTime}
                onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleepTime">Sleep Time</Label>
              <Input
                id="sleepTime"
                type="time"
                value={formData.sleepTime}
                onChange={(e) => setFormData({ ...formData, sleepTime: e.target.value })}
              />
            </div>
            <Button onClick={() => setStep(2)} className="w-full">
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-warmOrange" />
              Work & Lifestyle
            </CardTitle>
            <CardDescription>Tell us about your work patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workStart">Work Start</Label>
                <Input
                  id="workStart"
                  type="time"
                  value={formData.workStart}
                  onChange={(e) => setFormData({ ...formData, workStart: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workEnd">Work End</Label>
                <Input
                  id="workEnd"
                  type="time"
                  value={formData.workEnd}
                  onChange={(e) => setFormData({ ...formData, workEnd: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetingLoad">Typical Daily Meetings (hours)</Label>
              <Input
                id="meetingLoad"
                type="number"
                min="0"
                max="12"
                value={formData.meetingLoad}
                onChange={(e) => setFormData({ ...formData, meetingLoad: e.target.value })}
              />
            </div>
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-warmOrange" />
                Caffeine Habits
              </Label>
              <RadioGroup
                value={formData.caffeineHabits}
                onValueChange={(value) => setFormData({ ...formData, caffeineHabits: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="font-normal">
                    None
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="font-normal">
                    Light (1 cup/day)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="font-normal">
                    Moderate (2-3 cups/day)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="heavy" id="heavy" />
                  <Label htmlFor="heavy" className="font-normal">
                    Heavy (4+ cups/day)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label>Diet Preference</Label>
              <RadioGroup
                value={formData.dietPreference}
                onValueChange={(value: 'vegetarian' | 'nonVegetarian') =>
                  setFormData({ ...formData, dietPreference: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegetarian" id="vegetarian" />
                  <Label htmlFor="vegetarian" className="font-normal">
                    Vegetarian
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nonVegetarian" id="nonVegetarian" />
                  <Label htmlFor="nonVegetarian" className="font-normal">
                    Non-Vegetarian
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-warmOrange" />
              Your Goals
            </CardTitle>
            <CardDescription>What would you like to improve? (Select all that apply)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                <Checkbox
                  id="lessStress"
                  checked={formData.goals.includes('lessStress')}
                  onCheckedChange={() => handleGoalToggle('lessStress')}
                />
                <div className="flex-1">
                  <Label htmlFor="lessStress" className="font-medium cursor-pointer">
                    Less Stress
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reduce daily work stress and prevent burnout
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                <Checkbox
                  id="betterSleep"
                  checked={formData.goals.includes('betterSleep')}
                  onCheckedChange={() => handleGoalToggle('betterSleep')}
                />
                <div className="flex-1">
                  <Label htmlFor="betterSleep" className="font-medium cursor-pointer">
                    Better Sleep
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Improve sleep quality and establish healthy routines
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                <Checkbox
                  id="betterFocus"
                  checked={formData.goals.includes('betterFocus')}
                  onCheckedChange={() => handleGoalToggle('betterFocus')}
                />
                <div className="flex-1">
                  <Label htmlFor="betterFocus" className="font-medium cursor-pointer">
                    Better Focus
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enhance concentration and productivity during work
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={createProfile.isPending || formData.goals.length === 0}
                className="flex-1"
              >
                {createProfile.isPending ? 'Creating...' : 'Complete Setup'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
