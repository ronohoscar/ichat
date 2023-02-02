
    
    
    // Get references to the DOM elements
    var messagesList = document.getElementById("messages");
    var messageForm = document.getElementById("message-form");
    var messageInput = document.getElementById("message-input");
    
    // Reference the Firebase database
    var database = firebase.database();
    var messagesRef = database.ref("messages");
    
    // Listen for form submit event
    messageForm.addEventListener("submit", submitMessage);
    
    // Function to submit the message to the database
    function submitMessage(e) {
      e.preventDefault();
    
      // Get the value of the message input field
      var message = messageInput.value;
    
      // Push the message to the Firebase database
      messagesRef.push({
        message: message,
        timestamp: Date.now(),
      });
    
      // Clear the message input field
      messageInput.value = "";
    }
    
    // Listen for changes in the messages data in the database
    messagesRef.on("child_added", function (snapshot) {
      var message = snapshot.val();
    
      // Create a new list item for the message
      var messageItem = document.createElement("li");
      messageItem.innerText = message.message;
    
      // Append the message to the messages list
      messagesList.appendChild(messageItem);
    
      // Scroll to the bottom of the chat window
      messagesList.scrollTop = messagesList.scrollHeight;
    });
    