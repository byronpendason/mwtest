function Search(url, isCategoryOnly) {

    const searchJsonUrl = url;

    this.SearchJson = null;
    this.Search = loadAndSearch;
    this.ParseQueryString = getQueryString;
    this.IsCategoryOnly
    
    return this;

    function loadAndSearch(searchTerm, resultContainer) {
        if(this.SearchJson === null) {
            fetch(url, {
                mode: "same-origin", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin"
            }).then(results => {
                return results.json();
            }). then(function(posts) {
                this.SearchJson = posts;
                return performSearch(searchTerm, resultContainer)
            });  
        } else {
            return performSearch(searchTerm, resultContainer);
        }
    }

    function performSearch(searchTerm, resultContainer) {
        var postPreviews = new Array();
        this.SearchJson.forEach(post => {
            if(post.category !== undefined) {
                var categories = post.category.toLowerCase(); // to lower case to normalize the search
                var lowercase = searchTerm.toLowerCase();
                if(categories.includes(lowercase)) {
                    postPreviews.push(buildPostPreview(post));
                } else if (!this.IsCategoryOnly){ // Only perform title and synonym checks if we're not on the catagory page
                    if (post.synonyms !== undefined) {
                        var synonyms = post.synonyms.toLowerCase();
                        if(synonyms.includes(lowercase)){
                            postPreviews.push(buildPostPreview(post));
                        }
                    } else {
                        var title = post.title.toLowerCase();
                        if(title.includes(lowercase)){
                            postPreviews.push(buildPostPreview(post));
                        }
                    }
                }
            }
        });

        if(postPreviews.length == 0) {
            resultContainer.append("<h1>No Results Found</h1>");
        } else {
            resultContainer.append(postPreviews);
        }
    }

    function buildPostPreview(post) {
        var postPreview = $('<div class="post-preview">');
        var date = new Date(post.date);
        var postMetadata = $('<span class="post-details">').html("Posted by " + post.author + "on " + date.toDateString() + " CE in");
        var categories = post.category.split(",");
        categories.forEach(c => {
            var catTrimmed = c.trim();
            var catName = catTrimmed.charAt(0).toUpperCase() + catTrimmed.slice(1);
            postMetadata.append("&nbsp;");
            postMetadata.append($('<a>').html(catName).attr("href", "?" + catTrimmed));
        });
        
        postPreview.append($('<h2 class="post-preview-title">').append($('<a>').html(post.title).attr("href", post.url)));
        postPreview.append(postMetadata);
        postPreview.append($('<p>').html(post.excerpt.replace("&amp;#8617", "&#8617"))); // This replace is stupid, but the only way I could get around it
        return postPreview;
    }

    function getQueryString()
    {
        if(!window.location.href.includes("?")) {
            return "";
        }

        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return decodeURI(vars[0]);
    }
}