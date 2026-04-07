import { Check, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TrackingResult } from "@/types";

interface TrackingTimelineProps {
  result: TrackingResult;
}

export function TrackingTimeline({ result }: TrackingTimelineProps) {
  const isDelivered = result.events.every((e) => e.completed);

  return (
    <div className="mt-6 animate-fade-up">
      {/* Summary card */}
      <Card className="mb-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-gray-500">Nomor Resi</p>
            <p className="font-mono font-bold text-gray-900">{result.resi}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Layanan</p>
            <p className="font-medium text-gray-900">{result.service}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Pengirim</p>
            <p className="font-medium text-gray-900">{result.sender}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Penerima</p>
            <p className="font-medium text-gray-900">{result.receiver}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Rute</p>
            <p className="font-medium text-gray-900">
              {result.origin} → {result.destination}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Status</p>
            <Badge variant={isDelivered ? "success" : "warning"}>
              {isDelivered ? "Terkirim" : "Dalam Pengiriman"}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card>
        <h3 className="mb-4 text-lg font-bold text-gray-900">Status Pengiriman</h3>
        <div className="relative">
          {result.events.map((event, index) => {
            const isLast = index === result.events.length - 1;

            return (
              <div key={index} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Vertical line */}
                {!isLast && (
                  <div
                    className={`absolute top-6 left-[15px] h-full w-0.5 ${
                      event.completed ? "bg-brand-300" : "bg-gray-200"
                    }`}
                  />
                )}

                {/* Dot */}
                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    event.completed
                      ? "bg-brand-600 text-white"
                      : "border-2 border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {event.completed ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <p
                    className={`font-medium ${
                      event.completed ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {event.status}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    {event.timestamp && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.timestamp}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
