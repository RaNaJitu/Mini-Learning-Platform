# Mini Learning Platform

A microservices-based learning platform built with Node.js, TypeScript, Fastify, and Docker.

## 🏗️ Architecture

This project consists of 4 microservices:

- **Gateway Service** (Port 3000) - API Gateway with rate limiting and routing
- **User Service** (Port 3001) - User management and authentication
- **Lesson Service** (Port 3002) - Lesson management and enrollment
- **Achievement Service** (Port 3003) - Achievement tracking and gamification

## 🛠️ Technology Stack

- **Backend**: Node.js, TypeScript, Fastify
- **Database**: PostgreSQL with Prisma ORM
- **Message Queue**: NATS
- **Containerization**: Docker & Docker Compose
- **Authentication**: JWT tokens
- **Documentation**: Swagger/OpenAPI

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Mini_Learning_Platform
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Verify services are running**
   ```bash
   docker-compose ps
   ```

4. **Check service health**
   ```bash
   # Gateway
   curl http://localhost:3000/healthz
   
   # User Service
   curl http://localhost:3001/healthz
   
   # Lesson Service
   curl http://localhost:3002/healthz
   
   # Achievement Service
   curl http://localhost:3003/healthz
   ```

## 📊 Service Endpoints

### Gateway Service (Port 3000)
- **Health Check**: `GET /healthz`
- **API Documentation**: `GET /documentation` (Swagger UI)
- **Rate Limiting**: 120 requests per minute

### User Service (Port 3001)
- **Health Check**: `GET /healthz`
- **API Documentation**: `GET /documentation`
- **Authentication endpoints**: `/api/v1/auth/*`

### Lesson Service (Port 3002)
- **Health Check**: `GET /healthz`
- **API Documentation**: `GET /documentation`
- **Lesson endpoints**: `/api/v1/lesson/*`

### Achievement Service (Port 3003)
- **Health Check**: `GET /healthz`
- **API Documentation**: `GET /documentation`
- **Achievement endpoints**: `/api/v1/achievement/*`

## 🗄️ Database

The application uses PostgreSQL with separate schemas for each service:
- `users` schema for User Service
- `lessons` schema for Lesson Service
- `achievements` schema for Achievement Service

## 🔧 Development

### Project Structure
```
├── gateway/          # API Gateway service
├── user/            # User management service
├── lesson/          # Lesson management service
├── achievement/     # Achievement tracking service
├── docker-compose.yml
└── README.md
```

### Running Individual Services

To run a specific service in development mode:

```bash
# User Service
cd user
npm install
npm run dev

# Lesson Service
cd lesson
npm install
npm run dev

# Achievement Service
cd achievement
npm install
npm run dev

# Gateway
cd gateway
npm install
npm run dev
```

### Database Migrations

Each service handles its own database migrations:

```bash
# Run migrations for a specific service
cd user
npx prisma migrate deploy

cd lesson
npx prisma migrate deploy

cd achievement
npx prisma migrate deploy
```

## 🐳 Docker Commands

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🔍 Monitoring

### Service Status
```bash
# Check running containers
docker-compose ps

# View service logs
docker-compose logs [service-name]

# Follow logs in real-time
docker-compose logs -f [service-name]
```

### Health Checks
All services provide health check endpoints that return:
```json
{
  "ok": true,
  "service": "SERVICE_NAME"
}
```

## 🚧 Current Status

✅ **Completed:**
- All services are running successfully
- Docker containerization is working
- Database connections are established
- API endpoints are accessible
- Health checks are functional

⚠️ **Known Issues:**
- Database tables need to be created (migrations pending)
- Seed data insertion is failing (expected until tables exist)
- Some services have cross-service dependencies that need refinement

## 🔄 Next Steps

### Immediate Actions:
1. **Run Database Migrations**
   ```bash
   # Connect to each service and run migrations
   docker-compose exec user npx prisma migrate deploy
   docker-compose exec lesson npx prisma migrate deploy
   docker-compose exec achievement npx prisma migrate deploy
   ```

2. **Seed Initial Data**
   ```bash
   # After migrations, seed the databases
   docker-compose exec user npx prisma db seed
   docker-compose exec lesson npx prisma db seed
   docker-compose exec achievement npx prisma db seed
   ```

3. **Test API Endpoints**
   - Access Swagger documentation at `http://localhost:3000/documentation`
   - Test user registration and authentication
   - Create and manage lessons
   - Track achievements

### Future Enhancements:
- [ ] Add frontend application
- [ ] Implement comprehensive error handling
- [ ] Add monitoring and logging
- [ ] Set up CI/CD pipeline
- [ ] Add unit and integration tests
- [ ] Implement caching strategies
- [ ] Add API versioning
- [ ] Set up production deployment

## 📝 API Documentation

Once the services are running, you can access the interactive API documentation:
- **Gateway**: http://localhost:3000/swagger/doc
- **User Service**: http://localhost:3001/swagger/doc
- **Lesson Service**: http://localhost:3002/swagger/doc
- **Achievement Service**: http://localhost:3003/swagger/doc

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**🎉 Congratulations! Your Mini Learning Platform is now running successfully with Docker!**