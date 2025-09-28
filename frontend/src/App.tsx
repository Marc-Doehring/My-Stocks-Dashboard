import StockCard from "./components/StockCard";

const magnificentSeven = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA"];

export default function App() {
  return (
    <div style={{
      backgroundColor: "#121212",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",  // zentriert den Content horizontal
      padding: "2rem"
    }}>
      {/* Content Container */}
      <div style={{
        width: "100%",
        maxWidth: "1660px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"       // Überschrift und Karten zentrieren
      }}>
        <h1 style={{
          color: "gold",
          fontSize: "2.5rem",
          marginBottom: "2rem",
          textShadow: "0 0 10px gold",
          textAlign: "center"
        }}>
          Magnificent Seven
        </h1>

        {/* Karten Wrapper */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",  // Karten in jeder Zeile zentrieren
          gap: "1rem"
        }}>
          {magnificentSeven.map(symbol => (
            <StockCard key={symbol} symbol={symbol} />
          ))}
        </div>
      </div>
    </div>
  );
}
