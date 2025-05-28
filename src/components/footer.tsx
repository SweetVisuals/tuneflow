import { Github, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-2 md:py-2 mt-3">
      <div className="container flex flex-col md:flex-row items-center justify-between md:gap-0">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Vibe
          </div>
          <p className="text-sm text-muted-foreground">
            Connect, create, and collaborate with artists and producers worldwide.
          </p>
        </div>

        <div className="text-xs text-muted-foreground self-center mt-10">
          &copy; 2025 Vibe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
