import { IProduct } from "@/types/constants"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function productBasePriceSum(product: IProduct): number {
  const pc = product.priceConfiguration;

  let total = 0;
  let foundAny = false;

  for (const cfg of Object.values(pc)) {
    if (cfg?.priceType !== "base") continue;

    const prices = Object.values(cfg.availableOptions ?? {})
      .map(Number)
      .filter((n) => !Number.isNaN(n));

    if (prices.length) {
      total += Math.min(...prices);
      foundAny = true;
    }
  }

  return foundAny ? total : (0);
}