jQuery(document).ready(function($){
	$('#loginlink').click(function(ev){
		ev.preventDefault();
		$('#user-login').slideToggle();
	});

	$('.comment .comment_reply a').click(function(ev){
		ev.preventDefault();
		$('.loadedCommentForm').slideUp('fast');
		var clicked = $(this);
		var replyTo = clicked.parents('.comment:first');
		var commentForm = $('.loadedCommentForm', replyTo);
		clicked.addClass('loading');
		$('.comment').addClass('comment-dont-reply');
		replyTo.addClass('comment-on-reply');
		$.get(baseUrl + '/brick/commentform.html',function(data){
			if ( !commentForm.length ) {
				replyTo.append( '<div style="display:none;" class="loadedCommentForm" />' );
				commentForm = $('.loadedCommentForm', replyTo);
				commentForm.append( '<a class="closeCommentForm">X</a>' );
				commentForm.append( data );
				drupalTextarea();
			}
			commentForm.slideDown();
			clicked.removeClass('loading');
		});
	});
	$('.closeCommentForm').live('click',function(){
		$('.loadedCommentForm').slideUp('fast');
		$('.comment').removeClass('comment-dont-reply');
	});

	$('.retweet a').live('click', function(ev){
		console.log(this.href);
		console.log($(this).attr('href'));
		window.open(this.href, 'retweet', 'width=550,height=350');
		ev.preventDefault();
	});
});

//end
