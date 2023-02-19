"use sctrict"

window.onload = () => {
  console.log('succsess');

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
  
  document.querySelectorAll(".catalog-item__link").forEach(item => {
    item.addEventListener("click", ShowItemInfo)
  });
  document.querySelectorAll(".catalog__tab").forEach((item, index) => {
    item.addEventListener("click", function(){
      ShowTabList(item, index)
    })
  });
}

function ShowItemInfo(event) {
  event.preventDefault();
  if (this.parentNode.classList.contains('catalog-item__content_active')) {
    this.parentNode.classList.toggle('catalog-item__content_active');
    this.parentNode.nextSibling.nextSibling.classList.toggle('catalog-item__list_active');
  } else {
    this.parentNode.classList.toggle('catalog-item__list_active');
    this.parentNode.previousSibling.previousSibling.classList.toggle('catalog-item__content_active');
  }
}

function ShowTabList(item, index) {
  tabs = document.querySelectorAll('.catalog__content');
  tabs.forEach((tab, i) => {
    if (index === i) {
      tab.classList.add('catalog__content_active');
    } else {
      tab.classList.remove('catalog__content_active');
    }
  });
}