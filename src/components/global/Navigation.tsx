import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-linear ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/">
            <img src="/sprnt-logo.png" alt="logo" className="w-16" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {["Features", "How It Works", "Safety", "Drive with us"].map(
              (item) => (
                <Link
                  key={item}
                  to={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-muted-foreground hover:text-white transition-colors font-medium relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ),
            )}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to={ROUTES.login}>
              <Button
                variant="ghost"
                size="lg"
                className="font-medium text-muted-foreground"
              >
                Sign In
              </Button>
            </Link>
            <Link to={ROUTES.register}>
              <Button
                size="lg"
                className="font-medium shadow-lg hover:shadow-xl transition-shadow bg-foreground text-background hover:bg-foreground/90"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-background border-b border-border"
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            {["Features", "How It Works", "Safety", "Drive with us"].map(
              (item) => (
                <Link
                  key={item}
                  to={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-muted-foreground hover:text-foreground font-medium py-2"
                >
                  {item}
                </Link>
              ),
            )}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Link to={ROUTES.login} className="flex-1">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to={ROUTES.register} className="flex-1">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
