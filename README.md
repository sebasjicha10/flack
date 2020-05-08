<h1>Flack</h1>
<h2>Description</h2>

Online messaging service built using Flask and socket.oi, similar in spirit to Slack. Users are able to sign in to the site with a display name, create chatrooms to communicate in, as well as see and join existing rooms. Once in a room, users are able to send and receive messages with one another in real-time. Pop up notifications are broadcasted to everyone in the chatroom when a user joins or leaves the room. Finally, a night mode was implemented using Javascript, which basically renders the same site in darker tones. The user can toggle between day and night mode without issues. 

<a href="https://drive.google.com/drive/folders/177ucWk9jB9rMKrFqN0-1WgDZTgkuJENi?usp=sharing" target="_blank">Check out some pictures here</a>.<i style="font-size: 12px;"> (Clicking on the link will redirect you to Google Drive).</i>

<h2>Back End</h2>
<ul>
  <li>Python - Flask</li>
  <li>Flask-SocketIO</li>
</ul>
<h2>Front End</h2> (Built for Mobile first)
<ul>
  <li>HTML</li>
  <li>CSS - BootStrap Grid - Flex Box</li>
  <li>Sass</li>
  <li>JavaScript</li>
  <li>Flask-SocketIO</li>
</ul>
<h3>Features</h3> 
<ul>
    <li><strong>Display Name</strong>, when a user visits the web application for the first time, they are prompted to type in a display name that will eventually be associated with every message the user sends. If a user closes the page and returns to the app later, the display name is still be remembered</li>
    <li><strong>Room Creation</strong>, any user is able to create a new room, so long as its name doesn’t conflict with the name of an existing rom. Users are able to see a list of all current rooms, and selecting one allows the user to view the romm</li>
    <li><strong>Messages View</strong>, users are able to send text messages to others. When a user sends a message, their display name and the timestamp of the message are associated with the message. All users in the room then see the new message (with display name and timestamp) appear on their room page. Sending and receiving messages does not require reloading the page</li>
    <li><strong>Remembering the Room</strong>, if a user is on a room page, closes the web browser window, and goes back to the web application, the application remembers what room the user was on previously and takes the user back to that room</li>
    <li><strong>Night Mode</strong>, on the bottom left side of the side a toggle switch is located where users can choose between day and night mode. Night mode renders the page in darker tones. The page doesn't need to be reloaded for this to work.</li>
<ul>