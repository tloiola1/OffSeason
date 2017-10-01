
$("#goBack").hide();

function goBack(){
  // call animation to hide the cards
    moveAnimation();
    // hide goback button
    $("#goBack").hide();
    // show buttons
    $("#domestic").show();
    $("#international").show();
}

// this function is called when button is clecked by user to display cards
function  moveAnimation(){
  // hide buttons
$("#domestic").hide();
$("#international").hide();
// show goback button
$("#goBack").show();

var items = document.querySelectorAll('.navigation .card-wrapper');
var isMoved = true;

  // toggle flag
  isMoved = !isMoved;

  for ( var i=0; i < items.length; i++ ) {
    // get function in closure, so i can iterate
    var toggleItemMove = getToggleItemMove( i );
    // reverse stagger order
    var delay = isMoved ? ( items.length - i - 1 ) : i;
    delay *= 50;
    // stagger transition with setTimeout
    setTimeout( toggleItemMove, delay );
  }

function getToggleItemMove( i ) {
  var item = items[i];
  return function() {
    item.classList.toggle('is-moved');
  }
}
}