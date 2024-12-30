# Flat-Mates

### 🚀 Overview  
This project is a web application designed to connect potential roommates and manage accommodation listings. It leverages modern web technologies and third-party tools to ensure security, scalability, and a seamless user experience.  
<img width="948" alt="image" src="https://github.com/user-attachments/assets/f92adbe5-cf4c-455e-89f2-1ed4e452abea" />

### Web-Link
- [https://flat-mates.onrender.com/listings](https://flat-mates.onrender.com/listings)


---

## 🎯 Features  
- **Secure User Authentication**:  
  - Implemented with [Passport.js](http://www.passportjs.org/) and [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose).  
  - Ensures secure registration and login functionality.  

- **Password Security**:  
  - Uses [bcrypt](https://github.com/kelektiv/node.bcrypt.js) internally via `passport-local-mongoose` for hashing and salting passwords.  

- **Session Management**:  
  - Managed with [express-session](https://www.npmjs.com/package/express-session) and [connect-mongo](https://www.npmjs.com/package/connect-mongo) for persistent sessions stored in MongoDB.  

- **Image Uploads**:  
  - Powered by [multer](https://www.npmjs.com/package/multer) and [cloudinary](https://www.npmjs.com/package/cloudinary) for uploading and storing images.  
  - [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary) integrates image uploads directly to the cloud.  

- **Server-Side Validation**:  
  - [Joi](https://joi.dev/) ensures robust schema validation for user inputs.  

- **View Rendering**:  
  - Uses [EJS](https://ejs.co/) templating with [ejs-mate](https://www.npmjs.com/package/ejs-mate) for consistent and reusable layouts.  

- **Database**:  
  - Data is stored in MongoDB using [Mongoose](https://mongoosejs.com/) for object modeling.  

---

## 🛠️ Technologies Used  

### Dependencies  
| **Dependency**                | **Purpose**                                              |  
|-------------------------------|---------------------------------------------------------|  
| `cloudinary`                  | Cloud-based storage for uploaded images.               |  
| `connect-flash`               | Displays flash messages for user feedback.             |  
| `connect-mongo`               | Session storage in MongoDB for persistence.            |  
| `dotenv`                      | Manages environment variables.                         |  
| `ejs` & `ejs-mate`            | HTML templates with layout support.                    |  
| `express`                     | Backend framework for routing and middleware.          |  
| `express-session`             | Session management middleware.                         |  
| `joi`                         | Input validation for user-submitted data.              |  
| `method-override`             | Supports HTTP verbs like PUT and DELETE.               |  
| `mongoose`                    | Object data modeling for MongoDB.                      |  
| `multer` & `multer-storage-cloudinary` | Handles file uploads and integrates with Cloudinary. |  
| `passport` & `passport-local` | User authentication and session management.            |  
| `passport-local-mongoose`     | Simplifies integration of Passport.js with Mongoose.   |  

---
 

### Prerequisites  
- Node.js and npm installed on your system.  
- MongoDB (local or cloud instance).  
- A Cloudinary account for image storage.





