setInterval(hideBrand, 50);

function hideBrand() {
    $(document).ready(function(){
        $(".anime").fadeOut("slow", function(){
            $(".hideMeAtLoad").fadeIn();
        });
    });
}

// this function is called when button is clicked by user to display cards
function  moveAnimation(){
    var items = document.querySelectorAll('#result-cards .card');
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
        item.classList.remove('is-moved');
      }
    }
}

