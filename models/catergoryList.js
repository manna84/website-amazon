const categoryList = {

    categoryListDB : [],
    
    initDB() {

        this.categoryListDB.push({
            description: "Renewed Laptops",
            imgPath: "laptop.jpg"
        })

        this.categoryListDB.push({
            description: "Let's Play",
            imgPath: "toys.jpg"
        })

        this.categoryListDB.push({
            description: "Get fit at home",
            imgPath: "yoga.jpg"
        })

        this.categoryListDB.push({
            description: "Fresh Books",
            imgPath: "books.jpg"
        })
        
    },
    
    getAllcategoryLists() {

        return this.categoryListDB;

    },

    getFeaturedcategoryLists() {

    }
}

categoryList.initDB();

module.exports = categoryList;
