const Common = require('../model/common');

var home = {
    index:async function(req, res, next){
        var ServiceData = await Common.CustomQuery("SELECT * FROM services WHERE status=1")
        var AboutData = await Common.CustomQuery("SELECT * FROM about WHERE status=1")
        var TeamData = await Common.CustomQuery("SELECT * FROM team WHERE status=1")
        var VideoData = await Common.CustomQuery("SELECT * FROM video WHERE status=1")
        var GalleryData = await Common.CustomQuery("SELECT gallery.*,gallery_category.name AS categoryName FROM gallery LEFT JOIN gallery_category ON gallery_category.id=gallery.category_id WHERE gallery_category.is_show=1 AND gallery_category.status=1 AND gallery.status=1 ORDER BY RAND() LIMIT 8 ")
        var CategoryData = await Common.CustomQuery("SELECT * FROM gallery_category WHERE is_show=1 AND status=1")
        var BlogData = await Common.CustomQuery("SELECT * FROM blog WHERE status=1")
        var FandQData = await Common.CustomQuery("SELECT * FROM f_and_q WHERE status=1")
        var ReviewData = await Common.CustomQuery("SELECT * FROM review WHERE status=1")
        var SettingData = await Common.CustomQuery("SELECT * FROM setting")

        res.render('home',{
            ServiceData: ServiceData,
            AboutData: AboutData,
            TeamData: TeamData,
            VideoData: VideoData,
            GalleryData: GalleryData,
            CategoryData: CategoryData,
            BlogData: BlogData,
            FandQData: FandQData,
            ReviewData: ReviewData,
            SettingData: SettingData[0],
            SuccessMsg: req.flash('homeSuccessMsg'),
            ErrorMsg: req.flash('homeErrorMsg'),
        });
    },
    readmore: async function(req, res, next){
        var blogdata = await Common.CustomQuery("SELECT * FROM blog WHERE id ="+req.params.id)
        var SettingData = await Common.CustomQuery("SELECT * FROM setting")
        res.render('../views/readmore',{
            SettingData: SettingData[0],
            blogdata: blogdata[0],
        });      
    },
    membership: async function(req, res, next){
        var SettingData = await Common.CustomQuery("SELECT * FROM setting")
        res.render('../views/membership',{
            SettingData: SettingData[0],
        });      
    }
}

module.exports = home;