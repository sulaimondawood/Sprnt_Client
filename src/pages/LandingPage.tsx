/* eslint-disable react-refresh/only-export-components */
import cityDrive from "@/assets/city-drive.gif";
import phoneApp from "@/assets/phone-app.gif";
import rideAnimation from "@/assets/ride-animation.gif";
import { Footer } from "@/components/global/Footer";
import { Navigation } from "@/components/global/Navigation";
import { Hero } from "@/components/landing/Hero";
import { Testimonials } from "@/components/landing/Testimonial";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { features, howItWorks, stats } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Globe,
  Headphones,
  Play,
  Shield,
  Star,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <Navigation />
      {/* Hero Section */}
      <Hero />
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

              <div className="flex flex-wrap gap-4 mt-10">
                <Button
                  size="lg"
                  className="w-full min-[450px]:w-fit gap-2 h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Play className="h-5 w-5" />
                  Watch Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 w-full min-[450px]:w-fit h-14 px-8 bg-white/5 border-white/20 text-white hover:bg-white/10"
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
      <Testimonials />
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
              <Link to={ROUTES.register}>
                <Button
                  size="lg"
                  className="gap-3 h-16 px-4 sm:px-10 text-lg shadow-xl hover:shadow-2xl transition-all bg-foreground text-background hover:bg-foreground/90"
                >
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

      <Footer />
    </div>
  );
};

export default LandingPage;
