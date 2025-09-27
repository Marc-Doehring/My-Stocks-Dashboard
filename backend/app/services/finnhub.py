import httpx
from fastapi import HTTPException # type: ignore

BASE_URL = "https://finnhub.io/api/v1"

async def get_quote(symbol: str, api_key: str):
    url = f"{BASE_URL}/quote"
    params = {"symbol": symbol, "token": api_key}
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(url, params=params)
    if r.status_code != 200:
        raise HTTPException(status_code=r.status_code, detail=r.text)
    return r.json()

async def get_company_profile(symbol: str, api_key: str):
    url = f"{BASE_URL}/stock/profile2"
    params = {"symbol": symbol, "token": api_key}
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(url, params=params)
    if r.status_code != 200:
        raise HTTPException(status_code=r.status_code, detail=r.text)
    return r.json()
