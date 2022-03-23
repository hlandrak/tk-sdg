from audioop import mul
import re
from spacy.lang.nb import Norwegian
import spacy
import helperFunctions

# for documentation see: https://www.kaggle.com/satishgunjal/tutorial-text-classification-using-spacy
import string
nlp = spacy.load("nb_core_news_lg")
parser = Norwegian()
punctuations = string.punctuation
stopWords = spacy.lang.nb.stop_words.STOP_WORDS
def spacyTokenizer(sentence):
    """This function will accepts a sentence as input and processes the sentence into tokens, performing lemmatization, 
    lowercasing, removing stop words and punctuations.
    
    Args:
        sentence (str, optional): the text string to be tokenized"""
    
    # Creating our token object which is used to create documents with linguistic annotations
    myTokens = nlp(sentence)
    
    # lemmatizing each token and converting each token in lower case
    # Note that spaCy uses '-PRON-' as lemma for all personal pronouns like me, I etc
    myTokens = [ word.lemma_.lower().strip() if (word.lemma_ != "-PRON-" and not word.like_num) else word.lower_ for word in myTokens ]
    
    # Removing stop words
    myTokens = [ word for word in myTokens if word not in stopWords and word not in punctuations]
    # Return preprocessed list of tokens
    return myTokens  

# Basic function to clean the text
def cleanText(text):
    """Removing spaces and converting the text into lowercase"""
    return text.strip().lower()

from sklearn.base import TransformerMixin
from sklearn.pipeline import Pipeline

class predictors(TransformerMixin):
    def transform(self, X, **transform_params):
        """Override the transform method to clean text"""
        return [cleanText(text) for text in X]
    
    def fit(self, X, y= None, **fit_params):
        return self
    
    def getParams(self, deep= True):
        return {}

from sklearn.feature_extraction.text import TfidfVectorizer

    
from sklearn.linear_model import LogisticRegression

def createPipe(trainingData):
    """creates a pipeline based on training data

    Args:
        trainingData (lists): takes xTrain and yTrain

    Returns:
        pipe: pipeline
    """
    pipe = Pipeline ([("cleaner", predictors()),
                 ("vectorizer", TfidfVectorizer(tokenizer=spacyTokenizer)),
                 ("classifier", LogisticRegression(multi_class='ovr', solver='liblinear'))])
    pipe.fit(trainingData[0], trainingData[1])
    return pipe

def tfidfModel(testData, pipe):
    """takes in training data and a pipeline

    Args:
        testData (list): Vector to be scored, where n_samples is the number of samples and n_features is the number of features.
        pipe (_type_): a pipeline object to be tested against.

    Returns:
        predicted (float): the predicted similarity of the pipeline and the training data 
    """
    predicted = pipe.predict_proba(testData)
    return predicted

import pickle

def savePipes():
    pipeIndividual = createPipe(helperFunctions.createTrainingSdgInstance())
    pipeBoolean = createPipe(helperFunctions.createTrainingSdgBoolean())
    pickle.dump(pipeBoolean, open("pipelineBoolean.pkl", "wb"))
    pickle.dump(pipeIndividual, open("pipelineIndividual.pkl", "wb"))


def sdgPredict(listOfStrings, threshold = 0.75):
    """Create a prediction of similarity for a list of strings
    listOfStrings: a list string objects which should be compared to the SDGs"""
    pipeIndividual = pickle.load(open("pipelineIndividual.pkl", "rb"))
    pipeBoolean = pickle.load(open("pipelineBoolean.pkl", "rb"))
    sdgPredictions = tfidfModel(listOfStrings, pipeIndividual)
    barekraftBool = tfidfModel(listOfStrings, pipeBoolean)


    mult = sdgPredictions * 17
    for i in range(len(mult)):
        mult[i] *= barekraftBool[i][0]
        for j in range(len(mult[i])):
            if mult[i][j] > 1:
                mult[i][j] = 1
            elif mult[i][j] - threshold > 0:
                mult[i][j] = (mult[i][j] - threshold) / (1 - threshold)
            else:
                mult[i][j] = 0

    return mult

import numpy as np

def transposePagesToSdgs(pages):
    return np.transpose(np.array(pages))

def predictAllAndSave(pagesString, name):
    data = helperFunctions.predictionsToJSON(
        sdgPredict([pagesString[-1]])[0], 
        name,
        transposePagesToSdgs(sdgPredict(pagesString[0:-1])))
    return data

import glob

def textScrapeAllPdfs():
    allPdfs = glob.glob("pdfs/*.pdf")
    allTxt = glob.glob("txt/*.txt")
    for pdf in allPdfs:
        name = re.sub("pdfs/", "", pdf)
        name = re.sub(".pdf", "", name)
        if not f"txt/{name}.txt" in allTxt:
            print(f"Converting {name}")
            helperFunctions.pdfToTextPages(pdf, name)

def saveAllTxtResultsJson():
    allTxt = glob.glob("txt/*.txt")
    allJson = glob.glob("jsons/*.json")
    for textFile in allTxt:
        name = re.sub("txt/", "", textFile)
        name = re.sub(".txt", "", name)
        if not f"jsons/{name}.json" in allJson:
            print(f"Predicting {name}")
            predictAllAndSave(helperFunctions.txtToStr(textFile), name)

def main():
    textScrapeAllPdfs()
    saveAllTxtResultsJson()


if __name__ == "__main__":
    main()