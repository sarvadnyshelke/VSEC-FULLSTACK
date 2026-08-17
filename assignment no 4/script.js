function selectSlot(time) {
   document.getElementById("slot").value = time;
}
function bookDarshan()
 {
    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let visitors = document.getElementById("visitors").value;
    let slot = document.getElementById("slot").value;

    if (name == "" || mobile == "" || visitors == "" || slot == "")
         {

        document.getElementById("message").innerHTML =
            "Please fill all details.";
         } 
    else
         {

        document.getElementById("message").innerHTML =
            "Booking Successful!<br>" +
            "Name: " + name + "<br>" +
            "Mobile: " + mobile + "<br>" +
            "Visitors: " + visitors + "<br>" +
            "Time: " + slot;
         }
}