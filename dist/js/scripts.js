const dropdownPosition = (target, dropdown, space = 8, fixedWidth = false) => {
	dropdown.style.maxHeight = 'none';

	let windowHeight = window.innerHeight,
	targetRect = target.getBoundingClientRect(),
	dropdownRect = dropdown.getBoundingClientRect(),
	dropdownHeight = dropdownRect.height,
	targetLeft = targetRect.left,
	targetTop = targetRect.top,
	targetHeight = targetRect.height,
	distanceTop = targetTop - space,
	distanceBottom = windowHeight - targetTop - targetHeight - space,
	positionTop = targetTop + targetHeight + space,
	positionBottom = windowHeight - targetTop + space;

	if(fixedWidth){
		dropdown.style.width = targetRect.width + 'px';
	}

	dropdown.style.left = targetLeft + 'px';
	dropdown.style.top = positionTop + 'px';
	dropdown.style.bottom = 'auto';

	if(distanceBottom < dropdownHeight && distanceTop > distanceBottom){
		dropdown.style.top = 'auto';
		dropdown.style.bottom = positionBottom + 'px';
		dropdown.style.maxHeight = distanceTop + 'px';
	} else {
		dropdown.style.maxHeight = distanceBottom + 'px';
	}
}

const datepickerFields = document.querySelectorAll('.datepicker-field');
datepickerFields.forEach(datepickerField => {
	const input = datepickerField.querySelector('input');
	const d = input.value.split('.');
	new AirDatepicker(input, {
		selectedDates: [new Date(d[2] + '/' + d[1] + '/' + d[0])]
	});
});

const periodDataControl = document.querySelector('.period-data-control');
if(periodDataControl){
  const periodDataControlBtn = periodDataControl.querySelector('.period-data-control__btn');
  periodDataControlBtn.addEventListener('click', () => {
    periodDataControl.classList.toggle('is-open');
  });

  document.addEventListener('click', e => {
    if(!e.target.closest('.period-data-control') && !e.target.closest('.air-datepicker')){
      periodDataControl.classList.remove('is-open');
    }
  });

  const periodDataYearBtn = periodDataControl.querySelector('.js-period-data-year');
  const periodDataChooseBtn = periodDataControl.querySelector('.js-period-data-choose');
  const periodDataDatesWrapper = periodDataControl.querySelector('.js-period-data-dates');
  const periodDataDatesInputs = periodDataDatesWrapper.querySelectorAll('input');

  periodDataChooseBtn.addEventListener('click', e => {
  	periodDataYearBtn.classList.remove('is-active');
  	periodDataChooseBtn.classList.add('is-active');
  	periodDataDatesInputs.forEach(input => {
  		input.disabled = false;
  	});
  });

  periodDataYearBtn.addEventListener('click', e => {
  	periodDataChooseBtn.classList.remove('is-active');
  	periodDataYearBtn.classList.add('is-active');
  	periodDataDatesInputs.forEach(input => {
  		input.disabled = true;
  	});
  });
}

const showModal = (selector) => {
	const modal = document.querySelector(selector);
	modal.classList.add('is-open');
  setTimeout(function(){
    modal.classList.add('is-visible');
  });
  return false;
}

const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
	modal.addEventListener('click', e => {
		if(!e.target.closest('.modal__window') || e.target.closest('.js-modal-close')){
			modal.classList.remove('is-visible');
			setTimeout(function(){
				modal.classList.remove('is-open');
			}, 350);
		}
	});
});

const moreModal = document.querySelector('.js-more-modal');
if(moreModal){
	const moreModalInfoBtn = document.querySelector('.js-more-modal-info-btn');
	const moreModalEditorBtn = document.querySelector('.js-more-modal-editor-btn');
	const moreModalEditor = document.querySelector('.event-editor');

	moreModalInfoBtn.addEventListener('click', e => {
		moreModalEditorBtn.classList.remove('is-active');
		moreModalInfoBtn.classList.add('is-active');
		moreModalEditor.classList.remove('is-visible');
	});

	moreModalEditorBtn.addEventListener('click', e => {
		moreModalInfoBtn.classList.remove('is-active');
		moreModalEditorBtn.classList.add('is-active');
		moreModalEditor.classList.add('is-visible');
	});
}

const sourceGroups = document.querySelectorAll('.source-group');
sourceGroups.forEach(group => {
	const header = group.querySelector('.source-group__header');
	const items = group.querySelectorAll('.source-group__content .source-item');

	header.addEventListener('click', e => {
		e.stopPropagation;
		group.classList.toggle('is-open');
	});

	items.forEach(item => {
		item.addEventListener('click', e => {
			item.classList.toggle('is-active');
		});
	});
});

const expandBoxes = document.querySelectorAll('.expand-box');
expandBoxes.forEach(expandBox => {
	const header = expandBox.querySelector('.expand-box__header');
	header.addEventListener('click', e => expandBox.classList.toggle('is-open'));
});
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
const asideItems = document.querySelectorAll('.aside-item');
const asideSettingsDropdown = document.querySelector('.aside__settings-droplist');
const asideSettingsBtns = document.querySelectorAll('.aside-item__settings-btn');

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
				dropdownPosition(itemSettingsBtn, asideSettingsDropdown);
			}
		});
	}
});

document.addEventListener('click', e => {
  if(asideSettingsDropdown && !e.target.closest('.aside-item__settings-btn') && !e.target.closest('.aside__settings-droplist')){
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
	const multiple = selectBlock.dataset.multiple;
	const target = selectBlock.querySelector('.select-block__target');
	const dropdown = selectBlock.querySelector('.select-block__droplist');
	const value = multiple ? selectBlock.querySelector('.select-block__content') : selectBlock.querySelector('.select-block__value');
	const clear = selectBlock.querySelector('.select-block__clear');
	const items = selectBlock.querySelectorAll('.select-block__item');
	const placeholder = selectBlock.dataset.placeholder || '';

	const selectBlockClear = () => {
		selectBlock.classList.remove('is-filled');
		selectBlock.classList.add('is-empty');
		value.innerHTML = placeholder;

		items.forEach(item => {
			item.classList.remove('is-active');
		});
	}

	const addChoice = (id, text) => {
		if(selectBlock.classList.contains('is-empty')){
			value.innerText = '';
			selectBlock.classList.remove('is-empty');
			selectBlock.classList.add('is-filled');
		}

		const choice = `
			<div class="select-block__choice" data-id="${id}">
    		<div class="select-block__choice-content">*${text}</div>
    		<button type="button" class="select-block__choice-remove"></button>
    	</div>
		`;

		value.insertAdjacentHTML('beforeEnd', choice);
	}

	target.addEventListener('click', e => {
		selectBlocks.forEach(curSelectBlock => {
			if(curSelectBlock !== selectBlock){
  			curSelectBlock.classList.remove('is-open');
  		}
  	});

		if(e.target.closest('.select-block__choice')){
			e.stopPropagation();
			const choice = e.target.closest('.select-block__choice');

			selectBlock.querySelectorAll('.select-block__item.is-active').forEach(item => {
				if(choice.dataset.id === item.dataset.id){
					item.classList.remove('is-active');
				}
			});

			choice.remove();
			
			if(!selectBlock.querySelectorAll('.select-block__choice').length){
				selectBlockClear();
			}

			dropdownPosition(target, dropdown, 4, true);
		} else {
			if(selectBlock.classList.contains('is-open')){
				selectBlock.classList.remove('is-open');
			} else {
				selectBlock.classList.add('is-open');
				dropdownPosition(target, dropdown, 4, true);
			}
		}
	});

	items.forEach((item, i) => {
		if(item.classList.contains('is-active')){
			selectBlock.classList.remove('is-empty');
			selectBlock.classList.add('is-filled');

			if(multiple){
				const id = new Date().getTime() + i;
				item.dataset.id = id;
				addChoice(id, item.innerHTML);
			} else {
				value.innerHTML = item.innerHTML;
			}
		}

		item.addEventListener('click', e => {
			e.preventDefault();

			if(multiple){
				if(item.classList.contains('is-active')){
					item.classList.remove('is-active');
					
					selectBlock.querySelectorAll('.select-block__choice').forEach(choice => {
						if(choice.dataset.id === item.dataset.id){
							choice.remove();
						}
					});
					
					if(!selectBlock.querySelectorAll('.select-block__choice').length){
						selectBlockClear();
					}
				} else {
					const id = new Date().getTime();
					item.classList.add('is-active');
					item.dataset.id = id;
					addChoice(id, item.innerHTML);
				}

				dropdownPosition(target, dropdown, 4, true);
			} else {
				selectBlock.classList.remove('is-open');
				selectBlock.classList.remove('is-empty');
				selectBlock.classList.add('is-filled');

				items.forEach(item => {
					item.classList.remove('is-active');
				});

				item.classList.add('is-active');

				value.innerHTML = item.innerHTML;
			}
		});
	});

	if(clear){
		clear.addEventListener('click', e => {
			e.stopPropagation();
			selectBlockClear();
			selectBlock.classList.remove('is-open');
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