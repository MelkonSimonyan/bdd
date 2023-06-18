const mapWidget = document.querySelector('.map-widget');
if(mapWidget){
  const btn = mapWidget.querySelector('.map-widget__target');
  btn.addEventListener('click', () => {
    mapWidget.classList.toggle('is-open');
  });

  const closeBtn = mapWidget.querySelector('.map-widget__close');
  if(closeBtn){
    closeBtn.addEventListener('click', () => {
      mapWidget.classList.remove('is-open');
    });
  }
}