# Scraping imports and inits
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
driver = webdriver.Chrome(ChromeDriverManager().install())
from bs4 import BeautifulSoup as BS

def runUNScrape():
    """Scraping sdgs from FN. Takes SDG description from UN's website and writes them into txt files.
    Takes no arguments."""
    sdgs = []
    driver.get("https://www.fn.no/om-fn/fns-baerekraftsmaal")
    soup = BS(driver.page_source, features="html.parser")
    titleCards = soup.find_all(class_="header_gols_content_item")
    for card in titleCards:
        a = card.find("a", href=True)
        sdgs.append(a["href"])
    print(sdgs)
    i = 1
    for sdg in sdgs:
        driver.get(f"https://www.fn.no/{sdg}")
        soup = BS(driver.page_source, features="html.parser")
        paragraphs = soup.find_all("p")
        f = open(f'sdgs/sdg{i}.txt', 'w', encoding="utf-8")
        for par in paragraphs:
            line = par.text.strip()
            line = line.replace('...', '')
            line = line.replace('&aelig;', 'æ')
            if len(line) > 0:
                if not line[-1] in ".?!:)":
                    line += '.'
                f.write(f'{line}\n')
        f.close()
        i += 1