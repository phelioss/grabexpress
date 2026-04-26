
import { FileText, Package, Box, Archive, UtensilsCrossed } from 'lucide-react';
import { Label } from '@/components/ui/label';

const packageTypes = [
  { value: 'document', label: 'Document', icon: FileText },
  { value: 'small_parcel', label: 'Small', icon: Package },
  { value: 'medium_parcel', label: 'Medium', icon: Box },
  { value: 'large_parcel', label: 'Large', icon: Archive },
  { value: 'food', label: 'Food', icon: UtensilsCrossed },
];

export default function PackageTypeSelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Package Type</Label>
      <div className="grid grid-cols-5 gap-2">
        {packageTypes.map((pkg) => (
          <button
            key={pkg.value}
            type="button"
            onClick={() => onChange(pkg.value)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all
              ${value === pkg.value 
                ? 'border-primary bg-primary/5 text-primary' 
                : 'border-border bg-card text-muted-foreground hover:border-primary/30'
              }`}
          >
            <pkg.icon className="w-5 h-5" />
            <span className="text-[11px] font-medium">{pkg.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}