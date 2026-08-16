let button=document.getElementById("SUBMIT");

let topperTotal=0;
let topperName="";

button.onclick=function()
{
    let name=document.getElementById("name").value;
    let roll=document.getElementById("roll").value;
    let DAA=Number(document.getElementById("DAA").value);
    let AT=Number(document.getElementById("AT").value);
    let CN=Number(document.getElementById("CN").value);

    let total=DAA+AT+CN;
    let average=total/3;

    let table=document.getElementById("tableBody");
    let row=table.insertRow();
    row.insertCell(0).innerHTML=name;
    row.insertCell(1).innerHTML=roll;
    row.insertCell(2).innerHTML=DAA;
    row.insertCell(3).innerHTML=AT;
    row.insertCell(4).innerHTML=CN;
    row.insertCell(5).innerHTML=total;
    row.insertCell(6).innerHTML=average.toFixed(2);

  
    if (total > topperTotal) {
        topperTotal = total;
        topperName = name;
    }
    document.getElementById("Topper").innerHTML = "Topper: " + topperName + " (Total: " + topperTotal + ")";
};
