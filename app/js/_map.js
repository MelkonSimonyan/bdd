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

const mapLegendGroups = document.querySelector('.map-legend__groups');
if(mapLegendGroups){
  const mapLegendAllGroups = mapLegendGroups.querySelectorAll('.map-legend__group');

  mapLegendAllGroups.forEach(item => {
    item.addEventListener('dragstart', () => {
      setTimeout(() => item.classList.add('is-dragging'), 0);
    });

    item.addEventListener('dragend', () => item.classList.remove('is-dragging'));
  });

  const initmapLegendGroups = (e) => {
    e.preventDefault();
    const draggingItem = mapLegendGroups.querySelector('.is-dragging');
    let siblings = [...mapLegendGroups.querySelectorAll('.map-legend__group:not(.is-dragging)')];
    let nextSibling = siblings.find(sibling => {
      return e.clientY <= sibling.getBoundingClientRect().top + sibling.getBoundingClientRect().height / 2;
    });
    mapLegendGroups.insertBefore(draggingItem, nextSibling);
  }

  mapLegendGroups.addEventListener('dragover', initmapLegendGroups);
  
  mapLegendGroups.addEventListener('dragenter', e => e.preventDefault());
}

const mapLegendFooter = document.querySelector('.map-legend__footer');
if(mapLegendFooter){
  const mapLegendFooterBtn = mapLegendFooter.querySelector('.map-legend__footer-close');
  mapLegendFooterBtn.addEventListener('click', e => {
    e.stopPropagation();
    mapLegendFooter.remove();
  });
}