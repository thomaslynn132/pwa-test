// import React, { useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// const SendPushNoti: React.FC = () => {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [token, setToken] = useState("");

//   const sendNotification = async () => {
//     if (!token || !title || !body) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       // Fetch the access token from the API route
//       const { data } = await axios.get("/api/getAccessToken");
//       const accessToken = data.accessToken;

//       const payload = {
//         notification: {
//           title,
//           body,
//         },
//         to: token, // FCM token of the recipient
//       };

//       const response = await axios.post(
//         "https://fcm.googleapis.com/fcm/send",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log("Notification sent successfully:", response.data);
//       alert("Notification sent successfully!");
//     } catch (error) {
//       console.error("Error sending notification:", error);
//       alert("Failed to send notification.");
//     }
//   };

//   return (
//     <Card className="p-6 max-w-md mx-auto space-y-4">
//       <h1 className="text-xl font-bold text-center">Send Push Notification</h1>
//       <div className="space-y-3">
//         <div>
//           <Label htmlFor="token">FCM Token</Label>
//           <Input
//             id="token"
//             type="text"
//             value={token}
//             onChange={(e) => setToken(e.target.value)}
//             placeholder="Enter recipient's FCM token"
//           />
//         </div>
//         <div>
//           <Label htmlFor="title">Title</Label>
//           <Input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter notification title"
//           />
//         </div>
//         <div>
//           <Label htmlFor="body">Body</Label>
//           <Input
//             id="body"
//             type="text"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             placeholder="Enter notification body"
//           />
//         </div>
//         <Button onClick={sendNotification} className="w-full">
//           Send Notification
//         </Button>
//       </div>
//     </Card>
//   );
// };

// export default SendPushNoti;
