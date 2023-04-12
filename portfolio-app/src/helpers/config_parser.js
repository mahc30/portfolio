export function home_config_parser(home_config) {
    let index = 0;
    home_config.articles.forEach((article, i) => {
        //console.log(article)
        article.cards.forEach((card, j) => {
            home_config.articles[i].cards[j].id = index++;
            if (card.cards) {
                card.cards.forEach((card, z) => {
                    home_config.articles[i].cards[j].cards[z].id = index++;
                })
            }
        });
    });
}

export function map_cards(home_config) {
    home_config.articles.forEach((article, i) => {
        let map = new Map();
        article.cards.forEach(card => {
            let subMap = new Map();
            map.set(card.id, card);
            if (card.cards) {
                card.cards.forEach(card => {
                    map.set(card.id, card)
                    subMap.set(card.id, card);
                });

                card.cards = subMap
            }
        });

        home_config.articles[i].cards = map;
    });
}

export function treemap(card) {

    let map = new Map();
    let added = new Set();
    card.cards.forEach(card => {
        let subMap = new Map();

        if (!added.has(card.id)) map.set(card.id, card);


        if (card.cards) {
            card.cards.forEach(card => {

                added.add(card.id);
                subMap.set(card.id, card);
            });

            card.cards = subMap



        }
    });

    return map;
}