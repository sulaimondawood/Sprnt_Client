import Button from "@/components/common/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Car,
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  Shield,
  Smartphone,
  Star,
  User,
} from "lucide-react";
import { Link } from "react-router";

const LandingPage = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Track your ride in real-time with our advanced GPS system.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified drivers, secure payments, and 24/7 support.",
    },
    {
      icon: Clock,
      title: "Quick Pickup",
      description: "Get picked up within minutes, anytime, anywhere.",
    },
    {
      icon: CreditCard,
      title: "Easy Payments",
      description: "Multiple payment options including wallet and cards.",
    },
  ];

  const stats = [
    { value: "10M+", label: "Rides Completed" },
    { value: "50K+", label: "Active Drivers" },
    { value: "4.9", label: "Average Rating" },
    { value: "100+", label: "Cities Covered" },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Star className="h-4 w-4 fill-current" />
                Rated #1 Ride-hailing App
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your ride, <br />
                <span className="text-gradient">on demand</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg">
                Experience seamless transportation with RideFlow. Whether you're
                commuting to work or exploring the city, we've got you covered.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth?role=rider">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 gap-2"
                  >
                    <User className="h-5 w-5" />
                    Ride with us
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/auth?role=driver">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-lg px-8 gap-2"
                  >
                    <Car className="h-5 w-5" />
                    Drive with us
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-semibold">10,000+</span>{" "}
                  happy riders this week
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 gradient-primary rounded-3xl opacity-20 blur-3xl" />
              <Card className="relative p-8 bg-card/50 backdrop-blur-xl border-border/50">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-background rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse-soft" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Pickup location
                      </p>
                      <p className="font-medium">Victoria Island, Lagos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-background rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Drop-off location
                      </p>
                      <p className="font-medium">Lekki Phase 1</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["Economy", "Comfort", "Premium"].map((type, i) => (
                      <div
                        key={type}
                        className={`p-3 rounded-xl text-center cursor-pointer transition-all ${
                          i === 1
                            ? "gradient-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        <Car className="h-6 w-6 mx-auto mb-1" />
                        <p className="text-sm font-medium">{type}</p>
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="w-full">
                    Book Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary-foreground">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why choose RideFlow?
            </h2>
            <p className="text-muted-foreground text-lg">
              We're committed to providing the best ride experience with
              cutting-edge technology and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to start driving?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join our growing community of drivers and start earning on your
                own schedule. Flexible hours, competitive pay, and excellent
                support.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Set your own hours",
                  "Weekly payouts",
                  "Insurance coverage",
                  "24/7 driver support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                      <ChevronRight className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth?role=driver">
                <Button size="lg" className="gap-2">
                  <Car className="h-5 w-5" />
                  Become a Driver
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center">
                <Smartphone className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
