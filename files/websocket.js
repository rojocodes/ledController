var rainbowEnable = false;
var connection = new WebSocket('ws://' + location.hostname + ':81/', ['arduino']);
connection.onopen = function () {
    connection.send('Connect ' + new Date());
};
connection.onerror = function (error) {
    console.log('WebSocket Error ', error);
};
connection.onmessage = function (e) {
    console.log('Server: ', e.data);
};
connection.onclose = function () {
    console.log('WebSocket connection closed');
};

function sendRGB(r, g, b) {
    var rgb = r << 20 | g << 10 | b;
    var rgbstr = '#' + rgb.toString(16);
    console.log('RGB: ' + rgbstr);
    connection.send(rgbstr);
}

function rainbowEffect() {
    rainbowEnable = !rainbowEnable;
    if (rainbowEnable) {
        connection.send("R");
        document.getElementById('rainbow').style.backgroundColor = '#00878F';
        document.getElementById('r').className = 'disabled';
        document.getElementById('g').className = 'disabled';
        document.getElementById('b').className = 'disabled';
        document.getElementById('r').disabled = true;
        document.getElementById('g').disabled = true;
        document.getElementById('b').disabled = true;
    } else {
        connection.send("N");
        document.getElementById('rainbow').style.backgroundColor = '#999';
        document.getElementById('r').className = 'enabled';
        document.getElementById('g').className = 'enabled';
        document.getElementById('b').className = 'enabled';
        document.getElementById('r').disabled = false;
        document.getElementById('g').disabled = false;
        document.getElementById('b').disabled = false;
        sendRGB();
    }
}