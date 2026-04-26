
import { Badge } from '@/components/ui/badge';
import { MapPin, CircleDot, Phone, User } from 'lucide-react';
import { format } from 'date-fns';

const statusLabels = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  picked_up: { label: 'Picked Up', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  in_transit: { label: 'In Transit', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700 border-green-200' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700 border-red-200' },
};

export default function DeliveryCard({ delivery, onClick, compact = false }) {
  const status = statusLabels[delivery.status] || statusLabels.pending;

  if (compact) {
    return (
      <button onClick={onClick} className="w-full text-left bg-card rounded-2xl border border-border p-4 hover:border-primary/30 hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-muted-foreground">{delivery.tracking_id}</span>
          <Badge variant="secondary" className={`${status.color} border text-[10px] font-semibold`}>
            {status.label}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CircleDot className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="text-sm truncate">{delivery.pickup_address}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
            <span className="text-sm truncate">{delivery.dropoff_address}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">{format(new Date(delivery.created_date), 'MMM d, h:mm a')}</span>
          <span className="text-sm font-bold text-primary">₱{delivery.estimated_cost?.toFixed(0)}</span>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-muted-foreground">{delivery.tracking_id}</span>
          <h3 className="text-lg font-bold mt-1">{delivery.service_type?.replace('_', ' ')} Delivery</h3>
        </div>
        <Badge variant="secondary" className={`${status.color} border font-semibold`}>
          {status.label}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <CircleDot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Pickup</p>
            <p className="text-sm font-medium">{delivery.pickup_address}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin className="w-4 h-4 text-destructive" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Drop-off</p>
            <p className="text-sm font-medium">{delivery.dropoff_address}</p>
          </div>
        </div>
      </div>

      {delivery.driver_name && (
        <div className="bg-muted rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">{delivery.driver_name}</p>
              <p className="text-xs text-muted-foreground">{delivery.vehicle_type}</p>
            </div>
          </div>
          {delivery.driver_phone && (
            <a href={`tel:${delivery.driver_phone}`} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-sm text-muted-foreground">Estimated Cost</span>
        <span className="text-xl font-bold text-primary">₱{delivery.estimated_cost?.toFixed(0)}</span>
      </div>
    </div>
  );
}