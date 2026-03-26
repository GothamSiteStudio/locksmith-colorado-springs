"""Convert all HEIC, large PNG, and large JPEG files to optimized web-ready JPG."""
import os
from pathlib import Path
from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()

IMG_DIR = Path(__file__).parent / "images"
MAX_WIDTH = 1200
QUALITY = 82

converted = 0
skipped = 0

for f in sorted(IMG_DIR.iterdir()):
    if f.is_dir():
        continue
    ext = f.suffix.lower()
    
    # Skip logo, MOV, already-small jpg files
    if f.name == "logo.jpg":
        continue
    if ext == ".mov":
        continue
    
    # Target: .heic, large .png, large .jpeg
    if ext in (".heic", ".png", ".jpeg"):
        out_path = f.with_suffix(".jpg")
        if out_path.exists() and f.suffix != ".jpg":
            print(f"SKIP (jpg exists): {f.name}")
            skipped += 1
            continue
        
        try:
            img = Image.open(f)
            img = img.convert("RGB")
            
            # Resize if wider than MAX_WIDTH
            if img.width > MAX_WIDTH:
                ratio = MAX_WIDTH / img.width
                new_h = int(img.height * ratio)
                img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
            
            img.save(out_path, "JPEG", quality=QUALITY, optimize=True)
            size_kb = out_path.stat().st_size / 1024
            print(f"OK: {f.name} -> {out_path.name} ({size_kb:.0f} KB)")
            converted += 1
        except Exception as e:
            print(f"ERROR: {f.name} - {e}")
    else:
        # Small existing .jpg files - skip
        if ext == ".jpg":
            skipped += 1

print(f"\nDone: {converted} converted, {skipped} skipped")
