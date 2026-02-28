import { testimonials } from "@/constants";
import { fadeInUp, scaleIn, staggerContainer } from "@/pages/LandingPage";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Quote, Star } from "lucide-react";

export const Testimonials = () => {
  return (
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
            Join thousands of satisfied riders and drivers who trust SPRNT every
            day.
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

                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
