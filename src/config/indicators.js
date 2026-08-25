import { Cloud, FlaskConical, Snowflake, Thermometer, Wind } from 'lucide-react';
import { getArctic, getCO2, getMethane, getNitrousOxide, getTemperature } from '../api/climateApi';

export const indicators = {
  temperature: {
    id: 'temperature',
    path: '/temperature',
    navLabel: 'Temperature',
    title: 'Temperature Globali',
    shortDescription: 'Variazione della temperatura media globale.',
    description: 'Anomalia della temperatura globale rispetto ai livelli di riferimento climatici.',
    chartTitle: 'Variazione della temperatura (°C)',
    unit: '°C',
    decimals: 2,
    Icon: Thermometer,
    loader: getTemperature,
    changeLabel: 'Variazione tra le ultime rilevazioni',
    sourceText: 'Dati forniti tramite la Temperature API di global-warming.org.',
  },
  co2: {
    id: 'co2', path: '/co2', navLabel: 'CO₂', title: 'CO₂ Atmosferica',
    shortDescription: 'Concentrazione di anidride carbonica nell’atmosfera.',
    description: 'Andamento della concentrazione atmosferica di anidride carbonica.',
    chartTitle: 'Concentrazione di CO₂ (ppm)', unit: 'ppm', decimals: 2, Icon: Cloud,
    loader: getCO2, changeLabel: 'Variazione tra le ultime rilevazioni',
    sourceText: 'Dati forniti tramite la CO₂ API di global-warming.org.',
  },
  methane: {
    id: 'methane', path: '/methane', navLabel: 'Metano', title: 'Metano Atmosferico',
    shortDescription: 'Concentrazione globale di metano (CH₄).',
    description: 'Evoluzione della concentrazione di metano presente nell’atmosfera.',
    chartTitle: 'Concentrazione di CH₄ (ppb)', unit: 'ppb', decimals: 2, Icon: Wind,
    loader: getMethane, changeLabel: 'Variazione tra le ultime rilevazioni',
    sourceText: 'Dati forniti tramite la Methane API di global-warming.org.',
  },
  nitrousOxide: {
    id: 'nitrous-oxide', path: '/nitrous-oxide', navLabel: 'N₂O', title: 'Protossido di Azoto',
    shortDescription: 'Concentrazione globale di protossido di azoto (N₂O).',
    description: 'Andamento della concentrazione atmosferica di protossido di azoto.',
    chartTitle: 'Concentrazione di N₂O (ppb)', unit: 'ppb', decimals: 2, Icon: FlaskConical,
    loader: getNitrousOxide, changeLabel: 'Variazione tra le ultime rilevazioni',
    sourceText: 'Dati forniti tramite la Nitrous Oxide API di global-warming.org.',
  },
  arctic: {
    id: 'arctic', path: '/arctic', navLabel: 'Ghiaccio Polare', title: 'Ghiaccio Marino Artico',
    shortDescription: 'Estensione del ghiaccio marino nell’Artico.',
    description: 'Evoluzione dell’estensione del ghiaccio marino artico nel tempo.',
    chartTitle: 'Estensione del ghiaccio (milioni km²)', unit: 'M km²', decimals: 3, Icon: Snowflake,
    loader: getArctic, changeLabel: 'Variazione tra le ultime rilevazioni',
    sourceText: 'Dati forniti tramite la Arctic Sea Ice API di global-warming.org.',
  },
};

export const indicatorList = Object.values(indicators);
