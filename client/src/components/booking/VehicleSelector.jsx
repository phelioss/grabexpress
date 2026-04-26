
import { Bike, Car, Truck } from 'lucide-react';
import { Label } from '@/components/ui/label';

const vehicles = [
  { value: 'motorcycle', label: 'Motorcycle', icon: Bike, price: '₱60', time: '15-30 min' },
  { value: 'car', label: 'Car', icon: Car, price: '₱120', time: '20-40 min' },
  { value: 'van', label: 'Van', icon: Truck, price: '₱250', time: '30-60 min' },
];

export default function VehicleSelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Vehicle</Label>
      <div className="grid grid-cols-3 gap-3">
        {vehicles.map((v) => (
          <button
            key={v.value}
            type="button"
            onClick={() => onChange(v.value)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
              ${value === v.value 
                ? 'border-primary bg-primary/5' 
                : 'border-border bg-card hover:border-primary/30'
              }`}
          >
            <v.icon className={`w-6 h-6 ${value === v.value ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-sm font-semibold ${value === v.value ? 'text-primary' : ''}`}>{v.label}</span>
            <div className="text-center">
              <div className="text-xs font-bold">{v.price}</div>
              <div className="text-[10px] text-muted-foreground">{v.time}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}