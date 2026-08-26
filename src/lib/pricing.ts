export interface DiscountStage {
  time: string; // HH:mm format, e.g., "18:00"
  discount: number; // percentage, e.g., 10
}

export interface PricingInfo {
  originalPrice: number;
  currentDiscount: number;
  currentPrice: number;
  nextDiscount: number | null;
  nextPrice: number | null;
  nextDiscountTime: string | null;
  countdownMinutes: number | null;
}

/**
 * Calculates current and next pricing based on a schedule.
 * @param originalPrice The base price of the item
 * @param schedule Array of discount stages, sorted by time ascending
 * @param simulatedTime Optional time string (HH:mm) to simulate current time. If not provided, uses actual system time.
 */
export function getCurrentPricing(
  originalPrice: number,
  schedule: DiscountStage[],
  simulatedTime?: string
): PricingInfo {
  // Determine current time
  const now = new Date();
  let currentHours = now.getHours();
  let currentMinutes = now.getMinutes();

  if (simulatedTime) {
    const [h, m] = simulatedTime.split(':').map(Number);
    currentHours = h;
    currentMinutes = m;
  }
  
  const currentTotalMinutes = currentHours * 60 + currentMinutes;

  // Find the active and next discount stages
  let activeStage: DiscountStage | null = null;
  let nextStage: DiscountStage | null = null;

  for (let i = 0; i < schedule.length; i++) {
    const stage = schedule[i];
    const [stageH, stageM] = stage.time.split(':').map(Number);
    const stageTotalMinutes = stageH * 60 + stageM;

    if (currentTotalMinutes >= stageTotalMinutes) {
      activeStage = stage;
    } else {
      nextStage = stage;
      break; // Since the schedule is assumed to be sorted, the first one in the future is the next stage
    }
  }

  // Calculate prices
  const currentDiscount = activeStage ? activeStage.discount : 0;
  const currentPrice = originalPrice - (originalPrice * currentDiscount) / 100;

  let nextDiscount = null;
  let nextPrice = null;
  let nextDiscountTime = null;
  let countdownMinutes = null;

  if (nextStage) {
    nextDiscount = nextStage.discount;
    nextPrice = originalPrice - (originalPrice * nextDiscount) / 100;
    
    // Format time for display (e.g., "6:00 PM")
    const [h, m] = nextStage.time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    const displayM = m.toString().padStart(2, '0');
    nextDiscountTime = `${displayH}:${displayM} ${ampm}`;

    // Calculate countdown
    const stageTotalMinutes = h * 60 + m;
    countdownMinutes = stageTotalMinutes - currentTotalMinutes;
  }

  return {
    originalPrice,
    currentDiscount,
    currentPrice,
    nextDiscount,
    nextPrice,
    nextDiscountTime,
    countdownMinutes,
  };
}
