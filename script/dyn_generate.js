class Product {
    constructor(naam, prijs, img, filter, link) {
        this.naam = naam;       // name of the product
        this.prijs = prijs;     // price of the product
        this.img = img;         // link to the products image
        this.filter = filter;   // the filter ID
        this.link = link;       // the link to this product's productDetail page, "" if it has none
    }

    create() {  // create Product's html
        let result = ""
        if (this.link) {    // if the product has a link to a productDetail page, add <a> tag
            result +=
                '<section class="all ' + this.filter + '">\n' +
                '      <a href="' + this.link + ' ">\n' +
                '           <img src="' + this.img + '" width="400" alt="' + this.naam + '">\n' +
                '            <h3>' + this.naam + '</h3>\n' +
                '            <p>Prijs: €' + this.prijs + '</p>\n' +
                '       </a>\n' +
                '</section>'
        } else {
            result +=
                '<section class="all ' + this.filter + '">\n' +
                '       <img src="' + this.img + '" width="400" alt="' + this.naam + '">\n' +
                '       <h3>' + this.naam + '</h3>\n' +
                '       <p>Prijs: €' + this.prijs + '</p>\n' +
                '</section>'
        }

        return result;
    }
}

class ProductCategorie {
    constructor(categorie) {
        this.categorie = categorie; // name of the category
        this.producten = [];        // list of Product objects under this category
    }

    addProducten(productenIn) {
        for (const product of productenIn) {
            if (product[4] === this.categorie) {    // if the product belongs in this category
                // construct a Product object and add it to the category's product list
                this.producten.push(new Product(product[0], product[1], product[2], product[3], product[5]));
            }
        }
    }

    reverse() { // reverse the category's product list
        this.producten.reverse();
    }

    create() {  // returns the category's html including its products
        let result = "";

        result += '<section id="' + this.categorie + 'Section">';
        result += '<h2>' + this.categorie + '</h2>'

        for (const product of this.producten) {
            result += product.create();
        }

        result += '</section>'

        return result;
    }
}

addEventListener("load", init);

let categories = [];
let reverseButton;

function init() {
    // create the categories
    categories = [
        new ProductCategorie("Acer"),
        new ProductCategorie("Lenovo"),
        new ProductCategorie("Asus")
    ];
    // add the products to the categories
    for (const categorie of categories) {
        categorie.addProducten(producten);
        console.log(categorie);
    }

    // add the main tag with the class "product"
    let main = document.createElement("main");
    main.setAttribute("class", "product");
    let nav = document.querySelector("nav");
    nav.insertAdjacentElement('afterend', main);

    // create the content for main
    createPage();
}

function createPage() {
    let result = '';

    result += createButton();   // create the button to link to the other products page

    result += createFilters();  // create the filter buttons and dropdown menu

    for (const categorie of categories) {
        result += categorie.create();   // create the html of each category
    }

    let main = document.querySelector("main.product");  // select the main element
    main.innerHTML = result;            // apply the content to the main innerHTML

    // add the event listener for the reverse function to the just created reverse button
    reverseButton = document.querySelector("#reverse");
    reverseButton.addEventListener("click", reversePage);
}

function reversePage() {    // reverse the category-product order
    categories.reverse();   // reverse categories itself
    for (const categorie of categories) {
        categorie.reverse();    // reverse each category's products
    }

    // re-create the content for main
    createPage();
}

function createButton() {   // create the button to link the old products page
    return '<a id="dynButton" href="producten.html">Statische producten</a>';
}

function createFilters() {  // create the filter buttons and dropdown menu
    return createFilterInputs() +
        '\n' +
        '    <section id="productFilterWrapper">\n' +
        '        <h2 class="hidden">Filter</h2>\n' +
        '        <section id="productFilter">\n' +
        '            <h3 class="hidden">Filterknop</h3>\n' +
        '            <button>Filter</button>\n' +
        '            <section id="productFilters">\n' +
        '                <h4>RAM</h4>\n' +

        // add the reverse button in the dropdown filter menu
        '                <input id="reverse" name="reverse" type="button">' +
        '                <label for="reverse">Reverse</label>' +

        createFilterLabels() +

        '            </section>\n' +
        '        </section>\n' +
        '    </section>';
}

function createFilterInputs() {
    let result = '';

    for (const filter of filters) {
        if (filter[0] === "all") {
            result += '<input checked="checked" id="' + filter[0] + '" name="filter" type="radio">';
        } else {
            result += '<input id="' + filter[0] + '" name="filter" type="radio">';
        }
    }

    return result;
}

function createFilterLabels() {
    let result = "";

    for (const filter of filters) {
        result += '<label for="' + filter[0] + '">' + filter[1] + '</label>';
    }

    return result;
}
