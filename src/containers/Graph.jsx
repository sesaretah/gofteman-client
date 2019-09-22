import React from 'react'
import * as d3 from 'd3'
import {
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  Icon, Col
} from 'framework7-react';
import { dict} from '../Dict';

class Graph extends React.Component {
  options(){
    return(
      <React.Fragment>
        <option value="0">{dict.no}</option>
        <option value="1">{dict.yes}</option>
      </React.Fragment>
    )
  }

  wg(d3, initialG, editing) {
    "use strict";

    // define graphcreator object
    var GraphCreator = function(svg, nodes, edges){
      var thisGraph = this;
      thisGraph.idct = 0;

      thisGraph.nodes = nodes || [];
      thisGraph.edges = edges || [];

      thisGraph.state = {
        selectedNode: null,
        selectedEdge: null,
        mouseDownNode: null,
        mouseDownLink: null,
        justDragged: false,
        justScaleTransGraph: false,
        lastKeyDown: -1,
        shiftNodeDrag: false,
        selectedText: null
      };

      // define arrow markers for graph links
      var defs = svg.append('svg:defs');
      defs.append('svg:marker')
      .attr('id', 'end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', "100")
      .attr('markerWidth', 4.5)
      .attr('markerHeight', 4.5)
      .attr('orient', 'auto')
      .attr('fill', '#999')
      .attr('stroke', '#999')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

      // define arrow markers for leading arrow
      defs.append('svg:marker')
      .attr('id', 'mark-end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 7)
      .attr('markerWidth', 3.5)
      .attr('markerHeight', 3.5)
      .attr('fill', '#999')
      .attr('stroke', '#999')
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

      thisGraph.svg = svg;
      thisGraph.svgG = svg.append("g")
      .classed(thisGraph.consts.graphClass, true);
      var svgG = thisGraph.svgG;

      // displayed when dragging between nodes
      thisGraph.dragLine = svgG.append('svg:path')
      .attr('class', 'link dragline hidden')
      .attr('d', 'M0,0L0,0')
      .style('marker-end', 'url(#mark-end-arrow)');

      // svg nodes and edges
      thisGraph.paths = svgG.append("g").selectAll("g");
      thisGraph.circles = svgG.append("g").selectAll("g");

      thisGraph.drag = d3.behavior.drag()
      .origin(function(d){
        return {x: d.x, y: d.y};
      })
      .on("drag", function(args){
        thisGraph.state.justDragged = true;
        thisGraph.dragmove.call(thisGraph, args);
      })
      .on("dragend", function() {
        // todo check if edge-mode is selected
      });

      // listen for key events
      d3.select(window).on("keydown", function(){
        thisGraph.svgKeyDown.call(thisGraph);
      })
      .on("keyup", function(){
        thisGraph.svgKeyUp.call(thisGraph);
      });
      svg.on("mousedown", function(d){thisGraph.svgMouseDown.call(thisGraph, d);});
      svg.on("mouseup", function(d){thisGraph.svgMouseUp.call(thisGraph, d);});




    };

    GraphCreator.prototype.setIdCt = function(idct){
      this.idct = idct;
    };

    GraphCreator.prototype.consts =  {
      selectedClass: "selected",
      connectClass: "connect-node",
      circleGClass: "conceptG",
      graphClass: "graph",
      activeEditId: "active-editing",
      BACKSPACE_KEY: 8,
      DELETE_KEY: 46,
      ENTER_KEY: 13,
      nodeRadius: 25,
      nodeX: 100,
      nodeY: 30
    };

    /* PROTOTYPE FUNCTIONS */

    GraphCreator.prototype.dragmove = function(d) {
      var thisGraph = this;
      if (thisGraph.state.shiftNodeDrag){
        thisGraph.dragLine.attr('d', 'M' + d.x + ',' + d.y + 'L' + d3.mouse(thisGraph.svgG.node())[0] + ',' + d3.mouse(this.svgG.node())[1]);
      } else{
        d.x += d3.event.dx;
        d.y +=  d3.event.dy;
        //  console.log('dx:', d.x);
        thisGraph.updateGraph();
      }
    };

    GraphCreator.prototype.deleteGraph = function(skipPrompt){
      var thisGraph = this,
      doDelete = true;
      if (!skipPrompt){
        doDelete = window.confirm("Press OK to delete this graph");
      }
      if(doDelete){
        thisGraph.nodes = [];
        thisGraph.edges = [];
        thisGraph.updateGraph();
      }
    };

    /* select all text in element: taken from http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element */
    GraphCreator.prototype.selectElementContents = function(el) {
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      //console.log(sel, range, el);
    };


    /* insert svg line breaks: taken from http://stackoverflow.com/questions/13241475/how-do-i-include-newlines-in-labels-in-d3-charts */
    GraphCreator.prototype.insertTitleLinebreaks = function (gEl, title) {
      var words = title.split(/\s+/g),
      nwords = words.length;
      var el = gEl.append("text")
      .attr('id', 'text-' + gEl[0][0].__data__.id )
      .attr("text-anchor","middle")
      //  .attr("dy", "-" + (nwords-1)*7.5)
      .attr("dx",50)
      .attr("dy", 18);

      for (var i = 0; i < words.length; i++) {
        var tspan = el.append('tspan').text(words[i]);
        if (i > 0)
        tspan.attr('x', 65).attr('y', '18');
      }
    };


    // remove edges associated with a node
    GraphCreator.prototype.spliceLinksForNode = function(node) {
      var thisGraph = this,
      toSplice = thisGraph.edges.filter(function(l) {
        return (l.source === node || l.target === node);
      });
      toSplice.map(function(l) {
        thisGraph.edges.splice(thisGraph.edges.indexOf(l), 1);
      });
    };

    GraphCreator.prototype.replaceSelectEdge = function(d3Path, edgeData){
      var thisGraph = this;
      d3Path.classed(thisGraph.consts.selectedClass, true);
      if (thisGraph.state.selectedEdge){
        thisGraph.removeSelectFromEdge();
      }
      thisGraph.state.selectedEdge = edgeData;
    };

    GraphCreator.prototype.replaceSelectNode = function(d3Node, nodeData){
      var thisGraph = this;

      d3Node.classed(this.consts.selectedClass, true);
      if (thisGraph.state.selectedNode){
        thisGraph.removeSelectFromNode();
      }
      thisGraph.state.selectedNode = nodeData;
    };

    GraphCreator.prototype.removeSelectFromNode = function(){
      var thisGraph = this;
      thisGraph.circles.filter(function(cd){
        return cd.id === thisGraph.state.selectedNode.id;
      }).classed(thisGraph.consts.selectedClass, false);
      thisGraph.state.selectedNode = null;
    };

    GraphCreator.prototype.removeSelectFromEdge = function(){
      var thisGraph = this;
      thisGraph.paths.filter(function(cd){
        return cd === thisGraph.state.selectedEdge;
      }).classed(thisGraph.consts.selectedClass, false);
      thisGraph.state.selectedEdge = null;
    };

    GraphCreator.prototype.pathMouseDown = function(d3path, d){
      var thisGraph = this,
      state = thisGraph.state;
      d3.event.stopPropagation();
      state.mouseDownLink = d;

      if (state.selectedNode){
        thisGraph.removeSelectFromNode();
      }

      var prevEdge = state.selectedEdge;
      if (!prevEdge || prevEdge !== d){
        thisGraph.replaceSelectEdge(d3path, d);
      } else{
        thisGraph.removeSelectFromEdge();
      }
    };

    // mousedown on node
    GraphCreator.prototype.circleMouseDown = function(d3node, d){
      var thisGraph = this,
      state = thisGraph.state;
      d3.event.stopPropagation();
      state.mouseDownNode = d;
      if (d3.event.shiftKey){
        state.shiftNodeDrag = d3.event.shiftKey;
        // reposition dragged directed edge
        thisGraph.dragLine.classed('hidden', false)
        .attr('d', 'M' + d.x + ',' + d.y + 'L' + d.x + ',' + d.y);
        return;
      }
    };

    /* place editable text on node in place of svg text */
    GraphCreator.prototype.changeTextOfNode = function(d3node, d){
      var thisGraph= this,
      consts = thisGraph.consts,
      htmlEl = d3node.node();
      d3node.selectAll("text").remove();
      var nodeBCR = htmlEl.getBoundingClientRect(),
      curScale = nodeBCR.width/consts.nodeRadius,
      placePad  =  5*curScale,
      useHW = curScale > 1 ? nodeBCR.width*0.71 : consts.nodeRadius*1.42;

      var d3txt = thisGraph.svg.selectAll("foreignObject")
      .data([d])
      .enter()
      .append("foreignObject")
      .attr("x", d3node[0][0].__data__.x)
      .attr("y", d3node[0][0].__data__.y)
      .attr("height", 2*useHW)
      .attr("width", useHW)
      .append("xhtml:p")
      .attr("id", consts.activeEditId)
      .attr("contentEditable", "true")
      .text(d.title)
      .on("mousedown", function(d){
        d3.event.stopPropagation();
      })
      .on("keydown", function(d){
        d3.event.stopPropagation();
        if (d3.event.keyCode == consts.ENTER_KEY && !d3.event.shiftKey){
          this.blur();
        }
      })
      .on("blur", function(d){
        d.title = this.textContent;
        thisGraph.insertTitleLinebreaks(d3node, d.title);
        d3.select(this.parentElement).remove();
      });
      return d3txt;
    };

    // mouseup on nodes
    GraphCreator.prototype.circleMouseUp = function(d3node, d){
      var thisGraph = this,
      state = thisGraph.state,
      consts = thisGraph.consts;
      // reset the states
      state.shiftNodeDrag = false;
      d3node.classed(consts.connectClass, false);

      var mouseDownNode = state.mouseDownNode;

      if (!mouseDownNode) return;

      thisGraph.dragLine.classed("hidden", true);

      if (mouseDownNode !== d){
        // we're in a different node: create new edge for mousedown edge and add to graph
        var newEdge = {source: mouseDownNode, target: d};
        var filtRes = thisGraph.paths.filter(function(d){
          if (d.source === newEdge.target && d.target === newEdge.source){
            thisGraph.edges.splice(thisGraph.edges.indexOf(d), 1);
          }
          return d.source === newEdge.source && d.target === newEdge.target;
        });
        if (!filtRes[0].length){
          thisGraph.edges.push(newEdge);
          thisGraph.updateGraph();
        }
      } else{
        // we're in the same node
        if (state.justDragged) {
          // dragged, not clicked
          state.justDragged = false;
        } else{
          //console.log('clicked');
          // clicked, not dragged
          if (d3.event.shiftKey){
            // shift-clicked node: edit text content
            //    var d3txt = thisGraph.changeTextOfNode(d3node, d);
            //    var txtNode = d3txt.node();
            //    thisGraph.selectElementContents(txtNode);
            //    txtNode.focus();
          } else{
            if (state.selectedEdge){
              thisGraph.removeSelectFromEdge();
            }
            var prevNode = state.selectedNode;

            if (!prevNode || prevNode.id !== d.id){
              d3.select("#step-title").property('value', d.title);
              console.log(d.id);
              d3.select("#current-node-id").text(d.id);
              d3.select("#role").property('value', d.role);
              d3.selectAll('.custom-control-input').property('checked', false);
              var editables = d.editable.split(',')
              if (editables.length > 1){
                for (var i = 0, len = editables.length; i < len; i++) {
                  if (editables[i].length > 1){
                    d3.select("#"+editables[i]).property('checked', true);
                  }
                }
              }
              if(editing){
                d3.select("#li-step-title").classed('disabled', false);
                d3.select("#step-title").property('disabled', false);
                d3.select("#li-refundable").classed('disabled', false);
                d3.select("#refundable").property('disabled', false);
                d3.select("#li-commentable").classed('disabled', false);
                d3.select("#commentable").property('disabled', false);
                d3.select("#li-votable").classed('disabled', false);
                d3.select("#votable").property('disabled', false);
                d3.select("#li-start_point").classed('disabled', false);
                d3.select("#start_point").property('disabled', false);
                d3.select("#li-end_point").classed('disabled', false);
                d3.select("#end_point").property('disabled', false);
                d3.select("#li-publishable").classed('disabled', false);
                d3.select("#publishable").property('disabled', false);
              }

              d3.select("#refundable").property('value', d.refundable);
              d3.select("#commentable").property('value', d.commentable);
              d3.select("#votable").property('value', d.votable);
              d3.select("#start_point").property('value', d.start_point);
              d3.select("#end_point").property('value', d.end_point);
              d3.select("#publishable").property('value', d.publishable);
              thisGraph.replaceSelectNode(d3node, d);
            } else{
              thisGraph.removeSelectFromNode();
            }
          }
        }
      }
      state.mouseDownNode = null;
      return;

    }; // end of circles mouseup



    d3.select('#step-title')
    .on('input', function() {
      var currentNodeId = d3.select('#current-node-id').text();
      var newData = d3.select(this).property('value');
      console.log(newData);
      updateNode('title' ,parseInt(currentNodeId), newData.toString().replace(/ /g,"_"));
    });

    d3.select('#role')
    .on('change', function() {
      var currentNodeId = d3.select('#current-node-id').text();
      var newData = eval(d3.select(this).property('value'));
      updateNode('role' ,parseInt(currentNodeId), newData);
    });


    d3.select('#refundable')
    .on('change', function() {
      var currentNodeId = d3.select('#current-node-id').text();
      var newData = d3.select(this).property('value');
      updateNode('refundable', parseInt(currentNodeId), newData);
    });


    d3.select('#commentable')
    .on('change', function() {
      var currentNodeId = d3.select('#current-node-id').text();
      var newData = d3.select(this).property('value');
      updateNode('commentable', parseInt(currentNodeId), newData);
    });

    d3.select('#start_point')
    .on('change', function() {
      var currentNodeId = d3.select('#current-node-id').text();
      var newData = d3.select(this).property('value');
      updateNode('start_point', parseInt(currentNodeId), newData);
    });

    d3.select('#votable')
    .on('change', function() {
      var currentNodeId = d3.select('#current-node-id').text();
      var newData = d3.select(this).property('value');
      updateNode('votable', parseInt(currentNodeId), newData);
    });

    d3.select('#end_point')
    .on('change', function() {
      var currentNodeId = d3.select('#current-node-id').text();
      var newData = d3.select(this).property('value');
      updateNode('end_point', parseInt(currentNodeId), newData);
    });

    d3.select('#publishable')
    .on('change', function() {
      var currentNodeId = d3.select('#current-node-id').text();
      var newData = d3.select(this).property('value');
      updateNode('publishable', parseInt(currentNodeId), newData);
    });

    d3.selectAll('.custom-control-input')
    .on('change', function() {
      var currentNodeId = d3.select('#current-node-id').text();
      var newData = this.name;
      if (this.checked) {
        appendToNode('editable', parseInt(currentNodeId), newData);
      } else {
        removeFromNode('editable', parseInt(currentNodeId), newData);
      }
    });

    function updateNode(attribute, nodeId, newValue){
      graph.nodes.filter(function(d){ return d.id == nodeId })[0][attribute] = newValue;
      if (attribute == 'title'){
        d3.selectAll(".conceptG.selected").each(function(d, i) {
          var str = '#' + 'text-' +  d.id;
          d3.select(str).remove();
          d3.select(this).append("text")
          .attr('id', 'text-' + d.id )
          .attr("x",65)
          .attr("y", 18)
          .text(d.title);
        });
      }
    }

    function appendToNode(attribute, nodeId, newValue){
      var node = graph.nodes.filter(function(d){ return d.id == nodeId });
      node[0][attribute] = node[0][attribute]+','+newValue;
    }

    function removeFromNode(attribute, nodeId, newValue){
      var node = graph.nodes.filter(function(d){ return d.id == nodeId });
      node[0][attribute] = node[0][attribute].replace(newValue,'');
    }



    d3.select('#subbtn').on('click', function() {

    })
    // mousedown on main svg
    GraphCreator.prototype.svgMouseDown = function(){
      this.state.graphMouseDown = true;
    };

    // mouseup on main svg
    GraphCreator.prototype.svgMouseUp = function(){
      var thisGraph = this,
      state = thisGraph.state;
      if (state.justScaleTransGraph) {
        // dragged not clicked
        state.justScaleTransGraph = false;
      } else if (state.graphMouseDown && d3.event.shiftKey){
        // clicked not dragged from svg
        var xycoords = d3.mouse(thisGraph.svgG.node()),
        d = {id: thisGraph.idct++, title: "", x: xycoords[0], y: xycoords[1],  role: '', editable: '', refundable: '', commentable: '', start_point: '', end_point: '', publishable: ''};
        thisGraph.nodes.push(d);
        thisGraph.updateGraph();
        //console.log(thisGraph);
        // make title of text immediently editable
        //    var d3txt = thisGraph.changeTextOfNode(thisGraph.circles.filter(function(dval){
        //    return dval.id === d.id;
        //  }), d),
        //  txtNode = d3txt.node();
        //  console.log(thisGraph.selectElementContents(txtNode));
        //  thisGraph.selectElementContents(txtNode);
        //  txtNode.focus();
      } else if (state.shiftNodeDrag){
        // dragged from node
        state.shiftNodeDrag = false;
        thisGraph.dragLine.classed("hidden", true);
      }
      state.graphMouseDown = false;
    };

    // keydown on main svg
    GraphCreator.prototype.svgKeyDown = function() {
      var thisGraph = this,
      state = thisGraph.state,
      consts = thisGraph.consts;
      // make sure repeated key presses don't register for each keydown
      //  if(state.lastKeyDown !== -1) return;

      state.lastKeyDown = d3.event.keyCode;
      var selectedNode = state.selectedNode,
      selectedEdge = state.selectedEdge;

      switch(d3.event.keyCode) {
        case consts.BACKSPACE_KEY:
        case consts.DELETE_KEY:
        //  d3.event.preventDefault();
        if (d3.event.ctrlKey && selectedNode){
          thisGraph.nodes.splice(thisGraph.nodes.indexOf(selectedNode), 1);
          thisGraph.spliceLinksForNode(selectedNode);
          state.selectedNode = null;
          thisGraph.updateGraph();
        } else if (d3.event.ctrlKey && selectedEdge){
          thisGraph.edges.splice(thisGraph.edges.indexOf(selectedEdge), 1);
          state.selectedEdge = null;
          thisGraph.updateGraph();
        }
        break;
      }
    };

    GraphCreator.prototype.svgKeyUp = function() {
      this.state.lastKeyDown = -1;
    };

    // call to propagate changes to graph
    GraphCreator.prototype.updateGraph = function(){

      var thisGraph = this,
      consts = thisGraph.consts,
      state = thisGraph.state;
      thisGraph.paths = thisGraph.paths.data(thisGraph.edges, function(d){
        return String(d.source.id) + "+" + String(d.target.id);
      });

      var paths = thisGraph.paths;
      // update existing paths
      ;
      paths.style('marker-end', 'url(#end-arrow)')
      .classed(consts.selectedClass, function(d){
        return d === state.selectedEdge;
      })
      .attr("d", function(d){
        var sx = d.source.x + (consts.nodeX/2)
        var sy = d.source.y + (consts.nodeY/2)
        var tx = d.target.x + (consts.nodeX/2)
        var ty = d.target.y + (consts.nodeY/2)
        return "M" + sx + "," + sy + "L" + tx + "," + ty;
      });

      // add new paths
      paths.enter()
      .append("path")
      .style('marker-end','url(#end-arrow)')
      .classed("link", true)
      .attr("d", function(d){
        var sx = d.source.x + (consts.nodeX/2)
        var sy = d.source.y + (consts.nodeY/2)
        var tx = d.target.x + (consts.nodeX/2)
        var ty = d.target.y + (consts.nodeY/2)
        return "M" + sx + "," + sy + "L" +tx + "," + ty;
      })
      .on("mousedown", function(d){
        thisGraph.pathMouseDown.call(thisGraph, d3.select(this), d);
      }
    )
    .on("mouseup", function(d){
      state.mouseDownLink = null;
    });

    // remove old links
    paths.exit().remove();

    // update existing nodes
    thisGraph.circles = thisGraph.circles.data(thisGraph.nodes, function(d){ return d.id;});
    thisGraph.circles.attr("transform", function(d){return "translate(" + d.x + "," + d.y + ")";});

    // add new nodes
    var newGs= thisGraph.circles.enter()
    .append("g");

    newGs.classed(consts.circleGClass, true)
    .attr("transform", function(d){return "translate(" + d.x + "," + d.y + ")";})
    .on("mouseover", function(d){
      if (state.shiftNodeDrag){
        d3.select(this).classed(consts.connectClass, true);
      }
    })
    .on("mouseout", function(d){
      d3.select(this).classed(consts.connectClass, false);
    })
    .on("mousedown", function(d){
      thisGraph.circleMouseDown.call(thisGraph, d3.select(this), d);
    })
    .on("mouseup", function(d){
      thisGraph.circleMouseUp.call(thisGraph, d3.select(this), d);
    })
    .call(thisGraph.drag);

    newGs.append("rect")
    .attr("width", String(consts.nodeX))
    .attr("height", String(consts.nodeY));

    newGs.each(function(d){
      thisGraph.insertTitleLinebreaks(d3.select(this), d.title);
    });

    // remove old nodes
    thisGraph.circles.exit().remove();
  };

  GraphCreator.prototype.zoomed = function(){
    this.state.justScaleTransGraph = true;
    d3.select("." + this.consts.graphClass)
    .attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
  };

  GraphCreator.prototype.updateWindow = function(svg){
    var docEl = document.documentElement,
    bodyEl = document.getElementsByTagName('body')[0];
    var x = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth;
    var y = window.innerHeight|| docEl.clientHeight|| bodyEl.clientHeight;
    svg.attr("width", x).attr("height", y);
  };



  var docEl = document.documentElement,
  bodyEl = document.getElementById('graphDiv');

  var width = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth,
  height =  window.innerHeight|| docEl.clientHeight|| bodyEl.clientHeight;

  var xLoc = width/2 - 200,
  yLoc = 100;
  // initial node data
  if (initialG && initialG.nodes){
    var nodes = initialG.nodes;
    var edges = []
    for (var i = 0; i < initialG.edges.length; i++) {
      edges.push({source: nodes[initialG.edges[i][0]], target: nodes[initialG.edges[i][1]]})
    }
    //JSON.parse(initialG.edges);
  }else{
    var nodes = [{title: "", id: 0, x: xLoc, y: yLoc, role: '', editable: '', refundable: '', commentable: '', start_point: '', end_point: '', publishable: ''}];
    var edges = [];
  }

  window.nodes = nodes
  window.edges = edges
  /** MAIN SVG **/
  d3.select("#graphDiv").select("svg").remove()
  var svg = d3.select("#graphDiv").append("svg")
  .attr("preserveAspectRatio", "none" )
  .attr("viewBox", "0 0 700 400")
  //.attr("preserveAspectRatio" , "xMidYMid meet")
  ;
  var graph = new GraphCreator(svg, window.nodes, window.edges);
  graph.setIdCt(2);
  graph.updateGraph();
};

componentDidMount(){
  this.wg(window.d3, this.props.g, this.props.e);
}

componentDidUpdate(){
  this.wg(window.d3, this.props.g, this.props.e);
}

render(){
  return (
    <React.Fragment>
      <div id='graphDiv' />
      <span id='current-node-id'></span>
      <Row>
        <Col>
          <List form>
            <ListInput
              label={dict.title}
              type="text"
              placeholder="..."
              disabled={true}
              inputId='step-title'
              id='li-step-title'
              >
            </ListInput>
            <ListInput
              label={dict.refundable}
              id='li-refundable'
              inputId='refundable'
              type="select"
              disabled={true}
              defaultValue='0'
              >
              {this.options()}
            </ListInput>

            <ListInput
              label={dict.commentable}
              id='li-commentable'
              inputId='commentable'
              type="select"
              disabled={true}
              defaultValue='0'
              >
              {this.options()}
            </ListInput>

            <ListInput
              label={dict.votable}
              id='li-votable'
              inputId='votable'
              type="select"
              disabled={true}
              defaultValue='0'
              >
              {this.options()}
            </ListInput>

            <ListInput
              label={dict.publishable}
              id='li-publishable'
              inputId='publishable'
              type="select"
              disabled={true}
              defaultValue='0'
              >
              {this.options()}
            </ListInput>
          </List>
        </Col>
        <Col>
          <List form>
            <ListInput
              label={dict.start_point}
              id='li-start_point'
              inputId='start_point'
              type="select"
              disabled={true}
              defaultValue='0'
              >
              {this.options()}
            </ListInput>

            <ListInput
              label={dict.end_point}
              id='li-end_point'
              inputId='end_point'
              type="select"
              disabled={true}
              defaultValue='0'
              >
              {this.options()}
            </ListInput>
          </List>
        </Col>
      </Row>
    </React.Fragment>
  )
}
}
export default Graph
