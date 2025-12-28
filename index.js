/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


// This function will ask the user for permission to show alerts
function enableMamasCareAlerts() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notifications.");
    } else if (Notification.permission === "granted") {
        console.log("Permission already granted!");
    } else {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                console.log("Permission granted for Mamma's Care!");
            }
        });
    }
}

// Run this when the page loads
window.onload = enableMamasCareAlerts;