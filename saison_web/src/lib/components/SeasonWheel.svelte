<script lang="ts">
  import { MONTHS, SHORT_MONTHS } from '$lib/types';
  
  // Accept the selected month as a two-way bound prop, default to current month
  let { month = $bindable(new Date().getMonth() + 1) } = $props();
  
  // Helper constants
  const cx = 120, cy = 120, R = 108, r = 64;
  
  const setMonth = (m: number) => {
    if (m < 1) m = 12;
    if (m > 12) m = 1;
    month = m;
  };

  // Helper to draw an SVG arc
  const describeArc = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
    const startObjOuter = polarToCartesian(cx, cy, outerR, startAngle);
    const endObjOuter = polarToCartesian(cx, cy, outerR, endAngle);
    const startObjInner = polarToCartesian(cx, cy, innerR, endAngle);
    const endObjInner = polarToCartesian(cx, cy, innerR, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", startObjOuter.x, startObjOuter.y, 
        "A", outerR, outerR, 0, largeArcFlag, 1, endObjOuter.x, endObjOuter.y,
        "L", startObjInner.x, startObjInner.y,
        "A", innerR, innerR, 0, largeArcFlag, 0, endObjInner.x, endObjInner.y,
        "Z"
    ].join(" ");
  }

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
</script>

<div class="wheel-wrap">
  <div class="wheel-outer">
    <svg class="wheel-svg" viewBox="0 0 240 240">
      {#each Array(12) as _, i}
        {@const m = i + 1}
        {@const startAngle = i * 30}
        {@const endAngle = (i + 1) * 30}
        {@const gap = 1}
        {@const isActive = m === month}
        {@const midAngle = (i + 0.5) * 30}
        {@const labelR = (R + r) / 2}
        {@const labelPos = polarToCartesian(cx, cy, labelR, midAngle)}

        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <g class="month-slice" class:active={isActive} onclick={() => setMonth(m)}>
          <path 
            class="month-arc" 
            d={describeArc(startAngle + gap, endAngle - gap, r, R)} 
          />
          <text 
            class="month-text"
            x={labelPos.x} 
            y={labelPos.y} 
            text-anchor="middle" 
            dominant-baseline="central"
          >
            {SHORT_MONTHS[i]}
          </text>
        </g>
      {/each}
    </svg>
    <div class="wheel-center-label">
      <span class="wcl-month">{MONTHS[month - 1]}</span>
    </div>
  </div>
  
  <div class="wheel-controls">
    <button class="wheel-btn" onclick={() => setMonth(month - 1)} aria-label="Previous month">&#8592;</button>
    <button class="wheel-btn" onclick={() => setMonth(month + 1)} aria-label="Next month">&#8594;</button>
  </div>
</div>

<style>
  .wheel-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem 0.5rem;
    position: relative;
  }

  .wheel-outer {
    position: relative;
    width: 240px;
    height: 240px;
  }

  .wheel-svg {
    width: 100%;
    height: 100%;
  }

  .month-slice {
    cursor: pointer;
  }

  .month-arc {
    fill: var(--border);
    transition: fill var(--dur) ease, opacity 0.2s ease;
    opacity: 0.6;
  }

  .month-slice:hover .month-arc {
    opacity: 0.85;
  }

  .month-slice.active .month-arc {
    fill: var(--accent);
    opacity: 1;
  }

  .month-text {
    font-size: 8.5px;
    fill: var(--text-muted);
    font-weight: 400;
    pointer-events: none;
    transition: fill var(--dur) ease, font-size 0.2s ease, font-weight 0.2s ease;
  }

  .month-slice.active .month-text {
    font-size: 9.5px;
    font-weight: 500;
    fill: var(--bg);
  }

  .wheel-center-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
  }

  .wcl-month {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    line-height: 1;
    color: var(--text);
    transition: color var(--dur) ease;
    display: block;
  }

  .wheel-controls {
    display: flex;
    gap: 2rem;
    margin-top: 1.5rem;
  }

  .wheel-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s, color var(--dur) ease, border-color var(--dur) ease;
  }

  .wheel-btn:hover {
    background-color: var(--bg-card);
  }
</style>
