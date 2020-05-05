# Exclusive design voor Roger Ravelli

![Datavis](https://user-images.githubusercontent.com/47485018/81056324-a6ba8100-8eca-11ea-8c51-fdfe7f1050bf.png)


## Inhoudsopgave

* ### [Concept]()
* ### [Test resultaten](https://github.com/CountNick/web-design-1920#test-resultaten-1)
* ### [Exclusive principles](https://github.com/CountNick/web-design-1920#exclusive-design-principles)
* ### [Reflectie](https://github.com/CountNick/web-design-1920#reflectie-1)

## Concept

Het concept is een datavisualisatie die laat zien wat het bruto eindverbuik van hernieuwbare energie is naar soort.

Omdat Roger moeite heeft met het lezen van lange teksten kan er op de teksten geklikt worden waardoor deze worden voorgelezen.

Roger kan door de grafiek heen navigeren dmv de pijltjestoetsen. Op elk punt waar de focus op ligt word aan hem voorgelezen wat dit is, van welk jaar dit is, en de waarde van dat punt.

De grafiek kan ook muziek maken. Door op het eerste punt in elke lijn te klikken word er een toon afgespeeld die de daling of stijging van een energiesoort laat zien.

[data bron: CBS](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83109NED/table?dl=1FBA8)


## Test resultaten

* [Test 1](https://github.com/CountNick/web-design-1920/wiki/1.1-Eerste-gesprek-met-Roger)
* [Test 2](https://github.com/CountNick/web-design-1920/wiki/2.1-Tweede-test-met-Roger)
* [Test 3](https://github.com/CountNick/web-design-1920/wiki/3.1-Derde-test-met-Roger)

## Exclusive design principles

In de [Wiki](https://github.com/CountNick/web-design-1920/wiki/1.2-Exclusive-Design) staat ook nog een wat algemener verhaal over de principles

### #1 Study situation

Roger kan nog wel zien maar zijn zicht is wel constant aan het verslechteren. Voor zover hij zijn zicht nog kan gebruiken wil hij dit ook. Hiervoor is het voor hem belangrijk dat wat er op het beeld staat een hoog contrast heeft, en groter dan normaal is. Kleine knopjes etc. is hij niet gewend te gebruiken, ook bijvoorbeeld de tabtoetsen niet. Dit zijn dingetjes die eerst duidelijk gemaakt moeten worden. Teksten kan Roger nog wel lezen maar dit kost hem bijzonder veel inspanning. Hij gebruikt hiervoor een screenreader.

### #2 Ignore conventions

Tijdens het eerste gesprek met Roger kwamen wij erachter dat hij het werken met een screenreader helemaal niet perse als prettig ervaart. Een aantal keer was Roger opzoek naar informatie en moest hij telkens weer door het complete ding heen klikken. Wij merkten tijdens het testen dat hij hier erg nerveus van werd. Hierdoor dacht ik dus dat het beter zou zijn om de screenreader maar helemaal links te laten liggen, en hier zelf een oplossing voor te verzinnen. Roger kan nu mbv de pijltjes en tab toetsen door de datavisualisatie heen, op het moment dat hij op een punt is gekomen word de informatie door de browser voorgelezen. Zo kan hij op zijn eigen tempo door de visualisatie heen.

### #3 Prioritise identity

Bij die principe gaat het erom dat je iemands persoonlijkheid naar voren laat komen in het ontwerp. In de gesprekken met Roger kwamen wij erachter dat hij stage loopt bij Q42 en dat hij zelf ook zeer geïnteresseerd is in accessibility. Natuurlijk ook vanwege zijn eigen frustraties met "acccessible software". Maar hij heeft ook zelf een technische baan gehad, en gaf aan dat hij ook graag inzicht zou krijgen in bijvoorbeeld data over hernieuwbare energie. De data visualisatie gaat over het gebruik van hernieuwbare energie, en is speciaal voor Roger accessible gemaakt.

### #4 Add nonsense/ Prioritise Identity
Roger gaf ook aan dat hij heel erg van muziek houd. Ik kreeg toen het idee om van de visualisatie een soort instrument te maken. Mijn idee was om een toon te laten afspelen op het moment dat Roger hier een voice command voor geeft. De toon zou bijvoorbeeld de daling of stijging hoorbaar moeten maken voor Roger. Alleen zegt de hoogte van de toonhoogte opzich natuurlijk niet zoveel. Toen ik aan Roger vroeg of hij dit leuk zou vinden gaf hij aand van wel. Daarom heb ik besloten deze feature toch toe te voegen.

## Reflectie

Ik vond Web Design een heel leuk en leerzaam vak. Ik heb veel dingen geprobeerd waarvan ik niet had gedacht dat deze zouden lukken of zo makkelijk mogelijk waren. 

Het rapid prototypen is best goed gegaan, wat ik niet perse had verwacht. Ik vond het wel erg lastig om snel van te voren te bedenken wat en hoe ik nou precies wilde testen.

Ik heb wel weer opnieuw gemerkt dat testen echt heel erg lastig is, en al helemaal via een videochat. Soms ging het helemaal fout dit kon bijvoorbeeld zijn dat Roger per ongeluk op de verkeerde toetscombinatie drukte, en hij dan opeens de chat uit was. 

Of in mijn geval dat wat ik geïttereerd had gewoon niet duidelijk genoeg was. Ik ben erachter gekomen dat ik functies of features vaak te diep verstop in mijn designs waardoor een testpersoon vaak nieteens weet dat er nog iets anders mogelijk is.

Dit kwam bijvoorbeeld naar voren tijdens mijn derde test. Hier had ik de voice en speech api gebruikt zodat Roger dieper op de data in kon gaan door het gebruiken van zijn stem. Alleen was er nergens aangegeven dat hij iets met zijn stem moest doen. Hij wist dus niet dat dit kon. Mijn test was heirdoor dus eigenlijk al mislukt omdat ik hierna heb uitgelegd wat hij moest doen.

Dit was natuurlijk niet de bedoeling van deze test. Het was de bedoeling dat Roger zelf ging uitvogelen hoe het ding werkt. 

Dit is niet alleen in de derde test gebeurd. Tijdens de tweede test vroeg ik Roger of wat hij dacht dat er met de visualisatie gedaan kon worden. Hij draaide de vraag toen om en uiteindelijk heb ik ook in deze test verteld wat de bedoeling was. 

Ik heb opgemerkt dat het erg moeilijk is om op je tong te bijten tijdens een test. Toch is dit wel het beste wat je kan doen. Doordat ik heb uitgelegd wat Roger moest doen heb ik denk ik toch veel knelpunten gemist.

De volgende keer dat ik een prototype test zal ik waarschijnlijk meer tijd nemen om te bedenken wat ik daadwerkelijk wil testen. En hoe ik testpersoon het echt zelf laat doen.

