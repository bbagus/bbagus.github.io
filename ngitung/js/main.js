
function startCalc(){
interval = setInterval("calc()",1);}
function calc(){
one = document.autoSumForm.meteran_awal.value;
two = document.autoSumForm.meteran_skr.value; 
three = document.autoSumForm.kurang.value; 
document.autoSumForm.selisih.value = (two * 1) - (one * 1);
selisih = (two * 1) - (one * 1);
	if (selisih < 21){
		document.autoSumForm.duaribu.value = (selisih*1) * 2000;
		document.autoSumForm.tigaribu.value = 0;
		document.autoSumForm.limaribu.value = 0;
	}else if (selisih < 31){
		document.autoSumForm.duaribu.value = (20 * 2000);
		document.autoSumForm.tigaribu.value =((selisih - 20) * 3000);
	}else if (selisih>30){
		document.autoSumForm.duaribu.value = (20 * 2000);
		document.autoSumForm.tigaribu.value =(10 * 3000);
		document.autoSumForm.limaribu.value =((selisih - 30) * 5000);
	}
	duarb = document.autoSumForm.duaribu.value;
	tigarb = document.autoSumForm.tigaribu.value;
	limarb = document.autoSumForm.limaribu.value;
	beb = document.autoSumForm.beban.value;
	total = (duarb* 1) + (tigarb* 1) + (limarb* 1) + (beb* 1) + (three* 1);
	document.autoSumForm.jumlah.value = total;
}

/*function check(){
	
}*/

function stopCalc(){
clearInterval(interval);}