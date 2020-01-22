import requests
import json



def fcsapi():
    """
    https://fcsapi.com/document/forex-api
    """
    payload = {
        "type":"forex",
        "top_symbol" : '1',
        "access_key": FCSAPI_KEY
    }
    r = requests.get("https://fcsapi.com/api/forex/list", params=payload)

    resp = json.loads(r.text)

    return resp