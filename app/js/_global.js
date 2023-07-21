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