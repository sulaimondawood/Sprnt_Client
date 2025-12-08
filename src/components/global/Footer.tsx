import { Car } from "lucide-react";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Sprnt</span>
            </div>
            <p className="text-muted-foreground">
              Your trusted ride-hailing partner for seamless urban
              transportation.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  to="#"
                  className="hover:text-background transition-colors"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-background transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-background transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  to="#"
                  className="hover:text-background transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-background transition-colors"
                >
                  Safety
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-background transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  to="#"
                  className="hover:text-background transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-background transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-background transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 pt-8 text-center text-muted-foreground">
          <p>© 2024 Sprnt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
