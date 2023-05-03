export function home_config_parser(home_config) {
    let index = 0;
    home_config.articles.forEach((article, i) => {
        article.id = index++;
        if (article.cards) {
            iterateCards(article, index)
        }
    });
}

function iterateCards(card, index) {

    card.cards.forEach((card) => {
        card.id = index++;
        if (card.cards) {
            iterateCards(card, index);
        }
    });
}

export function map_cards(home_config) {
    home_config.articles.forEach((article, i) => {
        let map = new Map();
        article.cards.forEach(card => {

            map.set(card.id, card);
            if (card.cards) {
                recursiveMapCards(card, map)
            }
        });

        home_config.articles[i].cards = map;
    });
}

function recursiveMapCards(card, map) {

    let subMap = new Map();
    card.cards.forEach(card => {
        map.set(card.id, card)
        subMap.set(card.id, card);
        if (card.cards) {
            recursiveMapCards(card, map, subMap)
        }
    });

    card.cards = subMap
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