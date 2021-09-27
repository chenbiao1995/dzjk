/// <reference path="jquery-1.7.1.min.js" />
var Sehr = {};
Sehr.Common = {};
//刷新页面
Sehr.Common.ChangeHtml = function (url, args) {

    args = args || {};
    var data = args.data || "";
    $.ajax({
        cache: false,
        async: args.async || true,
        type: "POST",
        url: url,
        data: data,
        dataType: "html",
        success: function (htm) {
            if (htm.indexOf("ErrorStr") > -1) {
                htm = eval("(" + htm + ")");
                //jAlert(htm.ErrorStr, "错误提示");
                alert(htm.ErrorStr);
                return;
            }
            else {
                if (args.controlId) {

                    if (args.controlId == '#xman_health_record_div' || args.controlId == '#searchreturnpart') {
                        //隐藏关键病种
                        //var illness = ['艾滋病','乙肝','HIV','淋病','梅毒','生殖道沙眼衣原体感染','尖锐湿疣','生殖道疱疹'];
                        var htm1 = htm.replace(/乙肝|淋病|梅毒/g, '**').replace(/艾滋病|HIV|精神病/g, '***')
                            .replace(/生殖道沙眼衣原体感染/g, '**********').replace(/尖锐湿疣/g, '****').replace(/生殖道疱疹/g, '*****');

                        $(args.controlId).html(htm1);

                        // 过滤特殊病种点击事件 简单列表页
                        if ($("#xman_health_record_div table td a[class='main-table']").length > 0)
                        {
                            $("#xman_health_record_div table td a[class='main-table']").each(function () {
                                if ($(this).html().indexOf("**") > -1)
                                {
                                    $(this).attr('href', 'javascript:void(0);');
                                }
                            });
                        }
                        // 过滤特殊病种点击事件 详细列表页
                        if ($("#searchreturnpart table td[class='td-record']").length > 0) {
                            $("#searchreturnpart table td[class='td-record']").each(function () {
                                if ($(this).html().indexOf("**") > -1) {
                                    $(this).parent().find("td[class='td-detailed'] a").attr('href', 'javascript:void(0);');
                                }
                            });
                        }
                    }
                    else {
                        $(args.controlId).html(htm);
                    }



                }
            }
            if (args.callback) {
                args.callback(htm);
            }
        },
        error: function (htm) {
        }
    });
}
//扩展string.formart支持

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
}

//日期格式为 yyyy-MM-dd ,否则会出错
Sehr.Common.dateCompare = function (StartDate, EndDate, DayNum) {
    if (StartDate == "") {
        return "";
    }
    var dataNow = new Date();
    var dataStr = dataNow.getFullYear() + "-" + (dataNow.getMonth() + 1) + "-" + dataNow.getDate();
    if (StartDate > dataStr) {
        return "开始日期不能大于当前日期!";
    }
    if (EndDate == "") {
        return "";
    }
    if (StartDate > EndDate) {
        return "开始日期不能大于结束日期!"
    }
    if (DayNum != "") {
        var dataOne = StartDate.split('-');
        var dataS = dataOne[2] + "-" + dataOne[1] + "-" + dataOne[0];
        var dataTwo = EndDate.split('-');
        var dataE = dataTwo[2] + "-" + dataTwo[1] + "-" + dataTwo[0];
        var days = (Date.parse(dataE) - Data.parse[dataS]) / 1000 / 60 / 60 / 24;
        if (parseInt(days,10) > parseInt(DayNum,10)) {
            return "开始日期与结束日期的范围,不能超过" + DayNum + "天!";
        }
    }
    return "";
}

//动态加载JS和CSS，成功后执行回调函数
/*
$.FileLoader({
    urls:文件地址集合，如['file1.js','file2.js'],
    type:文件类型,如'js','javascript','css',
    success:成功后执行的函数
    failure:失败后执行的函数例,funcion(errorfile){}
    })
*/
$.extend({
    FileLoader: function () {
        var dc = document;
        function createScript(urls, success, failure) {
            var scripts = [];
            var completeNum = 0;
            for (var i = 0; i < urls.length; i++) {
                scripts[i] = dc.createElement("script");
                scripts[i].type = "text/javascript";
                scripts[i].src = urls[i];
                scripts[i].onerror = function () {
                    if (failure) {
                        failure(this.src);
                        return;
                    }
                }
                scripts[i].onerrorupdate = function () {
                    if (failure) {
                        failure(this.src);
                        return;
                    }
                }
                if (scripts[i].readyState) {
                    scripts[i].onreadystatechange = function () {
                        if (this.readyState == "loaded" || this.readyState == "complete") {
                            this.onreadystatechange = null;
                            completeNum++;
                            if (completeNum >= urls.length && success) {
                                success();
                            }
                        }
                    }
                }
                else {
                    scripts[i].onload = function () {
                        completeNum++;
                        if (completeNum >= urls.length && success) {
                            success();
                        }
                    }
                }
                dc.getElementsByTagName("head")[0].appendChild(scripts[i]);
            }
        }
        function createLink(urls, success) {
            var links = [];
            for (var i = 0; i < urls.length; i++) {
                links[i] = dc.createElement("link");
                links[i].rel = "stylesheet";
                links[i].href = urls[i];
                dc.getElementsByTagName("head")[0].appendChild(links[i]);
            }
            if (success) {
                success();
            }
        }
        return {
            load: function (option) {
                var _type = "";
                option.type ? _type = option.type : "";
                typeof option.filtration == "boolean" ? filtration = option.filtration : "";
                switch (_type) {
                    case "js":
                    case "javascript": createScript(option.urls, option.success, option.failure); break;
                    case "css": createLink(option.urls, option.success); break;
                }
                return this;
            }
        }
    }
});


function dealLevelImg(level) {
    $(function() {
        // 各等级图片的配置
        var levelCfg = {
            'crown': 64,
            'sun': 16,
            'moon': 4,
            'star': 1
        };

        // 对每个等级进行转换成图片
        var imgNum = 0; // 当前图片的个数
        if (level <= 80) {
            for (type in levelCfg) {
                imgNum = parseInt(level / levelCfg[type]);
                level %= levelCfg[type];
                for (var i = 0; i < imgNum; i++) {

                    $('#scoregradepic').append('<img src="/Areas/KelamayiOld/Content/images/' + type + '.png"/>')
                };
            }
        } else {
            for (var i = 0; i <2; i++) {

                $('#scoregradepic').append('<img src="/Areas/KelamayiOld/Content/images/crown.png"/>')
            };
        }
    });
}

