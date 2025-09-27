import StockCard from "./components/StockCard";

export default function App() {
  return (
    <div style={{
      background: "#121212",
      padding: "2rem",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }}>
      <StockCard symbol="AAPL" />
      <StockCard symbol="TSLA" />
      <StockCard symbol="MSFT" />
      <StockCard symbol="GOOGL" />
      <StockCard symbol="AMZN" />
      <StockCard symbol="NVDA" />
      <StockCard symbol="META" />
    </div>
  );
}
