import {
  Car,
  CreditCard,
  Globe,
  MapPin,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";

export const features = [
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

export const stats = [
  { value: "10M+", label: "Rides Completed", icon: Car },
  { value: "50K+", label: "Active Drivers", icon: Users },
  { value: "4.9★", label: "Average Rating", icon: Star },
  { value: "100+", label: "Cities Worldwide", icon: Globe },
];

export const testimonials = [
  {
    quote:
      "SPRNT has completely transformed my daily commute. It's reliable, affordable, and the drivers are always professional.",
    author: "Dawood Sulation",
    role: "CEO (Beelz)",
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
      "The control i have over my ride gives me peace of mind, especially for late-night rides.",
    author: "Ajibola Emmanuel",
    role: "Frequent Rider",
    rating: 5,
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Set Your Destination",
    description: "Enter where you want to go and see fare estimates instantly",
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
