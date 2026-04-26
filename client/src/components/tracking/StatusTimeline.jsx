
import { CheckCircle2, Circle, Package, Truck, MapPin, PartyPopper } from 'lucide-react';

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Package, desc: 'Waiting for driver assignment' },
  { key: 'picked_up', label: 'Picked Up', icon: CheckCircle2, desc: 'Driver has your package' },
  { key: 'in_transit', label: 'In Transit', icon: Truck, desc: 'On the way to destination' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Almost there' },
  { key: 'delivered', label: 'Delivered', icon: PartyPopper, desc: 'Package delivered successfully' },
];

export default function StatusTimeline({ currentStatus }) {
  const currentIndex = statusSteps.findIndex(s => s.key === currentStatus);

  return (
    <div className="space-y-0">
      {statusSteps.map((step, i) => {
        const isCompleted = i <= currentIndex;
        const isCurrent = i === currentIndex;
        const isLast = i === statusSteps.length - 1;

        return (
          <div key={step.key} className="flex gap-4">
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                ${isCurrent 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/10' 
                  : isCompleted 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                {isCompleted ? <step.icon className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
              </div>
              {!isLast && (
                <div className={`w-0.5 h-12 transition-all ${isCompleted && i < currentIndex ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
            {/* Content */}
            <div className="pb-8">
              <p className={`font-semibold text-sm ${isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}