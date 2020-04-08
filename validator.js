/**
 * VType数据格式校验 kongyj
 * 
 * 日期范围：daterange 
 * 两次输入的密码是否一致：password 
 * 中文校验：chinese 
 * 年龄校验：age 
 * 最小值输入校验:min
 * 整数输入校验：integer 
 * 正整数输入校验：positiveNum 
 * 最小长度输入校验：minlength 
 * 最大长度输入校验：maxlength
 * IP地址输入校验：ip 
 * 手机号码输入校验：mobilePhone 
 * 电话(包括固定电话和手机号码)输入校验：phone 
 * 固定电话校验：telePhone
 * 电子邮箱输入校验：email 
 * 浮点数/小数输入校验：isFloat 
 * 英文字母输入校验：alpha 
 * 字母和数字输入校验：engAndNum
 * 邮政编码输入校验：postCode 
 * 身份证号码输入校验：IDCard 
 * 组织机构代码输入校验：adjustOrgNo 
 * 统一信用代码输入校验：uniteCreditNo 
 * 营业执照号码输入校验：codeXy
 * 银行账号输入校验：bankNo 
 * 银行账号校验：accountNo 
 * 电话号码模糊查询校验：partPhone 
 * 非负浮点数：positiveFloat
 * 验证备注信息的长度:chkRemarkLen
 */

/**
 * 校验银行账号的合法性
 * 
 * @param {}
 *            sCardNum
 * @return {}
 */
function luhnCheckSum(sCardNum) {
	var iOddSum = 0;
	var iEvenSum = 0;
	var bIsOdd = true;
	for (var i = sCardNum.length - 1; i >= 0; i--) {
		// alert("length="+sCardNum.length);
		// alert("sCardNum.char("+i+")="+sCardNum.charAt(i));
		var iNum = parseInt(sCardNum.charAt(i));
		if (bIsOdd) {
			// 反向奇数求和
			iOddSum += iNum;
		} else {
			// 偶数
			if (iNum > 9) {
				iNum = eval(iNum.toString().split("").join("+"));
			}
			iEvenSum += iNum;
		}
		bIsOdd = !bIsOdd;
	}
	return ((iEvenSum + iOddSum) % 10 == 0);
};

Ext.apply(Ext.form.VTypes, {

	// 日期范围校验(起始日期应当小于结束日期)
	daterange : function(val, field) {
		var date = field.parseDate(val);
		var dispUpd = function(picker) {
			var ad = picker.activeDate;
			picker.activeDate = null;
			picker.update(ad);
		};

		if (field.startDateField) {
			var sd = Ext.getCmp(field.startDateField);
			sd.maxValue = date;
			if (sd.menu && sd.menu.picker) {
				sd.menu.picker.maxDate = date;
				dispUpd(sd.menu.picker);
			}
		} else if (field.endDateField) {
			var ed = Ext.getCmp(field.endDateField);
			ed.minValue = date;
			if (ed.menu && ed.menu.picker) {
				ed.menu.picker.minDate = date;
				dispUpd(ed.menu.picker);
			}
		}
		return true;
	},
	daterangeText : '选择的开始日期不能大于结束日期',

	// 日期范围校验

//	daterange : function(val, field) {
//		var date = field.parseDate(val);
//		if (!date) {
//			return;
//		}
//		if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
//			var start = Ext.getCmp(field.startDateField);
//			start.setMaxValue(date);
//			start.validate();
//			this.dateRangeMax = date;
//		} else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
//			var end = Ext.getCmp(field.endDateField);
//			end.setMinValue(date);
//			end.validate();
//			this.dateRangeMin = date;
//		}
//		return true;
//	},
//	daterangeText : '选择的开始日期不能大于结束日期',
	
//	daterange : function(val, field) {
//        var date = field.parseDate(val);
//        if(!date){
//            return false;
//        }
//        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
//           this.dateRangeMax = date;
//            var start = Ext.getCmp(field.startDateField);
//            start.setMaxValue(date);
//            start.validate();
//        }
//        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
//            this.dateRangeMin = date;
//            var end = Ext.getCmp(field.endDateField);
//            end.setMinValue(date);
//            end.validate();
//         }
//         return true;
//    },
//    daterangeText : '开始日期不能大于结束日期',

//	daterange : function(val, field) {  
//	    if(field.dateRange){
//	        var beginId = field.dateRange.begin;  
//	        this.beginField = Ext.getCmp(beginId);  
//	        var endId = field.dateRange.end;  
//	        this.endField = Ext.getCmp(endId);  
//	        var beginDate = this.beginField.getValue();  
//	        var endDate = this.endField.getValue();  
//	    }
//	    if(beginDate <= endDate){  
//	        return true;  
//	    }else{  
//	        return false;  
//	    }  
//	},  
//	//验证提示信息  
//	daterangeText : '开始日期不能大于结束日期',

//	daterange : function(complaintEndDate,field){
//		// 日期比较函数
//		function dateCompar(dateOne,dateTwo){
//			//如果开始和结束时间都不为空，进行比较 
//			if(Ext.util.Format.trim(dateOne).length > 0  && Ext.util.Format.trim(dateTwo).length > 0){ 
//				dateOne = dateOne.replace(/-/g,"/"); 
//				dateTwo = dateTwo.replace(/-/g,"/"); 
//			if(Date.parse(dateOne) > Date.parse(dateTwo)){
//				return false; 
//			}else{
//				return true; 
//			}
//			}else{
//				return true; 
//			}
//		};
//		if(field.confirmTo){//要比较的另外一个组件，如果存在进行比较 
//			var complaintBeginDate = Ext.get(field.confirmTo).getValue();//得到比较组件 
//			return dateCompar(complaintBeginDate,complaintEndDate); 
//		};
//	},
//	daterangeText : '开始日期不能大于结束日期！',


	// 两次密码是否输入一致
	password : function(val, field) {
		if (field.initialPassField) {
			var pwd = Ext.getCmp(field.initialPassField);
			return (val == pwd.getValue());
		}
		return true;
	},
	passwordText : '两次输入的密码不一致',

	// 中文校验
	chinese : function(val, field) {
		var reg = /[\u4e00-\u9fa5]/;
		if (!reg.test(val)) {
			return false;
		}
		return true;
	},
	chineseText : '请输入中文',

	// 年龄校验
	age : function(val, field) {
		try {
			if (parseInt(val) >= 18 && parseInt(val) <= 100)
				return true;
			return false;
		} catch (err) {
			return false;
		}
	},
	ageText : '请输入正确的年龄',

	// 最小值输入校验
	min : function(val, field) {
		try {
			if (parseFloat(val) >= parseFloat(field.min))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	minText : '输入值小于最小值',

	// 整数输入校验,包含负数，可能带(+/-)号
	integer : function(val, field) {
		try {
			if (/^-?[0-9]\d*$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	integerText : '请输入正确的整数',

	// 正整数校验
	positiveNum : function(val, field) {
		try {
			if (/^[0-9]\d*$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	positiveNumText : '请输入[0-9]的正整数',

	// 最小长度输入校验
	minlength : function(val, field) {
		try {
			if (val.length >= parseInt(field.minlen))
				return true;
			return false
		} catch (e) {
			return false;
		}
	},
	minlengthText : '长度过小！',

	// 最大长度输入校验
	maxlength : function(val, field) {
		try {
			if (val.length <= parseInt(field.maxlen))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	maxlengthText : '长度过大',

	// IP地址输入校验
	ip : function(val, field) {
		try {
			if ((/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
					.test(val)))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	ipText : '请输入正确的IP地址！',

	// 手机号码校验
	mobilePhone : function(val, field) {
		// var mobileReg = new RegExp("^1\\d{10}$");
		/*try {
			if (/^1[3458]\d{9}$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}*/
		try {
			if (/^1\d{10}$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	mobilePhoneText : '请输入正确的手机号码',

	// 电话校验(包括固定电话和手机号码)
	phone : function(val, field) {
		// 固定电话校验:/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
		// 手机号码校验：/^1[3458]\d{9}$/
		// var phoneReg = new
		// RegExp("((^(\\d{3}\\-\\d{8}|\\d{4}\\-\\d{7}|\\d{7,8}){1}(\\-\\d+)*$)|(^\\d{11}$))");
		// var phoneReg = new
		// RegExp("((^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$))");
		// var mobileReg = new RegExp("^1\\d{10}$");
		/*try {
			if (/^((0\d{2,3})(-)?)(\d{7,8})(-(\d{3,}))?$/.test(val)
					|| /^1[3458]\d{9}$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}*/
		try {
			if (/^((0\d{2,3})(-)?)(\d{7,8})(-(\d{3,}))?$/.test(val)
					|| /^1\d{10}$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
//	phoneText : '请输入正确的电话号码',
	phoneText : '请输入正确的联系电话，固定电话须加区号！',

	// 固定电话校验
	telePhone : function(val, field) {
		// var phoneReg = new
		// RegExp("((^(\\d{3}\\-\\d{8}|\\d{4}\\-\\d{7}|\\d{7,8}){1}(\\-\\d+)*$)|(^\\d{11}$))");
		try {
			if (/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	telePhoneText : '请输入正确的固定电话',

	// 电子邮箱校验
	email : function(val, field) {
		try {
			if (/^([A-Za-z0-9])(\w)+@(\w)+(\.)(com|com\.cn|net|cn|net\.cn|org|biz|info|gov|gov\.cn|edu|edu\.cn)/
					.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	emailText : '请输入正确的电子邮箱地址',

	// 浮点数/小数输入校验
	isFloat : function(val, field) {
		try {
			if (/^[-\+]?\d+(\.\d+)?$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	isFloatText : '请输入正确的小数',

	// 英文字母输入校验
	alpha : function(val, field) {
		try {
			if (/^[a-zA-Z]+$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	alphaText : '请输入英文字母',

	// 字母，数字输入校验
	engAndNum : function(val, field) {
		try {
			if (/^[a-zA-Z0-9]+$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	engAndNumText : '只能输入英文字母和数字',

	// 邮政编码校验
	postCode : function(val, field) {
		try {
			if (/^[1-9]\d{5}(?!\d)$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	postCodeText : '请输入正确的邮政编码',

	// 身份证号码校验
	IDCard : function(val, field) {
		// return /(^[0-9]{17}([0-9]|[Xx])$)|(^[0-9]{17}$)/.test(_v);
		var area = {
			11 : "北京",
			12 : "天津",
			13 : "河北",
			14 : "山西",
			15 : "内蒙古",
			21 : "辽宁",
			22 : "吉林",
			23 : "黑龙江",
			31 : "上海",
			32 : "江苏",
			33 : "浙江",
			34 : "安徽",
			35 : "福建",
			36 : "江西",
			37 : "山东",
			41 : "河南",
			42 : "湖北",
			43 : "湖南",
			44 : "广东",
			45 : "广西",
			46 : "海南",
			50 : "重庆",
			51 : "四川",
			52 : "贵州",
			53 : "云南",
			54 : "西藏",
			61 : "陕西",
			62 : "甘肃",
			63 : "青海",
			64 : "宁夏",
			65 : "新疆",
			71 : "台湾",
			81 : "香港",
			82 : "澳门",
			91 : "国外"
		}
		var Y, JYM;
		var S, M;
		var idcard_array = new Array();
		idcard_array = val.split("");
		// 地区检验
		if (area[parseInt(val.substr(0, 2))] == null) {
			this.IDCardText = "身份证号码地区非法！";
			return false;
		}
		// 身份号码位数及格式检验
		switch (val.length) {
			case 15 :
				if ((parseInt(val.substr(6, 2)) + 1900) % 4 == 0
						|| ((parseInt(val.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(val
								.substr(6, 2)) + 1900)
								% 4 == 0)) {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
				} else {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
				}
				if (ereg.test(val))
					return true;
				else {
					this.IDCardText = "身份证号码出生日期超出范围！";
					return false;
				}
				break;
			case 18 :
				// 18位身份号码检测
				// 出生日期的合法性检查
				// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
				// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
				if (parseInt(val.substr(6, 4)) % 4 == 0
						|| (parseInt(val.substr(6, 4)) % 100 == 0 && parseInt(val
								.substr(6, 4))
								% 4 == 0)) {
					//ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
					ereg = /^[1-9][0-9]{5}(19|2[0-9])[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
				} else {
					//ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
					ereg = /^[1-9][0-9]{5}(19|2[0-9])[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
				}
				if (ereg.test(val)) {// 测试出生日期的合法性
					// 计算校验位
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
							* 7
							+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
							* 9
							+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
							* 10
							+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
							* 5
							+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
							* 8
							+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
							* 4
							+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
							* 2
							+ parseInt(idcard_array[7])
							* 1
							+ parseInt(idcard_array[8])
							* 6
							+ parseInt(idcard_array[9]) * 3;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y, 1);// 判断校验位
					// alert(idcard_array[17]);
					if (M == idcard_array[17]) {
						return true; // 检测ID的校验位
					} else {
						// this.IDCardText = "身份证号码末位校验位校验出错,请注意X的大小写";
//						this.IDCardText = "身份证号码末位校验位校验出错！";
						this.IDCardText = "身份证号码末位校验出错！";
						return false;
					}
				} else {
					this.IDCardText = "身份证号码出生日期超出范围！";
					return false;
				}
				break;
			default :
				this.IDCardText = "身份证号码位数有误,应该为15位或18位！";
				return false;
				break;
		}
	},
	IDCardText : "请输入正确的身份证号码！",
	IDCardMask : /[0-9xX]/i,

	// 组织机构代码校验
	adjustOrgNo : function(val, field) {
		var Errors = new Array("组织机构代码长度小于9，请重新输入！", "请输入正确的组织机构代码！");
		var orgNo = val;
		if (orgNo.length < 9) {
			this.adjustOrgNoText = Errors[0];
			return false;
		}

		var org_str = new Array();
		var k = 0;
		while (k < orgNo.length) {
			org_str[k] = orgNo.charCodeAt(k);
			k = k + 1;
		}
		var out_org = new Array(20);
		var w_i = [3, 7, 9, 10, 5, 8, 4, 2];
		var c_i = new Array(10);
		var i, j, c, s = 0;
		var fir_value, sec_value;
		if (org_str[8] != 45) { // 第9位必须是“-”号，否则不合法
			this.adjustOrgNoText = Errors[1];
			return false;
		}
		for (i = 0; i < 10; i++) {// 含有小写英文字母，不合法
			c = org_str[i];
			if (c <= 122 && c >= 97) {
				this.adjustOrgNoText = Errors[1];
				return false;
			}
			out_org[i] = c;
		}
		fir_value = org_str[0];
		sec_value = org_str[1];
		if (fir_value >= 65 && fir_value <= 90) {// 第一位含有大写英文字母，转换
			c_i[0] = (fir_value + 32) - 87;
		} else if (fir_value >= 48 && fir_value <= 57) {// 第一位在0-9范围内，
			c_i[0] = fir_value - 48;
		} else {// 第一位不是大写的英文字母 也不是数字 不合法
			this.adjustOrgNoText = Errors[1];
			return false;
		}
		s += w_i[0] * c_i[0];
		if (sec_value >= 65 && sec_value <= 90) {
			c_i[1] = (sec_value - 65) + 10;
		} else if (sec_value >= 48 && sec_value <= 57) {
			c_i[1] = sec_value - 48;
		} else {
			this.adjustOrgNoText = Errors[1];
			return false;
		}
		s += w_i[1] * c_i[1];
		for (j = 2; j < 8; j++) {
			if (org_str[j] < 48 || org_str[j] > 57) {
				this.adjustOrgNoText = Errors[1];
				return false;
			}
			c_i[j] = org_str[j] - 48;
			s += w_i[j] * c_i[j];
		}
		c = 11 - s % 11;
		out_org[9] = c + 48;
		if (c == 10)
			out_org[9] = 88;
		if (c == 11)
			out_org[9] = 48;
		if (org_str[9] == 88 && c == 10 || c == 11 && org_str[9] == 48
				|| c == org_str[9] - 48) {
			return true; // 校验通过
		} else {
			this.adjustOrgNoText = Errors[1];
			return false; // 校验未通过
		}
	},
	adjustOrgNoText : '请输入正确的组织机构代码',

	//统一信用代码
    uniteCreditNo : function(val, field){
        switch (val.length) {
            case 18:
                var patrn = /^[0-9A-Z]+$/;
				// 18位校验及大写校验
				if ((val.length != 18) || (patrn.test(val) == false)) {
					return false;
				} else {
					var Ancode;// 统一社会信用代码的每一个值
					var Ancodevalue;// 统一社会信用代码每一个值的权重
					var total = 0;
					var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29,25, 13, 8, 24, 10, 30, 28];// 加权因子
					var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
					// 不用I、O、S、V、Z
					for (var i = 0; i < val.length - 1; i++) {
						Ancode = val.substring(i, i + 1);
						Ancodevalue = str.indexOf(Ancode);
						total = total + Ancodevalue * weightedfactors[i];
						// 权重与加权因子相乘之和
					}
					var logiccheckcode = 31 - total % 31;

					if (logiccheckcode == 31) {
						logiccheckcode = 0;
					}
					var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
					var Array_Str = Str.split(',');
					logiccheckcode = Array_Str[logiccheckcode];

					var checkcode = val.substring(17, 18);
					if (logiccheckcode != checkcode) {
						return false;
					} else {
						return true;
					}
				}
            default:
                return false;
        }
    },
    uniteCreditNoText: '请输入正确的统一信用代码',

	// 营业执照号码校验
	codeXy : function(val, field) {
		var Errors = new Array("请输入正确的营业执照号码", "");
		var no = String(val); // 将营业执照号码转换成String类型
		var reg = new RegExp("\d{15}");
		if (reg.test(no)) {
			this.codeXyText = Errors[0];
			return false;
		}
		var m, n, s, p, i;
		var value;
		var p = 10;
		var m = 10;
		var n = 11;
		for (var i = 1; i <= 14; i++) {
			value = no.substr(i - 1, 1);
			s = Number(value);
			p = p + s;
			p = p % m;
			if (p == 0) {
				p = m;
			}
			p = p * 2;
			p = p % n;
		}
		value = no.substr(14, 1);
		p = p + Number(value);
		p = p % m;
		if (p == 1) {
			return true;
		} else {
			var check = new RegExp('^\\d{6}(n|N)([a-z]|[0-9]|[A-Z]){1}\\d{6}(x|X)$');
			if (check.test(no)) {
				return true;
			}
			check = new RegExp('^([0-9]|[a-z]){13}$');
			if (check.test(no)) {
				return true;
			}
			this.codeXyText = Errors[0];
			return false;
		}
	},
	codeXyText : '请输入正确的营业执照号码',

	// 银行账号验证
	bankNo : function(val, field) {
		// var reg =/^([0-9\-]\d)*$/;
		var reg = /^\d+(\d*[\-\－\-\－]*\d*)+\d+$/;
		try {
			if (reg.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	bankNoText : '请输入正确的银行账号',

	// 银行账号校验
	accountNo : function(val, field) {
		var reMasterCard = /^(5[1-5]\d{2})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-](\d{4})$/;
		try {
			if (reMasterCard.test(val)) {
				var sCardNum = RegExp.$1 + RegExp.$2 + RegExp.$3 + RegExp.$4;

				var iOddSum = 0;
				var iEvenSum = 0;
				var bIsOdd = true;
				for (var i = sCardNum.length - 1; i >= 0; i--) {
					// alert("length="+sCardNum.length);
					// alert("sCardNum.char("+i+")="+sCardNum.charAt(i));
					var iNum = parseInt(sCardNum.charAt(i));
					if (bIsOdd) {
						// 反向奇数求和
						iOddSum += iNum;
					} else {
						// 偶数
						if (iNum > 9) {
							iNum = eval(iNum.toString().split("").join("+"));
						}
						iEvenSum += iNum;
					}
					bIsOdd = !bIsOdd;
				}
				return ((iEvenSum + iOddSum) % 10 == 0);
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	},
	accountNoText : '请输入正确的银行账号',

	// 电话号码模糊查询校验
	partPhone : function(val, field) {
		try {
			if (/^[0-9]\d*$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	partPhoneText : '请输入正整数',

	// 金额和比例校验
	positiveNumber : function(val, field) {
		try {
			if (/^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
					.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	positiveNumberText : '请输入非负和非零的数字！',

	// 金额和比例校验
	positiveFloat : function(val, field) {
		try {
//			if (/^\\d+(\\.\\d+)?$/.test(val))
			if (/^\d+(\.{0,1}\d+){0,1}$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	positiveFloatText : '请输入非负的整数或小数！',

	// 验证备注信息的长度
	chkRemarkLen : function(val, field) {
		try {
			var jmz = {};
			var realLength = 0, len = str.length, charCode = -1;
			for (var i = 0; i < len; i++) {
				charCode = str.charCodeAt(i);
				if (charCode >= 0 && charCode <= 128)
					realLength += 1;
				else
					realLength += 2;
			}
			if (realLength > 10) {
				return false;
			} else {
				return true;
			}
		} catch (e) {
			return false;
		}
	},
	chkRemarkLenText : '输入的备注信息的长度过长'

});