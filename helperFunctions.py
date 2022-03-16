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

def readTxtToTrainLists(fileName="randWiki"):
    """Reads a .txt file and loads the information into training data lists. 

    Args:
        fileName (str, optional): name of .txt file containing the corpus. Defaults to "randWiki".

    Returns:
        _type_: xTrain, yTrain
    """
    xTrain = []
    yTrain = []
    with open(f'{fileName}.txt', 'r') as f:
        for line in f:
            line = re.sub('\s', ' ', line)
            xTrain.append(line)
            yTrain.append(1)
    return xTrain, yTrain