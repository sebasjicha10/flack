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


# Available rooms
ROOMS = []


@app.route("/")
def index():
    """Default route"""
    return render_template("index.html", rooms=ROOMS)


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

    send(data, room=data["room"])


@socketio.on("create")
def create(data):
    """Creates Rooms"""

    # Make sure room doesn't already exist
    room = data["new_channel"]
    if room in ROOMS:
        return False

    # Add room and signal client side
    ROOMS.append(room)
    emit("channel added", room, broadcast=True)
    

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


if __name__ == '__main__':
    socketio.run(app, debug=True)