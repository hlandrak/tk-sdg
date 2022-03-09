from spacy.lang.nb import Norwegian
import spacy
from helperFunctions import pdfToText
from helperFunctions import txtToStr

regPlan = pdfToText('regional-planstrategi-2016-2010.pdf')
kirkepol = pdfToText('050200-sak-kommunens-kirkepolitikk.pdf')
smabathavn = pdfToText('kommunedelplan-for-smabathavner-2007-2017.pdf')
kultur = pdfToText('strategiplan-kultur-web.pdf')
havbruk = pdfToText("havbruk.pdf")

def similarityText(mainStr, searchStr):
    """
    Return spacy similatiry based on vector in nb_core_news_lg.
    """
    nlp = spacy.load("nb_core_news_lg")

    mainDoc = nlp(mainStr)
    searchDoc = nlp(searchStr)

    mainTokenized = nlp(' '.join([str(token.lemma_) for token in mainDoc if not token.is_stop and not token.is_punct and not token.is_space]))
    searchTokenized = nlp(' '.join([str(token.lemma_) for token in searchDoc if not token.is_stop and not token.is_punct and not token.is_space]))
    # print(mainTokenized)
    # print(searchTokenized)
    return mainTokenized.similarity(searchTokenized)

def sdgSimilatiry(string):
    """
    Print and return similarity of string to all SDGs.
    """
    valueList = []
    for sdg in range(17):
        value = similarityText(string, txtToStr(f"sdgs/sdg{sdg+1}.txt"))
        print(f"SDG #{sdg+1} has this similarity to your string: {value}")
        valueList.append(value)
    return valueList

sdgVector = {} # Container for similarity results

def addSdgVector(str, name):
    """
    Add similarity results to sdgVector.
    """
    sdgVector[name] = sdgSimilatiry(str)
    
addSdgVector(regPlan, "Regional planstrategi")
addSdgVector(smabathavn, "Kommunedelplan for småbåthavner")
addSdgVector(kultur, "Strategiplan kultur")

# for documentation see: https://www.kaggle.com/satishgunjal/tutorial-text-classification-using-spacy
import string
nlp = spacy.load("nb_core_news_lg")
parser = Norwegian()
punctuations = string.punctuation
stop_words = spacy.lang.nb.stop_words.STOP_WORDS
def spacy_tokenizer(sentence):
    """This function will accepts a sentence as input and processes the sentence into tokens, performing lemmatization, 
    lowercasing, removing stop words and punctuations."""
    
    # Creating our token object which is used to create documents with linguistic annotations
    mytokens = nlp(sentence)
    
    # lemmatizing each token and converting each token in lower case
    # Note that spaCy uses '-PRON-' as lemma for all personal pronouns lkike me, I etc
    mytokens = [ word.lemma_.lower().strip() if word.lemma_ != "-PRON-" else word.lower_ for word in mytokens ]
    
    # Removing stop words
    mytokens = [ word for word in mytokens if word not in stop_words and word not in punctuations]
    # Return preprocessed list of tokens
    return mytokens  

from sklearn.base import TransformerMixin
from sklearn.pipeline import Pipeline

class predictors(TransformerMixin):
    def transform(self, X, **transform_params):
        """Override the transform method to clean text"""
        return [clean_text(text) for text in X]
    
    def fit(self, X, y= None, **fit_params):
        return self
    
    def get_params(self, deep= True):
        return {}

# Basic function to clean the text
def clean_text(text):
    """Removing spaces and converting the text into lowercase"""
    return text.strip().lower()

from sklearn.feature_extraction.text import TfidfVectorizer
tfidfVector = TfidfVectorizer(tokenizer=spacy_tokenizer)

# Creating trainingdata for classifying SDGs
X_train = []
y_train = []
for i in range(17):
    f = open(f'sdgs/sdg{i+1}.txt')
    for line in f:
        line = re.sub('\s', ' ', line)
        X_train.append(line)
        y_train.append(i+1)
        
from sklearn.linear_model import LogisticRegression

classifier = LogisticRegression(multi_class='ovr', solver='liblinear')

# Create pipeline using Tf-idf
pipe = Pipeline ([("cleaner", predictors()),
                 ("vectorizer", tfidfVector),
                 ("classifier", classifier)])

pipe.fit(X_train, y_train)

X_test = [kirkepol, regPlan, kultur]

def tfidfModel(trainingData, testData):
    """
    Return predicted probabilities for Pipeline (pipe).
    """
    pipe = Pipeline ([("cleaner", predictors()),
                 ("vectorizer", tfidfVector),
                 ("classifier", LogisticRegression(multi_class='ovr', solver='liblinear'))])

    pipe.fit(trainingData[0], trainingData[1])

    predicted = pipe.predict_proba(testData)
    return predicted

sdgPredictions = tfidfModel([X_train, y_train], X_test)
print(sdgPredictions)

tfidfModel(X_test)

tfidfModel([havbruk])

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
        
baerBool = tfidfModel([X_train2, y_train2], X_test)
sdgPredictions = tfidfModel([X_train, y_train], X_test)
