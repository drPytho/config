let dns = require ('dns');
let os = require('os');
let fs = require('fs');
var lb = require("lemonbar");

lb.launch({
    
    lemonbar: "/usr/local/bin/lemonbar",   // Lemonbar binary 
    shell: "/bin/sh",                      // Shell to use for actions 
    shelloutput: true,                     // Print shell STDOUT 
 
    // More information on the following arguments at https://github.com/LemonBoy/bar#options 
 
    background: "#992c3e50",                 // -B    Background color (#rgb, #rrggbb, #aarrggbb) 
    foreground: "#fff",                    // -F    Foreground color 
    geometry: {                            // -g    Window geometry 
        x: 15, y: 5,
        width: 1890, height: 20
    },
    fonts: [], // -f    Load fonts 
    
    name: "mybar",                            // -n    Set the WM_NAME atom value for the bar 
    areas: 10                              // -a    Number of clickable areas 
 
});

const I_UNSPEC = 0;
const I_CONN= 1;
const I_NO_CONN= 2;
const I_CONN_PROB= 3;

// ICS = Internet Connection Status
let ICS = I_UNSPEC;
function checkInternet() {
    dns.lookup('google.com',function(err) {
        // Set something is connected
        if (err && (err.code == "ENOTFOUND" || err.code == "EAI_AGAIN")) {
            // Ops, not connected
            ICS = I_NO_CONN;
        } else if(err) {
            // Here we can connect to the server but 
            // something is not really correct
            ICS = I_CONN_PROB;
            console.log(err.code);
        } else {
            // Here we are connected fo real
            ICS = I_CONN;
        }
    })
}
// Set initial value of variable
checkInternet();

function getIP() {
    let interfaces = os.networkInterfaces();
    let addresses = [];
    for (let k in interfaces) {
        for (let k2 in interfaces[k]) {
            let address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }

    return addresses[0];
}

function getInternetStatus() {
    // Slow this down, don't want to check too offen.
    checkInternet();
    if (ICS == I_NO_CONN) {
        return "\\('_')/".lbFg("#ADD8E6");
    }
    // Get IP
    ip = getIP();
    if (ip == undefined) {
        return "\\('_')/".lbFg("#ADD8E6");
    }

    if (ICS == I_CONN_PROB) {
        return (ip + "").lbFg("#FFA500");
    }
    if (ICS == I_CONN) {
        return (ip + "").lbFg("#0F0");
    }
    return "\\('_')/".lbFg("#ADD8E6");
}

function getTime() {
    let date = new Date();
    let weekday = new Array(7);
    weekday[0]=  "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    let n = weekday[date.getDay()];
    let h = date.getHours();
    let m = date.getMinutes()
    m = ("00"+m).slice(-2);
    h = ("00"+h).slice(-2);
    return n + " " + h + ":" + m;
}

let battery_status = ""

function get_bat_info(bat) {
    const BAT_PATH = "/sys/class/power_supply/";
    stat = fs.readFileSync(BAT_PATH + bat + "/status");
    capacity = fs.readFileSync(BAT_PATH + bat + "/capacity");

    return {
        charging: stat == "Charging\n",
        discharging: stat == "Discharging\n",
        capacity: parseInt(capacity, 10)
    }
}

function bat_info_text(bat_info) {
    let color = "-";

    if (bat_info.charging) {
        color = "#00FF00";
    } else if (!bat_info.discharging) {
        color = "#CCC";
    } else {
        if(bat_info.capacity <= 10) {
            color = "#F00";
        } else if(bat_info.capacity <= 20) {
            color = "#FC0";
        } else {
            color = "#FFF";
        }
    }
    return (bat_info.capacity + "%").lbFg(color)
}

battery_status = bat_info_text(get_bat_info("BAT0")) + " " + bat_info_text(get_bat_info("BAT1"));
setInterval(() => {
    battery_status = bat_info_text(get_bat_info("BAT0")) + " " + bat_info_text(get_bat_info("BAT1"));
}, 1000*60); // Once a minute



function update(){
    lb.append(" drpytho: ~/workspace/".lbLeft.lbAction("gnome-terminal"));
    

    lb.append((getInternetStatus()).lbRight + " ");
    lb.append(battery_status + " ");
    lb.append((" " + getTime() + " ").lbSwap.lbCenter);
    lb.write();
}

setInterval(update, 1000);



