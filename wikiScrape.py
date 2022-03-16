import wikiscraper as ws

def scrapeRandWikiNO(filename="randWiki", article_nr=1000):
    """Gets a number of random wikipedia articles and appends them to a text document. 

    Args:
        filename (str, optional): name of the document the wikiarticles will be appended to. Defaults to "randWiki".
        article_nr (int, optional): number of random articles to scrape. Defaults to 1000.
    """
    ws.lang("no")

    abstractList = []
    with open(f"{filename}.txt", "a") as file:
        for i in range(article_nr):
            result = ws.searchBySlug("Spesial:Tilfeldig")
            try:
                abstractList = result.getAbstract()
                for par in abstractList:
                    if not "[rediger | rediger kilde]" in par:
                        file.write(par + "\n")
            except:
                pass