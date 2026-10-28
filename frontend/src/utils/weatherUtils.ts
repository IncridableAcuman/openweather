// Haroratni °C yoki °F ga o'tkazish
export const formatTemp = (tempC: number, unit: 'C' | 'F'): string => {
  if (unit === 'F') {
    const tempF = (tempC * 9) / 5 + 32;
    return `${Math.round(tempF)}°F`;
  }
  return `${Math.round(tempC)}°C`;
};

export const getTempNumber = (tempC: number, unit: 'C' | 'F'): number => {
  if (unit === 'F') {
    return Math.round((tempC * 9) / 5 + 32);
  }
  return Math.round(tempC);
};

// Shamol yo'nalishini darajadan matnga aylantirish (N, NE, E, SE, S, SW, W, NW)
export const getWindDirection = (deg?: number): string => {
  if (deg === undefined) return '';
  const directions = [
    'Shimol (N)',
    'Shimoli-Sharq (NE)',
    'Sharq (E)',
    'Janubi-Sharq (SE)',
    'Janub (S)',
    'Janubi-G\'arb (SW)',
    'G\'arb (W)',
    'Shimoli-G\'arb (NW)'
  ];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

// Unix vaqtni formatlash (soat:daqiqa)
export const formatUnixTime = (unixSeconds?: number, timezoneOffset = 0): string => {
  if (!unixSeconds) return '--:--';
  // Foydalanuvchi lokal vaqti yoki shahar vaqt zonasiga muvofiq
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Sana formatlash (hafta kuni, kun oy)
export const formatUzbekDate = (date: Date): string => {
  const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
  ];
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day}-${monthName} ${year}`;
};

// Namlik qulaylik darajasi
export const getHumidityLevel = (humidity: number): { label: string; color: string } => {
  if (humidity < 30) return { label: 'Quruq', color: 'text-amber-300' };
  if (humidity <= 60) return { label: 'Qulay', color: 'text-emerald-300' };
  return { label: 'Yuqori namlik', color: 'text-blue-300' };
};

// Ko'rinish darajasi
export const getVisibilityLevel = (visibilityMeters?: number): string => {
  if (visibilityMeters === undefined) return '';
  const km = (visibilityMeters / 1000).toFixed(1);
  if (visibilityMeters >= 10000) return `${km} km (A'lo)`;
  if (visibilityMeters >= 5000) return `${km} km (Yaxshi)`;
  if (visibilityMeters >= 2000) return `${km} km (O'rtacha)`;
  return `${km} km (Past)`;
};
