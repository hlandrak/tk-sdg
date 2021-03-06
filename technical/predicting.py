from audioop import mul
import re
from spacy.lang.nb import Norwegian
import spacy
import helperFunctions
import glob
from sklearn.base import TransformerMixin
from sklearn.pipeline import Pipeline
import string
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

    
from sklearn.linear_model import LogisticRegression
import pickle

# for documentation see: https://www.kaggle.com/satishgunjal/tutorial-text-classification-using-spacy


def spacyTokenizer(sentence):
    """This function will accepts a sentence as input and processes the sentence into tokens, performing lemmatization, 
    lowercasing, removing stop words and punctuations.
    
    Args:
        sentence (str, optional): the text string to be tokenized"""
    nlp = spacy.load("nb_core_news_lg")
    parser = Norwegian()
    punctuations = string.punctuation
    stopWords = spacy.lang.nb.stop_words.STOP_WORDS
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

class predictors(TransformerMixin):
    def transform(self, X, **transform_params):
        """Override the transform method to clean text"""
        return [cleanText(text) for text in X]
    
    def fit(self, X, y= None, **fit_params):
        return self
    
    def getParams(self, deep= True):
        return {}



def createPipe(trainingData):
    """Creates a pipeline based on training data

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


def savePipes():
    """Save pipes as .pkl.
    """
    pipeIndividual = createPipe(helperFunctions.createTrainingSdgInstance())
    pipeBoolean = createPipe(helperFunctions.createTrainingSdgBoolean())
    pickle.dump(pipeBoolean, open("pipelineBoolean.pkl", "wb"))
    pickle.dump(pipeIndividual, open("pipelineIndividual.pkl", "wb"))


def sdgPredict(listOfStrings, threshold = 0.75):
    """Create a prediction per sdg for a list of strings. Loads pipelines from file and gives 2 predictions
    based on (1) Each SDG, (2) SDG or not. Multiplies these togheter and adjusts for num of SDG.

    Args:
        listOfStrings (list of str): List of str objects which should be compared to the SDGs
        threshold (float, optional): Threshold for cut off for when sdg-value is relevant. Defaults to 0.75.

    Returns:
        mult (list of list of float): Float value for each SDG per page of probabilities combined for each SDG.
    """
    pipeIndividual = pickle.load(open("pipelineIndividual.pkl", "rb"))
    pipeBoolean = pickle.load(open("pipelineBoolean.pkl", "rb"))
    print("Pedicting per SDG")
    sdgPredictions = tfidfModel(listOfStrings, pipeIndividual)
    print("Predicting yes/no")
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


def predictAllAndSave(pagesString, name):
    """Saves and returns SDG prediction data per page in given list of pages.

    Args:
        pagesString (list of str): text per page in str format as list.
        name (str): name of file.

    Returns:
        data (dict): Data saved to json file. {name (str), predicion data (list of list of float)}
    """
    data = helperFunctions.predictionsToJSON(
        name,
        helperFunctions.transpose2DList(sdgPredict(pagesString)))
    return data


def textScrapeAllPdfs():
    """Generate .txt files for all pdfs in pdfs folder.
    """

    allPdfs = glob.glob("pdfs/*.pdf")
    allTxt = glob.glob("txt/*.txt")
    for pdf in allPdfs:
        name = re.sub(".pdf", "", pdf)
        name = re.sub("pdfs", "", name)
        name = name[1:]
        if not f"txt/{name}.txt" in allTxt:
            print(f"Converting {name}")
            helperFunctions.pdfToTextPages(pdf, name)

def saveAllTxtResultsJson():
    """Predict all files in /txt folder and save to jsons
    """
    allTxt = glob.glob("txt/*.txt")
    allJson = glob.glob("jsons/*.json")
    for textFile in allTxt:
        name = re.sub(".txt", "", textFile)
        name = re.sub("txt", "", name)
        name = name[1:]
        if not f"jsons/{name}.json" in allJson:
            print(f"Predicting {name}")
            predictAllAndSave(helperFunctions.txtToStr(textFile), name)

def main():
    textScrapeAllPdfs()
    saveAllTxtResultsJson()


if __name__ == "__main__":
    main()