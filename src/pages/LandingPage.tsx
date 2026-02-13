import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Car,
  User,
  Shield,
  MapPin,
  Clock,
  CreditCard,
  Star,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Zap,
  Globe,
  Users,
  Headphones,
  CheckCircle2,
  Play,
  Quote,
} from "lucide-react";
import rideAnimation from "@/assets/ride-animation.gif";
import cityDrive from "@/assets/city-drive.gif";
import phoneApp from "@/assets/phone-app.gif";
import { ROUTES } from "@/constants/routes";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description:
        "Track your ride in real-time with our advanced GPS system and live ETA updates.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description:
        "Verified drivers, secure payments, emergency SOS, and 24/7 support.",
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description:
        "Get matched with nearby drivers in seconds with our smart algorithm.",
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description:
        "Pay with cards, wallets, or cash. Split fares with friends easily.",
    },
  ];

  const stats = [
    { value: "10M+", label: "Rides Completed", icon: Car },
    { value: "50K+", label: "Active Drivers", icon: Users },
    { value: "4.9★", label: "Average Rating", icon: Star },
    { value: "100+", label: "Cities Worldwide", icon: Globe },
  ];

  const testimonials = [
    {
      quote:
        "SPRNT has completely transformed my daily commute. It's reliable, affordable, and the drivers are always professional.",
      author: "Sarah Chen",
      role: "Marketing Executive",
      rating: 5,
    },
    {
      quote:
        "As a driver, I love the flexibility. I can work whenever I want and the earnings are great. Best decision I've made!",
      author: "Michael Okonkwo",
      role: "SPRNT Driver",
      rating: 5,
    },
    {
      quote:
        "The safety features give me peace of mind, especially for late-night rides. The SOS button is a game-changer.",
      author: "Emily Rodriguez",
      role: "Frequent Rider",
      rating: 5,
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Set Your Destination",
      description:
        "Enter where you want to go and see fare estimates instantly",
    },
    {
      step: 2,
      title: "Get Matched",
      description: "Our algorithm finds the best driver near you in seconds",
    },
    {
      step: 3,
      title: "Enjoy Your Ride",
      description: "Track your ride in real-time and arrive safely",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg pulse-glow"
              >
                <Car className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
              </motion.div>
              <span className="text-2xl lg:text-3xl font-display font-semibold tracking-tight">
                SPRNT
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {["Features", "How It Works", "Safety", "Drive with us"].map(
                (item) => (
                  <Link
                    key={item}
                    to={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ),
              )}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Link to={ROUTES.login}>
                <Button variant="ghost" size="lg" className="font-medium">
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
                <Link to="/auth" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?signup=true" className="flex-1">
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-20 relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8 text-center lg:text-left"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20"
              >
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>Premium Ride-hailing Service</span>
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-8xl font-display font-semibold leading-tight text-white tracking-tight"
              >
                Arrive in <br />
                <span className="text-gradient">Style</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg lg:text-xl text-white/60 max-w-lg mx-auto lg:mx-0 font-light"
              >
                Experience premium urban transportation. Luxury vehicles,
                professional drivers, impeccable service—anytime, anywhere.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/auth?role=rider">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 gap-3 h-14 shadow-2xl transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <User className="h-5 w-5" />
                    Book a Ride
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/auth?role=driver">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-lg px-8 gap-3 h-14 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Car className="h-5 w-5" />
                    Become a Driver
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-6 pt-4 justify-center lg:justify-start"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-gradient-to-br from-primary to-primary/60"
                    />
                  ))}
                </div>
                <p className="text-white/50 text-sm">
                  <span className="text-white font-medium">10,000+</span> happy
                  riders this week
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 gradient-primary rounded-3xl opacity-20 blur-3xl" />
              <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <div className="absolute inset-0 shimmer" />
                <div className="relative p-8 space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                    <div className="flex-1">
                      <p className="text-xs text-white/40 uppercase tracking-wide">
                        Pickup
                      </p>
                      <p className="font-medium text-white">
                        Victoria Island, Lagos
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-xs text-white/40 uppercase tracking-wide">
                        Drop-off
                      </p>
                      <p className="font-medium text-white">Lekki Phase 1</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["Economy", "Comfort", "Premium"].map((type, i) => (
                      <motion.div
                        key={type}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl text-center cursor-pointer transition-all ${
                          i === 2
                            ? "gradient-primary text-primary-foreground shadow-lg"
                            : "bg-white/5 hover:bg-white/10 text-white/70"
                        }`}
                      >
                        <Car className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">{type}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {i === 0 ? "₦1,500" : i === 1 ? "₦2,200" : "₦3,500"}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-14 text-lg shadow-lg bg-foreground text-background hover:bg-foreground/90"
                  >
                    Book Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg font-medium"
              >
                <Clock className="inline h-4 w-4 mr-2" />3 min away
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-success text-success-foreground px-4 py-2 rounded-xl shadow-lg font-medium"
              >
                <CheckCircle2 className="inline h-4 w-4 mr-2" />
                Verified Driver
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-primary/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <p className="text-4xl lg:text-5xl font-display font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-muted-foreground mt-2 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-24 bg-muted relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Simple & Easy
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-semibold mt-4 mb-6">
              How SPRNT Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Getting a ride has never been easier. Three simple steps to your
              destination.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-border">
                <img
                  src={rideAnimation}
                  alt="SPRNT app demonstration"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-8 -right-8 w-32 h-32 border-4 border-dashed border-primary/30 rounded-full"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {howItWorks.map((item) => (
                <motion.div
                  key={item.step}
                  variants={fadeInRight}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-display font-semibold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-semibold mt-4 mb-6">
              Built for Excellence
            </h2>
            <p className="text-muted-foreground text-lg">
              We've reimagined urban transportation with cutting-edge technology
              and uncompromising service.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={scaleIn}>
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 group border-border/50 hover:border-primary/30 bg-card relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white"
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Experience Excellence
              </span>
              <h2 className="text-3xl lg:text-5xl font-display font-semibold mt-4 mb-6">
                A Seamless Ride Experience
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed font-light">
                Our app is designed with you in mind. Clean interface, intuitive
                controls, and powerful features that make every journey a
                pleasure.
              </p>

              <div className="space-y-4">
                {[
                  "Real-time driver tracking with live ETA",
                  "Multiple ride options to fit your needs",
                  "In-app messaging and calling",
                  "Rate and review your experience",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 mt-10">
                <Button
                  size="lg"
                  className="gap-2 h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Play className="h-5 w-5" />
                  Watch Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 h-14 px-8 bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={phoneApp}
                  alt="SPRNT mobile app"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute inset-4 gradient-primary rounded-3xl opacity-10 blur-xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-semibold mt-4 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of satisfied riders and drivers who trust SPRNT
              every day.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-border/50 relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
                    <Quote className="h-16 w-16" />
                  </div>
                  <div className="relative">
                    <div className="flex gap-1 mb-4">
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-primary text-primary"
                          />
                        ))}
                    </div>
                    <p className="text-foreground/80 mb-6 leading-relaxed italic font-light">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full gradient-primary" />
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* City Coverage Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Global Reach
              </span>
              <h2 className="text-3xl lg:text-5xl font-display font-semibold mt-4 mb-6">
                Available in 100+ Cities Worldwide
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                From bustling metropolises to growing cities, SPRNT is expanding
                rapidly to bring premium transportation wherever you are.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  "Lagos",
                  "Abuja",
                  "Accra",
                  "Nairobi",
                  "Cairo",
                  "Cape Town",
                  "Johannesburg",
                  "Kigali",
                ].map((city) => (
                  <span
                    key={city}
                    className="px-4 py-2 bg-background rounded-full text-sm font-medium border border-border hover:border-primary/50 transition-colors cursor-default"
                  >
                    {city}
                  </span>
                ))}
              </div>

              <Button
                size="lg"
                className="gap-2 bg-foreground text-background hover:bg-foreground/90"
              >
                <Globe className="h-5 w-5" />
                View All Cities
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
                <img
                  src={cityDrive}
                  alt="City driving"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Driver CTA Section */}
      <section id="drive-with-us" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Join Our Team
              </span>
              <h2 className="text-3xl lg:text-5xl font-display font-semibold mt-4 mb-6">
                Ready to Start Earning?
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of drivers who are earning on their own schedule.
                Flexible hours, competitive pay, and excellent support.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {[
                {
                  icon: Clock,
                  title: "Flexible Hours",
                  desc: "Work when you want",
                },
                {
                  icon: CreditCard,
                  title: "Weekly Payouts",
                  desc: "Get paid fast",
                },
                {
                  icon: Shield,
                  title: "Insurance Coverage",
                  desc: "Stay protected",
                },
                {
                  icon: Headphones,
                  title: "24/7 Support",
                  desc: "Always here to help",
                },
              ].map((item) => (
                <motion.div key={item.title} variants={scaleIn}>
                  <Card className="p-6 text-center hover:shadow-lg transition-all border-border/50 hover:border-primary/30">
                    <div className="w-12 h-12 mx-auto rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-lg">
                      <item.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link to="/auth?role=driver">
                <Button
                  size="lg"
                  className="gap-3 h-16 px-10 text-lg shadow-xl hover:shadow-2xl transition-all bg-foreground text-background hover:bg-foreground/90"
                >
                  <Car className="h-6 w-6" />
                  Become a Driver Today
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-display font-semibold text-white mb-6">
                Get the SPRNT App
              </h2>
              <p className="text-white/60 text-lg mb-10 font-light">
                Download now and experience premium urban transportation.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 px-8 bg-white text-foreground hover:bg-white/90 border-0 gap-3"
                >
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-70">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 px-8 bg-white text-foreground hover:bg-white/90 border-0 gap-3"
                >
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-70">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                  <Car className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-display font-semibold">
                  SPRNT
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                Premium urban transportation. Experience luxury on every ride.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="w-5 h-5" />
                    </a>
                  ),
                )}
              </div>
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
              © 2024 SPRNT. All rights reserved.
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
    </div>
  );
};

export default LandingPage;
