const bestSeller = {
    bestSellerDB : [],
    
    initDB() {
        this.bestSellerDB.push({
            imgPath: "watch.png"
        })

        this.bestSellerDB.push({
            imgPath: "iphone.png"
        })

        this.bestSellerDB.push({
            imgPath: "camera.png"
        })

        this.bestSellerDB.push({
            imgPath: "xbox.png"
        })

        this.bestSellerDB.push({
            imgPath: "echo.png"
        })
        
    },
    
    getAllbestSeller() {
        return this.bestSellerDB;
    },

}

bestSeller.initDB();
module.exports = bestSeller;