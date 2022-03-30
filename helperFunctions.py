import re
import pdfplumber
import json
import numpy as np

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
    return textList

def transpose2DList(pages):
    """_summary_

    Args:
        pages (): _description_

    Returns:
        pages: _description_
    """
    return np.transpose(np.array(pages))

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
    yTrain is the SDG number which xTrain sentences are related to"""
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

def predictionsToJSON(name, pagePredictions, url="https://www.google.com"):
    boolPred = [0]*17
    for i in range(len(boolPred)):
        if any(pagePredictions[i] == 1):
            boolPred[i] = 1
    try:
        with open(f"urls/{name}.txt", "r") as f:
            url = f.readline()
    except:
        pass
    
    data = {
        "name" : name,
        "url" : url,
        "sdgs" : listToSting(boolPred),
    }

    for i in range(len(pagePredictions)):
        data[f"SDG{i+1}"] = listToSting(pagePredictions[i])

    jsonString = json.dumps(data)

    with open(f"jsons/{name}.json", "w") as outfile:
        outfile.write(jsonString)
    
    return data

import os
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup

def pdfScraping():

    url = "https://www.trondheim.kommune.no/alleplaner/"

    #If there is no such folder, the script will create one automatically
    folder_location = r'pdfs/'
    if not os.path.exists(folder_location):os.mkdir(folder_location)

    response = requests.get(url)
    soup= BeautifulSoup(response.text, "html.parser")
        
    for link in soup.select("a[href$='.pdf']"):
        #Name the pdf files using the last portion of each link which are unique in this case
        filename = os.path.join(folder_location,link['href'].split('/')[-1])
        with open(filename, 'wb') as f:
            f.write(requests.get(urljoin(url,link['href'])).content)
        filenameBase = link['href']
        filename2 = link['href'].split('/')[-1]
        filenameNoPdf = re.sub(".pdf", "", filename2) 
        with open(f"urls/{filenameNoPdf}.txt", "w") as f:
            f.write(f"https://www.trondheim.kommune.no{filenameBase}")

def combineJsons():
    path = "jsons/"
    idcount = 200
    allData = []
    for filename in glob.glob(os.path.join(path, '*.json')): # open all .txt files in "dev-kopi" folder.
        with open(os.path.join(os.getcwd(), filename), 'r', encoding="utf8") as f:
            data = json.load(f)
            data =  {k.lower(): v for k, v in data.items()}
            data['id'] = idcount
            idcount += 1
            
            strengthList = []
            for i in range(1,18):
                one = data.get(f'sdg{i}').split(",")
                newEle = []
                for ele in one:
                    newEle.append(float(ele))
                strengthList.append( sum(newEle) / len(newEle) )
            data['sdg_strength'] = listToSting(strengthList)
                
            
            allData.append(data)

    jsonString = json.dumps(allData)
    with open(f"allJsons.json", "w") as outfile:
        outfile.write(jsonString)


def main():
    #pdfScraping()
    combineJsons()

if __name__ == "__main__":
    main()