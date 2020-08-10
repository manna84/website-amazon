const userDashboard = (req, res) => {
    if (req.session.userInfo.type == "Admin") {
        res.redirect("/admin-dashboard")
    }

    else {
        res.redirect("/dashboard")
    }
}

module.exports = userDashboard;