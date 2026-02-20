import { Link, useRouterState } from '@tanstack/react-router';
import { Home, Focus, Moon, Utensils, TrendingUp, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { SiFacebook, SiX, SiInstagram, SiLinkedin } from 'react-icons/si';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/focus', label: 'Focus', icon: Focus },
    { path: '/sleep', label: 'Sleep', icon: Moon },
    { path: '/diet', label: 'Diet', icon: Utensils },
    { path: '/insights', label: 'Insights', icon: TrendingUp },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-warmBeige via-background to-softYellow">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warmOrange to-mutedGreen flex items-center justify-center">
              <span className="text-white font-bold text-sm">FS</span>
            </div>
            <Link to="/" className="font-semibold text-lg tracking-tight">
              FocusShield<span className="text-warmOrange">+</span>SleepReset
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-warmOrange/10 text-warmOrange'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Button */}
          <div className="hidden md:flex items-center gap-2">
            {identity ? (
              <Button variant="outline" size="sm" onClick={clear}>
                Logout
              </Button>
            ) : (
              <Button size="sm" onClick={login} disabled={isLoggingIn}>
                {isLoggingIn ? 'Connecting...' : 'Login'}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
            <nav className="container px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-warmOrange/10 text-warmOrange'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border/40 mt-2">
                {identity ? (
                  <Button variant="outline" size="sm" onClick={clear} className="w-full">
                    Logout
                  </Button>
                ) : (
                  <Button size="sm" onClick={login} disabled={isLoggingIn} className="w-full">
                    {isLoggingIn ? 'Connecting...' : 'Login'}
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 container px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 backdrop-blur">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()}</span>
              <span>•</span>
              <span>Built with ❤️ using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'focusshield-app'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warmOrange hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <div className="flex items-center gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-warmOrange transition-colors"
                >
                  <SiX className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-warmOrange transition-colors"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-warmOrange transition-colors"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-warmOrange transition-colors"
                >
                  <SiLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
