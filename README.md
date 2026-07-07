# Weekly Report Generator & Team Dashboard

This project is a full-stack web application developed for the "Weekly Report Generator & Team Dashboard" technical assignment. It enables team members to submit weekly work reports and allows managers to analyze team productivity.

## 🚀 Key Features
- **User Authentication:** Secure registration and login with role-based access control (Team Member and Manager).
- **Weekly Report Submission:** A dedicated, standardized interface for members to submit progress (Week, Project, Tasks Completed/Planned, Blockers, Hours Worked, Notes).
- **Manager Dashboard:** A consolidated view for managers to analyze all team reports, filter data, and track submission status (Submitted/Pending/Late).
- **Responsive UI:** Built with React and Tailwind CSS for a modern, component-based user experience.
- **Data Persistence:** Integrated with a database to store and manage users, projects, and reports efficiently.

## 🛠 Prerequisites
- Node.js (v16+)
- MongoDB

## 📋 Setup Instructions

Clone this repository and follow the steps below to set up the project:

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend

2. Install the required dependencies:
    npm install
3. Start the backend server:
    npm run dev

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
    cd frontend

2. Install the required dependencies:
    npm install

3. Start the frontend application:
    npm run dev

## 🏗 System Design & ER Diagram

https://drive.google.com/file/d/1W3RJy6hCIGJ8baYlrcHlen1OizoIUvYD/view?usp=sharing

The system architecture follows a clean REST API structure with clear separation between frontend components and backend services. The database design is illustrated in the Entity Relationship Diagram (ERD) provided in the project files.

## 📜 Deliverables Included

Frontend & Backend Code: Complete full-stack implementation.

Database Design: ER diagram covering Users, Roles, Projects, and Reports.

Role-based Access: Enforced across API endpoints and UI views.

Documentation: This README file and technical presentation guidelines.
