
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LocationInput({ label, icon: Icon, placeholder, value, onChange, iconColor }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg ${iconColor} flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </div>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-14 h-12 rounded-xl border-border bg-card"
        />
      </div>
    </div>
  );
}