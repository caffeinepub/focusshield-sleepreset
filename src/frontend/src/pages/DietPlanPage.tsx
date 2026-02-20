import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Utensils, Droplets, RefreshCw, AlertTriangle } from 'lucide-react';
import { useUserProfile } from '../hooks/useQueries';
import { dietSuggestions } from '../data/dietSuggestions';
import { DietPreference } from '../backend';
import { toast } from 'sonner';

export default function DietPlanPage() {
  const { data: profile } = useUserProfile();
  const [lightDinner, setLightDinner] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<any>(null);

  const isVegetarian =
    profile?.preferences.dietPreference === DietPreference.vegetarian;

  const generatePlan = () => {
    const meals = isVegetarian
      ? dietSuggestions.vegetarian
      : dietSuggestions.nonVegetarian;

    const plan = {
      breakfast: meals.breakfast[Math.floor(Math.random() * meals.breakfast.length)],
      lunch: meals.lunch[Math.floor(Math.random() * meals.lunch.length)],
      dinner: lightDinner
        ? meals.lightDinner[Math.floor(Math.random() * meals.lightDinner.length)]
        : meals.dinner[Math.floor(Math.random() * meals.dinner.length)],
    };

    setCurrentPlan(plan);
    toast.success('New meal plan generated!');
  };

  if (!currentPlan) {
    generatePlan();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Diet Plan</h1>
        <p className="text-muted-foreground">
          Personalized meal suggestions for energy and better sleep
        </p>
      </div>

      {/* Medical Disclaimer */}
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> This is not medical advice. Consult a healthcare
          professional for personalized dietary guidance.
        </AlertDescription>
      </Alert>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Your Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Diet Type</p>
              <p className="text-sm text-muted-foreground">
                {isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="lightdinner">Light Dinner</Label>
              <p className="text-sm text-muted-foreground">
                Smaller portions for better sleep
              </p>
            </div>
            <Switch
              id="lightdinner"
              checked={lightDinner}
              onCheckedChange={(checked) => {
                setLightDinner(checked);
                generatePlan();
              }}
            />
          </div>
          <Button onClick={generatePlan} variant="outline" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New Plan
          </Button>
        </CardContent>
      </Card>

      {/* Today's Meals */}
      {currentPlan && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-warmOrange" />
                Breakfast
              </CardTitle>
              <CardDescription>Start your day with sustained energy</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{currentPlan.breakfast.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {currentPlan.breakfast.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentPlan.breakfast.ingredients.map((ingredient: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-warmOrange/10 text-warmOrange"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-mutedGreen" />
                Lunch
              </CardTitle>
              <CardDescription>Maintain energy through the afternoon</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{currentPlan.lunch.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {currentPlan.lunch.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentPlan.lunch.ingredients.map((ingredient: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-mutedGreen/10 text-mutedGreen"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-softYellow" />
                Dinner
              </CardTitle>
              <CardDescription>
                {lightDinner ? 'Light meal for better sleep' : 'Nourishing evening meal'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{currentPlan.dinner.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {currentPlan.dinner.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentPlan.dinner.ingredients.map((ingredient: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-softYellow/10 text-softYellow"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hydration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            Hydration Reminders
          </CardTitle>
          <CardDescription>Stay hydrated throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <span className="text-sm">Morning (8 AM)</span>
              <span className="text-sm font-medium">2 glasses</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <span className="text-sm">Midday (12 PM)</span>
              <span className="text-sm font-medium">2 glasses</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <span className="text-sm">Afternoon (3 PM)</span>
              <span className="text-sm font-medium">2 glasses</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <span className="text-sm">Evening (6 PM)</span>
              <span className="text-sm font-medium">1 glass</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
