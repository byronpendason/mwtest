
function Sidebar(posts) {
    // will make this list dynamic as soon as I figure out how
    this.Categories = [
        new Category("Heathenry"),
        new Category("Heathen worldview"),
        new Category("Myths"),
        new Category("Reconstruction"),
        new Category("Philosophical musings"),
        new Category("Runes"),
        new Category("Tech"),
        new Category("Updates"),
        new Category("Cosmology"),
        new Category("Heathen worship"),
        new Category("Rants"),
        new Category("Heathen basics"),
        new Category("Anglo-saxon calendar"),
        new Category("Afterlife"),
        new Category("Stoicism"),
        new Category("Politics"),
        new Category("Lgbt")
    ]

    this.Categories.forEach(cat => {
        var catPosts = new Array();
        posts.forEach(p => {
            if(p.includes(cat.Name)){
                catPosts.push(p);
            }
        });
        cat.Count = catPosts.length;
    });

    // TODO figure out why when I get here, all the posts have the same categories when they didn't generate that way
    // from the Liquid input.

    function Category(name) {
        this.Name = name;
        this.Count = '';

        return this;
    }

    return this;
}

