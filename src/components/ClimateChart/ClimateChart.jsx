import { useEffect, useState } from 'react';

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import styles from './ClimateChart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function formatValue(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return '';
  }

  return number.toFixed(1);
}

export default function ClimateChart({ points, title, unit }) {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const stride = Math.max(
    1,
    Math.ceil(points.length / 650)
  );

  const sampled = points.filter(
    (_, index) =>
      index % stride === 0 ||
      index === points.length - 1
  );

  const data = {
    labels: sampled.map((point) => point.date),

    datasets: [
      {
        label: title,
        data: sampled.map((point) => point.value),
        borderColor: '#14866d',
        backgroundColor: 'rgba(20, 134, 109, 0.10)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.22,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: 'index',
      intersect: false,
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => {
            const value = formatValue(context.parsed.y);

            return `${value} ${unit}`;
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          maxTicksLimit: isMobile ? 4 : 8,
          maxRotation: 0,
          minRotation: 0,
          autoSkip: true,
          padding: 8,

          callback: function (value) {
            const label = this.getLabelForValue(value);

            if (isMobile) {
              return String(label).slice(0, 4);
            }

            return label;
          },
        },
      },

      y: {
        grid: {
          color: 'rgba(20, 35, 43, 0.07)',
        },

        ticks: {
          callback: (value) => {
            return `${formatValue(value)} ${unit}`;
          },
        },
      },
    },
  };

  return (
    <section className={styles.card}>
      <h2>{title}</h2>

      <div className={styles.canvas}>
        <Line
          data={data}
          options={options}
        />
      </div>
    </section>
  );
}