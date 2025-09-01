# 🗄️ Database UI Access Guide

Your Mini Learning Platform now has **two database UI tools** running to help you visualize and manage your PostgreSQL database.

## 🚀 **Quick Access**

### **Option 1: pgAdmin (Full-Featured)**
- **URL**: http://localhost:8080
- **Email**: admin@admin.com
- **Password**: admin

### **Option 2: Adminer (Lightweight)**
- **URL**: http://localhost:8081
- **Server**: postgres
- **Username**: postgres
- **Password**: postgres
- **Database**: learning

---

## 📋 **Step-by-Step Setup**

### **pgAdmin Setup (Recommended)**

1. **Open pgAdmin**: Go to http://localhost:8080
2. **Login**: 
   - Email: `admin@admin.com`
   - Password: `admin`
3. **Add Server**:
   - Right-click "Servers" → "Create" → "Server"
   - **General Tab**:
     - Name: `Learning Platform DB`
   - **Connection Tab**:
     - Host: `postgres` (or `localhost` if connecting from outside Docker)
     - Port: `5432`
     - Database: `learning`
     - Username: `postgres`
     - Password: `postgres`
4. **Save** and explore your database!

### **Adminer Setup (Quick Access)**

1. **Open Adminer**: Go to http://localhost:8081
2. **Login Form**:
   - System: `PostgreSQL`
   - Server: `postgres`
   - Username: `postgres`
   - Password: `postgres`
   - Database: `learning`
3. **Click "Login"** and start exploring!

---

## 🗂️ **Database Structure**

Your database contains **3 schemas**:

### **1. Users Schema (`users`)**
- **User Table**: User accounts and authentication
- **Columns**: id, email, passwordHash, role, createdAt

### **2. Lessons Schema (`lessons`)**
- **Lesson Table**: Learning content
- **Enrollment Table**: User lesson enrollments
- **Completion Table**: Lesson completion tracking
- **Columns**: id, title, subject, grade, createdAt

### **3. Achievements Schema (`achievements`)**
- **Achievement Table**: Available achievements
- **UserAchievement Table**: User-earned achievements
- **UserStats Table**: User statistics and points

---

## 🔍 **What You Can Do**

### **View Data**
- Browse all tables and their contents
- See the seeded data (users, lessons, achievements)
- View relationships between tables

### **Run Queries**
- Execute SQL queries directly
- Test complex queries
- Analyze data relationships

### **Manage Data**
- Insert new records
- Update existing data
- Delete records (be careful!)

### **Schema Management**
- View table structures
- Check indexes and constraints
- Monitor database performance

---

## 📊 **Sample Queries to Try**

### **View All Users**
```sql
SELECT * FROM users."User";
```

### **View All Lessons**
```sql
SELECT * FROM lessons."Lesson";
```

### **View All Achievements**
```sql
SELECT * FROM achievements."Achievement";
```

### **Count Records by Schema**
```sql
SELECT 
    'users' as schema_name, 
    COUNT(*) as record_count 
FROM users."User"
UNION ALL
SELECT 
    'lessons' as schema_name, 
    COUNT(*) as record_count 
FROM lessons."Lesson"
UNION ALL
SELECT 
    'achievements' as schema_name, 
    COUNT(*) as record_count 
FROM achievements."Achievement";
```

### **View User with Their Role**
```sql
SELECT id, email, role, "createdAt" 
FROM users."User" 
ORDER BY "createdAt" DESC;
```

---

## 🛠️ **Troubleshooting**

### **Connection Issues**
- Make sure PostgreSQL container is running: `docker-compose ps`
- Check if ports 8080 and 8081 are accessible
- Verify database credentials

### **Schema Not Visible**
- Make sure you're connected to the `learning` database
- Check that the schemas exist: `SELECT schema_name FROM information_schema.schemata;`

### **Permission Issues**
- Use the `postgres` user for full access
- Check if tables exist: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'users';`

---

## 🎯 **Pro Tips**

1. **pgAdmin** is better for complex database management
2. **Adminer** is faster for quick data viewing
3. Use **pgAdmin's Query Tool** for advanced SQL operations
4. **Export/Import** data using pgAdmin's backup features
5. **Monitor** database performance with pgAdmin's dashboard

---

## 🔄 **Restart Services**

If you need to restart the database UI services:

```bash
# Stop and restart
docker-compose down
docker-compose up -d

# Or restart just the UI services
docker-compose restart pgadmin adminer
```

---

**🎉 Happy Database Exploring!**

Your Mini Learning Platform database is now fully accessible through beautiful web interfaces!
