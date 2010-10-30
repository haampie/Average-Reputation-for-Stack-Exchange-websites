var AvgRep = AvgRep || {
  /**
   * Creates an input button with callback
   * @param String label Text you want to display on the button
   * @param Function callback Function that will be executed when
   * the button is clicked
   * @returns HTMLInputButton The button
   */
  createAvgButton: function( label, callback ){
    // Creates: <input type="button" value="[label]" />
    var AvgButton = document.createElement( 'input' );
    AvgButton.type = 'submit';
    AvgButton.value = label;
    
    // Handle the onclick event, return false to stop the browser default action
    AvgButton.onclick = function(){
      callback.call();
      return false;
    };
    
    return AvgButton;
  },

  /**
   * Calculates the avarage reputation for selected area
   * @returns Average reputation/day
   */
  calcAvg: function(){
    var reps = document.getElementsByClassName( 'grpos' ),
        total = 0,
        dateStart = new Date( document.getElementById( 'start-date' ).value ),
        dateEnd = new Date( document.getElementById( 'end-date' ).value ),
        dateRange = dateEnd - dateStart;
    
    // Maybe the range is empty or the world came tumbling down for some reason
    if( dateRange <= 0 ){
      return 0;
    }
    
    // Sum reputation
    for( var i=0; i<reps.length; i++){
      total += parseInt( reps[i].innerHTML, 10 );
    }
    
    // Eventually, return the average reputation per day
    return total * 1000 * 60 * 60 * 24 / dateRange;
  }
};

// Create a new button
var button = AvgRep.createAvgButton( 'Get average', function(){
  var average = AvgRep.calcAvg();
  alert( 'Average: ' + average.toFixed(2) + ' rep/day');
});

// Place the button next to the Graph button
document.getElementById( 'date-selection' ).appendChild( button );