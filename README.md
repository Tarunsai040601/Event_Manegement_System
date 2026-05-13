# EventHub — MERN Event Booking Platform

A full-stack event booking platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform supports three distinct user roles — Admin, Organizer, and Customer — each with their own dedicated dashboard and feature set.

📌 Table of Contents

Tech Stack
Project Structure
User Roles & Features

Admin
Organizer
Customer


Core Features
Event Categories
API Endpoints
Database Schema
Environment Variables
Installation & Setup
Email Notifications
Business Logic & Validations
Folder Structure


🛠️ Tech Stack
Layer                 :      Technology
Frontend              :      React.js, React Router, Axios
Backend               :      Node.js, Express.js
Database              :      MongoDB, Mongoose 
Auth                  :      JWT (JSON Web Tokens), bcryptjs
Email                 :      Nodemailer (SMTP / Gmail / SendGrid) 
Dev Tools             :      Nodemon, dotenv, cors, morgan


👥 User Roles & Features
1. Admin

Platform manager who oversees all operations. Cannot create events.

Admin Capabilities:

✅ View all registered users (Admins, Organizers, Customers)
✅ Activate / Deactivate user accounts
✅ Promote a Customer to Organizer role
✅ View all events on the platform (published + unpublished)
✅ View all bookings across all events
✅ Platform statistics dashboard:

Total Users, Organizers, Customers
Total Events (active / past)
Total Bookings (confirmed / cancelled)
Revenue overview
❌ Cannot create, edit, or delete events


2. Organizer

A verified user who creates and manages events.

Organizer Capabilities:

✅ Create new events with full details:

Title, Description, Category
Venue (Name + Address)
Date & Time
Seat Limit (max tickets available)
Ticket Price (or free)
Thumbnail/Banner Image


✅ Edit their own events (if no bookings yet or allowed fields only)
✅ Delete their own events — only if zero bookings exist
✅ Publish / Unpublish their events
✅ View per-event stats:

Seats Booked vs Seats Remaining
Revenue Collected
List of customers who booked (name, email, booking time)


❌ Cannot manage other organizer's events
❌ Cannot delete an event that has existing bookings


3. Customer

A registered user who browses and books events.

Customer Capabilities:

✅ Browse all published events with search and filter options:

Filter by Category
Filter by Date (upcoming)
Search by keyword (title, venue)


✅ View full event detail page
✅ Book one ticket per event (enforced — cannot book same event twice)
✅ Cancel a booking — only for future events (past events cannot be cancelled)
✅ Receive a confirmation email on every successful booking (with event details)
✅ View "My Bookings" page showing:

Event name, date, venue
Booking status: confirmed / cancelled
Option to cancel (if event is in future)


❌ Cannot book more than 1 ticket per event
❌ Cannot cancel a booking for a past event


#Booking Confirmation Email

Triggered immediately after a successful booking
Email contains:

Event title, date, time, venue
Customer name
Booking confirmation ID
"Thank you for booking" message
