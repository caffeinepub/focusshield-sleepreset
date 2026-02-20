import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Play, Pause, SkipForward, Clock } from 'lucide-react';
import { wellnessScripts } from '../data/wellnessScripts';
import { useFocusBlocks, useAddFocusBlock } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';
import { FocusBlockStatus } from '../backend';

export default function FocusModePage() {
  const { identity } = useInternetIdentity();
  const { data: focusBlocks = [] } = useFocusBlocks();
  const addFocusBlock = useAddFocusBlock();
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [activityProgress, setActivityProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startActivity = (activityType: string) => {
    setActiveActivity(activityType);
    setActivityProgress(0);
    setIsPlaying(true);
    toast.success('Activity started');
  };

  const pauseActivity = () => {
    setIsPlaying(false);
  };

  const skipActivity = () => {
    setActiveActivity(null);
    setActivityProgress(0);
    setIsPlaying(false);
    toast.success('Activity completed');
  };

  const suggestFocusBlock = async (duration: number) => {
    if (!identity) {
      toast.error('Please login to schedule focus blocks');
      return;
    }

    const now = Date.now();
    const startTime = BigInt(now * 1_000_000);
    const endTime = BigInt((now + duration * 60 * 1000) * 1_000_000);

    try {
      await addFocusBlock.mutateAsync({
        id: `focus-${Date.now()}`,
        startTime,
        endTime,
        description: `${duration}-minute focus block`,
        status: FocusBlockStatus.suggested,
      });
      toast.success('Focus block scheduled!');
    } catch (error) {
      toast.error('Failed to schedule focus block');
    }
  };

  const currentActivity = activeActivity
    ? wellnessScripts.breathing.find((s) => s.id === activeActivity) ||
      wellnessScripts.eyeRelaxation.find((s) => s.id === activeActivity) ||
      wellnessScripts.neckStretch.find((s) => s.id === activeActivity) ||
      wellnessScripts.mindfulness.find((s) => s.id === activeActivity)
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Focus Mode</h1>
        <p className="text-muted-foreground">
          Take micro-breaks and schedule deep focus time
        </p>
      </div>

      {/* Active Activity */}
      {activeActivity && currentActivity && (
        <Card className="border-warmOrange">
          <CardHeader>
            <CardTitle>{currentActivity.title}</CardTitle>
            <CardDescription>{currentActivity.duration}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Progress value={activityProgress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                {Math.round(activityProgress)}% complete
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {currentActivity.script}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={isPlaying ? pauseActivity : () => setIsPlaying(true)}
                className="flex-1"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={skipActivity} className="flex-1">
                <SkipForward className="w-4 h-4 mr-2" />
                Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reset Breaks */}
      <Card>
        <CardHeader>
          <CardTitle>Reset Breaks</CardTitle>
          <CardDescription>
            Quick 1-2 minute activities to refresh between meetings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="breathing">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="breathing">Breathing</TabsTrigger>
              <TabsTrigger value="eyes">Eyes</TabsTrigger>
              <TabsTrigger value="stretch">Stretch</TabsTrigger>
              <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
            </TabsList>

            <TabsContent value="breathing" className="space-y-3 mt-4">
              {wellnessScripts.breathing.map((script) => (
                <div
                  key={script.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{script.title}</h4>
                    <p className="text-sm text-muted-foreground">{script.duration}</p>
                  </div>
                  <Button size="sm" onClick={() => startActivity(script.id)}>
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="eyes" className="space-y-3 mt-4">
              {wellnessScripts.eyeRelaxation.map((script) => (
                <div
                  key={script.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{script.title}</h4>
                    <p className="text-sm text-muted-foreground">{script.duration}</p>
                  </div>
                  <Button size="sm" onClick={() => startActivity(script.id)}>
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="stretch" className="space-y-3 mt-4">
              {wellnessScripts.neckStretch.map((script) => (
                <div
                  key={script.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{script.title}</h4>
                    <p className="text-sm text-muted-foreground">{script.duration}</p>
                  </div>
                  <Button size="sm" onClick={() => startActivity(script.id)}>
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="mindfulness" className="space-y-3 mt-4">
              {wellnessScripts.mindfulness.map((script) => (
                <div
                  key={script.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{script.title}</h4>
                    <p className="text-sm text-muted-foreground">{script.duration}</p>
                  </div>
                  <Button size="sm" onClick={() => startActivity(script.id)}>
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Smart Focus Blocks */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Focus Blocks</CardTitle>
          <CardDescription>
            Schedule uninterrupted time for deep work
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => suggestFocusBlock(30)}
              disabled={addFocusBlock.isPending}
            >
              <Clock className="w-4 h-4 mr-2" />
              30 min
            </Button>
            <Button
              variant="outline"
              onClick={() => suggestFocusBlock(60)}
              disabled={addFocusBlock.isPending}
            >
              <Clock className="w-4 h-4 mr-2" />
              60 min
            </Button>
            <Button
              variant="outline"
              onClick={() => suggestFocusBlock(90)}
              disabled={addFocusBlock.isPending}
            >
              <Clock className="w-4 h-4 mr-2" />
              90 min
            </Button>
          </div>

          {focusBlocks.length > 0 && (
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-medium">Scheduled Blocks</h4>
              {focusBlocks.slice(0, 5).map((block) => (
                <div
                  key={block.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="text-sm font-medium">{block.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Number(block.startTime) / 1_000_000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-warmOrange/10 text-warmOrange">
                    {block.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
