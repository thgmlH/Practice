const xlsx = require('node-xlsx'); 
const fs = require('fs'); 
const { isBigInt64Array } = require('util/types');

var excel = "./sheet.xlsx"

const checkExcel = async (excel) => {
     if (!fs.existsSync(excel)) throw new errors();
    const obj = xlsx.parse(excel); 
    //console.log("obj : ", obj[0].data[2]); // <1> 
    //console.log("obj[0] : ", obj[0].data[0].forEach(element => {
    //    console.log(element)
    //})); // <2> 
    //console.log("obj[0].data : ", obj[0].data); // <3> 
    var arr = new Array();
    var element = null;

    var i=0;

    //console.log(obj[0].data.length)
    for (var i=0; i< obj[0].data.length; i++) { 
        element = new Array();
        if(i >= 1){
            obj[0].data[i].forEach(function(item, index){
                if((index % 12 == 0 || index % 13 == 0 || index % 14 == 0 || index % 15 == 0) && index != 0){
                    //console.log(item)
                    //12, 13, 14, 15번째 컬럼의 데이터들만 수집
                    element.push(item)
                    //console.log(arr)
                }
            })
            arr.push(element)
            if(i == obj[0].data.length-1){
                console.log(i)
                console.log(arr)
            }
        }
    }


    let csvContent = "\uFEFF";   // 한글파일은 뒤에,\uFEFF  추가해서 해결함.


    const data = arr.map((row) => row.join(',')).join('\n');

    /*arr.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });*/

    //fs.writeFileSync('senario.csv', csvContent)
    fs.writeFileSync('senario.csv', "\uFEFF" + data)
};

checkExcel(excel);
