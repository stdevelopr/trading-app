import requests
import json



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


def hist_300():
    payload = {
        # "chart":"1",
        "symbol":"GBP/USD",
        "period":"1h",
        "access_key": API_KEY
    }
    r = requests.get("https://fcsapi.com/api/forex/history", params=payload)

    resp = json.loads(r.text)
    return resp
    