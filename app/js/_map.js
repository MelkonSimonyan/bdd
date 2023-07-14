const mapWidgets = document.querySelector('.map-widgets');
if(mapWidgets){
  const mapWidgetsBtn = mapWidgets.querySelector('.map-widgets__target');
  mapWidgetsBtn.addEventListener('click', () => {
    mapWidgets.classList.toggle('is-open');
  });
}

const mapLayersControl = document.querySelector('.map-layers-control');
if(mapLayersControl){
  const mapLayersControlBtn = mapLayersControl.querySelector('.map-layers-control__btn');
  mapLayersControlBtn.addEventListener('click', () => {
    mapLayersControl.classList.toggle('is-open');
  });

  document.addEventListener('click', e => {
    if(!e.target.closest('.map-layers-control')){
      mapLayersControl.classList.remove('is-open');
    }
  });
}

const mapTooltips = document.querySelectorAll('.map-tooltip');
mapTooltips.forEach(mapTooltip => {
  mapTooltip.addEventListener('click', e => {
    mapTooltips.forEach(mapTooltip => {
      mapTooltip.classList.remove('is-active');
    });
    mapTooltip.classList.add('is-active');
  });
});