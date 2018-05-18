//点击查询
$('#but').click(function(){
	oIdentification();
})
//内容重置
function resetContent(){
	$("#identification").val("");
	$("#identification").removeClass("red-act");
	$(".verfication-right,.sequence-right,.sex-right,.address-right,.birthday-right").removeClass("red-act").html("");//内容置零
}
//点击重置重置
$("#reset").click(function(){
	resetContent()
});

//判断身份证号
function oIdentification(){
	$("#identification").focus(function(){
		if($("#identification").hasClass("red-act")){
			resetContent()
		}
	})
	var arr=[];
	arr.push($("#identification").val());
	var oString=arr.toString();
	console.log(oString)
	if(Number(oString) && oString.length==18 || oString.slice(17,18)=="X"){
		//地址判断
		oAddress();
		//生日判断
		oDate();
		//性别判断
		oSexend();
		//验证码
		oVerfication()
		//顺序码
		oSequence()
		
	}else if(!Number(oString)){
		$("#identification").addClass("red-act").val("请输入数字");
	}else if(oString.length!=18){
		$("#identification").addClass("red-act").val("请输入18位身份证号");
	}else{
		$("#identification").addClass("red-act").val("请输入正确的身份证号");
	}
}
//判断地址
function oAddress(){
	var arr=[];
	arr.push($("#identification").val());
	var oString=arr.toString();
	console.log(oString)
	var oProvince=oString.slice(0,2);//省

	if((10<oProvince && oProvince<16) || (20<oProvince && oProvince<24) || (40<oProvince && oProvince<47) || (49<oProvince && oProvince<55) || (60<oProvince && oProvince<67) || oProvince==71 || oProvince==81 || oProvince==91)
	{
		//省对的时候
		$(".address-right").removeClass("red-act").html(oAddress);
		var oCity=oString.slice(2,4);//市
		if(00<oCity && oCity<30){//市对的时候
			$(".address-right").removeClass("red-act").html(oAddress);
			var oCounty=oString.slice(4,6);//县
			if(00<oCounty && oCounty<90){//县对的时候
				var oAddress=oProvince+" 省 "+oCity+" 市 "+oCounty+" 县 ";
				$(".address-right").removeClass("red-act").html(oAddress);
			}else{//县错的时候
				$(".address-right").addClass("red-act").html("输入的身份证 5-6 位有误！");
			}
		}else{//市错的时候
			$(".address-right").addClass("red-act").html("输入的身份证 3-4 位有误！");
		}
	}else{//省错的时候
		$(".address-right").addClass("red-act").html("输入的身份证 1-2 位有误！");
	}
	
}

//判断生日
function oDate(){
	var arr=[];
	arr.push($("#identification").val());
	var oString=arr.toString();
	
	var oY=oString.slice(6,10);//生日-年
	var oM=oString.slice(10,12);//生日-月
	var oD=oString.slice(12,14);//生日-日
	//判断生日年份
	if(oY<1970 || oY>2017){
		$(".birthday-right").addClass("red-act").html("请输入1970--2017之间的年份");
		return;
	}
	//判断生日月份
	if(oM<0 || oM>12){
		$(".birthday-right").addClass("red-act").html("请输入正确的月份！")
		return;
	}
	//判断生日日期
	if(oD<1 || oD>31){
		alert("请输入正确的日期！")
		return;
	 }else{
		if(oM==1 || oM==3 || oM==5 || oM==7 || oM==8 || oM==10 || oM==12){
			if(oD<1 || oD>31){
				$(".birthday-right").addClass("red-act").html("请输入1--31之间的日期！");
				return;
			}
		}else if(oM==4 || oM==6 || oM==9 || oM==11){
			if(oD<1 || oD>30){
				$(".birthday-right").addClass("red-act").html("请输入1--30之间的日期！");
				return;
			}
		}else if(oM==2){
			if(oY%4==0 || oY%400==0){
				if(oD<1 || oD>29){
					$(".birthday-right").addClass("red-act").html("今年是闰年！请输入1--29之间的日期")
				}
			}else{
				if(oD<1 || oD>28){
					$(".birthday-right").addClass("red-act").html("今年是平年！请输入1--28之间的日期")
				}
			}
		}
	}
	var oBirthday=oY+" 年 "+oM+" 月 "+oD+" 日 ";
	console.log(oBirthday);
	$(".birthday-right").removeClass("red-act").html(oBirthday);
}

//判断性别
function oSexend(){
	var arr=[];
	arr.push($("#identification").val());
	var oString=arr.toString();
	var oSex=oString.slice(16,17);
	var oSexEnd;
	if(oSex%2==0){
		oSexEnd="女"
	}else{
		oSexEnd="男"
	}
	$(".sex-right").html(oSexEnd);
}

//顺序码
function oSequence(){
	var arr=[];
	arr.push($("#identification").val());
	var oString=arr.toString();
	var oPredestination=oString.slice(14,17);
	var oPredestination1=oString.slice(14,15);
	var oPredestination2=oString.slice(15,16);
	var oPredestination3=oString.slice(16,17);
	var oPredestinationSum;//人，数量
	var oPredestinationEnd;//内容
	if(oPredestination3%2!=0){//性别男时
		if(oPredestination1==0 && oPredestination2==0){
			oPredestinationSum=(Number(oPredestination3)+1)/2;
			oPredestinationEnd="故乡里有 "+'<span classs="predes_cl">'+oPredestinationSum+'</span>'+" 人与你同生";
		}else if(oPredestination1==0 && oPredestination2!=0){
			oPredestinationSum=(Number(oPredestination2+oPredestination3)+1)/2;
			oPredestinationEnd="故乡里有 "+'<span class="predes_cl">'+oPredestinationSum+'</span>'+" 人与你同生";
		}else if(oPredestination1!=0){
			oPredestinationSum=(Number(oPredestination)+1)/2;
			oPredestinationEnd="故乡里有 "+'<span class="predes_cl">'+oPredestinationSum+'</span>'+" 人与你同生";
		}
	}else{//性别女时
		if(oPredestination1==0 && oPredestination2==0){
			oPredestinationSum=(oPredestination3)/2;
			oPredestinationEnd="故乡里有 "+'<span class="predes_cl">'+oPredestinationSum+'</span>'+" 人与你同生";
		}else if(oPredestination1==0 && oPredestination2!=0){
			oPredestinationSum=(oPredestination2+oPredestination3)/2;
			oPredestinationEnd="故乡里有 "+'<span class="predes_cl">'+oPredestinationSum+'</span>'+" 人与你同生";
		}else if(oPredestination1!=0){
			oPredestinationSum=(oPredestination)/2;
			oPredestinationEnd="故乡里有 "+'<span class="predes_cl">'+oPredestinationSum+'</span>'+" 人与你同生";
		}
	}
	
	$(".sequence-right").html(oPredestinationEnd);//顺序码
}
//判断验证码
function oVerfication(){
	var arr=[];
	arr.push($("#identification").val());
	var oString=arr.toString();
	var oEnd=oString.slice(17,18);//验证码
	var oVerficationEnd;
	var oStringSum=Number(oString[0]*7)+Number(oString[1]*9)+Number(oString[2]*10)+Number(oString[3]*5)+Number(oString[4]*8)+
				   Number(oString[5]*4)+Number(oString[6]*2)+Number(oString[7]*1)+Number(oString[8]*6)+Number(oString[9]*3)+
				   Number(oString[10]*7)+Number(oString[11]*9)+Number(oString[12]*10)+Number(oString[13]*5)+Number(oString[14]*8)+
				   Number(oString[15]*4)+Number(oString[16]*2);
	var oRemainder=oStringSum%11;
	console.log(oRemainder)
	switch(oRemainder){
		case 0:oRemainder=1;
		break;
		case 1:oRemainder=0;
		break;
		case 2:oRemainder="X";
		break;
		case 3:oRemainder=9;
		break;
		case 4:oRemainder=8;
		break;
		case 5:oRemainder=7;
		break;
		case 6:oRemainder=6;
		break;
		case 7:oRemainder=5;
		break;
		case 8:oRemainder=4;
		break;
		case 9:oRemainder=3;
		break;
		case 10:oRemainder=2;
		break;
	}
	if(oString[17]!=oRemainder){
//		$("#identification").addClass("red-act").val("输入的号码有误！");
		$(".verfication-right").addClass("red-act").html("最后一位有问题（验证码）！")
	}else{
		$(".verfication-right").removeClass("red-act").html(oRemainder);//验证码
	}
	
}



/*
 * 注:
 * 1、暂定中国某个省最多29个市,最多89个县
 * 2、暂定所有顺序码默认从000开始
*/