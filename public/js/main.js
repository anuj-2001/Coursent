
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


const room = document.getElementById('room-name').getAttribute("target");
const username = document.getElementById('author').getAttribute("target");
console.log(username+" "+room);
const socket = io();
socket.emit('joinRoom',{username,room});


//Get room and users
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
});

//Message from server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);
    //Scroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight; 
});

chatForm.addEventListener('submit',(e) => {
    e.preventDefault();

    let msg = e.target.elements.msg.value;
    msg = msg.trim();

    if(!msg){
        return false;
    }

    socket.emit('chatMessage',msg);
    
    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus() ;
});

//Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//Add room name to dom

function outputRoomName(room){
    roomName.innerText= room;
}

//Add users to DOM
function outputUsers(users){
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
}

//Prompt before leaving
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '/dashboard'; 
    } else {
    }
});
