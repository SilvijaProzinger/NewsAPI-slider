let key = config.MY_KEY;
let searchTerm;
let url;

$('#searchButton').on('click', function(e){
	e.preventDefault()
	searchTerm = $("#searchValue").val();
    url = `https://newsapi.org/v2/everything?` +
          `q=${searchTerm}&` +
          `from=2020-02-06&` +
          `sortBy=popularity&` +
          `pageSize=5&` +
          `apiKey=${key}`;

	var req = new Request(url);

	if (searchTerm !== ''){
		fetchNews(req)
	}

	//to change later
	else {
		let emptyErr = '<h3 class="error-text">Please enter a search term and try again!</h3>'
		$('#article').html(emptyErr);
	}

})

const fetchNews = (req) => {
	$.getJSON(url)
		.done(function(data){
			console.log(data);
			let output = ''
			let newsWidth = 650
			let newsCount = 5

			$.each(data.articles, function(index, article){
			    output += `
			      	<article class="news active">
				      	<div class="news-inner">
				      		<img src="${article.urlToImage}" alt="image article" class="news-image"/>	        	        
				  	  		<div class="news-content">
								<h2 class="news-title">${article.title}</h2>
								<h4 class="news-author">${article.author}</h4>
								<h3 class="news-text">${article.content}</h3>
								<a href="${article.url}" class="news-link">Pročitaj članak</a>
				  			</div>
				    	</div>
				  	</article>`;

				//$(this).find(".news-inner").first().addClass( "active" );  
			  });

	 		$('#article').html(output);
	 		$("#leftButton").css({display: "block"});
	 		$("#rightButton").css({display: "block"});

	 		//switch between news when clickin on arrows
	 		$('#leftButton').on('click', function(){
	 			console.log('clicked')
	 			let activeNews = $('.active');
	 			let previousNews = activeNews.prev()

	 			if(previousNews.length){
	 				activeNews.removeClass('active').css('z-index', -10);
	 				previousNews.addClass('active').css('z-index', 10)
	 			}
	 		})

	 		$('#rightButton').on('click', function(){
	 			console.log('clicked')
	 			let activeNews = $('.active');
	 			let nextNews = activeNews.next()

	 			if(nextNews.length){
	 				activeNews.removeClass('active').css('z-index', -10);
	 				nextNews.addClass('active').css('z-index', 10)
	 			}
	 		})
		})

		.fail(function(jqxhr, textStatus, error){
			let err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
		});
}
