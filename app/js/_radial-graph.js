document.querySelectorAll('.radial-graph__graph').forEach(graph => {
  const w = graph.getBoundingClientRect().width || 40;
  const a = graph.dataset.angle;
  const r = w / 2 - graph.getAttribute('stroke-width') / 2;
  graph.querySelector('path').setAttribute('d', `M ${w / 2 + (r * Math.cos((a - 90) * Math.PI / 180))} ${w / 2 + (r * Math.sin((a - 90) * Math.PI / 180))} A ${r} ${r} 0 ${a <= 180 ? "0" : "1"} 0 ${w / 2 + (r * Math.cos(-90 * Math.PI / 180))} ${w / 2 + (r * Math.sin(-90 * Math.PI / 180))}`);
});