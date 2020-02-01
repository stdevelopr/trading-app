import talib
import numpy as np



def SMA(values):
    output = talib.SMA(np.asarray(values))
    return output
