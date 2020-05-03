import os

from flask import Flask, render_template, request, redirect
from flask_socketio import SocketIO, emit, send, join_room, leave_room


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Available rooms and messages saved 
ROOMS = []


@app.route("/")
def index():
    """Default route"""

    # List of rooms 
    rooms = []
    for room in ROOMS:
        rooms.append(room["room"])

    return render_template("index.html", rooms=rooms)


@app.route("/signin", methods=["GET", "POST"])
def signin():
    """Sign in user"""

    # User reached route via POST
    if request.method == "POST":
        return redirect("/")

    # User reached rout via GET
    else :
        return render_template("signin.html")
    

@socketio.on("message")
def message(data):
    """Send messages to the Client-Side"""

    # Store message
    room_name = data["room"]
    msg = data["msg"].strip()

    # Make sure something was typed
    if msg == "":
        return False

    for room in ROOMS:
        if room["room"] == room_name:
            messages = room["messages"]

            # Make sure only 100 messages are being stored
            if len(messages) > 99:
                messages.remove(messages[0])

            messages.append(data)
    
    # Signal client side 
    send(data, room=room_name)


@socketio.on("create")
def create(room):
    """Creates Rooms"""

    given_room = room.strip().title()

    # Make sure Room name is from 1 to  25 characters
    if given_room == "" or len(given_room) > 25:
        return False
   
    # Make sure rooms are not repeated
    for room in ROOMS:
        if room["room"] == given_room:
            return False

    # Add room and signal Client Side 
    new_room = {"room": given_room, "messages": []}
    ROOMS.append(new_room)
    emit("room added", given_room, broadcast=True)

    # Join in the room creator
    emit("room creator", given_room)
    

@socketio.on("join")
def join(data):
    """Join Rooms"""

    # Define variables
    username = data["username"]
    room = data["room"]

    # Join and signal client side
    join_room(room)
    send({"msg": username + " has joined the " + room + " room."}, room=room)


@socketio.on('leave')
def leave(data):
    """Leave Rooms"""

    # Define variables
    username = data['username']
    room = data['room']

    # Leave and signal client side
    leave_room(room)
    send({"msg": username + " has left the " + room + " room."}, room=room)


@socketio.on("fetch messages")
def fetch(room_name):
    """Fetch last 100 messages in room and send them back"""
    messages = []

    for room in ROOMS:
        if room["room"] == room_name:
            messages = room["messages"]


    emit("saved messages", messages)


if __name__ == '__main__':
    socketio.run(app, debug=True)

