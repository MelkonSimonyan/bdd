document.querySelectorAll('.radial-graph__graph').forEach(graph => {
  const w = graph.getBoundingClientRect().width;
  const a = graph.dataset.angle;
  const r = w / 2 - graph.getAttribute('stroke-width') / 2;
  graph.querySelector('path').setAttribute('d', `M ${w / 2 + (r * Math.cos((a - 90) * Math.PI / 180))} ${w / 2 + (r * Math.sin((a - 90) * Math.PI / 180))} A ${r} ${r} 0 ${a <= 180 ? "0" : "1"} 0 ${w / 2 + (r * Math.cos(-90 * Math.PI / 180))} ${w / 2 + (r * Math.sin(-90 * Math.PI / 180))}`);
});
const tableFilters = document.querySelectorAll('.table__col-filter');
tableFilters.forEach(filter => {
  const btn = filter.querySelector('.table__col-filter-btn');

  btn.addEventListener('click', () => {
    tableFilters.forEach(f => {
      if(f !== filter){
        f.classList.remove('is-active');
      }
    });

    filter.classList.toggle('is-active');
  });
});

document.addEventListener('click', e => {
  if(!e.target.closest('.table__col-filter')){
    tableFilters.forEach(filter => {
      filter.classList.remove('is-active');
    });
  }
});

const tableSectionHeaders = document.querySelectorAll('.table__section-head');
tableSectionHeaders.forEach(sectionHeader => {
  sectionHeader.addEventListener('click', () => {
    sectionHeader.classList.toggle('is-collapsed');
  });
});

const tableColumnsControl = document.querySelector('.table-columns-control');
if(tableColumnsControl){
  const btn = tableColumnsControl.querySelector('.table-columns-control__btn');
  btn.addEventListener('click', () => {
    tableColumnsControl.classList.toggle('is-open');
  });
  
  document.addEventListener('click', e => {
    if(!tableColumnsControl.contains(e.target)){
      tableColumnsControl.classList.remove('is-open');
    }
  });
}
const mapWidget = document.querySelector('.map-widget');
if(mapWidget){
  const btn = mapWidget.querySelector('.map-widget__target');
  btn.addEventListener('click', () => {
    mapWidget.classList.toggle('is-open');
  });
}