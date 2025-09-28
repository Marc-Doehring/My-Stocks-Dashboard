import { useEffect, useState } from "react";
import { getFinnhubQuote, getFinnhubProfile } from "../services/api";

type StockCardProps = { symbol: string };

export default function StockCard({ symbol }: StockCardProps) {
  const [profile, setProfile] = useState<any>(null);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [p, q] = await Promise.all([
        getFinnhubProfile(symbol),
        getFinnhubQuote(symbol),
      ]);
      setProfile(p);
      setQuote(q);
    } catch (e: any) {
      setError(e.message ?? "Fehler beim Laden");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // initial
    // const interval = setInterval(fetchData, 30000); // alle 30 Sekunden
    // return () => clearInterval(interval);
  }, [symbol]);

  if (loading) return <div style={{ color: "#fff" }}>Loading {symbol}…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const priceChange = quote?.c && quote?.pc ? quote.c - quote.pc : 0;
  const priceColor = priceChange >= 0 ? "limegreen" : "red";
  const priceArrow = priceChange >= 0 ? "▲" : "▼";

  return (
    <div style={{
      background: "#1e1e2f",
      color: "#fff",
      padding: "0.5rem",
      borderRadius: "15px",
      margin: "0.5rem",
      width: "220px",
      maxHeight: "300px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.4)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "transform 0.2s",
    }}>
      {profile?.logo && (
        <img src={profile.logo} alt={profile.name} style={{ width: 60, marginBottom: 12, borderRadius: 8 }} />
      )}
      <h2 style={{ textAlign: "center", fontSize: "1.2rem", marginBottom: 8 }}>
        {profile?.name || symbol}
      </h2>
      <p style={{ fontSize: "1rem", margin: "4px 0" }}>
        <strong>Preis:</strong>{" "}
        <span style={{ color: priceColor, fontWeight: "bold" }}>
          {quote?.c ?? "—"} {profile?.currency} {priceArrow}
        </span>
      </p>
      <p style={{ fontSize: "0.9rem", margin: "2px 0" }}>Tageshoch: {quote?.h ?? "—"}</p>
      <p style={{ fontSize: "0.9rem", margin: "2px 0" }}>Tagestief: {quote?.l ?? "—"}</p>
      <p style={{ fontSize: "0.9rem", margin: "2px 0" }}>Schlusskurs: {quote?.pc ?? "—"}</p>
      <p style={{ fontSize: "0.85rem", marginTop: 8, color: "#aaa" }}>
        
      </p>
    </div>
  );
}
