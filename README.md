# PG6301 eksamen <tittel på løsningen>

[Heroku](https://web-dev-exam-04052022.herokuapp.com/)
[Test rapport](https://github.com/kristiania-pg6301-2022/pgr6301-exam-sani-bagh/commit/8533a156d6201fd88ac7379ab175f124982e50a4#commitcomment-72978412)

## Tips

* Bruk versjoner av alle dependencies som vi brukte på forelesningene. Det skjer hele tiden endringer i JavaScript-land og noen ganger vil siste versjon oppføre seg forskjellig - ikke kast bort verdifull eksamenstid. Du kan kopiere package.json fra innlevering eller en øving
* Spesielt: React 18 kom i løpet av semesteret. Alt vi har vist er på React 17. Kjør på React 17 nå med mindre du har brukt en del tid på versjon 18 den siste måneden. Det er vesentlige problemer!
* Start med å løse det kritiske: Deployment til Heroku
* Ikke bli sittende med ting du ikke får til mens det er enklere ting du kunne ha gjort. Spesielt tester har overraskende mye vrient med seg. Legg det til siden og løs andre ting om du har problemer
* Les de funksjonelle kravene grundig og test at løsningen din oppfyller dem
* Les læringsmålene beskrevet i eksamensteksten grundig og sjekk at løsningen din demonstrere at du behersker disse

Dette er versjonene vi brukte under forelesningene om som er validert som ok:

```
"jest": "^27.5.1",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-router-dom": "^6.2.2"
```


## Egenutfylling av funksjonelle krav

* [ ] *legg inn krav fra eksamentekst*
* [x] Create app with npm and add all scripts
* [x] Fix react
* [x] Fix prettier
* [x] Fix heroku
* [x] Fix mongodb
* [x] Connect backend with frontend
* [x] Add test
* [x] Add test coverage and github actions
* [x] Fix login with google
* [-] Fix login with microsoft
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*

## Egenutfylling av tekniske krav

* [x] Oppsett av package.json, parcel, express, prettier
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] React Router
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] Express app
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] Kommunikasjon mellom frontend (React) og backend (Express)
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] Deployment til Heroku
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] Bruk av MongoDB
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] OpenID Connect
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
  * Klarte å fikse å logge inn med google, men ikke med active directory
  * Fikk error "invalid_grant". Prøvde å fikse grant i azure, men det fungerte ikke
* [ ] Web Sockets
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] Jest med dokumentert testdekning
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
  * Server testdekning er mindre enn 50% fordi klarte ikke å teste loginAPi.js
 
