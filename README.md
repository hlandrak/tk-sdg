# tk-sdg
EiT group 3

## README

This is a comissioned project for Trondheim municipality made to relate their planning documents to the United Nation's Sustainable Developement Goals (SDGs) using Natural Language Processing (NLP). The output of the program is made to be viewable in a browser, *however interaction with which PDFs are availible and excecution of the backend is currently only doable from the python backend locally*. 

## Configuration

The software is based on Python and JavaScript (React).
### Set-Up
Steps:
In terminal 1:
1. create a virtual environment
2. cd frontend
3. npm install
4. cd..
5. cd backend
6. pip install -r requirements.txt
7. pip install django-cors-header
8. pip install psycopg2 /(Mac add -binary)
9. python manage.py migrate
10. py manage.py makemigration
11. py manage.py runserver
In terminal 2:
1. find your folder + start your virtual environment
2. cd frontend
3. npm start

## Update database
To update the database to include more pdfs you will need to upload your pdf to the backend/technical/pdfs folder. After this you can run py predicting.py and it should automatically update the allJsons.json file to include your pdf. You can now upload the .json-file to the database via the django interface in the application. 

### Required Packages
Required packages found in requirements.txt
## Installation

## File Manifest
### Directories

 **pdfs**: The directory containing all PDFs from Trondheim municipalitiy's "Alle planer" page. These PDFs are retrieved into the directory using the pdfScraping() function in helperFunctions.py
 **jsons**: The directory containing all output data, correlation values between document and SDG, from running the program. The json files contains the name of the document,  score correlation for each SDG to the document, and a correlation score per page to each SDG.
 **txt**: The directory containing the text from each PDF where each line contains the text from a page from its corresponding PDF.
 **sdgs**: The directory containing all infromation relating to each SDG. This is currently scraped from the UN's norwegian pages for the SDGs using the **** function in ****.py.
 **urls**: The directory containing text files of the URLs from which the PDFs have been downloaded.
### Python

**helperFunctions.py**: The python file containing the functions which do not directly relate to the processing of text using NLP.
**predicting.py**: The python file containing functions related to natural language processing and processing of correlation values (and main()).
### JavaScript (React)

## Copyright & Licencing
See LICENCE

## Bugs

## Troubleshooting

## Credits & Acknowledgements
Håvard Landråk
Ivar Refsdal
Ole Martin Ingebo
Marcus Meek
Jonathan Holme
