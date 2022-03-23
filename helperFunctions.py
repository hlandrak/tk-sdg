import re
import pdfplumber

def pdfToText(fileName):
    """Generate strings from PDF file
    fileName: name of the PDF file"""
    allText = ""
    with pdfplumber.open(fileName) as pdf:
        for page in pdf.pages:
            allText += page.extract_text()
    # print allText)
    allText = re.sub('\s', ' ', allText)
    # print allText)
    return  allText

def txtToStr(fileName):
    """Produce string from file
    fileName: name of .txt document"""
    f = open(fileName, 'r')
    textLines = f.readlines()
    text = ""
    for line in textLines:
        text += line
    text = re.sub('\s', ' ', text)
    return text


def createTrainingSdgInstance():
    """Generates trainingdata
    xTrain is the sentences from sdgs
    yTrain is the SDG number which xTrain sentences is related to"""
    # Creating trainingdata for classifying SDGs
    xTrain = []
    yTrain = []
    for i in range(17):
        f = open(f'sdgs/sdg{i+1}.txt', encoding="utf8")
        for line in f:
            line = re.sub('\s', ' ', line)
            xTrain.append(line)
            yTrain.append(i+1)
    return [xTrain, yTrain]


import os
import glob

def createTrainingSdgBoolean():
    """Reads a .txt file and loads the information into training data lists. 

    Args:
        fileName (str, optional): name of .txt file containing the corpus. Defaults to "randWiki".

    Returns:
        _type_: xTrain, yTrain
    """
    path = 'dev-kopi/'
    xTrain = []
    yTrain = []
    stop = 0
    for filename in glob.glob(os.path.join(path, '*.txt')): # open all .txt files in "dev-kopi" folder.
        with open(os.path.join(os.getcwd(), filename), 'r') as f:
            if stop < 10000: # stop at 10000 for testing purposes. 133000 lines in total, but takes very long to train.
                for line in f:
                    line = re.sub('\s', ' ', line)
                    if len(line) != 1:
                        xTrain.append(line)
                        yTrain.append(1)
                        stop += 1

    for i in range(17):
        with open(f'sdgs/sdg{i+1}.txt', 'r') as f:
            for line in f:
                line = re.sub('\s', ' ', line)
                xTrain.append(line)
                yTrain.append(0)
    return [xTrain, yTrain]