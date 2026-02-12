import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Car, User, Eye, EyeOff, Mail, Lock, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const defaultRole =
    (searchParams.get("role") as "rider" | "driver") || "rider";
  const isSignup = searchParams.get("signup") === "true";

  const [isLogin, setIsLogin] = useState(!isSignup);
  const [role, setRole] = useState<"rider" | "driver">(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, simulateIncompleteProfile, setSimulateIncompleteProfile } =
    useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password, role === "rider" ? "RIDER" : "DRIVER");
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: `Successfully ${isLogin ? "signed in" : "signed up"} as a ${role}.`,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Car className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">Sprnt</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Sign in to access your dashboard"
                : "Sign up to start your journey"}
            </p>
          </div>

          {/* Role Selection */}
          <Tabs
            value={role}
            onValueChange={(v) => setRole(v as "rider" | "driver")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 h-14">
              <TabsTrigger
                value="rider"
                className="gap-2 data-[state=active]:gradient-rider data-[state=active]:text-rider-foreground"
              >
                <User className="h-5 w-5" />
                Rider
              </TabsTrigger>
              <TabsTrigger
                value="driver"
                className="gap-2 data-[state=active]:gradient-driver data-[state=active]:text-driver-foreground"
              >
                <Car className="h-5 w-5" />
                Driver
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 XXX XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Dev option: simulate incomplete profile */}
              {!isLogin && (
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={simulateIncompleteProfile}
                    onChange={(e) =>
                      setSimulateIncompleteProfile(e.target.checked)
                    }
                    className="rounded border-border"
                  />
                  <span className="text-muted-foreground">
                    (Dev) Simulate incomplete profile
                  </span>
                </label>
              )}

              <Button
                type="submit"
                className={`w-full h-12 text-lg ${role === "rider" ? "gradient-rider" : "gradient-driver"}`}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Please wait..."
                  : isLogin
                    ? "Sign In"
                    : "Create Account"}
              </Button>
            </form>
          </Card>

          <p className="text-center text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div
        className={`hidden lg:flex flex-1 items-center justify-center p-12 ${role === "rider" ? "gradient-rider" : "gradient-driver"}`}
      >
        <div className="text-center text-white space-y-8 max-w-md">
          <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center mx-auto">
            {role === "rider" ? (
              <User className="h-12 w-12" />
            ) : (
              <Car className="h-12 w-12" />
            )}
          </div>
          <h2 className="text-3xl font-bold">
            {role === "rider"
              ? "Get there safely, every time"
              : "Drive your way to success"}
          </h2>
          <p className="text-lg opacity-90">
            {role === "rider"
              ? "Book rides instantly, track in real-time, and pay seamlessly. Your journey starts here."
              : "Set your own schedule, maximize your earnings, and join our community of professional drivers."}
          </p>

          <div className="grid grid-cols-3 gap-4 pt-8">
            {role === "rider" ? (
              <>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">2min</p>
                  <p className="text-sm opacity-80">Avg. pickup</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">4.9★</p>
                  <p className="text-sm opacity-80">Avg. rating</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm opacity-80">Support</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">₦50K+</p>
                  <p className="text-sm opacity-80">Weekly avg.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">Flex</p>
                  <p className="text-sm opacity-80">Schedule</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">Free</p>
                  <p className="text-sm opacity-80">Insurance</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
