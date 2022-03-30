import React from 'react';
import './home.css';

function Home () {
    return(
        <div className='main'>
            <h3>Om prosjektet</h3>

             <p>Dette prosjektet har som mål å bistå arbeidere i Trondheim Kommune med oversikt over kommunens plandokumenters tilknyttning til FNs bærekraftsmål.
            Prosjektet gjør bruk av Natural Language Processing (NLP) for å scanne FNs bærekraftsmål fra   
                <a href="https://www.fn.no/om-fn/fns-baerekraftsmaal">FNs nettside</a>
            og henter alle PDF dokumenter som ligger på Trondheim Kommunes 
                "<a href="https://www.trondheim.kommune.no/alleplaner/">Alle planer</a>" 
            side.   
            </p>
            <h3>Detaljer</h3>

            <p>
                Prosjektet bruker et corpus fra 
                <a href="https://github.com/ltgoslo/norec">NoReC</a>: "The Norwegian Review Corpus" som er et set med tekster (anmeldelser) fra større norske nyhetskilder. 
                Corpus-et brukes som basis for standard norsk tekst. Vi lager to pipelines med distinkte funksjoner: (1) Trenes på SDG beskrivelsene: gjenkjenner i hvilken grad et dokument er relatert til hver av de 17 SDG-ene (2) Trenes på NoReC: gjenkjenner i hvilken grad et dokument har noe med SDG-er å gjøre i det hele tatt. 
                For selve teksten som brukes for å trene pipelinene fjernes alle spesialtegn og ord fra en liste med stopwords. Stopwords listen hentes fra spaCys Norwegian core language model ("nb_core_news_lg").
            </p>

        </div>
    );
}

export default Home;