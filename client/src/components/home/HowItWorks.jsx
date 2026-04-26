
import { MapPin, Package, Navigation, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { icon: MapPin, title: 'Set Locations', desc: 'Enter your pickup and drop-off addresses.' },
  { icon: Package, title: 'Package Details', desc: 'Choose package type and add special instructions.' },
  { icon: Navigation, title: 'Driver En Route', desc: 'A nearby driver picks up your package.' },
  { icon: CheckCircle2, title: 'Delivered!', desc: 'Your package arrives safe and sound.' },
];

export default function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">How It Works</h2>
        <p className="text-muted-foreground">Four simple steps to get your package delivered.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="relative inline-block mb-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="font-semibold mb-1">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}