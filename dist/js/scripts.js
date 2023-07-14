document.querySelectorAll('.radial-graph__graph').forEach(graph => {
  const w = graph.getBoundingClientRect().width || 40;
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
  const tableColumnsControlBtn = tableColumnsControl.querySelector('.table-columns-control__btn');
  tableColumnsControlBtn.addEventListener('click', () => {
    tableColumnsControl.classList.toggle('is-open');
  });
  
  document.addEventListener('click', e => {
    if(!tableColumnsControl.contains(e.target)){
      tableColumnsControl.classList.remove('is-open');
    }
  });
}
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
const asideItems = document.querySelectorAll('.aside-item');
const asideSettingsDropdown = document.querySelector('.aside__settings-dropdown');
const asideSettingsBtns = document.querySelectorAll('.aside-item__settings-btn');

const dropdownPosition = (target) => {
	const targetBoundingClientRect = target.getBoundingClientRect();
	const dropdownBoundingClientRect = asideSettingsDropdown.getBoundingClientRect();
	const left = targetBoundingClientRect.left;
	const top = targetBoundingClientRect.top + targetBoundingClientRect.height + 8;

	asideSettingsDropdown.style.left = left + 'px';
	asideSettingsDropdown.style.top = top + 'px';
	asideSettingsDropdown.style.bottom = 'auto';

	if(top + dropdownBoundingClientRect.height > window.innerHeight){
		asideSettingsDropdown.style.top = 'auto';
		asideSettingsDropdown.style.bottom = 0;
		asideSettingsDropdown.style.left = (left + targetBoundingClientRect.width + 6) + 'px';
	}
}

asideItems.forEach(item => {
	item.addEventListener('click', e => {
		item.classList.toggle('is-active');

		const group = item.closest('.aside-nav__group');
		if(group){
			const groupHeader = group.querySelector('.aside-nav__group-header');
			const groupContent = group.querySelector('.aside-nav__group-content');

			if(groupHeader.contains(item)){
				const groupItems = groupContent.querySelectorAll('.aside-item');
				groupItems.forEach(groupItem => {
					groupItem.classList.toggle('is-active', item.classList.contains('is-active'));
				});
			} else if(groupContent.contains(item)){
					groupHeader.querySelector('.aside-item').classList.toggle('is-active', groupContent.querySelectorAll('.aside-item:not(.is-active)').length <= 0);
			}
		}
	});

	const itemLink = item.querySelector('a');
	if(itemLink){
		itemLink.addEventListener('click', e => {
			e.stopPropagation();
		});
	}

	const itemExpand = item.querySelector('.aside-item__expand');
	if(itemExpand){
		const group = item.closest('.aside-nav__group');
		itemExpand.addEventListener('click', e => {
			e.stopPropagation();
			group.classList.toggle('is-open');
			asideSettingsDropdown.classList.remove('is-open');
		});
	}

	const itemSettingsBtn = item.querySelector('.aside-item__settings-btn');
	if(itemSettingsBtn){
		itemSettingsBtn.addEventListener('click', e => {
			e.stopPropagation();
			if(itemSettingsBtn.classList.contains('is-open')){
				itemSettingsBtn.classList.remove('is-open');
				asideSettingsDropdown.classList.remove('is-open');
			} else {
				asideSettingsBtns.forEach(btn => {
		  		btn.classList.remove('is-open');
		  	});
				itemSettingsBtn.classList.add('is-open');
				asideSettingsDropdown.classList.add('is-open');
				dropdownPosition(itemSettingsBtn);
			}
		});
	}
});

document.addEventListener('click', e => {
  if(!e.target.closest('.aside-item__settings-btn') && !e.target.closest('.aside__settings-dropdown')){
  	asideSettingsBtns.forEach(btn => {
  		btn.classList.remove('is-open');
  	});
    asideSettingsDropdown.classList.remove('is-open');
  }
});

const filter = document.querySelector('.aside__filter');
const filterBtn = document.querySelector('.aside__header-filter-btn');
const filterClose = document.querySelector('.aside__filter-back');

if(filterBtn){
	filterBtn.addEventListener('click', e => {
		filterBtn.classList.add('is-highlight');
		filter.classList.add('is-open');
	});
}

if(filterClose){
	filterClose.addEventListener('click', e => {
		filter.classList.remove('is-open');
	});
}
const selectBlocks = document.querySelectorAll('.select-block');
selectBlocks.forEach(selectBlock => {
	const target = selectBlock.querySelector('.select-block__target');
	const value = selectBlock.querySelector('.select-block__value');
	const clear = selectBlock.querySelector('.select-block__clear');
	const items = selectBlock.querySelectorAll('.select-block__item');
	const placeholder = selectBlock.dataset.placeholder || '';

	target.addEventListener('click', e => {
		selectBlocks.forEach(curSelectBlock => {
			if(curSelectBlock !== selectBlock){
  			curSelectBlock.classList.remove('is-open');
  		}
  	});

		selectBlock.classList.toggle('is-open');
	});

	items.forEach(item => {
		if(item.classList.contains('is-active')){
			selectBlock.classList.remove('is-empty');
			selectBlock.classList.add('is-filled');

			value.innerHTML = item.innerHTML;
		}

		item.addEventListener('click', e => {
			e.preventDefault();

			selectBlock.classList.remove('is-open');
			selectBlock.classList.remove('is-empty');
			selectBlock.classList.add('is-filled');

			items.forEach(item => {
				item.classList.remove('is-active');
			});

			item.classList.add('is-active');

			value.innerHTML = item.innerHTML;
		});
	});

	if(clear){
		clear.addEventListener('click', e => {
			e.stopPropagation();

			selectBlock.classList.remove('is-open');
			selectBlock.classList.remove('is-filled');
			selectBlock.classList.add('is-empty');

			items.forEach(item => {
				item.classList.remove('is-active');
			});
			
			value.innerHTML = placeholder;
		});
	}
});

document.addEventListener('click', e => {
  if(!e.target.closest('.select-block')){
  	selectBlocks.forEach(selectBlock => {
  		selectBlock.classList.remove('is-open');
  	});
  }
});