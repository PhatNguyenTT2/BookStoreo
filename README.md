# 📚 BookStoreo - Complete Bookstore Management System

A full-stack bookstore management application built with **Spring Boot** backend and **Vue.js** frontend, featuring user authentication, book management, inventory tracking, and role-based access control.

![BookStoreo Banner](https://img.shields.io/badge/BookStoreo-Bookstore%20Management-blue?style=for-the-badge&logo=book)

## 🌟 **Features**

### 📖 **Book Management**
- ✅ CRUD operations for books with authors and categories
- ✅ 39 sample books with famous literature
- ✅ Advanced search and filtering
- ✅ Import/Export functionality
- ✅ Inventory tracking

### 👥 **User Management** 
- ✅ Role-based authentication (Admin, Manager, Customer, VIP)
- ✅ 20 sample users with different roles
- ✅ User profiles with debt tracking
- ✅ Permission-based access control

### 📊 **Business Features**
- ✅ Sales invoice management
- ✅ Import receipt tracking
- ✅ Monthly inventory reports
- ✅ Debt management system
- ✅ Payment receipts

### 🎨 **Modern UI/UX**
- ✅ Responsive design with Vuetify
- ✅ Admin dashboard
- ✅ Customer interface
- ✅ Dark/Light theme support

## 🚀 **Quick Start**

### **Prerequisites**
- ☑️ Node.js 18+ and npm
- ☑️ Java 17+
- ☑️ MySQL 8.0+
- ☑️ Maven 3.6+

### **1. Clone Repository**
```bash
git clone https://github.com/PhatNguyenTT2/BookStoreo.git
cd BookStoreo
```

### **2. Database Setup**
```bash
# Create database and tables
mysql -u root -p < backend/src/main/resources/create_database_schema.sql

# Insert sample data
mysql -u root -p < backend/src/main/resources/insert_books_data.sql
```

### **3. Backend Setup**
```bash
cd backend
# Run Spring Boot application
./mvnw spring-boot:run
# Backend will be available at http://localhost:8080
```

### **4. Frontend Setup**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Frontend will be available at http://localhost:5173
```

## 🔐 **Default Login Credentials**

All users have the same password for testing: **`admin123`**

### **Admin Accounts:**
- **Username:** `admin` - Full administrative access
- **Username:** `manager` - Limited administrative access

### **Customer Accounts:**
- **Username:** `customer1` - Regular customer
- **Username:** `bookworm` - VIP customer with debt
- **Username:** `fantasy_girl` - VIP customer

## 🛠️ **Technology Stack**

### **Backend:**
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green?logo=spring-boot)
![Java](https://img.shields.io/badge/Java-17-orange?logo=java)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)
![Maven](https://img.shields.io/badge/Maven-3.6+-red?logo=apache-maven)

### **Frontend:**
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-green?logo=vue.js)
![Vuetify](https://img.shields.io/badge/Vuetify-3.x-blue?logo=vuetify)
![Vite](https://img.shields.io/badge/Vite-6.x-yellow?logo=vite)
![Pinia](https://img.shields.io/badge/Pinia-3.x-orange?logo=pinia)

---

<div align="center">

**🚀 Built with ❤️ by PhatNguyenTT2**

[![GitHub](https://img.shields.io/badge/GitHub-PhatNguyenTT2-black?logo=github)](https://github.com/PhatNguyenTT2)
[![BookStoreo](https://img.shields.io/badge/BookStoreo-Live%20Demo-blue?logo=book)](https://github.com/PhatNguyenTT2/BookStoreo)

</div>
