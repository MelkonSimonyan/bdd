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