import { useMemo, useState } from 'react';
import useClimateData from '../../hooks/useClimateData';
import ClimateChart from '../ClimateChart/ClimateChart';
import ErrorState from '../ErrorState/ErrorState';
import LoadingState from '../LoadingState/LoadingState';
import MetricCard from '../MetricCard/MetricCard';
import styles from './IndicatorPage.module.css';

const ranges = [
  { label: 'Tutto', years: null },
  { label: '20 anni', years: 20 },
  { label: '10 anni', years: 10 },
  { label: '5 anni', years: 5 },
];

function formatValue(value, decimals, unit, signed = false) {
  if (!Number.isFinite(value)) return '—';
  const sign = signed && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)} ${unit}`;
}

export default function IndicatorPage({ indicator }) {
  const { data, loading, error, retry } = useClimateData(indicator.loader);
  const [years, setYears] = useState(null);
  const filtered = useMemo(() => {
    if (!years || !data.length) return data;
    const latestYear = Math.max(...data.map((point) => point.year).filter(Number.isFinite));
    return data.filter((point) => !point.year || point.year >= latestYear - years);
  }, [data, years]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={retry} />;

  const first = filtered[0];
  const latest = filtered[filtered.length - 1];
  const previous = filtered[filtered.length - 2];
  const change = latest && previous ? latest.value - previous.value : null;
  const period = first && latest ? `${first.year ?? first.date} – ${latest.year ?? latest.date}` : '—';

  return (
    <div className={styles.page}>
      <header className={styles.heading}>
        <div><span className={styles.eyebrow}>Climate indicator</span><h1>{indicator.title}</h1><p>{indicator.description}</p></div>
        <label className={styles.selectLabel}>Periodo
          <select value={years ?? 'all'} onChange={(event) => setYears(event.target.value === 'all' ? null : Number(event.target.value))}>
            {ranges.map((range) => <option key={range.label} value={range.years ?? 'all'}>{range.label}</option>)}
          </select>
        </label>
      </header>

      {!data.length ? <ErrorState onRetry={retry} /> : <>
        <section className={styles.metrics}>
          <MetricCard value={formatValue(latest?.value, indicator.decimals, indicator.unit)} label="Ultimo valore disponibile" />
          <MetricCard value={formatValue(change, indicator.decimals, indicator.unit, true)} label={indicator.changeLabel} />
          <MetricCard value={period} label="Periodo visualizzato" />
        </section>
        <ClimateChart points={filtered} title={indicator.chartTitle} unit={indicator.unit} />
        <section id="informazioni" className={styles.info}><h2>Informazioni</h2><p>{indicator.sourceText} I dati vengono richiesti dal client API separato dalla UI e visualizzati dinamicamente nel grafico.</p><a href="https://global-warming.org/" target="_blank" rel="noreferrer">Fonte: global-warming.org ↗</a></section>
      </>}
    </div>
  );
}
