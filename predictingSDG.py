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
    sentence: the text string to be tokenized"""
    
    # Creating our token object which is used to create documents with linguistic annotations
    myTokens = nlp(sentence)
    
    # lemmatizing each token and converting each token in lower case
    # Note that spaCy uses '-PRON-' as lemma for all personal pronouns like me, I etc
    myTokens = [ word.lemma_.lower().strip() if word.lemma_ != "-PRON-" else word.lower_ for word in myTokens ]
    
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
    
    def get_params(self, deep= True):
        return {}

from sklearn.feature_extraction.text import TfidfVectorizer
tfidfVector = TfidfVectorizer(tokenizer=spacyTokenizer)

def createTrainingSdgInstance():
    """Generates trainingdata
    xTrain is the sentences from sdgs
    yTrain is the SDG number which xTrain sentences is related to"""
    # Creating trainingdata for classifying SDGs
    xTrain = []
    yTrain = []
    for i in range(17):
        f = open(f'sdgs/sdg{i+1}.txt')
        for line in f:
            line = re.sub('\s', ' ', line)
            xTrain.append(line)
            yTrain.append(i+1)
    return xTrain, yTrain

    
from sklearn.linear_model import LogisticRegression

classifier = LogisticRegression(multi_class='ovr', solver='liblinear')

# Create pipeline using Tf-idf
pipe = Pipeline ([("cleaner", predictors()),
                 ("vectorizer", tfidfVector),
                 ("classifier", classifier)])

pipe.fit(createTrainingSdgInstance())

def tfidfModel(trainingData, testData):
    """
    Return predicted probabilities for Pipeline (pipe).
    trainingData: xTrain and yTrain (output of createTrainingSdgInstance)
    testData: a list of strings to be predicted
    """
    pipe = Pipeline ([("cleaner", predictors()),
                 ("vectorizer", tfidfVector),
                 ("classifier", LogisticRegression(multi_class='ovr', solver='liblinear'))])

    pipe.fit(trainingData[0], trainingData[1])

    predicted = pipe.predict_proba(testData)
    return predicted

def sdgPredict(listOfStrings):
    """Create a prediction of similarity for a list of strings
    listOfStrings: a list string objects which should be compared to the SDGs"""
    sdgPredictions = tfidfModel([createTrainingSdgInstance()], listOfStrings)
    return sdgPredictions


import wikiscraper as ws

ws.lang("no")

abstractList = []
with open("randWiki.txt", "a") as file:
    for i in range(1000):
        result = ws.searchBySlug("Spesial:Tilfeldig")
        try:
            abstractList = result.getAbstract()
            for par in abstractList:
                if not "[rediger | rediger kilde]" in par:
                    file.write(par + "\n")
        except:
            pass
        
X_train2 = []
y_train2 = []
for i in range(17):
    with open(f'sdgs/sdg{i+1}.txt', 'r') as f:
        for line in f:
            line = re.sub('\s', ' ', line)
            X_train2.append(line)
            y_train2.append(0)

with open('randWiki.txt', 'r') as f:
    for line in f:
        line = re.sub('\s', ' ', line)
        X_train2.append(line)
        y_train2.append(1)
        
baerBool = tfidfModel([X_train2, y_train2], X_testxTsdgPredictions = tfidfModel([Xtrain, yTrain], X_test)
