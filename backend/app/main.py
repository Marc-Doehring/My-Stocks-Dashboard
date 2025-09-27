from fastapi import FastAPI, HTTPException # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import os
from dotenv import load_dotenv # type: ignore
from .services import finnhub, yfinance_service

# env laden
load_dotenv()
FINNHUB_KEY = os.getenv("FINNHUB_API_KEY")

app = FastAPI(title="stocks-backend")

# CORS (für React Dev Server auf Port 5173)
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/finnhub/quote")
async def get_quote(symbol: str):
    if not FINNHUB_KEY:
        raise HTTPException(status_code=500, detail="FINNHUB_API_KEY fehlt")
    return await finnhub.get_quote(symbol, FINNHUB_KEY)

@app.get("/api/yfinance/history")
async def get_history(symbol: str, period: str = "1mo"):
    return await yfinance_service.get_history(symbol, period)

@app.get("/api/yfinance/info")
async def ticker_info(symbol: str):
    return await yfinance_service.get_ticker_info(symbol)

@app.get("/api/finnhub/profile")
async def company_profile(symbol: str):
    if not FINNHUB_KEY:
        raise HTTPException(status_code=500, detail="FINNHUB_API_KEY fehlt")
    return await finnhub.get_company_profile(symbol, FINNHUB_KEY)


