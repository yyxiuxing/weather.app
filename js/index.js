//获取所有的城市
let citys,weatherobj;

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
		citys=obj.data;
		//console.log(citys)
		for(let i in citys){
			let section=document.createElement('section');
			let citys_title=document.createElement('h1');
			citys_title.className="citys_title";
			citys_title.innerHTML=i;
			section.appendChild(citys_title);
			for(let j in citys[i]){
				let citys_list =document.createElement('ul');
				citys_list.className="citys_list";
				let li =document.createElement('li');
				li.innerHTML=j;
				citys_list.appendChild(li);
				section.appendChild(citys_list);
			}
			$(".citys_box").append(section);
		}
	}
})
$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
	getFullWeather(remote_ip_info.city);

	});
// 获取当前城市所有天气信息
function getFullWeather(nowcity){
	$(".now_city").html(nowcity);
	// 获取当前城市天气信息
	$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
	dataType:"jsonp",
	success:function(obj){
		weatherobj=obj.data;
		//console.log(weatherobj);
		//当前空气质量
		$(".now_air_quality").html(weatherobj.weather.quality_level);
		// 当前气温
		$(".now_temp_temp").html(weatherobj.weather.current_temperature);
		//当前天气
		$(".now_weather").html(weatherobj.weather.current_condition);
		//当前风向
		$(".wind").html(weatherobj.weather.wind_direction);
		//当前风级
		$(".jiji").html(weatherobj.weather.wind_level+"级");
		//近期两天
		//今天的温度
		
		$(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
		$(".tody_temp_min").html(weatherobj.weather.dat_low_temperature);
		$(".today_weather").html(weatherobj.weather.dat_condition);
		$(".tody_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");
		//明天的温度
		$(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
		$(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
		$(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);
		$(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");
		//未来24小时天气信息
		
		//
		let hours_array =weatherobj.weather.hourly_forecast;
		for(let i = 0;i<hours_array.length;i++){
			//创建元素并添加到页面中
			let hours_list = document.createElement('li');
			let hours_time = document.createElement('span');
			hours_time.className='hours_time';
			let hours_img =document.createElement('img');
			hours_img.className='hours_img';
			let hours_temp =document.createElement('span');
			hours_temp.className='hours_temp';
			//将标签添加到li中
			hours_list.appendChild(hours_time);
			hours_list.appendChild(hours_img);
			hours_list.appendChild(hours_temp);
			//将li添加到ul中
			$('.hours_content').append(hours_list);
			
			//console.log(hours_array);
			hours_time.innerHTML =hours_array[i].hour+":00";
			hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
			hours_temp.innerHTML= hours_array[i].temperature+"°";
		}
		//近16天的天气预报
		let recent_array=weatherobj.weather.forecast_list;
		for(let i = 0;i<recent_array.length;i++){
		let weeks_list=document.createElement('li');
		
		let weeks_time = document.createElement('span');
			weeks_time.className='weeks_time';
		let weeks_weather = document.createElement('span');
			weeks_weather.className='weeks_weather';
		let weeks_img =document.createElement('img');
			weeks_img.className='weeks_img';
		let weeks_temp_max = document.createElement('span');
			weeks_temp_max.className='weeks_temp_max';
		let weeks_temp_min = document.createElement('span');
			weeks_temp_min.className='weeks_temp_min';

		let weeks_wind = document.createElement('span');
			weeks_wind.className='weeks_wind';
		let weeks_windji = document.createElement('span');
			weeks_windji.className='weeks_windji';
		weeks_list.appendChild(weeks_time);
		weeks_list.appendChild(weeks_weather);
		weeks_list.appendChild(weeks_img);
		weeks_list.appendChild(weeks_temp_max);
		weeks_list.appendChild(weeks_temp_min);
		weeks_list.appendChild(weeks_wind);
		weeks_list.appendChild(weeks_windji);
		$('.weeks_content').append(weeks_list);
		//console.log(recent_array);
		
		weeks_time.innerHTML = recent_array[i].date.substring(5,7)+"/"+recent_array[i].date.substring(8);
		weeks_weather.innerHTML =recent_array[i].condition;
		weeks_img.setAttribute('src',"img/"+recent_array[i].weather_icon_id+".png");
		weeks_temp_max.innerHTML =recent_array[i].high_temperature+"°";
		weeks_temp_min.innerHTML =recent_array[i].low_temperature+"°";
		weeks_wind.innerHTML =recent_array[i].wind_direction;
		weeks_windji.innerHTML =recent_array[i].wind_level+"级";
		}



	}
})
$(function(){

	$(".now_city").on("click",function(){
		$(".search").val("");
		$(".confirm").html('取消');
		$(".citys").css("display","block");//display作用元素竖排，设宽高，显示隐藏
	})
	//$(".city_list li").on("click",function(){
	//	let son = this.innerHTML;
	//	getFullWeather(son);
	//	$(".citys").css("display","none");
		
	//})
	//事件委派
		 $("body").delegate(".citys_list li","click",function(){
	 	let son = this.innerHTML;
	 	getFullWeather(son);
	 	$(".citys").css("display","none");
	 	})


		$("body").delegate(".citys_title","click",function(){
			let son = this.innerHTML;
			getFullWeather(son);
			$(".citys").css("display","none");
		})

		$(".search").on("focus",function(){
			$(".confirm").html('确认');
		})

		$(".confirm").on("click",function(){
				if(this.innerText=="取消"){
					$(".citys").css("display","none");
				}else if(this.innerText=="确认"){
					let text = $(".search").val();
					//console.log(text);
					for(let i in citys){
						if(text==i){
							getFullWeather(text);
							$(".citys").css("display","none");
							return;
						}else {
							for(let j in citys[i]){
								if(text==j){
									getFullWeather(text);
									$(".citys").css("display","none");
									return;	
								}
							}
						}
					}
					alert("输入地区有误");
					$(".search").val("");
					$(".confirm").html('取消');
				}
			})
		
	})
}
	




// 	if($(".confirm").html()=="取消"){
// 	$(".confirm").on("click",function(){
// 			$(".citys").css("display","none");
// 	})
// 	}


// 	$(".search").on("focus",function(){
// 		$(".confirm").html('确认');
// 		if($(".confirm").html()=="确认"){
// 			$(".confirm").on("click",function(){
// 				let text =$(".search").val();
// 				//console.log(text);
// 				for(let i in citys){
// 					if(text==i){
// 						getFullWeather(text);
// 						$(".citys").css("display","none");
// 						return;
// 					}else{
// 						for(let j in citys[i]){
// 							if(text==j){
// 								getFullWeather(text);
// 								$(".citys").css("display","none");
// 								return;
// 							}else{
// 								alert('输入城市有误');
// 								return;
// 							}
// 						}
// 					}
// 				}
// 			})
// 		}

// 	})
// 	$(".search").on("blur",function(){
// 		$(".confirm").html('取消');
// 	})


 //})
// //window.onload =function(){}
// }