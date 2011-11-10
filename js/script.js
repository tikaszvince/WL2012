jQuery(document).ready(function($){
	$('#loginlink').click(function(ev){
		ev.preventDefault();
		$('#user-login').slideToggle();
	});
	
	function showCommentForm(clicked, replyTo) {
		$('.loadedCommentForm').slideUp('fast');
		var commentForm = $('.loadedCommentForm', replyTo);
		$('.comment').addClass('comment-dont-reply');
		$('.comment-on-reply').removeClass('comment-on-reply');
		clicked.addClass('loading');
		replyTo
			.removeClass('comment-dont-reply')
			.addClass('comment-on-reply');
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
	}

	$('.comment .comment_reply a, .comment_add a, .comment_comments a').click(function(ev){
		if (
			$(this).hasClass('comment_reply')
			|| $('.node').length == 1
		) {
			ev.preventDefault();
			var replyTo = $(this).parent().hasClass('comment_reply')
				? $(this).parents('.comment:first')
				: $('.node');
			showCommentForm( $(this), replyTo);
		}
	});
	$('.closeCommentForm').live('click',function(){
		$('.loadedCommentForm').slideUp('fast');
		$('.comment').removeClass('comment-dont-reply');
	});
	if ( document.location.hash == '#comment-form' ) {
		$('.comment_add a, .comment_comments a').click();
	}

	$('.retweet a').live('click', function(ev){
		console.log(this.href);
		console.log($(this).attr('href'));
		window.open(this.href, 'retweet', 'width=550,height=350');
		ev.preventDefault();
	});
});

//end
