"""
history_manager.py
--------------------
Very simple "database" for storing patient prediction history.

For a beginner-friendly project, we avoid setting up a real database
(like PostgreSQL/MongoDB) and instead store history as a JSON file on disk.

You can later replace this with a real database without changing
how the rest of the app calls these functions.
"""

import json
import os
from datetime import datetime
from typing import List, Dict

# Path to the JSON file that stores history records
HISTORY_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "history.json")


def _ensure_file_exists():
    """Create an empty history file if it does not exist yet."""
    os.makedirs(os.path.dirname(HISTORY_FILE), exist_ok=True)
    if not os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "w") as f:
            json.dump([], f)


def add_record(filename: str, grade: int, disease_name: str, confidence: float, recommendation: str) -> Dict:
    """Add a new prediction result to the history file."""
    _ensure_file_exists()

    with open(HISTORY_FILE, "r") as f:
        history = json.load(f)

    record = {
        "id": len(history) + 1,
        "filename": filename,
        "grade": grade,
        "disease_name": disease_name,
        "confidence": confidence,
        "recommendation": recommendation,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

    history.append(record)

    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)

    return record


def get_all_records() -> List[Dict]:
    """Return all past prediction records, newest first."""
    _ensure_file_exists()

    with open(HISTORY_FILE, "r") as f:
        history = json.load(f)

    return list(reversed(history))
