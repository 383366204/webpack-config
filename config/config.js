const fs = require('fs');
const path = require('path');
// 获取所有页面 生成多页面的集合
const getFileNameList = path => {
    let fileList = [];
    let dirList = fs.readdirSync(path);
    dirList.forEach(item => {
        if (item.indexOf('html') > -1) {
            fileList.push(item.split('.')[0]);
        }
    });
    return fileList;
};
let HTMLDirs = getFileNameList(path.resolve(__dirname , '../src/html'))
module.exports = {
    HTMLDirs,
    cssPublicPath:'../',
    imgOutputPath:"./img/",
    cssOutputPath:"./css/",
    fontOutputPath:"./font/",
    devServerOutputPath:'../dist/'
}