# input-materialdesign-widget
Appcelerator Text Field concept Material Design!

<b><h3>Functions</h3></b>

  - <h5>getValue()</h5>
  	<i>returns the value of input.</i>
  	<br>
  	.js 
  	<pre>
  	$.textfield.getValue();
  	</pre>
  	
  - <h5>setValue(paran)</h5>
  	<i>assigns value to input.</i>
  	<br>
  	.js 
  	<pre>
  	$.textfield.setValue(23);
  	</pre> 	
  	
  - <h5>ANIMATION_UP()</h5>
  	<i>animation rise.</i>
  	<br>
  	.js 
  	<pre>
  	$.textfield.ANIMATION_UP();
  	</pre> 	
  	
  - <h5>ANIMATION_DOWN()</h5>
  	<i>animation descent.</i>
  	<br>
  	.js 
  	<pre>
  	$.textfield.ANIMATION_DOWN();	
  	</pre> 	
  
- <h5>listener(event, callback)</h5>
  <i>assigns event for input , listening to a callback.</i>
  <br>
  .js 
  <pre>
  
  $.textfield.listener('focus', function() {
  	Ti.API.info("even focus");
  });
  </pre>	
