"""Fetch Google reviews into a local JSON file for the static site.

Supported modes:
1. Google Places API (new) using GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID
2. Any existing reviews API using GOOGLE_REVIEWS_ENDPOINT and optional
   GOOGLE_REVIEWS_HEADERS as a JSON object string

The script writes normalized output to assets/data/google-reviews.json so the
website can load real reviews without exposing API credentials in the browser.
"""

from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib import error, request


PROJECT_ROOT = Path(__file__).resolve().parent
OUTPUT_PATH = PROJECT_ROOT / "assets" / "data" / "google-reviews.json"
GOOGLE_PROFILE_URL = "https://maps.app.goo.gl/x9CZTwCN2YEvm28m9"


def load_dotenv_file(path: Path) -> None:
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()

        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")

        if key and key not in os.environ:
            os.environ[key] = value


def fetch_json(url: str, headers: dict[str, str] | None = None) -> dict[str, Any]:
    req = request.Request(url, headers=headers or {})

    with request.urlopen(req, timeout=30) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        body = response.read().decode(charset)
        return json.loads(body)


def normalize_review(review: dict[str, Any]) -> dict[str, Any]:
    author = review.get("authorAttribution") or {}

    return {
        "authorName": review.get("authorName") or author.get("displayName") or "Google customer",
        "rating": review.get("rating") or 5,
        "text": review.get("text", {}).get("text") if isinstance(review.get("text"), dict) else review.get("text", ""),
        "publishTime": review.get("publishTime") or review.get("createTime") or "",
        "relativePublishTimeDescription": review.get("relativePublishTimeDescription") or "",
        "profilePhotoUri": review.get("profilePhotoUri") or author.get("photoUri") or ""
    }


def normalize_places_payload(payload: dict[str, Any]) -> dict[str, Any]:
    display_name = payload.get("displayName") or {}

    return {
        "businessName": display_name.get("text") or "Locksmith Solutions LLC",
        "rating": payload.get("rating") or 5,
        "userRatingCount": payload.get("userRatingCount") or 0,
        "source": "Google Business Profile",
        "sourceUrl": payload.get("googleMapsUri") or GOOGLE_PROFILE_URL,
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "reviews": [normalize_review(review) for review in payload.get("reviews", []) if review.get("text") or review.get("originalText")]
    }


def normalize_custom_payload(payload: dict[str, Any]) -> dict[str, Any]:
    reviews = payload.get("reviews", []) if isinstance(payload.get("reviews"), list) else []

    return {
        "businessName": payload.get("businessName") or payload.get("name") or "Locksmith Solutions LLC",
        "rating": payload.get("rating") or 5,
        "userRatingCount": payload.get("userRatingCount") or payload.get("reviewCount") or len(reviews),
        "source": payload.get("source") or "Google Business Profile",
        "sourceUrl": payload.get("sourceUrl") or payload.get("googleMapsUri") or GOOGLE_PROFILE_URL,
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "reviews": [
            {
                "authorName": review.get("authorName") or review.get("author") or "Google customer",
                "rating": review.get("rating") or 5,
                "text": review.get("text") or review.get("comment") or "",
                "publishTime": review.get("publishTime") or review.get("date") or "",
                "relativePublishTimeDescription": review.get("relativePublishTimeDescription") or "",
                "profilePhotoUri": review.get("profilePhotoUri") or ""
            }
            for review in reviews
            if review.get("text") or review.get("comment")
        ]
    }


def sync_from_google_places() -> dict[str, Any]:
    api_key = os.getenv("GOOGLE_PLACES_API_KEY", "").strip()
    place_id = os.getenv("GOOGLE_PLACE_ID", "").strip()

    if not api_key or not place_id:
        raise ValueError("Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID.")

    url = f"https://places.googleapis.com/v1/places/{place_id}"
    headers = {
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews,googleMapsUri"
    }

    return normalize_places_payload(fetch_json(url, headers))


def sync_from_custom_endpoint() -> dict[str, Any]:
    endpoint = os.getenv("GOOGLE_REVIEWS_ENDPOINT", "").strip()

    if not endpoint:
        raise ValueError("Missing GOOGLE_REVIEWS_ENDPOINT.")

    raw_headers = os.getenv("GOOGLE_REVIEWS_HEADERS", "").strip()
    headers = json.loads(raw_headers) if raw_headers else {}
    return normalize_custom_payload(fetch_json(endpoint, headers))


def write_output(payload: dict[str, Any]) -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> int:
    try:
        load_dotenv_file(PROJECT_ROOT / ".env.local")

        if os.getenv("GOOGLE_REVIEWS_ENDPOINT", "").strip():
            payload = sync_from_custom_endpoint()
        else:
            payload = sync_from_google_places()

        write_output(payload)
        print(f"Saved {len(payload.get('reviews', []))} reviews to {OUTPUT_PATH}")
        return 0
    except (ValueError, json.JSONDecodeError) as exc:
        print(f"Configuration error: {exc}", file=sys.stderr)
        return 1
    except error.HTTPError as exc:
        print(f"HTTP error: {exc.code} {exc.reason}", file=sys.stderr)
        return 1
    except error.URLError as exc:
        print(f"Network error: {exc.reason}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())