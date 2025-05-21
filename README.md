# 🏢 Visitor's Entry Tracking App

A modern web application for managing visitor entries in residential or commercial buildings. Built with React.js and Node.js, this application provides a seamless experience for tracking and managing visitor information.

## ✨ Features

### 📝 Visitor Registration
- Easy-to-use registration form
- Real-time form validation
- Input validation for:
  - Username (minimum 3 characters)
  - Apartment number format
  - Vehicle number (XX-99-XX-9999 format)
  - Purpose of visit
  - Duration of stay
  - Entry date validation

### 👨‍💼 Admin Dashboard
- Secure admin login
- View all visitor entries
- Filter and search capabilities
- Data management features

### 🎨 User Interface
- Modern and clean design
- Responsive layout for all devices
- Intuitive navigation
- Error handling with popup messages
- Form validation feedback

### 🔒 Security Features
- Secure admin authentication
- Protected admin routes
- Input sanitization
- Environment variable configuration

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Custom CSS** - Styling with modern design principles
- **React Router** - Navigation
- **Fetch API** - API communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment configuration

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn
### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tharunsiva01092004/Visitors-App.git
cd Visitors-App
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Set up the database:
```sql
CREATE DATABASE visitor_entry_db;
```

5. Configure environment variables:
Create `.env` file in the backend directory:
```env
PORT=5002
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=visitor_entry_db
```

6. Start the application:
```bash
# Terminal 1 - Start backend
cd backend
node server.js

# Terminal 2 - Start frontend
cd ..
npm start
```
## 📱 Usage

### Visitor Entry
1. Navigate to the home page
2. Fill in the visitor details:
   - Name
   - Apartment number
   - Vehicle details
   - Purpose and duration of visit
3. Submit the form

### Admin Access
1. Navigate to /admin
2. Login with admin credentials
3. View and manage visitor entries

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Tharun Siva** - *Initial work* - [Tharunsiva01092004](https://github.com/Tharunsiva01092004)

## 🙏 Acknowledgments

- Thanks to all contributors who helped with the project
- Inspired by modern visitor management systems
- Built with best practices in web development



### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tharunsiva01092004/Visitors-App.git
cd Visitors-App
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Set up the database:
```sql
CREATE DATABASE visitor_entry_db;
```

5. Configure environment variables:
Create `.env` file in the backend directory:
```env
PORT=5002
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=visitor_entry_db
```

6. Start the application:
```bash
# Terminal 1 - Start backend
cd backend
node server.js

# Terminal 2 - Start frontend
cd ..
npm start
```

## 📱 Usage

### Visitor Entry
1. Navigate to the home page
2. Fill in the visitor details:
   - Name
   - Apartment number
   - Vehicle details
   - Purpose and duration of visit
3. Submit the form

### Admin Access
1. Navigate to /admin
2. Login with admin credentials
3. View and manage visitor entries


