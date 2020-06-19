const product = {
    fakedb : [],

    initDB()
    {
        this.fakedb.push({
            title : "Samsung S10",
            description : "cool phone",
            price : "700",
            featured: true,
            imgPath : "1.jpg"
        })

        this.fakedb.push({
            title : "Iphone X",
            description : "very cool phone",
            price : "1100",
            featured: false
        })

        this.fakedb.push({
            title : "Samsung S10+",
            description : "cool phone",
            price : "900",
            featured: false
        })
    },

    getAllProducts()
    {
        return this.fakedb;
    },

    getFeaturedProducts()
    {

    }
}

product.initDB();
module.exports = product;