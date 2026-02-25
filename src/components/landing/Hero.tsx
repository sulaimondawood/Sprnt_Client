import { ROUTES } from "@/constants/routes";
import { fadeInRight, fadeInUp, staggerContainer } from "@/pages/LandingPage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  User,
} from "lucide-react";
import { Card } from "../ui/card";

export const Hero = () => {
  return (
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
              <Link to={ROUTES.login}>
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
  );
};
