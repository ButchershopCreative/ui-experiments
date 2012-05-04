$(function() {
    // Check out http://mbostock.github.com/d3/tutorial/circle.html
    SC.initialize({
      client_id: "7kIeyF5f2ETFo1fEWKwNQ",
      redirect_uri: "http://localhost:8000/soundcloud/example/",
    });
        
    SC.get("/tracks?genres=dubstep&order=hotness", {limit: 5}, function(tracks){
      var svg = d3.select("#chart").append("svg")
            .attr("width", 640)
            .attr("height", 480);
          
      var y = 500;
      var x = 1000;

      var node = svg.selectAll("g.node")
            .data(tracks);
    node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) { return "translate(" + 200 + "," + 300 + ")"; });
      // transform = "translate(x,y)"; x,y need to be randomly generated somehow
      // Make g node should contain circle and text
      // g node should define/transform the position
      node.append("circle")
            .style("fill", "steelblue")
            .style("stroke","#000")
            .style("stroke-width", "3px")
            .attr("class", "track")
            //.attr("cx", function() {
            //    return Math.random() * x;}) // produces random x position
            //.attr("cy", function() {
            //    return Math.random() * y;}) // produces random y position
            .attr("r", 50);
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .text(function(track) {
                    return track.title;
                })
    node.exit().remove();
    });
});

