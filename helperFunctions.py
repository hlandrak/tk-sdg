import re
import pdfplumber
import json

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

def pdfToTextPages(fileName, name):
    """
    Create list of strings from pdf. Each string is the text on 1 page in the pdf. Return list.
    """
    textList = []
    with pdfplumber.open(fileName) as pdf:
        for page in pdf.pages:
            textPage = page.extract_text()
            textPage = re.sub('\s', ' ', textPage)
            textList.append(textPage)
    # TODO implement saving of list of str to .txt and function for loading .txt to list of str
    
    # print(all_text)
    with open(f"txt/{name}.txt", "w") as f:
        for page in textList:
            f.write(f"{page}\n")
        f.writelines(textList)
    return textList

def txtToStr(fileName):
    """Produce string from file
    fileName: name of .txt document"""
    f = open(fileName, 'r')
    textLines = f.readlines()
    text = []
    for line in textLines:
        line = re.sub('\s', ' ', line)
        text.append(line)
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
        with open(os.path.join(os.getcwd(), filename), 'r', encoding="utf8") as f:
            if stop < 10000: # stop at 10000 for testing purposes. 133000 lines in total, but takes very long to train.
                for line in f:
                    line = re.sub('\s', ' ', line)
                    if len(line) != 1:
                        xTrain.append(line)
                        yTrain.append(1)
                        stop += 1

    for i in range(17):
        with open(f'sdgs/sdg{i+1}.txt', 'r', encoding="utf8") as f:
            for line in f:
                line = re.sub('\s', ' ', line)
                xTrain.append(line)
                yTrain.append(0)
    return [xTrain, yTrain]

def listToSting(list):
    string = ""
    for ele in list:
        string += f"{round(ele, 2)},"
    return string[0:-1]

def predictionsToJSON(predictions, name, pagePredictions, url="https://www.google.com"):
    boolPred = [0]*17
    for i in range(len(boolPred)):
        if any(pagePredictions[i] == 1):
            boolPred[i] = 1
    data = {
        "name" : name,
        "url" : url,
        "sdgs" : listToSting(boolPred),
        "sdg_strength" : listToSting(predictions),
    }

    for i in range(len(pagePredictions)):
        data[f"SDG{i+1}"] = listToSting(pagePredictions[i])

    jsonString = json.dumps(data)

    with open(f"jsons/{name}.json", "w") as outfile:
        outfile.write(jsonString)
    
    return data




def main():
    pdfToTextPages("pdfs/psykiskhelseogrusplan.pdf", "psykisk")
    print(txtToStr("txt/psykisk.txt"))

if __name__ == "__main__":
    main()