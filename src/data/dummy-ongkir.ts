import type { OngkirRate } from "@/types";

const basePrices: Record<string, number> = {
  pickup: 350000,
  box: 600000,
  truck: 1200000,
  fuso: 2000000,
};

const distanceMultipliers: Record<string, Record<string, number>> = {
  cirebon: {
    jakarta: 1.0,
    bandung: 0.8,
    semarang: 0.7,
    surabaya: 1.5,
    yogyakarta: 1.0,
    solo: 1.1,
    malang: 1.6,
    tangerang: 1.1,
    bekasi: 0.9,
    depok: 0.9,
    bogor: 0.9,
    karawang: 0.6,
    purwokerto: 0.6,
    tegal: 0.4,
    pekalongan: 0.5,
    indramayu: 0.3,
    kuningan: 0.2,
    majalengka: 0.2,
    subang: 0.5,
  },
};

export function getOngkirEstimate(
  origin: string,
  destination: string,
  vehicle: string,
  weightKg: number
): OngkirRate {
  const basePrice = basePrices[vehicle] || 500000;

  // Get distance multiplier or default
  const originRoutes = distanceMultipliers[origin];
  const multiplier = originRoutes?.[destination] ?? 1.2;

  const weightSurcharge = Math.max(0, weightKg - 100) * 1000;
  const calculated = basePrice * multiplier + weightSurcharge;

  const min = Math.round(calculated * 0.9);
  const max = Math.round(calculated * 1.1);

  // Estimate days based on distance
  const baseDays = multiplier <= 0.5 ? 1 : multiplier <= 1.0 ? 2 : 3;

  return {
    price: { min, max },
    estimatedDays: { min: baseDays, max: baseDays + 1 },
    vehicle,
  };
}
