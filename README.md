# states
A very simple state machine in JS

```javascript
var states = require('./states.js');

// define a new state machine
var workflow = new states();

// .do(name, function) defines a state in the machine
workflow.do('start', function(){
  // set some internal data, this.data holds that data
  this.data.name = 'john';
  // print the current state to the console
  console.log(this.state);
  // we return the name of our next state to transition
  if(this.data.name == 'john')
    return this.log;
  else
    return this.johns;
})

// define another state
workflow.do('log', function(){
  console.log(this.state, this.data.name);
  return this.data.name ? this.johns : this.end;
})

// define another state
workflow.do('johns', function(){
  console.log('johns branch, ill wait now');
  return this.waitToEnd;
})

// .wait defines a special kind of state, the function doesn't run until 
workflow.wait('waitToEnd', function(){
  console.log('ive been resumed');
  // call the end state
  return this.end;
}, 2000, function(){ console.log('ive timed out'); return this.end })
 
// we can handle state change events
workflow.onstatechange = function(name){
  console.log('onstatechange', name)
}

// we can handle resumed events
workflow.onresumed = function(name){
  console.log('onresumed', name)
}
 
// now let's start the machine, just call any defined state to begin
workflow.start();

// the state machine will continue until the waitToEnd state
// now wait 1 second and then resume
setTimeout(workflow.resume, 1000);

```
