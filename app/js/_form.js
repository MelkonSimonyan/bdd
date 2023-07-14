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