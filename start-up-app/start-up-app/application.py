"""
NovaTech Solutions - Python Flask Backend API
Designed for AWS Elastic Beanstalk deployment with RDS, Kinesis, and CloudWatch integration.
"""

import os
import json
import logging
import datetime
import boto3
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

# ── App Setup ──────────────────────────────────────────────────────────────────
application = Flask(__name__)
CORS(application)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── AWS Kinesis Logger ─────────────────────────────────────────────────────────
def log_activity(event_type, data={}):
    """Stream activity logs to Kinesis Data Stream for analytics pipeline."""
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


# ── Health Check (Required by Elastic Beanstalk Load Balancer) ─────────────────
@application.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "timestamp": datetime.datetime.utcnow().isoformat()})


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


# ── API: Products / Services ───────────────────────────────────────────────────
@application.route("/api/products", methods=["GET"])
def products():
    log_activity("page_view", {"page": "products"})
    return jsonify([
        {
            "id": 1,
            "name": "CloudSync Pro",
            "description": "Real-time data synchronization across distributed cloud environments with zero downtime.",
            "category": "Infrastructure",
            "icon": "cloud",
        },
        {
            "id": 2,
            "name": "SecureVault",
            "description": "End-to-end encrypted secret management and access control for enterprise teams.",
            "category": "Security",
            "icon": "shield",
        },
        {
            "id": 3,
            "name": "DataFlow Analytics",
            "description": "Stream processing and real-time analytics pipeline built for scale.",
            "category": "Analytics",
            "icon": "chart",
        },
        {
            "id": 4,
            "name": "AutoScale Engine",
            "description": "Intelligent auto-scaling with predictive load balancing and cost optimization.",
            "category": "Infrastructure",
            "icon": "zap",
        },
    ])


# ── API: Team Members ──────────────────────────────────────────────────────────
@application.route("/api/team", methods=["GET"])
def team():
    log_activity("page_view", {"page": "team"})
    return jsonify([
        {"id": 1, "name": "Alexandra Chen", "role": "CEO & Co-Founder", "expertise": "Cloud Architecture"},
        {"id": 2, "name": "Marcus Rivera", "role": "CTO & Co-Founder", "expertise": "Distributed Systems"},
        {"id": 3, "name": "Priya Nair", "role": "Head of Security", "expertise": "Zero Trust Networks"},
        {"id": 4, "name": "Jordan Walsh", "role": "Lead Engineer", "expertise": "AWS Infrastructure"},
    ])


# ── API: Metrics / Stats ───────────────────────────────────────────────────────
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
    logger.info(f"Contact form submitted by {name} <{email}>")

    return jsonify({"success": True, "message": "Thanks! We'll be in touch shortly."})


# ── Entry Point ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    application.run(host="0.0.0.0", port=5000, debug=False)
