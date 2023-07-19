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