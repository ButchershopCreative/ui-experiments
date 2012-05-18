$(function() {

    // Check out http://mbostock.github.com/d3/tutorial/circle.html
    SC.initialize({
      client_id: "7kIeyF5f2ETFo1fEWKwNQ",
      redirect_uri: "http://localhost:8000/soundcloud/example/"
    });
        
    SC.get("/tracks?genres=dubstep&order=hotness", {limit: 10}, function(tracks){

      var x = 75;
      var y = 240;
      var width = 640;
      var height = 640;

      $(tracks).each(function(n, track) {
        $(track).attr('x', x);
        x = x + 128;
        $(track).attr('y', y);
        $(track).attr('radius', track.favoritings_count / 75);
        $(track).attr('value', track.favoritings_count);
      });

      var svg = d3.select("#chart").append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "bubble");

      var bubble = d3.layout.pack()
        .sort(null)
        .size([width, height]);

      var node = svg.selectAll("g.node")
        .data(bubble.nodes({children: tracks}));

      node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("a")
        .attr('xlink:href', function(track) { return track.permalink_url; });

      node.selectAll('a')
        .append("image")
        .attr('xlink:href', function(track) { return track.artwork_url; })
        .attr('width', 100)
        .attr('height', 100);
        // .transform('translate', function(d) { return "translate(" + d.x - 200 + "," + d.y - 200 + ")"; });

      node.selectAll('a')
        .append("circle")
        .style("fill", "transparent");

      node.append("circle")
        .style("fill", function(d) { return "#fff"; })
        .style("stroke","#000")
        .style("stroke-width", "3px")
        .attr("class", "track")
        .attr("r", function(d) { return d.radius; });

      // var children = node.selectAll('')
      node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".5em")
        // Returning the track title - shortened using substring
        .text(function(track) {
          if (track.title) {
            return track.title.substring(0, 12);
          } else {
            return null;
          }
        });

      node.exit().remove();

        //function testResults (form) {
        //var TestVar = form.bubbleModifier.value;
        //alert ("You chose:" + TestVar);
        //}

    });
});
