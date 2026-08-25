# Climate Dashboard — React

Web app multipagina responsive per visualizzare dati sul riscaldamento globale tramite le API pubbliche di global-warming.org.

## Stack
- React + Vite
- React Router DOM
- Chart.js + react-chartjs-2
- CSS Modules
- Lucide React
- Fetch API

## Avvio
```bash
npm install
npm run dev
```
Poi apri l'indirizzo mostrato da Vite nel terminale.

## Build
```bash
npm run build
npm run preview
```

## Architettura
- `src/api/climateApi.js`: tutte le chiamate HTTP e normalizzazione dei dati.
- `src/config/indicators.js`: configurazione dei cinque indicatori.
- `src/hooks/useClimateData.js`: stato asincrono, errori e retry.
- `src/components`: componenti riutilizzabili, ciascuno con la propria cartella e CSS Module.
- `src/pages`: Home + cinque pagine dashboard.
- `src/styles`: variabili e stili globali.

## API
- Temperature: https://global-warming.org/api/temperature-api
- CO₂: https://global-warming.org/api/co2-api
- Methane: https://global-warming.org/api/methane-api
- Nitrous Oxide: https://global-warming.org/api/nitrous-oxide-api
- Arctic: https://global-warming.org/api/arctic-api

## Nota
Il client API è volutamente separato dai componenti React. I normalizzatori accettano più possibili chiavi della risposta per rendere l'interfaccia più resistente a piccole variazioni dello schema dell'API.
