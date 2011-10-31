
// usage: log('inside coolFunc', this, arguments);
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
      arguments.callee = arguments.callee.caller;
      console.log( Array.prototype.slice.call(arguments) );
  }
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

function drupalTextarea() {
	$('textarea.resizable:not(.textarea-processed)').each(function() {
		// Avoid non-processed teasers.
		if ($(this).is(('textarea.teaser:not(.teaser-processed)'))) {
			return false;  
		}
		var textarea = $(this).addClass('textarea-processed'), staticOffset = null;

		// When wrapping the text area, work around an IE margin bug.  See:
		// http://jaspan.com/ie-inherited-margin-bug-form-elements-and-haslayout
		$(this).wrap('<div class="resizable-textarea"><span></span></div>')
			.parent().append($('<div class="grippie"></div>').mousedown(startDrag));

		var grippie = $('div.grippie', $(this).parent())[0];
		grippie.style.marginRight = (grippie.offsetWidth - $(this)[0].offsetWidth) +'px';

		function startDrag(e) {
			staticOffset = textarea.height() - e.pageY;
			textarea.css('opacity', 0.25);
			$(document).mousemove(performDrag).mouseup(endDrag);
			return false;
		}

		function performDrag(e) {
			textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
			return false;
		}

		function endDrag(e) {
			$(document).unbind("mousemove", performDrag).unbind("mouseup", endDrag);
			textarea.css('opacity', 1);
		}
	});
};
