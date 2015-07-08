# input-materialdesign-widget
Appcelerator Text Field concept Material Design!

<h2>Example</h2>

<img src="asset/example-input.gif"/>

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

--------------------------------------------------------------------------------

<h3>Attributes</h3>

<pre> <b>- width: String, Number</b> 
       sets the width.</pre>

 <pre> <b>- colorFocus: String</b> 
       sets the color when the focused field.</pre>
      
  <pre> <b>- colorPattern: String</b> 
      sets the standard color when the field started.</pre>
  
  <pre> <b>- colorFont: String</b> 
      sets the font color.</pre>
  
  <pre> <b>- titleHint: String</b> 
      sets title.</pre>
  
  <pre> <b>- top: String, Number</b> 
      defines the top.</pre>
  
  <pre> <b>- bottom: String, Number</b> 
      defines the bottom.</pre>

  <pre> <b>- left: String, Number</b> 
      defines the left.</pre>
  
  <pre> <b>- right: String, Number</b> 
      defines the right.</pre>

  
