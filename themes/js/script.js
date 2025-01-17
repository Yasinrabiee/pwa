let value = undefined;
let bgc = undefined;

let notes = localStorage.getItem(`notes`) === null ?
[] : JSON.parse(localStorage.getItem(`notes`));

let numberOfNotes = localStorage.getItem(`notes`) === null ?
-1 : JSON.parse(localStorage.getItem(`notes`)).length - 1;

// console.log(numberOfNotes);

function setColor(color) {
	bgc = color.css(`background-color`);
	$(`.section__input__text`).css(`background-color`, bgc);
}

function addNote() {
	value = $(`.section__input__text`).val();
	let dir = undefined;
	if (checkDir(value))
		dir = `ltr`
	else
		dir = `rtl`
	if(value.trim() !== '') {
		numberOfNotes++;
		const time = addTime();
		const char = value.charCodeAt(0);
		const newObject = {
			id: numberOfNotes,
			backgroundColor: bgc,
			value: value,
			time: time,
			direction: dir
		}
		notes.push(newObject);
		localStorage.setItem(`notes`, JSON.stringify(notes));
		console.log(numberOfNotes);
		const elem = $(`
			<div class="box" id="${notes[numberOfNotes].id}" style="background-color: ${notes[numberOfNotes].backgroundColor}; direction: ${notes[numberOfNotes].direction};">
			<div class="nav">
			<div>
			<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			fill="currentColor">
			<path fill-rule="evenodd"
			d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
			clip-rule="evenodd" />
			</svg>
			</div>
			<div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit">
			<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
			</svg>
			</div>
			<div>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="trash-icon">
			<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
			</svg>
			</div>
			</div>
			<div class="value">${notes[numberOfNotes].value}</div>
			<div class="time">
			<div class="edited"></div>
			<div class="time__time">${notes[numberOfNotes].time}</div>
			</div>
			</div>
			`);
		if(char >= 65 && char <= 122)
			elem.children(`.value`).css(`direction`,`ltr`);
		else
			elem.children(`.value`).css(`direction`,`rtl`);
		$(`.section__boxes`).append(elem);
		$(`.section__input__text`).val(``);
	}
}

function checkDir(text) {
	const char = text.charCodeAt(0);
	if(char >= 65 && char <= 122)
		return true;
	return false;
}

function editNote(edit, noteId) {
	let editValue = $(`.edit__input`).val();
	if (editValue.trim() !== '') {
		if(checkDir(editValue) === true)
			edit.css(`direction`,`ltr`);
		else
			edit.css(`direction`,`rtl`);
		edit.html(editValue);
		$(`.section__edit`).css(`bottom`,`-110px`);
	}
	let time = addTime();
	edit.siblings(`.time`).children(`.edited`).html(`ویرایش شده:`);
	edit.siblings(`.time`).children(`.time__time`).html(`${time}`);
	localStorage.setItem(`notes`, JSON.stringify(editItem(notes, noteId, time, editValue)));
}

function addTime() {
	const persianDateTimeFormat = new Intl.DateTimeFormat('fa', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long'
	});
	const now = new Date();
	const format = persianDateTimeFormat.format(now);
	const hour = now.getHours().toString().padStart(2, `0`);
	const minute = now.getMinutes().toString().padStart(2, `0`);
	let hourMinute = `${hour}:${minute}`;
	hourMinute = En2Fa(hourMinute);
	return `${format} ${hourMinute}`;
}

function En2Fa(value) {
	value = value.replace(/0/g, `۰`);
	value = value.replace(/1/g, `۱`);
	value = value.replace(/2/g, `۲`);
	value = value.replace(/3/g, `۳`);
	value = value.replace(/4/g, `۴`);
	value = value.replace(/5/g, `۵`);
	value = value.replace(/6/g, `۶`);
	value = value.replace(/7/g, `۷`);
	value = value.replace(/8/g, `۸`);
	value = value.replace(/9/g, `۹`);
	return value;
}

function addCheckList() {
	const value = $(`.check-list-input`).val();
	if(value !== '') {
		$(`.check-list-ul`).append(`
			<div class="checklist-item-wrapper">
			<input type="checkbox" class="check-box-input">
			<div class="text">
			<span class="line"></span>
			<li class="check-list-value">${value}</li>
			</div>
			</div>
		`)
		$(`.check-list-input`).val(``);
		$(`.check-list-input`).focus();
	}
}

function removeItem(ar, ele) {
    ar.forEach((item, index) => {
        if (item.id == ele) {
        	ar.splice(index, 1);
        }
    });
    return ar;
}

function bookMarkItem(ar, ele) {
	ar.forEach((item, index) => {
	    if (item.id == ele) {
	    	item.starClass = "active"
	    }
	});
	return ar;
}

function editItem(array, ele, time, value) {
	array.forEach((item, index) => {
	    if (item.id == ele) {
	    	item.time = time;
	    	item.value = value;
	    }
	});
	return array;
}

window.addEventListener(`load`, function() {
	const bgcFromLocalStorage = localStorage.getItem(`color`);
	document.querySelector(`.section__input__text`).style.backgroundColor
	= bgcFromLocalStorage;
});

$(`.color`).click(function() {
	let color = $(this);
	setColor(color);
});

$(`#add-btn`).click(function() {
	addNote();
});

$(`#delete-btn`).click(function() {
	localStorage.clear();
	$(`.section__boxes`).empty();
});

$(`html`).keydown(function(event) {
	if(event.key == `Enter`)
		addNote();
});

$(`.section__boxes`).on('click','.star', function() {
	let note = $(this).closest(`.box`);
	let noteId = note.attr(`id`);
	if($(this).hasClass(`active`))
		note.css(`order`,`100`);	
	else
		note.css(`order`,`1`);
	$(this).toggleClass(`active`);
});

let edit;
$(`.section__boxes`).on('click', '.edit', function() {
	edit = $(this).closest('.nav').siblings('.value');
	let noteId = $(this).closest('.box').attr('id');
	$(`.section__edit`).css(`bottom`,`110px`);
	$(`.edit__input`).focus();
	$(`.edit__edit`).click(function() {
		editNote(edit, noteId);
	});
	$(`.edit__input`).keydown(function(event) {
		if(event.key === `Enter`)
			editNote(edit, noteId);
	});
});

$(`.edit__close`).click(function() {
	$(this).parent(`.section__edit`).css(`bottom`,`-110px`);
});

$(`.section__boxes`).on('click', '.trash-icon', function() {
	$(this).parents(`.box`).fadeOut(400);
	let item = parseInt($(this).parents(`.box`).attr(`id`));
	notes = removeItem(notes, item);
	localStorage.setItem(`notes`, JSON.stringify(notes));
});

$(`.edit__input`).on('input', function() {
	let text = $(this).val();
	if(checkDir(text) === true)
		$(this).css(`direction`,`ltr`);
	else
		$(this).css(`direction`,`rtl`);
});

$(`#check-list`).click(function() {
	$(this).toggleClass(`check-active`);
	if($(this).hasClass(`check-active`)) {
		$(`.checklist-container`).fadeIn(250);
		$(`.check-list-input`).focus();
		$(this).css(`color`,`#0091EA`);
	}
	else {
		$(`.checklist-container`).fadeOut(250);
		$(this).css(`color`,`#989b9d`);
	}
});

$(`.plus-checklist`).click(function() {
	addCheckList();
});

$(`.check-list-input`).keydown(function(event) {
	if(event.key == `Enter`)
		addCheckList();
});

$(`.check-list-ul`).on('click', '.check-box-input', function() {
	$(this).toggleClass(`active`);
	if($(this).hasClass(`active`)) {
		$(this).siblings(`.text`).children(`.line`).css(`width`, `100%`);
		$(this).siblings(`.text`).css(`color`,`#989b9d`);
	}
	else {
		$(this).siblings(`.text`).children(`.line`).css(`width`, `0%`);
		$(this).siblings(`.text`).css(`color`,`#0091EA`);
	}
});

window.addEventListener(`load`, function(e) {
	let newObjectFromLocalStorage = JSON.parse(localStorage.getItem(`notes`));
	console.log(newObjectFromLocalStorage);
	if(newObjectFromLocalStorage !== null) {
		notes = newObjectFromLocalStorage; // ?
		for(let i = 0; i <= notes.length - 1; i++) {
			let getElementFromLocalStorage = $(`
				<div class="box" id="${notes[i].id}" style="background-color: ${notes[i].backgroundColor}; direction: ${notes[i].direction};">
				<div class="nav">
				<div>
				<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				fill="currentColor">
				<path fill-rule="evenodd"
				d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
				clip-rule="evenodd" />
				</svg>
				</div>
				<div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit">
				<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
				</svg>
				</div>
				<div>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="trash-icon">
				<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
				</svg>
				</div>
				</div>
				<div class="value">${notes[i].value}</div>
				<div class="time">
				<div class="edited"></div>
				<div class="time__time">${notes[i].time}</div>
				</div>
				</div>
				`);
			$(`.section__boxes`).append(getElementFromLocalStorage);
		}
	}
});