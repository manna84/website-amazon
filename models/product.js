const product = {
    fakedb : [],

    initDB()
    {
        // this.fakedb.push({
        //     description : "Nikon COOLPIX B500 Digital Camera, Black",
        //     price : "249",
        //     imgPath : "camera.png",
        //     ratingPath : "rating-4.5.png",
        //     reviews : 12341,
        //     featured: false
            
        // })

        this.fakedb.push({
            description : "Echo Plus (2nd gen) – Premium sound with built-in smart home hub - Charcoal",
            price : "134",
            imgPath : "echo.png",
            ratingPath : "rating-4.5.png",
            reviews : 5446,
            featured: true
            
        })

        // this.fakedb.push({
        //     description : "Fitbit Versa 2 Health & Fitness Smartwatch with Heart Rate, Music, Alexa Built-in, Sleep & Swim Tracking-Stone/Mist Grey",
        //     price : "199",
        //     imgPath : "watch.png",
        //     ratingPath : "rating-4.png",
        //     reviews : 65786,
        //     featured: false
            
        // })

        this.fakedb.push({
            description : "Apple iPhone X, GSM Unlocked 5.8in, 64 GB - Space Gray",
            price : "729",
            imgPath : "iphone.png",
            ratingPath : "rating-4.png",
            reviews : 676,
            featured: true
            
        })

        this.fakedb.push({
            description : "Xbox 360 Controller, 360 Wireless Controller 2.4 GHZ ",
            price : "49",
            imgPath : "xbox.png",
            ratingPath : "rating-4.5.png",
            reviews : 5675,
            featured: true
            
        })

        this.fakedb.push({
            description : "Razer Cynosa Chroma Gaming Keyboard",
            price : "54",
            imgPath : "keyboard.png",
            ratingPath : "rating-4.png",
            reviews : 122,
            featured: true
            
        })

        this.fakedb.push({
            description : "PlayStation 4 - 1TB Slim - Console Edition",
            price : "349",
            imgPath : "ps4.png",
            ratingPath : "rating-4.5.png",
            reviews : 2132,
            featured: true
            
        })

        this.fakedb.push({
            description : "Sony Noise Cancelling Headphones WH1000XM3",
            price : "348",
            imgPath : "headphone.png",
            ratingPath : "rating-4.5.png",
            reviews : 9882,
            featured: true
            
        })
    },

    getAllProducts()
    {
        return this.fakedb;
    },

    getFeaturedProducts()
    {
        featureProductDB : [],

        for(var i = 0; i < this.fakedb.length; i++) {
            array.forEach(function(currentValue, index, arr), thisValue)
        }
    }
}

product.initDB();
module.exports = product;