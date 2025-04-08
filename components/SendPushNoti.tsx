import React, { useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/lib/getAccessToken";

const SendPushNoti: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [token, setToken] = useState("");
const accessToken= getAccessToken(); // Get the access token from your function
  const sendNotification = async () => {
    if (!token || !title || !body) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = {
      notification: {
        title,
        body,
      },
      to: token, // FCM token of the recipient
    };

    try {
      const response = await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Replace with your Firebase server key
          },
        }
      );
      console.log("Notification sent successfully:", response.data);
      alert("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  return (
    <div>
      <h1>Send Push Notification</h1>
      <div>
        <label>
          FCM Token:
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter recipient's FCM token"
          />
        </label>
      </div>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
          />
        </label>
      </div>
      <div>
        <label>
          Body:
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter notification body"
          />
        </label>
      </div>
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default SendPushNoti;
