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

regPlan = pdfToText('regional-planstrategi-2016-2010.pdf')

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

brautTxt = txtToStr("braut.txt")