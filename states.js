module.exports = function statemach(){
  return {
    data: {},
    resume: null,
    do: function(name, f){
      this[name] = function(){
        this.state = name;
        if(this.onstatechange) this.onstatechange(name);
        var fu = f.bind(this)();
        if(fu) fu.bind(this)();
      }
    },
    wait: function(name, f, timeout, tf){
      this.state = name;
      var that = this;
      this[name] = function(){
        this.resume = function(){
          if(that.state =='end') return;
          if(that.onresumed) that.onresumed(name);
          var fu = f.bind(that)();
          if(fu) fu.bind(that)();
        }
      }
      if(!timeout) return;
      setTimeout(function(){
        (function(f){
           return function(){
             if(that.state != 'end') f();
             that.state = 'end'
           }
        })(tf)();
      }, timeout);
    },
    timeout: function(){},
    end: function(){ this.state = 'end' }
  }
}
