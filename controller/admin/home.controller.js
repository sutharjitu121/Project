var home = {
    index: function(req, res, next){
        res.render('admin/home',{
            userData: req.session.user,
            ComData: req.session.ComDetail,
            title:'Dashboard',
            active:'Dashboard'});
    },
}

module.exports = home;