import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Moon, Bell, BookOpen, Smartphone, Clock } from 'lucide-react';
import { useUserProfile } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function SleepModePage() {
  const { data: profile } = useUserProfile();
  const [windDownEnabled, setWindDownEnabled] = useState(true);
  const [screenOffReminder, setScreenOffReminder] = useState(true);
  const [meditationReminder, setMeditationReminder] = useState(true);
  const [journalingReminder, setJournalingReminder] = useState(true);

  const sleepTime = profile?.preferences.sleepTime
    ? new Date(Number(profile.preferences.sleepTime) / 1_000_000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '23:00';

  const scheduleWindDown = () => {
    toast.success('Wind-down routine scheduled for tonight');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sleep Mode</h1>
        <p className="text-muted-foreground">
          Prepare for restful sleep with evening routines
        </p>
      </div>

      {/* Sleep Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-mutedGreen" />
            Your Sleep Schedule
          </CardTitle>
          <CardDescription>Based on your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-mutedGreen/10">
            <div>
              <p className="text-sm text-muted-foreground">Target Sleep Time</p>
              <p className="text-2xl font-bold">{sleepTime}</p>
            </div>
            <Clock className="w-8 h-8 text-mutedGreen" />
          </div>
        </CardContent>
      </Card>

      {/* Wind-Down Routine */}
      <Card>
        <CardHeader>
          <CardTitle>Wind-Down Routine</CardTitle>
          <CardDescription>
            Gentle reminders to help you transition to sleep
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="winddown">Enable Wind-Down Routine</Label>
              <p className="text-sm text-muted-foreground">
                Receive reminders 1 hour before sleep time
              </p>
            </div>
            <Switch
              id="winddown"
              checked={windDownEnabled}
              onCheckedChange={setWindDownEnabled}
            />
          </div>

          {windDownEnabled && (
            <div className="space-y-4 pl-4 border-l-2 border-mutedGreen/30">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-mutedGreen mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Screens Off</p>
                      <p className="text-sm text-muted-foreground">
                        Reminder to put away devices
                      </p>
                    </div>
                    <Switch
                      checked={screenOffReminder}
                      onCheckedChange={setScreenOffReminder}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Moon className="w-5 h-5 text-mutedGreen mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Meditation</p>
                      <p className="text-sm text-muted-foreground">
                        5-minute guided meditation
                      </p>
                    </div>
                    <Switch
                      checked={meditationReminder}
                      onCheckedChange={setMeditationReminder}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-mutedGreen mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Journaling</p>
                      <p className="text-sm text-muted-foreground">
                        Reflect on your day
                      </p>
                    </div>
                    <Switch
                      checked={journalingReminder}
                      onCheckedChange={setJournalingReminder}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button onClick={scheduleWindDown} className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            Schedule Tonight's Routine
          </Button>
        </CardContent>
      </Card>

      {/* Late Call Recovery */}
      <Card>
        <CardHeader>
          <CardTitle>Late Call Recovery</CardTitle>
          <CardDescription>
            Automatic adjustments when meetings run late
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm leading-relaxed">
              When meetings end after 8 PM, we'll automatically:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Adjust your morning alarm for extra rest</li>
              <li>• Suggest a lighter morning routine</li>
              <li>• Recommend a calming evening activity</li>
              <li>• Skip non-essential morning tasks</li>
            </ul>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-mutedGreen/10 text-mutedGreen">
            <Bell className="w-4 h-4" />
            <p className="text-sm font-medium">
              No late meetings detected today
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Sleep Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm">
                💡 Keep your bedroom cool (60-67°F) for optimal sleep
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm">
                💡 Avoid caffeine 6 hours before bedtime
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm">
                💡 Maintain consistent sleep and wake times, even on weekends
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
