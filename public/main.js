// var socket = io.connect('http://localhost:3000', { 'forceNew': true });
var socket = io();

socket.on('messages', function(data) {
    console.log(data);
    render(data);
});

socket.on('nick', function(data) {
    console.log(data);
    renderNick(data)
});

socket.on('escribiendo', function(data) {
    document.getElementById('escribiendo').innerHTML = data;
});




function renderNick(data) {
    var html = `<span class="badge badge-success ml-3">${data} se ha conectado</span><br> `;
    var div = document.getElementById('messages');
    div.innerHTML += html;
    div.scrollTop = div.scrollHeight;
}


function render(data) {
    var html = (`
            <div class="message">
                <strong>${data.nickname}</strong>
                <p>${data.text}</p>
            </div>
        `);
    var div = document.getElementById('messages');
    div.innerHTML += html;
    div.scrollTop = div.scrollHeight;
}


function sendNick(e) {
    var nick = document.getElementById('nickname').value;
    document.getElementById('nick').style.display = 'none';
    document.getElementById('caja').style.display = 'initial';
    socket.emit('nick', nick);
    return false;
}


function addMessage(e) {
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    socket.emit('add-message', message);
    return false;
}

function writing() {
    var nick = document.getElementById('nickname').value;
    socket.emit('tecleando', nick);
    return false;
}