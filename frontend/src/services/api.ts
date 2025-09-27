const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

/**
 * Finnhub Quote (aktueller Kurs, Tageshoch/Tief etc.)
 */
export async function getFinnhubQuote(symbol: string | number | boolean) {
  const res = await fetch(
    `${API_BASE}/api/finnhub/quote?symbol=${encodeURIComponent(symbol)}`
  );
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

/**
 * Historische Daten von yfinance
 */
export async function getYFinanceHistory(symbol: string | number | boolean, period = "1mo") {
  const res = await fetch(
    `${API_BASE}/api/yfinance/history?symbol=${encodeURIComponent(
      symbol
    )}&period=${period}`
  );
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function getYFinanceInfo(symbol: string): Promise<any> {
  const res = await fetch(
    `${API_BASE}/api/yfinance/info?symbol=${encodeURIComponent(symbol)}`
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getFinnhubProfile(symbol: string): Promise<any> {
  const res = await fetch(
    `${API_BASE}/api/finnhub/profile?symbol=${encodeURIComponent(symbol)}`
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


