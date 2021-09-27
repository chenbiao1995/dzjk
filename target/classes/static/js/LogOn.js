Sehr.LogOn = {};
Sehr.LogOn.Vali_onclick = function (_this) {
    _this.setAttribute("src", '/ValidateCode/GetImage?s=' + Math.random());
}
//注册
Sehr.LogOn.Reguest = function () {

    window.location.href = '/User/XmanRegister';
}

//重置
Sehr.LogOn.Reset = function () {
    $("#txtIdNo").val("");
    $("#txtcheckname").val("");
    $("#txtPass").val("");
    $("#txtValidate").val("");
}
//提交登录
Sehr.LogOn.Submit = function (returnUrl) {

    //密码登录
    if ($("#logintype").val() == undefined || $("#logintype").val() == "1") {
        if ($.trim($("#txtIdNo").val()) == "") {
            alert("身份证号不能为空，请输入身份证号！");
            $("#txtIdNo").focus();
            return;
        }

            //else if ($("#p_name").css("display") == "block") {
            //    if ($.trim($("#txtcheckname").val()) == "") {
            //        alert("姓名不能为空，请输入姓名！");
            //        $("#txtcheckname").focus();
            //        return;
            //    }
        //}
        else if ($.trim($("#txtPass").val()) == "") {
            alert("密码不能为空，请输入密码！");
            $("#txtPass").focus();
            return;
        }
        /*
        else if ($.trim($("#txtTelNo").val()) == "") {
            alert("手机号码不能为空，请输入手机号码！");
            $("#txtTelNo").focus();
            return;
        }
        // 暂时屏蔽校验码

        else if ($.trim($("#txtValidate").val()) == "") {
            alert("验证码不能为空，请输入验证码！");
            $("#txtValidate").focus();
            return;
        }*/

        //var id_no = Convert15to18($("#txtIdNo").val());
        var id_no = $("#txtIdNo").val();
        $.ajax({
            cache: false,
            async: false,
            type: "POST",
            url: "/User/LogOnPostByIdNo",
            dataType: "json",
            data: { idno: encodeURIComponent(id_no), pass: encodeURIComponent($("#txtPass").val()), telephone: encodeURIComponent($("#txtTelNo").val()), validate: encodeURIComponent($("#txtValidate").val()) },
            success: function (json) {
                if (json && json.ErrorStr) {
                    if (json.ErrorStr == 'Authorization') {
                        window.location.href = "/Index/Authorizations";
                        return;
                    }
                    alert(json.ErrorStr);
                    if (json.ErrorStr == '请输入姓名！') {
                        $("#p_name").show();
                        return;
                    }
                }
                else {
                    if ($.trim(returnUrl) == "" || returnUrl == null) {
                        returnUrl = "/Index";
                    }
                    window.location.href = returnUrl;
                }
            },
            error: function (res) {
                var  aaa='';
            }
        });
    } else {
        //短信登录

    }
}
//母版页提交登录
Sehr.LogOn.SubmitMaster = function (returnUrl) {
    //密码登录
    if ($("#logintype").val() == undefined || $("#logintype").val() == "1") {
        if ($.trim($("#mtxtIdNo").val()) == "") {
            alert("身份证号不能为空，请输入身份证号！");
            $("#mtxtIdNo").focus();
            return;
        } else if ($("#mp_name").css("display") == "block") {
            if ($.trim($("#mtxtcheckname").val()) == "") {
                alert("姓名不能为空，请输入姓名！");
                $("#mtxtcheckname").focus();
                return;
            }
        }
        else if ($.trim($("#mtxtPass").val()) == "") {
            alert("密码不能为空，请输入密码！");
            $("#mtxtPass").focus();
            return;
        }
        else if ($.trim($("#mtxtValidate").val()) == "") {
            alert("验证码不能为空，请输入验证码！");
            $("#mtxtValidate").focus();
            return;
        }
        var id_no = Convert15to18($("#mtxtIdNo").val());
        $.ajax({
            cache: false,
            async: false,
            type: "POST",
            url: "/User/LogOnPostByIdNo",
            dataType: "json",
            data: { idno: encodeURIComponent(id_no), pass: encodeURIComponent($("#mtxtPass").val()), validate: encodeURIComponent($("#mtxtValidate").val()), username: encodeURIComponent($("#mtxtcheckname").val()) },
            success: function (json) {
                if (json && json.ErrorStr) {
                    if (json.ErrorStr == 'Authorization') {
                        window.location.href = "/Index/Authorizations";
                        return;
                    }
                    alert(json.ErrorStr);
                    if (json.ErrorStr == '请输入姓名！') {
                        $("#mp_name").show();
                        return;
                    }
                }
                else {
                    if ($.trim(returnUrl) == "" || returnUrl == null) {
                        returnUrl = "/Index";
                    }
                    window.location.href = returnUrl;
                }
            }
        });
    }
}
//提交专家登录
Sehr.LogOn.OrgUserSubmit = function (returnUrl) {
    if ($.trim($("#orgusercodeli").val()) == "") {
        alert("用户名不能为空，请输入用户名！");
        $("#orgusercodeli").focus();
        return;
    }
    if ($.trim($("#orguserpasswordli").val()) == "") {
        alert("密码不能为空，请输入密码！");
        $("#orguserpasswordli").focus();
        return;
    }
    if ($.trim($("#orguservalidateli").val()) == "") {
        alert("验证码不能为空，请输入验证码！");
        $("#orguservalidateli").focus();
        return;
    }
    var data = "orgusercode={0}&orguserpassword={1}&orguservalidate={2}".format($("#orgusercodeli").val(), $("#orguserpasswordli").val(), $("#orguservalidateli").val());
    $.ajax({
        cache: false,
        async: false,
        type: "POST",
        url: "/HealthForum/OrgUserLogOn",
        dataType: "json",
        data: data,
        success: function (json) {
            if (json && json.ErrorStr) {
                alert(json.ErrorStr);
            }
            else {
                if (returnUrl == "" || returnUrl == null) {
                    returnUrl = "/HealthForum/HealthForumIndex";
                }
                window.location.href = returnUrl;
            }
        },
        error: function (res) {

        }
    });
}

function Convert15to18(idCard) {

    var code = idCard;//获得身份证号码
    if (code.length == 15)//如果是15位则转换
    {
        var strJY = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        var intJQ = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
        var strTemp;
        var intTemp = 0;
        strTemp = code.substring(0, 6) + "19" + code.substring(6);
        for (var i = 0; i <= strTemp.length - 1; i++) {
            intTemp = intTemp + strTemp.substring(i, 1) * intJQ[i];
        }
        intTemp = intTemp % 11;
        return strTemp + strJY[intTemp];
    }
    else {
        if (code.length == 18)//如果是18位直接返回
        {

            return code;
        }
        return null;//如果即不是15位也不是18位则返回空
    }
}
//专家登录重置
Sehr.LogOn.OrgUserReset = function () {
    $("#orgusercodeli").val("");;
    $("#orguserpasswordli").val("");
    $("#orguservalidateli").val("");
}
//获取短信验证码

Sehr.LogOn.GetCheckNo = function () {

    var me = this;
    var id_no = $("#txtIdNo").val();
    var telephone = $("#txtTelNo").val();
    var password = $("#txtPass").val();

    if ($.trim(id_no) == "") {
        alert("身份证号不能为空!");
        return;
    }
    else if ($.trim(password) == "")
    {
        alert("密码不能为空!");
        return;
    }
    else if ($.trim(telephone) == "") {
        alert("手机号码不能为空!");
        return;
    }

    //手机号码正确性验证
    //var reg = /^((\(\d{2,3}\))|(\d{3}\-))?(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    //if (!reg.test($("#XmanRegister_telephone").val())) {
    //    alert("手机号格式不正确，请重新输入手机号！");
    //    $("#XmanRegister_telephone").focus();
    //    return;
    //}
    $.ajax({
        url: "/User/GetCheckNoByLogOn?" + new Date(),
        data: { ID_NO: id_no, TELEPHONE: telephone, PASSWORD: password },
        success: function (result) {
            var data = jQuery.parseJSON(result);
            if (data.type == "0" || data.type == "2") {
                alert(data.msg);
                me.telephoneNow = telephone;
                var btn = $("#btnvalidatecode");
                //btn.attr("disabled", true);
                var i = 60;
                var resend = window.setInterval(function () {
                    if (i != 0) {
                        btn.val(i + "秒");
                        btn.attr("disabled", true);
                        //btn.val("获取" + _time).css("color", "gray");

                        i--;
                    }
                    else {
                        btn.attr("disabled", false);
                        btn.val("获取");
                        //btn.val(" 获 取 ").css("color", "white");
                        window.clearInterval(resend);
                    }
                    //if (_time != 0) {
                    //    $("#btnvalidatecode").attr("disabled", true);
                    //    $("#btnvalidatecode").val("获取" + _time).css("color", "gray");
                    //    _time--;
                    //}
                    //else {
                    //    $("#btnvalidatecode").attr("disabled", false);
                    //    $("#btnvalidatecode").val(" 获 取 ").css("color", "white");
                    //    clearInterval(setin);
                    //}
                }, 1000);
            }

        }
    });
}


//短信验证码登录
Sehr.LogOn.telSubmit = function (returnUrl) {
    if ($.trim($("#txtIdNo").val()) == "") {
        alert("身份证号不能为空，请输入身份证号！");
        $("#txtIdNo").focus();
        return;
    } else if ($.trim($("#telNo").val()) == "") {
        alert("手机号不能为空，请输入手机号！");
        $("#telNo").focus();
        return;
    }
    //手机号码正确性验证
    var reg = /^((\(\d{2,3}\))|(\d{3}\-))?(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|2|3|5|6|7|8|9])\d{8}$/;
    if (!reg.test($("#telNo").val())) {
        alert("手机号格式不正确，请重新输入手机号！");
        $("#telNo").focus();
        return;
    }
    //验证码
    if ($.trim($("#txtDxYzm").val()) == "") {
        alert("短信验证码不能为空，请输入短信验证码！");
        $("#txtDxYzm").focus();
        return;
    }
    $.ajax({
        type: "POST",
        url: "/User/LogOnPostByIdNoTel",
        dataType: "json",
        data: {
            idno: encodeURIComponent($("#txtIdNo").val()), dxyzm: encodeURIComponent($("#telNo").val()),
            username: encodeURIComponent($("#txtcheckname").val()), yzm: encodeURIComponent($("#txtDxYzm").val())
        },
        success: function (json) {
            if (json && json.ErrorStr) {
                if (json.ErrorStr == 'Authorization') {
                    window.location.href = "/MyHealth/Authorization";
                    return;
                }
                alert(json.ErrorStr);
                if (json.ErrorStr == '请输入姓名！') {
                    $("#p_name").show();
                    return;
                }
                return;
            } else if (json.ErrorStr == '') {
                if (returnUrl == "" || returnUrl == null) {
                    returnUrl = "/Index";
                }
                window.location.href = returnUrl;
            }
        },
        error: function (res) {

        }
    });
}
//Logon1快捷登录
Sehr.LogOn.First = function (idno, pass) {
    $.ajax({
        cache: false,
        async: false,
        type: "POST",
        url: "/User/LogOnPostByIdNo",
        dataType: "json",
        data: { idno: encodeURIComponent(idno), pass: encodeURIComponent(pass), kjdl: true },
        success: function (json) {
            if (json && json.ErrorStr) {
                if (json.ErrorStr == 'Authorization') {
                    window.location.href = "/Index/Authorizations";
                    return;
                }
            }
            else {
                window.location.href = '/MyHealth/MyHealthIndex';
            }
        },
        error: function (res) {

        }
    });
}
//专家修改密码重置
Sehr.LogOn.OrgUserChangeReset = function () {
    $("#newpasstext").val("");;
    $("#comfirmpasstext").val("");
}