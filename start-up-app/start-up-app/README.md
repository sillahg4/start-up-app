# NovaTech Solutions

A full-stack cloud-native web application built with **React** (frontend) and **Python/Flask** (backend API), deployed on **AWS** using a production-grade, highly available architecture.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router, Axios |
| Backend | Python 3.11, Flask, Gunicorn |
| Hosting | AWS Elastic Beanstalk (Auto Scaling: 2–4 EC2 instances) |
| CDN | AWS CloudFront (global edge caching) |
| Database | AWS RDS MySQL (Multi-AZ, automated backups) |
| Storage | AWS S3 (private, CloudFront OAC) |
| CI/CD | AWS CodePipeline + CodeBuild |
| Logging | AWS Kinesis Data Streams + Firehose |
| Monitoring | AWS CloudWatch Dashboard |
| Networking | AWS VPC (public + private subnets, security groups) |
| IaC | AWS CloudFormation |

## Architecture

```
Users → CloudFront CDN → Application Load Balancer
                      ↓
           Elastic Beanstalk (2–4 EC2 instances)
           React Frontend + Python Flask API
                      ↓
              RDS MySQL (Private Subnet)
                      ↓
         Kinesis → Firehose → S3 → CloudWatch
```

## Features

- **Secure VPC** — public/private subnet isolation; database unreachable from internet
- **Auto Scaling** — minimum 2, maximum 4 EC2 instances based on load
- **High Availability** — Multi-AZ load balancer with automatic health-check failover
- **CI/CD Pipeline** — auto-deploys on every push to `main` branch
- **Global CDN** — CloudFront distributes content from 200+ edge locations
- **Disaster Recovery** — AMI snapshots + RDS automated backups
- **Analytics Pipeline** — activity logs streamed via Kinesis, stored as CSV, visualized in CloudWatch

## Local Development

### Backend
```bash
pip install -r requirements.txt
python application.py
```
API runs on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm start
```
App runs on http://localhost:3000

## Environment Variables

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend API URL (leave empty for same-origin) |
| `AWS_REGION` | AWS region (default: us-east-1) |
| `KINESIS_STREAM_NAME` | Kinesis stream name for activity logging |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check (used by Elastic Beanstalk ALB) |
| GET | `/api/company` | Company information |
| GET | `/api/products` | Product listings |
| GET | `/api/team` | Team members |
| GET | `/api/metrics` | Platform metrics |
| POST | `/api/contact` | Contact form submission |

---

Built as part of an AWS Solutions Architect project demonstrating secure, scalable, highly available cloud infrastructure.
