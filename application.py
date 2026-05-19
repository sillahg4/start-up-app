"""
NovaTech Solutions - Python Flask Backend API
Designed for AWS Elastic Beanstalk deployment with RDS, Kinesis, and CloudWatch integration.
"""

import os
import json
import logging
import datetime
import boto3
import pymysql
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

# ── Database Connection ────────────────────────────────────────────────────────
def get_db_connection():
    try:
        connection = pymysql.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME"),
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        return None
# ── App Setup ──────────────────────────────────────────────────────────────────
application = Flask(__name__, static_folder='static', static_url_path='')
CORS(application)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── AWS Kinesis Logger ─────────────────────────────────────────────────────────
def log_activity(event_type, data={}):
    try:
        kinesis = boto3.client("kinesis", region_name=os.getenv("AWS_REGION", "us-east-1"))
        payload = {
            "event_type": event_type,
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "data": data,
        }
        kinesis.put_record(
            StreamName=os.getenv("KINESIS_STREAM_NAME", "start-up-logs"),
            Data=json.dumps(payload),
            PartitionKey="activity",
        )
    except Exception as e:
        logger.warning(f"Kinesis logging skipped: {e}")

# ── Serve React Frontend ───────────────────────────────────────────────────────
@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(application.static_folder, path)):
        return send_from_directory(application.static_folder, path)
    else:
        return send_from_directory(application.static_folder, 'index.html')

# ── Health Check ───────────────────────────────────────────────────────────────
@application.route("/health", methods=["GET"])
def health():
    db_status = "connected"
    conn = get_db_connection()
    if conn is None:
        db_status = "unavailable"
    else:
        conn.close()
    return jsonify({
        "status": "healthy",
        "database": db_status,
        "timestamp": datetime.datetime.utcnow().isoformat()
    })

# ── API: Company Info ──────────────────────────────────────────────────────────
@application.route("/api/company", methods=["GET"])
def company():
    log_activity("page_view", {"page": "company"})
    return jsonify({
        "name": "NovaTech Solutions",
        "tagline": "Powering the next generation of intelligent infrastructure.",
        "founded": 2023,
        "employees": 42,
        "location": "San Francisco, CA",
    })

# ── API: Products ──────────────────────────────────────────────────────────────
@application.route("/api/products", methods=["GET"])
def products():
    log_activity("page_view", {"page": "products"})
    return jsonify([
        {"id": 1, "name": "CloudSync Pro", "description": "Real-time data synchronization across distributed cloud environments with zero downtime.", "category": "Infrastructure", "icon": "cloud"},
        {"id": 2, "name": "SecureVault", "description": "End-to-end encrypted secret management and access control for enterprise teams.", "category": "Security", "icon": "shield"},
        {"id": 3, "name": "DataFlow Analytics", "description": "Stream processing and real-time analytics pipeline built for scale.", "category": "Analytics", "icon": "chart"},
        {"id": 4, "name": "AutoScale Engine", "description": "Intelligent auto-scaling with predictive load balancing and cost optimization.", "category": "Infrastructure", "icon": "zap"},
    ])

# ── API: Team ──────────────────────────────────────────────────────────────────
@application.route("/api/team", methods=["GET"])
def team():
    log_activity("page_view", {"page": "team"})
    return jsonify([
        {"id": 1, "name": "Alexandra Chen", "role": "CEO & Co-Founder", "expertise": "Cloud Architecture"},
        {"id": 2, "name": "Marcus Rivera", "role": "CTO & Co-Founder", "expertise": "Distributed Systems"},
        {"id": 3, "name": "Priya Nair", "role": "Head of Security", "expertise": "Zero Trust Networks"},
        {"id": 4, "name": "Jordan Walsh", "role": "Lead Engineer", "expertise": "AWS Infrastructure"},
    ])

# ── API: Metrics ───────────────────────────────────────────────────────────────
@application.route("/api/metrics", methods=["GET"])
def metrics():
    log_activity("page_view", {"page": "metrics"})
    return jsonify({
        "uptime": "99.99%",
        "customers": 1200,
        "data_processed_tb": 48.7,
        "response_time_ms": 12,
        "regions": 6,
    })

# ── API: Contact Form ──────────────────────────────────────────────────────────
@application.route("/api/contact", methods=["POST"])
def contact():
    body = request.get_json()
    name = body.get("name", "")
    email = body.get("email", "")
    message = body.get("message", "")
    if not all([name, email, message]):
        return jsonify({"error": "All fields are required."}), 400
    log_activity("contact_form_submission", {"name": name, "email": email})
    return jsonify({"success": True, "message": "Thanks! We'll be in touch shortly."})

# ── Entry Point ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    application.run(host="0.0.0.0", port=8000, debug=False)
