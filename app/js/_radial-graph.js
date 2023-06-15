const arc = (x, y, radius, startAngle, endAngle) => {
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M", x + (radius * Math.cos((endAngle-90) * Math.PI / 180.0)), y + (radius * Math.sin((endAngle-90) * Math.PI / 180.0)), 
    "A", radius, radius, 0, largeArcFlag, 0, x + (radius * Math.cos((startAngle-90) * Math.PI / 180.0)), y + (radius * Math.sin((startAngle-90) * Math.PI / 180.0))
    ].join(" ");

  return d;
}

const radialGraphs = document.querySelectorAll('.radial-graph__graph');
radialGraphs.forEach(graph => {
  const path = graph.querySelector('path');
  const w = graph.getBoundingClientRect().width;
  const r = path.getAttribute('stroke-width');
  const a = path.dataset.angle;

  path.setAttribute('d', arc(w / 2, w / 2, w / 2 - r / 2, 0, a));
});