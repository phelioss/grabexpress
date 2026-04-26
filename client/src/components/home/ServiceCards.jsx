
import { Link } from 'react-router-dom';
import { Zap, Clock, CalendarDays, Bike, Car, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Zap,
    title: 'Instant Delivery',
    description: 'Pick up in 10 minutes, deliver within the hour.',
    color: 'bg-primary/10 text-primary',
    tag: 'Most Popular',
  },
  {
    icon: Clock,
    title: 'Same Day',
    description: 'Flexible pickup, guaranteed same-day delivery.',
    color: 'bg-accent text-accent-foreground',
    tag: 'Best Value',
  },
  {
    icon: CalendarDays,
    title: 'Scheduled',
    description: 'Plan ahead. Choose your preferred date and time.',
    color: 'bg-secondary text-secondary-foreground',
    tag: null,
  },
];

const vehicles = [
  { icon: Bike, label: 'Motorcycle', desc: 'Small parcels & docs' },
  { icon: Car, label: 'Car', desc: 'Medium packages' },
  { icon: Truck, label: 'Van', desc: 'Large items' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function ServiceCards() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Service Types */}
      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Our Services</h2>
        <p className="text-muted-foreground mb-8">Choose the delivery speed that works for you.</p>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={item}>
              <Link to="/book">
                <div className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer h-full">
                  {service.tag && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      {service.tag}
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Vehicle Types */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Vehicle Options</h2>
        <p className="text-muted-foreground mb-8">The right ride for every package size.</p>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4"
        >
          {vehicles.map((v) => (
            <motion.div key={v.label} variants={item}>
              <div className="bg-card rounded-2xl p-5 border border-border text-center hover:border-primary/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
                  <v.icon className="w-7 h-7 text-foreground" />
                </div>
                <h4 className="font-semibold text-sm">{v.label}</h4>
                <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}