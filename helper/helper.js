const Common = require('../model/common');
const fs = require('fs');
var image_unlink = {
    file_unlink_helper: async function (TableName, IdField, IdValue, DbField, Path) {
        try {
            if (TableName != "") {
                Data = await Common.CustomQuery("SELECT " + DbField + " FROM " + TableName + " WHERE " + IdField + " =" + IdValue)
                if (Data[0] && Data[0][DbField] != null) {
                    if (Path != "")
                        OldFilePath = uploadDir + Path + Data[0][DbField];
                    else
                        OldFilePath = uploadDir + Data[0][DbField];

                    fs.unlink(OldFilePath, (err) => {
                        if (err) {
                        } else {
                            return true;
                        }
                    });
                }
            }
            return true;
        } catch (ex) {
            console.log(ex)
        }
    },
}
module.exports = image_unlink