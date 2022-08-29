class Good {
    constructor (name, description, sizes, price) {
        this.id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = false;
    }
    setId(id) {
        this.id = id;
    }

    setAvailable (ava) {
        this.available = ava;
    }
}


class GoodsList {
    #goods = [];
    #num_goods = {};
    constructor () {
        this.filter = new RegExp("рубашка", "gi");
        this.sortPrice = true;
        this.sortDir = true;
    }

    add (...items) {
        for (let item of items) {
            this.index = this.#goods.length;
            item.setId(this.index);
            item.setAvailable(true);
            this.#goods.push(item);
            this.#num_goods[item.id] = this.index;
        }
    }

    remove(id) {
        delete this.#goods[this.#num_goods[id]];
        delete this.#num_goods[id];
    }

    get list() {
        this.temp = this.#goods.filter(good => this.filter.test(good.name))
        if (this.sortPrice) {
            if (this.sortDir) {
                this.temp.sort((item1, item2) => item1.price - item2.price)
            } else {
                this.temp.sort((item1, item2) => item2.price - item1.price)
            }
        }
        return this.temp
    }

}


class BasketGood extends Good {
    constructor (good) {
        super(good.name, good.description, good.sizes, good.price);
        this.id = good.id
        this.amount = 0;
    }

}


class Basket {
    constructor () {
        this.goods = [];
        this.num_basket = {};
    }

    add (good, amount) {
        if (this.num_basket[good.id]) {
            this.goods[this.num_basket[good.id]].amount += amount
        } else {
            good.amount = amount
            let index = this.goods.length;
            this.goods.push(good);
            this.num_basket[good.id] = index;
        }
    }

    remove(good, amount) {
        if (this.goods[this.num_basket[good.id]].amount > amount) {
            this.goods[this.num_basket[good.id]].amount -= amount
        } else {
            delete this.goods[this.num_basket[good.id]];
            delete this.num_basket[good.id];
        }
    }

    clear() {
        this.goods.length = 0;
        this.num_basket = {};
    }

    removeUnavailable() {
        this.goods.forEach((good) => {
            if (good.available === false) {
                delete this.goods[this.num_basket[good.id]];
                delete this.num_basket[good.id];
            }
        });
    }


    get totalSum() {
        return this.goods.reduce((sum, good) => {sum += good.price; return sum}, 0)
    }
    get totalAmount() {
        let sum = 0;
        this.goods.forEach(good => {sum += good.amount});
        return sum
    }

}





let catalog = new GoodsList();
let good1 = new Good("футболка", "короткий рукав", [46, 48, 50, 52, 54, 56], 1100);
let good2 = new Good("толстовка", "с принтом", [46, 48, 50, 52, 54, 56], 2500);
let good3 = new Good("рубашка", "синяя", [46, 48, 50, 52, 54, 56], 3000);
let good4 = new Good("рубашка", "черная", [46, 48, 50, 52, 54, 56], 5000);
let good5 = new Good("рубашка", "желтая", [46, 48, 50, 52, 54, 56], 3500);
let good6 = new Good("рубашка", "красная", [46, 48, 50, 52, 54, 56], 2000);
let good7 = new Good("рубашка", "сиреневая", [46, 48, 50, 52, 54, 56], 2000);
catalog.add(good1, good2, good3, good4, good5, good6, good7);

console.log(catalog.list);

//catalog.remove(2);
//console.log(catalog.list);

let in_bask1 = new BasketGood(good1)
let in_bask2 = new BasketGood(good3)
let in_bask3 = new BasketGood(good4)
let basket = new Basket();

basket.add(in_bask1, 1);
basket.add(in_bask3, 2);
//console.log(basket);

//basket.add(in_bask3, 8);
//console.log(basket);

//basket.remove(in_bask3, 2);
//console.log(basket);

//basket.clear();
//console.log(basket);

//basket.removeUnavailable();
//console.log(basket);

console.log(basket.totalAmount);
console.log(basket.totalSum);