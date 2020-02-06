let key = config.MY_KEY;
let searchTerm = 'netflix'
let url = `https://newsapi.org/v2/everything?` +
          `q=${searchTerm}&` +
          `from=2020-02-06&` +
          `sortBy=popularity&` +
          `pageSize=5&` +
          `apiKey=${key}`;

$('#searchButton').on('click', function(e){
	e.preventDefault()

	var req = new Request(url);

	if (searchTerm !== ''){
		fetchNews(req)
	}

	//to change later
	else {
		alert('Please enter a search term and try again')
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
		})

		.fail(function(jqxhr, textStatus, error){
			let err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
		});
}
