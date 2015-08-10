# input-materialdesign-widget
Appcelerator Text Field concept Material Design!

<h2>Installation</h2>
<pre> <i>$ gittio install input-materialdesign@version</i></pre>

<h2>Example</h2>
<img src="asset/example-input.gif"/>

<b><h3>Functions</h3></b>

  - <h5>getValue()</h5>
  	<i>returns the value of input.</i>
  	<br>
  	<pre>
  	$.textfield.getValue();
  	</pre>
  	
  - <h5>setValue(paran)</h5>
  	<i>assigns value to input.</i>
  	<br>
  	<pre>
  	$.textfield.setValue(23);
  	</pre> 
  
  - <h5>setEditable(boolean)</h5>
  	<i>The input block.</i>
  	<br>
  	<pre>
  	$.textfield.setEditable(true);
  	</pre>
  	
  - <h5>ANIMATION_UP()</h5>
  	<i>animation rise.</i>
  	<br>
  	<pre>
  	$.textfield.ANIMATION_UP();
  	</pre> 	
  	
  - <h5>ANIMATION_DOWN()</h5>
  	<i>animation descent.</i>
  	<br>
  	<pre>
  	$.textfield.ANIMATION_DOWN();	
  	</pre> 	
  
- <h5>listener(event, callback)</h5>
  <i>assigns event for input , listening to a callback.</i>
  <br>
  <pre>
  
  $.textfield.listener('focus', function() {
  	Ti.API.info("even focus");
  });
  </pre>

- <h5>Expose Focus & Blur Method</h5>
<pre>
// Focus 
$.textfield.focus();
// Blur
$.textfield.blur();
</pre>

--------------------------------------------------------------------------------

<h3>Attributes</h3>

<pre> <b>- animationDuration: Number</b> 
       duration animation.</pre>

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
      
  <pre> <b>- keyboardType: String </b>
  	  define the keyboardType.</pre>
  
  <pre> <b>- returnKey: String </b>
  	  define the returnKey from keyboard.</pre>

  <pre> <b>- password: Boolean </b>
  	  define if TextField should have passwordMask.</pre>
  
  <pre> <b>- editable: Boolean </b>
  	  defines whether the input starts blocked.</pre>	  
  
