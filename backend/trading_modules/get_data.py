import requests
import json
from . config import API_KEY



def fcsapi():
    """
    https://fcsapi.com/document/forex-api
    """
    payload = {
        "type":"forex",
        "top_symbol" : '1',
        "access_key": API_KEY
    }
    r = requests.get("https://fcsapi.com/api/forex/list", params=payload)

    resp = json.loads(r.text)

    return resp


def hist_300(symbol):
    payload = {
        # "chart":"1",
        "symbol":symbol,
        "period":"1d",
        "access_key": API_KEY
    }
    r = requests.get("https://fcsapi.com/api/forex/history", params=payload)

    resp = json.loads(r.text)
    return resp
    