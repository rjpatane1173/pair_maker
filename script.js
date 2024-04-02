document.getElementById("generateFaresBtn").addEventListener("click", function() {
  // Get form values
  var route = document.getElementById("route").value.split(",");
  
  // Create fare pairs from route
  var farePairs = [];
  for (var i = 0; i < route.length - 1; i++) {
    for (var j = i + 1; j < route.length; j++) {
      var pair = route[i] + "-" + route[j];
      farePairs.push(pair);
    }
  }
  
  // Create fares object
  var fares = {};
  farePairs.forEach(function(pair) {
    var fare = prompt("Enter fare for route " + pair + ":");
    fares[pair] = parseInt(fare);
    // Set fare for reverse route automatically
    var reversePair = pair.split("-").reverse().join("-");
    fares[reversePair] = parseInt(fare);
  });
  
  // Display generated fares object
  document.getElementById("result").innerHTML = "<h2>Fares Object:</h2><pre>" + JSON.stringify(fares, null, 2) + "</pre>";

  // Generate and display fare matrix
  var matrixHTML = "<h2>Fare Matrix:</h2><table border='1'>";
  for (var i = 0; i < route.length; i++) {
    matrixHTML += "<tr>";
    for (var j = 0; j < route.length; j++) {
      if (i === j) {
        matrixHTML += "<td>0</td>";
      } else {
        var pair = route[i] + "-" + route[j];
        matrixHTML += "<td>" + fares[pair] + "</td>";
      }
    }
    matrixHTML += "</tr>";
  }
  matrixHTML += "</table>";
  
  document.getElementById("result").innerHTML += matrixHTML;
});
