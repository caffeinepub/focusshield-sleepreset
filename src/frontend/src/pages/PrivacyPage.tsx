import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Shield, Lock, Database, Eye } from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPage() {
  const [cloudSync, setCloudSync] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Your data, your control. We take privacy seriously.
        </p>
      </div>

      {/* Privacy Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-warmOrange/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-warmOrange" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Local-First Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is stored locally on your device by default
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-mutedGreen/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-mutedGreen" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">No Employer Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  We never share your personal data with employers or third parties
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-softYellow/10 flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5 text-softYellow" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Meeting Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  Only meeting times are stored, never content or attendees
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-warmBeige/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-warmBeige" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Full Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  You can view, export, or delete your data anytime
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Controls</CardTitle>
          <CardDescription>Manage how your data is stored and synced</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cloudsync">Optional Cloud Sync</Label>
              <p className="text-sm text-muted-foreground">
                Enable backup to Internet Computer for data portability
              </p>
            </div>
            <Switch id="cloudsync" checked={cloudSync} onCheckedChange={setCloudSync} />
          </div>

          {cloudSync && (
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                When enabled, your data is encrypted and synced to the Internet Computer
                blockchain. This allows you to access your data from multiple devices while
                maintaining privacy and security.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Policy */}
      <Card>
        <CardHeader>
          <CardTitle>What We Collect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Personal Preferences</h4>
            <p className="text-sm text-muted-foreground">
              Wake/sleep times, work hours, dietary preferences, and wellness goals. This data
              is used solely to personalize your experience.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Activity Data</h4>
            <p className="text-sm text-muted-foreground">
              Stress check-ins, focus blocks, and wellness activity completion. Used to
              generate insights and recommendations.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Calendar Data</h4>
            <p className="text-sm text-muted-foreground">
              Meeting start/end times and duration only. We never access meeting titles,
              descriptions, attendees, or content.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What We Don't Do</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>Share your data with employers, managers, or HR departments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>Sell your personal information to third parties</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>Access the content of your meetings or communications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>Track your location or device usage outside the app</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>Use your data for advertising or marketing purposes</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            You have complete control over your data:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-mutedGreen mt-0.5">✓</span>
              <span>View all data we've collected about you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mutedGreen mt-0.5">✓</span>
              <span>Export your data in a portable format</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mutedGreen mt-0.5">✓</span>
              <span>Delete your account and all associated data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mutedGreen mt-0.5">✓</span>
              <span>Opt out of optional features at any time</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
