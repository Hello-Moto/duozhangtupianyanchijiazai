/**
 * Created by lucky on 2016/4/19.
 */
var utils = {
    listToArray : function (similarArray){  //将类数组转化为数组
        /*
        *   try catch js
        * */
        var a = [];
        try{
            a = Array.prototype.slice.call(similarArray);
        }catch (e){
            alert(); //ie7 和 8 弹出
            var a = [];
            for(var i=0; i<similarArray.length; i++){
                a[a.length] = similarArray[i];
            }
        }
        return a;
    },
    jsonParse: function (jsonStr){ //把JSON格式的字符串转换为JSON格式对象
        return 'JSON' in window ? JSON.parse(jsonStr) : eval("(" + jsonStr+")");
    }

}
