import talib
import numpy as np

# Overlap Studies Functions


def BBANDS(close, timeperiod=5, nbdevup=2, nbdevdn=2, matype=0):
    "BBANDS - Bollinger Bands"
    upperband, middleband, lowerband = talib.BBANDS(np.asarray(close), timeperiod=5, nbdevup=2, nbdevdn=2, matype=0)
    return [upperband, middleband, lowerband]

def DEMA(close, timeperiod=30):
    "DEMA - Double Exponential Moving Average"
    real = DEMA(close, timeperiod=30)
    pass

def EMA(close, timeperiod=30):
    """
    EMA - Exponential Moving Average. NOTE: The EMA function has an unstable period.
    """
    real = talib.EMA(np.asarray(close), timeperiod=30)
    return [real]

def SMA(close):
    "SMA - Simple Moving Average"
    real = talib.SMA(np.asarray(close), timeperiod=30)
    return [real]
