(function() {
  if (typeof IGEM_DATA === 'undefined') return;

  function drawBarChart(svgId, years, values, tooltipFn) {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    const W = 240, H = 130;
    const padL = 22, padR = 6, padT = 12, padB = 28;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const maxVal = Math.max(...values);
    const barW = chartW / years.length;
    const gap = barW * 0.18;

    let html = '';

    // Axis titles (SVG text). Keep them short due to tight SVG padding.
    const xAxisLabel = 'Year';
    const yAxisLabel = 'Cumulative teams';
    const plotCenterY = padT + chartH / 2;

    years.forEach((year, i) => {
      const val = values[i];
      const bh = (val / maxVal) * chartH;
      const x = padL + i * barW + gap / 2;
      const y = padT + chartH - bh;
      const bw = barW - gap;
      html += `<rect class="chart-bar" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="1">
        <title>${year}: ${tooltipFn(val)}</title>
      </rect>`;
      if (bh > 12) {
        html += `<text class="chart-value-label" x="${(x + bw / 2).toFixed(1)}" y="${(y - 2).toFixed(1)}" text-anchor="middle">${val}</text>`;
      }
      html += `<text class="chart-axis-label" x="${(x + bw / 2).toFixed(1)}" y="${(H - padB + 10).toFixed(1)}" text-anchor="middle">${String(year).slice(2)}</text>`;
    });

    html += `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="var(--border)" stroke-width="0.5"/>`;
    html += `<line x1="${padL}" y1="${padT + chartH}" x2="${W - padR}" y2="${padT + chartH}" stroke="var(--border)" stroke-width="0.5"/>`;
    html += `<text class="chart-axis-label" x="${padL - 3}" y="${padT + chartH}" text-anchor="end" dominant-baseline="middle">0</text>`;
    html += `<text class="chart-axis-label" x="${padL - 3}" y="${padT}" text-anchor="end" dominant-baseline="middle">${maxVal}</text>`;

    // Explicit axis titles (not just tick marks).
    html += `<text class="chart-axis-title" x="${(padL + chartW / 2).toFixed(1)}" y="${H - 6}" text-anchor="middle" dominant-baseline="middle">${xAxisLabel}</text>`;
    html += `<text class="chart-axis-title" x="${8}" y="${plotCenterY.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" transform="rotate(-90 8 ${plotCenterY})">${yAxisLabel}</text>`;

    svg.innerHTML = html;
  }

  const cumTeams = IGEM_DATA.teams.reduce((acc, v, i) => { acc.push((acc[i - 1] || 0) + v); return acc; }, []);
  drawBarChart('chart-cumulative', IGEM_DATA.years, cumTeams, v => v + ' total teams');
})();
