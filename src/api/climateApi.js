const BASE_URL = 'https://global-warming.org/api';

const ENDPOINTS = {
  temperature: '/temperature-api',
  co2: '/co2-api',
  methane: '/methane-api',
  nitrousOxide: '/nitrous-oxide-api',
  arctic: '/arctic-api',
};

async function request(endpoint, signal) {
  const response = await fetch(`${BASE_URL}${endpoint}`, { signal });
  if (!response.ok) {
    throw new Error(`Errore API: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function asNumber(value) {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : null;
}

function yearFromDate(value) {
  if (value === null || value === undefined) return null;
  const match = String(value).match(/^\d{4}/);
  return match ? Number(match[0]) : null;
}

function normalizeSeries(items, { dateKeys, valueKeys }) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      const dateKey = dateKeys.find((key) => item?.[key] !== undefined);
      const valueKey = valueKeys.find((key) => item?.[key] !== undefined);
      const rawDate = dateKey ? item[dateKey] : null;
      const value = valueKey ? asNumber(item[valueKey]) : null;
      if (rawDate === null || value === null) return null;
      return {
        date: String(rawDate),
        year: yearFromDate(rawDate),
        value,
        raw: item,
      };
    })
    .filter(Boolean);
}

export async function getTemperature(signal) {
  const json = await request(ENDPOINTS.temperature, signal);
  const items = json.result ?? json.temperature ?? [];
  return normalizeSeries(items, {
    dateKeys: ['time', 'date', 'year'],
    valueKeys: ['land', 'station', 'value', 'temperature'],
  });
}

export async function getCO2(signal) {
  const json = await request(ENDPOINTS.co2, signal);
  const items = json.co2 ?? json.result ?? [];

  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const value = asNumber(
        item.trend ??
        item.cycle ??
        item.average ??
        item.value
      );

      if (value === null) {
        return null;
      }

      const year = Number(item.year);
      const month = item.month
        ? String(item.month).padStart(2, '0')
        : null;
      const day = item.day
        ? String(item.day).padStart(2, '0')
        : null;

      const rawDate = item.date ?? item.year;

      if (!rawDate) {
        return null;
      }

      const date =
        Number.isFinite(year) && month
          ? `${year}-${month}${day ? `-${day}` : ''}`
          : String(rawDate);

      return {
        date,
        year: Number.isFinite(year)
          ? year
          : yearFromDate(rawDate),
        value,
        raw: item,
      };
    })
    .filter(Boolean);
}

export async function getMethane(signal) {
  const json = await request(ENDPOINTS.methane, signal);
  return normalizeSeries(json.methane ?? json.result ?? [], {
    dateKeys: ['date', 'time', 'year'],
    valueKeys: ['trend', 'average', 'value'],
  });
}

export async function getNitrousOxide(signal) {
  const json = await request(ENDPOINTS.nitrousOxide, signal);
  return normalizeSeries(json.nitrous ?? json.nitrousOxide ?? json.result ?? [], {
    dateKeys: ['date', 'time', 'year'],
    valueKeys: ['trend', 'average', 'value'],
  });
}

export async function getArctic(signal) {
  const json = await request(ENDPOINTS.arctic, signal);

  const source =
    json.arcticData?.data ??
    json.arctic ??
    json.result ??
    json.data ??
    {};

  // La Arctic API usa normalmente chiavi nel formato YYYYMM.
  if (source && !Array.isArray(source) && typeof source === 'object') {
    return Object.entries(source)
      .map(([date, item]) => {
        const value = asNumber(
          item?.value ??
          item?.extent ??
          item?.area
        );

        if (value === null) {
          return null;
        }

        // Escludiamo valori mancanti/sentinella e valori impossibili.
        if (value < 0 || value > 30) {
          return null;
        }

        return {
          date: `${date.slice(0, 4)}-${date.slice(4, 6)}`,
          year: Number(date.slice(0, 4)),
          value,
          raw: item,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  return normalizeSeries(source, {
    dateKeys: ['date', 'year'],
    valueKeys: ['value', 'extent', 'area'],
  }).filter((point) => point.value >= 0 && point.value <= 30);
}
