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
			$.each(data.articles, function(index, article){
			    output += `
			      <article class="news">
			        <img src="${article.urlToImage}" alt="image article" class="news-image"/>	        	        
					<div class="news-content">
						<h2 class="news-title">${article.title}</h2>
						<h4 class="news-author">${article.author}</h4>
						<h3 class="news-text">${article.content}</h3>
						<a href="${article.url}">Pročitaj članak</a>
					</div>
				    </article>`;
			  });
	 		$('#article').html(output);
	 		$("#leftButton").css({display: "block"});
	 		$("#rightButton").css({display: "block"});
		})

		.fail(function(jqxhr, textStatus, error){
			let err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
		});
}
