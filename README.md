# states
State machine

````
var workflow = new statemach();
 
workflow.do('start', function(){
  this.data.name = 'john';
  console.log(this.state);
  return this.log;
})
workflow.do('log', function(){
  console.log(this.state, this.data.name);
  return this.data.name ? this.johns : this.end;
})
workflow.do('johns', function(){
  console.log('johns branch');
  return this.waitToEnd;
})
workflow.wait('waitToEnd', function(){
  console.log('ive been resumed');
  return this.end;
}, 2000, function(){ console.log('ive timed out'); return this.end })
 
 
workflow.onstatechange = function(name){
  console.log('onstatechange', name)
}
workflow.onresumed = function(name){
  console.log('onresumed', name)
}
 
workflow.start(); 
setTimeout(workflow.resume, 1000);
*/

var workflow = new statemach();

workflow.do('start', function(){
  return this.pause;
})
workflow.wait('pause', function(){
  console.log('ive been resumed');
  return this.pause;
})
 
workflow.onstatechange = function(name){
  console.log('onstatechange', name)
}
workflow.onresumed = function(name){
  console.log('onresumed', name)
}
 
workflow.start(); 
setInterval(workflow.resume, 1000);
````
