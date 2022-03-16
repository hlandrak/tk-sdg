import matplotlib.pyplot as plt
from helperFunctions import pdfToText
from predictingSDG import tfidfModel, createTrainingSdgInstance

def sdgList(predictions, threshold):
    sdgTrue = 17*[0]
    for i in range(17):
        if predictions[i] > 1:
            sdgTrue[i] = 1
        elif predictions[i] - threshold > 0:
            sdgTrue[i] = (predictions[i] - threshold) / (1 - threshold)
        else:
            sdgTrue[i] = 0
    return sdgTrue

def plotTestTextPredictions(testText, pipeBoolean, pipeIndividual):
    barekraftBool = tfidfModel(testText, pipeBoolean)
    sdgPredictions = tfidfModel(testText, pipeIndividual)
    sdgPredictionsMult = sdgPredictions*17
    for i in range(len(sdgPredictionsMult)):
        sdgPredictionsMult[i] = sdgPredictionsMult[i] * barekraftBool[i][0]
    sdgNames = []
    for i in range(17):
        sdgNames.append(i+1)
    for doku in sdgPredictionsMult:
        # print(sdgList(doku, 0.8))
        plt.figure()
        plt.ylim([0,1])
        plt.bar(sdgNames, sdgList(doku, 0.8), 0.7)
        plt.xticks(sdgNames)
        plt.show()

psykiskHelse = pdfToText("pdfs/psykiskhelseogrusplan.pdf", )
plotTestTextPredictions([psykiskHelse])