import os, gc
from PIL import Image
from pillow_heif import register_heif_opener
register_heif_opener()

img_dir = r'c:\Users\orens\OneDrive\שולחן העבודה\alpha marketing projects\eayal colorado\locksmith website eyal colorado\images'
preview_dir = os.path.join(img_dir, '_preview')
os.makedirs(preview_dir, exist_ok=True)

count = 0
for f in sorted(os.listdir(img_dir)):
    ext = os.path.splitext(f)[1].lower()
    if ext in ('.heic', '.jpeg'):
        out_name = os.path.splitext(f)[0] + '.jpg'
        out_path = os.path.join(preview_dir, out_name)
        if os.path.exists(out_path):
            count += 1
            continue
        src = os.path.join(img_dir, f)
        if os.path.isfile(src):
            try:
                img = Image.open(src)
                img.thumbnail((600, 600))
                img = img.convert('RGB')
                img.save(out_path, 'JPEG', quality=60)
                img.close()
                del img
                gc.collect()
                count += 1
                print(f'OK: {f}', flush=True)
            except Exception as e:
                print(f'FAIL: {f} - {e}', flush=True)

print(f'\nTotal: {count} files in _preview/')
