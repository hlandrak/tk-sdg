import re
import pdfplumber

def pdfToText(fileName):
    """Generate strings from PDF file"""
    all_text = ""
    with pdfplumber.open(fileName) as pdf:
        for page in pdf.pages:
            all_text += page.extract_text()
    # print(all_text)
    all_text = re.sub('\s', ' ', all_text)
    # print(all_text)
    return all_text

regPlan = pdfToText('regional-planstrategi-2016-2010.pdf')

def txtToStr(filename):
    """Produce string from file"""
    f = open(filename, 'r')
    textLines = f.readlines()
    text = ""
    for line in textLines:
        text += line
    text = re.sub('\s', ' ', text)
    return text

brautTxt = txtToStr("braut.txt")