# 🏭 Factory Equipment Management System

A modern factory production equipment management platform that provides equipment monitoring, personnel management, fault tracking, maintenance planning, and other one-stop solutions.

## 📋 Project Overview

This is a factory equipment management system developed with Next.js full-stack technology, designed for small and medium-sized manufacturing enterprises. The system adopts modern web technology stack, providing an intuitive user interface and powerful functional modules to help enterprises achieve digital equipment management.

### Key Features

- **Complete Equipment Lifecycle Management**: Full management process from equipment warehousing to disposal
- **Real-time Monitoring and Alerts**: WebSocket real-time data push, timely alerts for equipment status abnormalities
- **Intelligent Fault Management**: Fault reporting, processing flow tracking, solution recording
- **Maintenance Plan Management**: Regular maintenance reminders, maintenance record tracking, cost statistics
- **Personnel Permission Management**: Multi-role permission control, hierarchical management for operators, maintenance personnel, and administrators
- **Data Visualization**: Equipment status statistics, trend analysis, report generation
- **Notification System**: Real-time push of system notifications, fault warnings, and maintenance reminders

## 🛠️ Technical Architecture

### Frontend Technology Stack
- **Framework**: Next.js 14 (React 18)
- **UI Component Library**: Ant Design 5.x
- **Styling**: Tailwind CSS + CSS Modules
- **Charts**: Chart.js + React Chart.js 2
- **Font**: Inter (Google Fonts)
- **Icons**: Ant Design Icons + Lucide React

### Backend Technology Stack
- **Runtime**: Node.js 18+
- **Database**: MySQL 8.0
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Token)
- **Password Encryption**: bcryptjs
- **Real-time Communication**: WebSocket (ws library)
- **File Upload**: Local storage + image processing

### Development Tools
- **Language**: TypeScript
- **Code Standards**: ESLint + Prettier
- **Package Management**: npm
- **Containerization**: Docker + Docker Compose
- **Database Tools**: Prisma Studio

## 📁 Project Structure

```
factory-equipment-management/
├── src/                          # Source code directory
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes
│   │   ├── dashboard/            # Dashboard pages
│   │   ├── login/                # Login page
│   │   └── layout.tsx            # Root layout
│   ├── components/               # React components
│   │   ├── charts/               # Chart components
│   │   ├── common/               # Common components
│   │   ├── layout/               # Layout components
│   │   └── ui/                   # UI components
│   ├── hooks/                    # Custom React Hooks
│   ├── lib/                      # Utility libraries
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
├── prisma/                       # Database models
│   ├── schema.prisma             # Prisma data model
│   └── seed.ts                   # Database seed data
├── public/                       # Static resources
├── scripts/                      # Script files
├── uploads/                      # File upload directory
└── websocket-server.js           # WebSocket server
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- MySQL 8.0 or higher
- npm 9.0.0 or higher

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Git-StarName/factory-equipment-management.git
   cd factory-equipment-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit the .env file to configure database connection information
   ```

4. **Initialize the database**
   ```bash
   npm run db:generate    # Generate Prisma client
   npm run db:push        # Push data model to database
   npm run db:seed        # Insert seed data
   ```

5. **Start the development server**
   ```bash
   npm run dev:full       # Start Next.js and WebSocket server simultaneously
   ```

6. **Access the application**
   - Main application: http://localhost:3000
   - WebSocket test: ws://localhost:3001
   - Database management: http://localhost:5555 (Prisma Studio)

### Docker Deployment

1. **One-click deployment with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Production environment deployment**
   ```bash
   sudo ./deploy.sh
   ```

## 👥 Default Accounts

The system creates the following default accounts during initialization:

| Role | Username | Password | Permissions |
|------|----------|----------|-------------|
| Administrator | admin | admin123 | System management, user management, equipment management |
| Operator | operator1 | operator123 | Equipment operation, data entry |
| Maintenance | maintenance1 | maintenance123 | Equipment maintenance, fault handling |

## 📊 Feature Modules

### 1. Equipment Management Module
- **Equipment Profile**: Basic equipment information, technical parameters, installation information
- **Status Monitoring**: Real-time status display, operational data statistics
- **Equipment Grouping**: Categorized management by workshop, type, and status
- **Lifecycle**: Complete records from equipment procurement to disposal

### 2. Fault Management Module
- **Fault Reporting**: Quick fault reporting, fault classification, severity rating
- **Processing Flow**: Fault assignment, processing progress tracking, solution recording
- **Fault Analysis**: Fault statistics analysis, trend prediction, improvement suggestions

### 3. Maintenance Management Module
- **Maintenance Planning**: Regular maintenance plan formulation, reminder notifications
- **Maintenance Records**: Maintenance history records, maintenance cost statistics
- **Maintenance Types**: Preventive maintenance, corrective maintenance, emergency maintenance
- **Maintenance Personnel**: Maintenance personnel scheduling, skill management

### 4. Personnel Management Module
- **User Management**: Multi-role user management, permission control
- **Skill Management**: Personnel skill profiles, training records
- **Work Arrangement**: Work task assignment, shift management
- **Performance Evaluation**: Work efficiency statistics, performance assessment

### 5. Data Visualization Module
- **Real-time Monitoring**: Real-time charts of equipment operating status
- **Statistical Analysis**: Equipment utilization rate, failure rate, maintenance cost analysis
- **Trend Prediction**: Trend analysis based on historical data
- **Report Generation**: Automatic generation of various management reports

### 6. Notification System Module
- **Real-time Notifications**: WebSocket push of various notification messages
- **Notification Types**: System notifications, fault warnings, maintenance reminders
- **Notification Management**: Notification history, read/unread management
- **Message Subscription**: Personalized message subscription settings

## 🔧 Configuration

### Environment Variables

```bash
# Database configuration
DATABASE_URL="mysql://username:password@localhost:3306/factory_db"

# JWT configuration
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# WebSocket configuration
WEBSOCKET_PORT=3001
WEBSOCKET_HOST=0.0.0.0

# File upload configuration
UPLOAD_MAX_SIZE=10485760
UPLOAD_DIR=/app/public/uploads

# Security configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

### Docker Configuration

The system provides complete Docker support:
- **Dockerfile**: Multi-stage build to optimize image size
- **docker-compose.yml**: One-click deployment of application and database
- **deploy.sh**: Automated production environment deployment script

## 🧪 Development Guidelines

### Code Standards
- Use TypeScript for type-safe development
- Follow ESLint code standards
- Use Prettier for code formatting
- Component-based development to improve code reusability

### Database Development
- Use Prisma for database modeling and migration
- Provide database seed data for development and testing
- Support Prisma Studio for visual database management

### API Development
- RESTful API design standards
- JWT authentication mechanism
- Unified error handling and response format
- Automatic API documentation generation

## 📈 Performance Optimization

- **Frontend Optimization**: Code splitting, lazy loading, image optimization
- **Backend Optimization**: Database index optimization, query optimization
- **Caching Strategy**: Reasonable caching mechanism to improve response speed
- **CDN Support**: Static resource CDN acceleration

## 🔒 Security Features

- **Authentication and Authorization**: JWT token authentication, multi-role permission control
- **Data Encryption**: Encrypted storage of sensitive data
- **Input Validation**: Strict input validation and filtering
- **SQL Injection Protection**: Use ORM to prevent SQL injection
- **XSS Protection**: Frontend input/output filtering
- **HTTPS Support**: Support HTTPS encrypted transmission

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browser support

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support and Contact

If you encounter problems or have feature suggestions, please contact us through the following methods:

- Submit an Issue
- Send an email
- Project discussion area

---

**⭐ If this project helps you, please give it a Star to support us!**