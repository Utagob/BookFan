$(document).ready(function () {
  const $this = $('.scrollmenu');
  const $items = $this.find('div');
  const itemWidth = $items.outerWidth(true);
  const scrollCount = 2;
  

  function moveRight() {
    $this.stop().animate({
      scrollLeft: $this.scrollLeft() + itemWidth * scrollCount
    }, 300);
  }

  function moveLeft() {
    $this.stop().animate({
      scrollLeft: $this.scrollLeft() - itemWidth * scrollCount
    }, 300);
  }

  $("body").keydown(function (e) {
    if ((e.keyCode || e.which) == 37) moveLeft();
    if ((e.keyCode || e.which) == 39) moveRight();
  });

  $('.lNav').click(moveLeft);
  $('.rNav').click(moveRight);
});