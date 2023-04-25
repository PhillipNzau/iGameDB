// The slider
const swiper = new Swiper('.swiper', {

    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 400,
    spaceBetween: 50,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });