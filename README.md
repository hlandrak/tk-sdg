# tk-sdg
EiT group 3

## README

This is a comissioned project for Trondheim municipality made to relate their planning documents to the United Nation's Sustainable Developement Goals (SDGs) using Natural Language Processing (NLP). The output of the program is made to be viewable in a browser, *however interaction with which PDFs are availible and excecution of the backend is currently only doable from the python backend locally*. 

## Configuration

The software is based on Python and JavaScript (React).
### Required Packages
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

## Contact

## Bugs

## Troubleshooting

## Credits & Acknowledgements

## Changelog

## News
