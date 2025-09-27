import { useEffect, useState } from "react";
import { getFinnhubQuote, getFinnhubProfile } from "../services/api";

type StockCardProps = { symbol: string };

export default function StockCard({ symbol }: StockCardProps) {
  const [profile, setProfile] = useState<any>(null);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [p, q] = await Promise.all([
          getFinnhubProfile(symbol),
          getFinnhubQuote(symbol),
        ]);
        if (!mounted) return;
        setProfile(p);
        setQuote(q);
      } catch (e: any) {
        setError(e.message ?? "Fehler beim Laden");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, [symbol]);

  if (loading) return <div style={{ color: "#fff" }}>Loading {symbol}…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{
      background: "#1e1e2f",
      color: "#fff",
      padding: "1rem",
      borderRadius: "12px",
      margin: "1rem",
      width: "250px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      textAlign: "center"
    }}>
      {profile?.logo && (
        <img src={profile.logo} alt={profile.name} style={{ width: 50, marginBottom: 10 }} />
      )}
      <h2>{profile?.name || symbol}</h2>
      <p><strong>Aktueller Preis:</strong> {quote?.c ?? "—"} {profile?.currency}</p>
      <p><strong>Tageshoch:</strong> {quote?.h ?? "—"}</p>
      <p><strong>Tagestief:</strong> {quote?.l ?? "—"}</p>
      <p><strong>Vorheriger Schluss:</strong> {quote?.pc ?? "—"}</p>
      <p><strong>Markt:</strong> {profile?.exchange ?? "—"}</p>
    </div>
  );
}
