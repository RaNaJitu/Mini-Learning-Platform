# 🎨 Prisma Studio Guide

Prisma Studio is the **best way** to visualize and manage your database data with a beautiful, modern UI. It's specifically designed for Prisma-based applications.

## 🚀 **Quick Access**

### **Prisma Studio URLs:**
- **User Service**: http://localhost:5555
- **Lesson Service**: http://localhost:5556  
- **Achievement Service**: http://localhost:5557

### **Alternative Database UIs:**
- **pgAdmin**: http://localhost:8080 (admin@admin.com / admin)
- **Adminer**: http://localhost:8081 (postgres / postgres / learning)

---

## 🎯 **Why Prisma Studio is Better**

### **✅ Advantages:**
- **Beautiful UI**: Modern, intuitive interface
- **Real-time Updates**: See changes instantly
- **Type Safety**: Respects your Prisma schema
- **Easy CRUD**: Create, Read, Update, Delete with clicks
- **Relationships**: Visualize table relationships
- **Filtering & Sorting**: Advanced data exploration
- **No SQL Required**: Point-and-click interface

### **🔄 vs Other Tools:**
- **pgAdmin**: More complex, SQL-focused
- **Adminer**: Basic, lightweight
- **Prisma Studio**: Perfect for Prisma projects

---

## 📋 **How to Use Prisma Studio**

### **1. Start Prisma Studio Services**
```bash
# Start all Prisma Studio instances
docker-compose up -d prisma-studio-user prisma-studio-lesson prisma-studio-achievement

# Or start individually
docker-compose up -d prisma-studio-user
docker-compose up -d prisma-studio-lesson  
docker-compose up -d prisma-studio-achievement
```

### **2. Access the Interfaces**
- Open http://localhost:5555 for User data
- Open http://localhost:5556 for Lesson data
- Open http://localhost:5557 for Achievement data

### **3. Explore Your Data**
- **Browse Tables**: Click on table names to view data
- **View Records**: See all your seeded data
- **Edit Records**: Click on any field to edit
- **Add Records**: Click "Add record" button
- **Delete Records**: Click trash icon
- **Filter Data**: Use the filter bar
- **Sort Data**: Click column headers

---

## 🗂️ **What You'll See in Each Studio**

### **User Studio (Port 5555)**
- **User Table**: 
  - id, email, passwordHash, role, createdAt
  - Your seeded users (admin, students)
  - Users you created via API

### **Lesson Studio (Port 5556)**
- **Lesson Table**:
  - id, title, subject, grade, createdAt
  - 6 seeded lessons + any you created
- **Enrollment Table**:
  - User-lesson enrollments
- **Completion Table**:
  - Lesson completion tracking

### **Achievement Studio (Port 5557)**
- **Achievement Table**:
  - id, name, description, type, category, points
  - Predefined achievements
- **UserAchievement Table**:
  - User-earned achievements
- **UserStats Table**:
  - User statistics and points

---

## ✨ **Prisma Studio Features**

### **📊 Data Management**
- **View All Records**: See your seeded data
- **Add New Records**: Create users, lessons, achievements
- **Edit Existing**: Modify any field
- **Delete Records**: Remove unwanted data
- **Bulk Operations**: Select multiple records

### **🔍 Data Exploration**
- **Filtering**: Filter by any field
- **Sorting**: Sort by columns
- **Search**: Find specific records
- **Pagination**: Navigate large datasets

### **🔗 Relationships**
- **Visual Links**: See table relationships
- **Related Data**: View connected records
- **Foreign Keys**: Understand data connections

### **⚡ Real-time Updates**
- **Live Changes**: See updates instantly
- **Auto-refresh**: Data stays current
- **Sync**: Changes reflect immediately

---

## 🛠️ **Common Tasks**

### **Add a New User**
1. Go to http://localhost:5555
2. Click "User" table
3. Click "Add record"
4. Fill in: email, passwordHash, role
5. Click "Save"

### **Add a New Lesson**
1. Go to http://localhost:5556
2. Click "Lesson" table
3. Click "Add record"
4. Fill in: title, subject, grade
5. Click "Save"

### **Add a New Achievement**
1. Go to http://localhost:5557
2. Click "Achievement" table
3. Click "Add record"
4. Fill in: name, description, type, category, points
5. Click "Save"

### **View Seeded Data**
1. Open any Prisma Studio URL
2. Click on table names
3. Browse your existing data
4. See relationships between tables

---

## 🎯 **Pro Tips**

### **💡 Best Practices**
1. **Use Prisma Studio** for data management
2. **Use pgAdmin** for complex SQL queries
3. **Use Adminer** for quick data checks
4. **Keep multiple tabs open** for different services

### **🔧 Development Workflow**
1. **Design Schema**: Update Prisma schema
2. **Run Migrations**: `npx prisma migrate dev`
3. **View in Studio**: Check your changes
4. **Seed Data**: Add test data via Studio
5. **Test APIs**: Verify with your endpoints

### **📱 Mobile Friendly**
- Prisma Studio works on mobile devices
- Responsive design for all screen sizes
- Touch-friendly interface

---

## 🚨 **Troubleshooting**

### **Studio Won't Start**
```bash
# Check if containers are running
docker-compose ps

# Restart Prisma Studio services
docker-compose restart prisma-studio-user prisma-studio-lesson prisma-studio-achievement
```

### **Can't Connect to Database**
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Check database connection
docker-compose exec postgres psql -U postgres -d learning -c "SELECT 1;"
```

### **Port Conflicts**
```bash
# Check what's using the ports
netstat -an | findstr :5555
netstat -an | findstr :5556
netstat -an | findstr :5557
```

---

## 🎉 **Quick Start Commands**

```bash
# Start all Prisma Studio instances
docker-compose up -d prisma-studio-user prisma-studio-lesson prisma-studio-achievement

# Check they're running
docker-compose ps | findstr prisma-studio

# Access the UIs
# http://localhost:5555 - Users
# http://localhost:5556 - Lessons  
# http://localhost:5557 - Achievements
```

---

**🎨 Prisma Studio is the perfect tool for managing your Mini Learning Platform data!**

Enjoy the beautiful, intuitive interface for all your database needs!
