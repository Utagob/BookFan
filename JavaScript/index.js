$(document).ready(function () {
  const $this = $('.scrollmenu');
  const $items = $this.find('a');
  const itemWidth = $items.outerWidth(true);
  const scrollCount = 10;
  

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

  $this.on('wheel', function (e) {
    if (e.originalEvent.deltaY < 0) {
      moveLeft();
    } else {
      moveRight();
    }
    e.preventDefault();
  });

  $('.lNav').click(moveLeft);
  $('.rNav').click(moveRight);
});