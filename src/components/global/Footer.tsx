import { Car } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-5">
            <Link to="/">
              <img src="/sprnt-logo.png" alt="logo" className="w-16" />
            </Link>
            <p className="text-muted-foreground mb-6">
              Premium urban transportation. Experience luxury on every ride.
            </p>
          </div>

          {[
            {
              title: "Company",
              links: ["About Us", "Careers", "Press", "Blog"],
            },
            {
              title: "Products",
              links: ["Ride", "Drive", "Business", "Delivery"],
            },
            {
              title: "Support",
              links: ["Help Center", "Safety", "Contact", "FAQs"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SPRNT. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
