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