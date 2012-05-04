$(function() {

    // Check out http://mbostock.github.com/d3/tutorial/circle.html
    SC.initialize({
      client_id: "7kIeyF5f2ETFo1fEWKwNQ",
      redirect_uri: "http://localhost:8000/soundcloud/example/"
    });
        
    SC.get("/tracks?genres=dubstep&order=hotness", {limit: 5}, function(tracks){
       console.log(tracks);
      var x = 75;
      var y = 0;
      $(tracks).each(function(n, track) {
        $(track).attr('x', x);
        x = x + 128;
        // "y" is being manipulated by comment count
        $(track).attr('y', y);
        y = track.comment_count / 3;
        console.log(y);
      });

      var svg = d3.select("#chart").append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

      var r = 50;
      // The following produces different radii based off of how many Favoritings a track has
      // The more favorites, the bigger the radii
      $(tracks).each(function(n, track) {
        r = track.favoritings_count / 75;
        $(track).attr('r', r);
        });
        
      var node = svg.selectAll("g.node")
        .data(tracks);

      node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("circle")
        .style("fill", "steelblue")
        .style("fill", function(d) { return "#" + d.duration })
        .style("stroke","#000")
        .style("stroke-width", "3px")
        .attr("class", "track")
        .attr("r", function(d) { return d.r })

      node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".2em")
        .attr("color", "255,255,240") //font color wtf?
        // Returning the track title - shortened using substring
        .text(function(track) {
          return track.title.substring(0, track.r / 5) + "...";
      });

      node.exit().remove();
    });
});
