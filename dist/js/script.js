"use sctrict"

const url = 'http://localhost:8000';
const headers = {
	"content-type": "application/json;charset=utf-8",
	"access-control-allow-origin": "*",
	"access-control-allow-credentials": true
}

const options = {
	root: document.querySelector('.scroll-list'),
	rootMargin: '0px',
	threshold: 0
}


window.onload = () => {
	new Swiper('.image-slider', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		mousewheel: {
			sensitivity: 1
		},
		grabCursor: true,
		loop: true,
		autoHeight: true,
	});

	let usernameEl = '';
	let emailEl = '';
	let phoneEl = '';


	const animateCallBack = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.transform = 'translateX(0)';
			}
		})
	}

	const observer = new IntersectionObserver(animateCallBack, options);

	document.querySelectorAll('.reviews__item').forEach(target => {
		observer.observe(target);
	})

	const showItemInfo = (event) => {
		event.preventDefault();
		if (event.target.parentNode.classList.contains('catalog-item__content_active')) {
			event.target.parentNode.classList.toggle('catalog-item__content_active');
			event.target.parentNode.nextSibling.nextSibling.classList.toggle('catalog-item__list_active');
		} else {
			event.target.parentNode.classList.toggle('catalog-item__list_active');
			event.target.parentNode.previousSibling.previousSibling.classList.toggle('catalog-item__content_active');
		}
	}


	const showTabList = (item, index) => {
		tabsbtn = document.querySelectorAll('.catalog__tab');
		tabsbtn.forEach(itm => {
			itm.classList.remove('catalog__tab_active');
		});
		item.classList.add('catalog__tab_active');
		tabs = document.querySelectorAll('.catalog__content');
		tabs.forEach((tab, i) => {
			if (index === i) {
				tab.classList.add('catalog__content_active');
			} else {
				tab.classList.remove('catalog__content_active');
			}
		});
	}


	const showModal = (attr, item) => {
		if (attr) {
			document.querySelector('.overlay').style.display = "block";
			if (attr == "consultation") {
				document.querySelector('#consultation').style.display = "block";
			} else if (attr == "order") {
				orderNode = document.querySelector('#order');
				orderNode.style.display = "block";
				orderNode.querySelector('.modal__descr').innerHTML = item.parentNode.parentNode.querySelector('.catalog-item__subtitle').innerHTML;
			} else {
				return
			}
		}
	}


	const showThanks = () => {
		setTimeout(() => function () {
			document.querySelector('.overlay').style.display = "block";
			document.querySelector('#thanks').style.display = "block";
		}(), 500);

	}


	const hideModal = () => {
		document.querySelector('.overlay').style.animation = "fadeToNone 0.5s ease-in-out";
		setTimeout(() => function () {
			document.querySelector('.overlay').style.display = "none";
			document.querySelector('#consultation').style.display = "none";
			document.querySelector('#order').style.display = "none";
			document.querySelector('#thanks').style.display = "none";
			document.querySelector('.overlay').style.animation = "fadeInFromNone 0.5s ease-in-out";
		}(), 450);
	}


	const checkUsername = () => {
		let valid = false;
		const min = 3,
			max = 25;
		const username = usernameEl.value.trim();

		if (!isRequired(username)) {
			showError(usernameEl, 'Имя не может быть пустым.');
		} else if (!isBetween(username.length, min, max)) {
			showError(usernameEl, `Имя пользователя должно быть от ${min} до ${max} символов.`)
		} else {
			showSuccess(usernameEl);
			valid = true;
		}
		return valid;
	};


	const checkEmail = () => {
		let valid = false;
		const email = emailEl.value.trim();
		if (!isRequired(email)) {
			showError(emailEl, 'Email не может быть пустым.');
		} else if (!isEmailValid(email)) {
			showError(emailEl, 'Email недействителен.')
		} else {
			showSuccess(emailEl);
			valid = true;
		}
		return valid;
	};


	const checkPhone = () => {
		let valid = false;
		const phone = phoneEl.value.replace(/[^\d]/g, '').trim();

		if (!isRequired(phone)) {
			showError(phoneEl, 'Номер не может быть пустым.');
		} else if (!isPhoneSecure(phone)) {
			showError(phoneEl, 'Номер должен иметь 11 цифр, начиная +7');
		} else {
			showSuccess(phoneEl);
			valid = true;
		}
		return valid;
	};


	const isEmailValid = (email) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};


	const isPhoneSecure = (phone) => {
		const re = new RegExp("^((\\+7|7|8)+([0-9]){10})$");
		return re.test(phone);
	};

	const isRequired = value => value === '' ? false : true;
	const isBetween = (length, min, max) => length < min || length > max ? false : true;


	const showError = (input, message) => {
		// get the form-field element
		const formField = input.parentElement;
		// add the error class
		formField.classList.remove('success');
		formField.classList.add('error');

		// show the error message
		const error = formField.querySelector('small');
		error.textContent = message;
	};


	const showSuccess = (input) => {
		// get the form-field element
		const formField = input.parentElement;

		// remove the error class
		formField.classList.remove('error');
		formField.classList.add('success');

		// hide the error message
		const error = formField.querySelector('small');
		error.textContent = '';
	}


	const debounce = (fn, delay = 500) => {
		let timeoutId;
		return (...args) => {
			// cancel the previous timer
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			// setup a new timer
			timeoutId = setTimeout(() => {
				fn.apply(null, args)
			}, delay);
		};
	};


	const addPhoneMask = (e) => {
		let el = e.target,
			clearVal = el.dataset.phoneClear,
			pattern = el.dataset.phonePattern,
			matrix_def = "+7(___) ___-__-__",
			matrix = pattern ? pattern : matrix_def,
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = e.target.value.replace(/\D/g, "");
		if (clearVal !== 'false' && e.type === 'blur') {
			if (val.length < matrix.match(/([\_\d])/g).length) {
				e.target.value = '';
				return;
			}
		}
		if (def.length >= val.length) val = def;
		e.target.value = matrix.replace(/./g, function (a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		});
	}


	const formSubmit = async (form) => {
		const data = new FormData(form); // получаем данные формы
		const response = await sendData(data); // отправляем данные на почту
		if (response.ok) {
			let result = await response.json(); // если ответ OK отвечает пользователю
			console.log(result.status); // .. что данные отправлены
		} else {
			console.log("Код ошибки: " + response.status); // если not OK - показываем код ошибки
		}
	}


	const sendData = async (data) => {
		return await fetch("mailer/send.php", {
			method: "POST", // методом POST
			body: data,
		});
	}


	document.querySelectorAll(".catalog-item__link").forEach(item => {
		item.addEventListener("click", showItemInfo);
	});
	document.querySelectorAll(".catalog__tab").forEach((item, index) => {
		item.addEventListener("click", function () {
			showTabList(item, index);
		})
	});
	document.querySelectorAll("button").forEach((item, index) => {
		item.addEventListener("click", function () {
			showModal(item.getAttribute('data-modal'), item);
		})
	});
	document.querySelectorAll('.modal__close').forEach(i => {
		i.addEventListener('click', hideModal);
	});


	document.querySelectorAll('[data-phone-pattern]').forEach(elem => {
		for (let ev of ['input', 'blur', 'focus']) {
			elem.addEventListener(ev, addPhoneMask);
		}
	});

	document.querySelectorAll('form').forEach(form => {
		form.addEventListener('submit', function (e) {
			usernameEl = form.querySelector('input[name="username"]');
			emailEl = form.querySelector('input[name="email"]');
			phoneEl = form.querySelector('input[name="phone"]');
			// prevent the form from submitting
			e.preventDefault();

			// validate fields
			let isUsernameValid = checkUsername(),
				isEmailValid = checkEmail(),
				isPhoneValid = checkPhone();

			let isFormValid = isUsernameValid &&
				isEmailValid &&
				isPhoneValid;

			// submit to the server if the form is valid
			if (isFormValid) {
				formSubmit(form);
				form.reset();
				form.querySelectorAll('.feed-form__field').forEach(item => {
					item.classList.remove('success');
				});
				hideModal();
				showThanks();
			}
		});
		form.addEventListener('input', debounce(function (e) {
			usernameEl = form.querySelector('input[name="username"]');
			emailEl = form.querySelector('input[name="email"]');
			phoneEl = form.querySelector('input[name="phone"]');
			switch (e.target.getAttribute('name')) {
				case 'username':
					checkUsername();
					break;
				case 'email':
					checkEmail();
					break;
				case 'phone':
					checkPhone();
					break;
			}
		}));
	});

	window.addEventListener('scroll', debounce(function () {
		if (window.pageYOffset > 1600) {
			document.querySelector('.pageup').style.display = "block";
		}
		else {
			document.querySelector('.pageup').style.animation = "fadeToNone 0.5s ease-in-out";
			setTimeout(() => function () {
				document.querySelector('.pageup').style.display = "none";
				document.querySelector('.pageup').style.animation = "fadeInFromNone 0.5s ease-in-out";
			}(), 450);
		}
	}));
}

