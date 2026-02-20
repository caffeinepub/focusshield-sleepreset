import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, TrendingDown, Minus, Lightbulb } from 'lucide-react';
import { useUserProfile } from '../hooks/useQueries';

export default function InsightsPage() {
  const { data: profile } = useUserProfile();

  const insights = [
    {
      pattern: 'Late Meeting Pattern',
      trend: 'up',
      description: 'You had 3 meetings ending after 7 PM this week',
      recommendation:
        'Try scheduling meetings earlier in the day. Propose 4 PM as your last meeting slot to allow for wind-down time.',
      impact: 'high',
    },
    {
      pattern: 'Stress & Break Usage',
      trend: 'neutral',
      description: 'High stress days correlate with fewer reset breaks taken',
      recommendation:
        'On busy days, schedule 2-minute breaks between meetings. Even brief pauses can significantly reduce stress accumulation.',
      impact: 'medium',
    },
    {
      pattern: 'Caffeine Timing',
      trend: 'down',
      description: 'Caffeine consumption after 3 PM improved this week',
      recommendation:
        'Great progress! Continue avoiding caffeine after 3 PM. Your sleep quality should improve as this habit solidifies.',
      impact: 'positive',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Weekly Insights</h1>
        <p className="text-muted-foreground">
          Patterns and recommendations based on your activity
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Avg Meeting Load</p>
              <p className="text-3xl font-bold">48%</p>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingDown className="w-3 h-3 inline text-green-500" /> 5% from last week
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Avg Stress Level</p>
              <p className="text-3xl font-bold">5.2/10</p>
              <p className="text-xs text-muted-foreground mt-1">
                <Minus className="w-3 h-3 inline text-gray-500" /> Stable
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Focus Blocks</p>
              <p className="text-3xl font-bold">12</p>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="w-3 h-3 inline text-green-500" /> 3 more than last week
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Recommendations */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Top 3 Recommendations</h2>
        {insights.map((insight, index) => (
          <Card
            key={index}
            className={
              insight.impact === 'high'
                ? 'border-warmOrange/50'
                : insight.impact === 'positive'
                ? 'border-mutedGreen/50'
                : ''
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {insight.trend === 'up' && <TrendingUp className="w-5 h-5 text-red-500" />}
                {insight.trend === 'down' && <TrendingDown className="w-5 h-5 text-green-500" />}
                {insight.trend === 'neutral' && <Minus className="w-5 h-5 text-gray-500" />}
                {insight.pattern}
              </CardTitle>
              <CardDescription>{insight.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Lightbulb className="w-5 h-5 text-warmOrange mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">Recommendation</p>
                  <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-mutedGreen/10">
              <div className="w-2 h-2 rounded-full bg-mutedGreen" />
              <p className="text-sm">
                Completed 12 focus blocks - your most productive week yet!
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-warmOrange/10">
              <div className="w-2 h-2 rounded-full bg-warmOrange" />
              <p className="text-sm">
                3 late meetings detected - consider blocking evening time
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-softYellow/10">
              <div className="w-2 h-2 rounded-full bg-softYellow" />
              <p className="text-sm">
                Caffeine cutoff adherence improved by 40%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
