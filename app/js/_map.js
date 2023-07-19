const mapWidgets = document.querySelector('.map-widgets');
if(mapWidgets){
  const mapWidgetsBtn = mapWidgets.querySelector('.map-widgets__target');
  mapWidgetsBtn.addEventListener('click', () => {
    mapWidgets.classList.toggle('is-open');
  });
}

const mapAdvancedLayers = document.querySelector('.map-advanced-layers');
if(mapAdvancedLayers){
  const mapAdvancedLayersBtn = mapAdvancedLayers.querySelector('.map-advanced-layers__btn');
  mapAdvancedLayersBtn.addEventListener('click', () => {
    mapAdvancedLayers.classList.toggle('is-open');
  });

  document.addEventListener('click', e => {
    if(!e.target.closest('.map-advanced-layers')){
      mapAdvancedLayers.classList.remove('is-open');
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

const mapControlItems = document.querySelectorAll('.map-control__item');
mapControlItems.forEach(item => {
  const btn = item.querySelector('.map-control__btn');
  btn.addEventListener('click', e => {
    mapControlItems.forEach(curItem => {
      if(curItem !== item){
        curItem.classList.remove('is-open');
      }
      
      item.classList.remove('is-open');
    });

    item.classList.toggle('is-open');
  });
  
  const close = item.querySelector('.map-control__close');
  if(close){
    close.addEventListener('click', e => {
      item.classList.remove('is-open');
    });
  }
});

document.addEventListener('click', e => {
  if(!e.target.closest('.map-control__item')){
    mapControlItems.forEach(item => {
      item.classList.remove('is-open');
    });
  }
});