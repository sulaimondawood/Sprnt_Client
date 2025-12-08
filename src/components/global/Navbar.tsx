import { Car, Menu, X } from "lucide-react";
import { Link } from "react-router";
import Button from "../common/button";
import { useState } from "react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">RideFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              to="#safety"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Safety
            </Link>
            <Link
              to="#drive"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Drive with us
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth?signup=true">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="#features"
              className="block text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Link
              to="#safety"
              className="block text-muted-foreground hover:text-foreground"
            >
              Safety
            </Link>
            <Link
              to="#drive"
              className="block text-muted-foreground hover:text-foreground"
            >
              Drive with us
            </Link>
            <div className="flex gap-3 pt-4 border-t border-border">
              <Link to="/auth" className="flex-1">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?signup=true" className="flex-1">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
