import yfinance as yf # type: ignore
import functools
import asyncio

def _fetch_history(symbol: str, period: str):
    ticker = yf.Ticker(symbol)
    df = ticker.history(period=period)
    if df.empty:
        return []
    df = df.reset_index()
    return df.to_dict(orient="records")

async def get_history(symbol: str, period: str = "1mo"):
    loop = asyncio.get_running_loop()
    fn = functools.partial(_fetch_history, symbol, period)
    return await loop.run_in_executor(None, fn)

def _fetch_ticker_info(symbol: str):
    t = yf.Ticker(symbol)
    info = t.info  # Dictionary mit vielen Daten: logo_url, longName, currency, market
    return {
        "symbol": symbol,
        "name": info.get("longName"),
        "currency": info.get("currency"),
        "market": info.get("exchange"),
        "logo": info.get("logo_url"),
        "currentPrice": info.get("regularMarketPrice"),
    }

async def get_ticker_info(symbol: str):
    loop = asyncio.get_running_loop()
    fn = functools.partial(_fetch_ticker_info, symbol)
    return await loop.run_in_executor(None, fn)

