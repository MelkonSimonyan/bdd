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