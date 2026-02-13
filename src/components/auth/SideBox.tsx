import { Car, User } from "lucide-react";
import React from "react";

export const SideBox = ({ role }: { role: string }) => {
  return (
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
  );
};
