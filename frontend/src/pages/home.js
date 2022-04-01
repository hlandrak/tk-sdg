import React from 'react';
import './home.css';

function Home () {
    return(
        <div className='main'>
            <h3>Om prosjektet</h3>

            <p>
                Dette prosjektet har som mål å bistå arbeidere i Trondheim Kommune med oversikt over kommunens plandokumenters tilknyttning til FNs bærekraftsmål (SDG).
                Prosjektet gjør bruk av Natural Language Processing (NLP) for å scanne FNs bærekraftsmål fra   
                <a href="https://www.fn.no/om-fn/fns-baerekraftsmaal">FNs nettside</a>
                og henter alle PDF dokumenter som ligger på Trondheim Kommunes 
                "<a href="https://www.trondheim.kommune.no/alleplaner/">Alle planer</a>" 
                side. Dette brukes så for å gi en score som sier noe om hvor mye plandokumentene er relatert til SDG-ene.
            </p>

            <h3>Detaljer</h3>
            <p>
                Prosjektet bruker et corpus fra 
                <a href="https://github.com/ltgoslo/norec">NoReC</a>: "The Norwegian Review Corpus" som er et set med tekster (anmeldelser) fra større norske nyhetskilder. 
                Corpus-et brukes som basis for standard norsk tekst. Vi lager to pipelines med distinkte funksjoner: (1) Trenes på SDG beskrivelsene: gjenkjenner i hvilken grad et dokument er relatert til hver av de 17 SDG-ene (2) Trenes på NoReC og alle SDG-ene: gjenkjenner i hvilken grad et dokument har noe med SDG-er å gjøre i det hele tatt. 
                For selve teksten som brukes for å trene pipelinene fjernes alle spesialtegn og ord fra en liste med stopwords. Stopwords listen hentes fra spaCys Norwegian core language model ("nb_core_news_lg"). 
                Pipelinene blir så gjennom en tf-idf model brukt for å angi korrelasjonen mellom PDF-en og, berekraft og så spesifikke SDG-korellasjoner per side.
                Deretter multipliseres correlasjons scoren mellom dokument og sdg med mengden SDG-er (17) for å normalisere verdien rundt 1. Så ganges denne verdien igjen med korralasjonsverdien for tilknyttning til bærekraft (SDG) generelt. 
                Til slutt brukes en terskelverdi for å bestemme om korrelasjonen er sterk nok til å anslås som meningsfylt tilstede i PDF-en. 

            </p>
            
            <h3>Visninger</h3>
            <p>
                I visningen er det en tabelloversikt der et plandokument har fargen for en SDG dersom den modifiserte korrelsajonsverdien er høyere enn 1. 
                Deretter kan et spesifikt plandokument klikkes og der finnes to visningsalternativer:
                (1) total korellasjon mellom plandokument og SDG, 
                (2) Korellasjon mellom hver SDG per side av plandokumentet.
            </p>
        </div>
    );
}

export default Home;