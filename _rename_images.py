"""Bulk rename locksmith business images to SEO-friendly descriptive names."""
import os
import shutil

BASE = os.path.join(os.path.dirname(__file__), 'images')

# Mapping: original filename -> new filename (keeps original extension)
RENAME_MAP = {
    # === HEIC files (IMG_xxxx) ===
    'IMG_0010.HEIC': 'commercial-glass-door-hinge-repair.HEIC',
    'IMG_0296.HEIC': 'commercial-door-latch-mechanism.HEIC',
    'IMG_0398.HEIC': 'residential-sliding-door-lock-colorado.HEIC',
    'IMG_0413.HEIC': 'commercial-office-keypad-access-control.HEIC',
    'IMG_0640.HEIC': 'commercial-storefront-deadbolt-indicator-lock.HEIC',
    'IMG_0641.HEIC': 'commercial-glass-door-electric-strike.HEIC',
    'IMG_0642.HEIC': 'commercial-storefront-deadbolt-cylinder.HEIC',
    'IMG_0714.HEIC': 'commercial-smart-lock-lever-handle.HEIC',
    'IMG_0734.HEIC': 'schlage-electronic-smart-lock-installation.HEIC',
    'IMG_0845.HEIC': 'door-closer-mechanism-repair.HEIC',
    'IMG_0846.HEIC': 'door-closer-arm-replacement.HEIC',
    'IMG_0847.HEIC': 'commercial-door-latch-guard-plate.HEIC',
    'IMG_1063.HEIC': 'residential-smart-lock-ring-doorbell.HEIC',
    'IMG_1095.HEIC': 'sliding-patio-door-latch-mechanism.HEIC',
    'IMG_1096.HEIC': 'sliding-patio-door-handle-interior.HEIC',
    'IMG_1097.HEIC': 'sliding-patio-door-handle-exterior-lock.HEIC',
    'IMG_1101.HEIC': 'sliding-door-strike-plate-keeper.HEIC',
    'IMG_1171.HEIC': 'smart-lock-installation-interior-wiring.HEIC',
    'IMG_1173.HEIC': 'schlage-deadbolt-interior-mechanism.HEIC',
    'IMG_1195.HEIC': 'kwikset-smart-lock-deadbolt-installation.HEIC',
    'IMG_1196.HEIC': 'electronic-keypad-deadbolt-bronze.HEIC',
    'IMG_1411.HEIC': 'schlage-touchscreen-lock-commercial-door.HEIC',
    'IMG_1412.HEIC': 'schlage-smart-lock-lever-commercial.HEIC',
    'IMG_1413.HEIC': 'door-frame-repair-after-break-in.HEIC',
    'IMG_1414.HEIC': 'schlage-touchscreen-smart-lock-interior.HEIC',
    'IMG_1425.HEIC': 'commercial-keypad-lock-key-lockbox.HEIC',
    'IMG_1426.HEIC': 'commercial-door-keypad-lock-lockbox.HEIC',
    'IMG_1464.HEIC': 'car-ignition-cylinder-locksmith.HEIC',
    'IMG_1467.HEIC': 'car-door-lock-cylinder.HEIC',
    'IMG_1514.HEIC': 'mortise-lock-set-disassembled-parts.HEIC',
    'IMG_1515.HEIC': 'mortise-lock-components-lever-cylinder.HEIC',
    'IMG_1530.HEIC': 'commercial-door-deadbolt-lever-interior.HEIC',
    'IMG_1724.HEIC': 'commercial-lever-handle-keyed-entry.HEIC',
    'IMG_1735.HEIC': 'commercial-door-latch-guard-installed.HEIC',
    'IMG_1748.HEIC': 'sliding-patio-door-lock-wood-frame.HEIC',
    'IMG_1749.HEIC': 'sliding-door-handle-interior-wood.HEIC',
    'IMG_1750.HEIC': 'sliding-door-handle-repair.HEIC',
    'IMG_1889.HEIC': 'kwikset-keypad-commercial-glass-door.HEIC',
    'IMG_1890.HEIC': 'residential-keypad-deadbolt-handleset.HEIC',
    'IMG_2075.HEIC': 'commercial-panic-bar-fire-door.HEIC',
    'IMG_2076.HEIC': 'commercial-fire-door-lock-installation.HEIC',
    'IMG_2077.HEIC': 'commercial-door-deadbolt-pull-handle.HEIC',
    'IMG_2281.HEIC': 'commercial-storefront-keypad-lock.HEIC',
    'IMG_2356.HEIC': 'residential-door-handleset-interior.HEIC',
    'IMG_2358.HEIC': 'residential-front-door-hinge-colorado.HEIC',
    'IMG_2359.HEIC': 'locksmith-tools-front-door-service.HEIC',
    'IMG_2766.HEIC': 'commercial-glass-door-adams-rite-latch.HEIC',
    'IMG_2767.HEIC': 'commercial-storefront-door-latch-repair.HEIC',
    'IMG_2911.HEIC': 'deadbolt-thumb-turn-replacement.HEIC',
    'IMG_2912.HEIC': 'mortise-cylinder-lock-replacement.HEIC',
    'IMG_2913.HEIC': 'commercial-storefront-glass-door.HEIC',
    'IMG_2914.HEIC': 'commercial-glass-door-pivot-hinge-repair.HEIC',
    'IMG_2915.HEIC': 'commercial-glass-door-bottom-pivot-repair.HEIC',
    'IMG_2916.HEIC': 'commercial-glass-door-pivot-bracket.HEIC',
    'IMG_3540.HEIC': 'commercial-deadbolt-lever-white-door.HEIC',
    'IMG_3541.HEIC': 'commercial-deadbolt-lever-exterior.HEIC',
    'IMG_3542.HEIC': 'commercial-door-lock-installation-interior.HEIC',
    'IMG_3627.HEIC': 'residential-handleset-black-front-door.HEIC',
    'IMG_3628.HEIC': 'residential-handleset-interior-black.HEIC',
    'IMG_3629.HEIC': 'residential-front-door-handleset-closeup.HEIC',
    'IMG_3715.HEIC': 'commercial-deadbolt-lever-matte-black.HEIC',
    'IMG_3718.HEIC': 'commercial-deadbolt-lever-dark-exterior.HEIC',
    'IMG_3719.HEIC': 'residential-smart-deadbolt-lever-black.HEIC',
    'IMG_3720.HEIC': 'residential-deadbolt-handleset-exterior.HEIC',
    'IMG_3721.HEIC': 'residential-schlage-deadbolt-handleset.HEIC',
    'IMG_3730.HEIC': 'door-hinge-replacement-installation.HEIC',
    'IMG_3854.HEIC': 'honda-motorcycle-ignition-lock-keys.HEIC',
    'IMG_3855.HEIC': 'motorcycle-ignition-lock-cylinder-closeup.HEIC',
    'IMG_3856.HEIC': 'motorcycle-ignition-keyhole-closeup.HEIC',
    'IMG_4077.HEIC': 'commercial-door-closer-lever-installation.HEIC',
    'IMG_4116.HEIC': 'residential-keypad-smart-lock-front-door.HEIC',
    'IMG_4117.HEIC': 'residential-smart-lock-front-door-exterior.HEIC',
    'IMG_4259.HEIC': 'commercial-panic-bar-latch-mechanism.HEIC',
    'IMG_4441.HEIC': 'locksmith-dewalt-tough-system-toolbox.HEIC',
    'IMG_5121.HEIC': 'smart-lock-interior-mechanism-repair.HEIC',

    # === Already-named HEIC files (fix typos / standardize) ===
    '2 point panicbar.HEIC': 'two-point-panic-bar-latch-mechanism.HEIC',
    'commercial front door locl.HEIC': 'commercial-front-door-lock.HEIC',
    'commercial glassdoor panicbar.HEIC': 'commercial-glass-door-panic-bar-latch.HEIC',
    'commercial mortis lock.HEIC': 'commercial-mortise-lock-glass-door.HEIC',
    'lever commercial.HEIC': 'commercial-lever-handle-keyed-lock.HEIC',
    'panic bar emergency door.HEIC': 'panic-bar-emergency-exit-mechanism.HEIC',
    'sliding door combinetion lock.HEIC': 'sliding-door-combination-lock-lockey.HEIC',
    'sliding door combinetion lock (2).HEIC': 'sliding-door-combination-lock-exterior.HEIC',
    'sliding door combinetion lock (3).HEIC': 'sliding-door-combination-lock-full-view.HEIC',

    # === JPG files ===
    'car keys.jpg': 'car-key-fobs-replacement.jpg',
    'commercial office smart lock.jpg': 'commercial-office-smart-lock-keypad.jpg',
    'lockset.jpg': 'residential-door-lockset-with-key.jpg',
    'residential smart lock.jpg': 'kwikset-residential-smart-lock.jpg',
    # logo.jpg stays as-is

    # === PNG files ===
    'IMG_0385.PNG': 'antique-trunk-lock-closeup.PNG',
    'IMG_0984.PNG': 'commercial-keypad-access-control-lever.PNG',
    'IMG_1461.PNG': 'safe-lock-cylinder-closeup.PNG',
    'IMG_1462.PNG': 'safe-lock-cylinder-detail.PNG',
    'IMG_1463.PNG': 'safe-lock-keyhole-closeup.PNG',
    'IMG_2524.PNG': 'high-security-lock-cylinder-closeup.PNG',
    'IMG_3361.PNG': 'commercial-storefront-keypad-deadbolt-lock.PNG',
    'IMG_3362.PNG': 'commercial-storefront-electronic-lock.PNG',

    # === MOV files ===
    'IMG_2917.MOV': 'locksmith-service-video.MOV',
    'IMG_4963.MOV': 'locksmith-tools-demo-video.MOV',
}


def main():
    renamed = 0
    skipped = 0
    errors = 0

    for old_name, new_name in RENAME_MAP.items():
        old_path = os.path.join(BASE, old_name)
        new_path = os.path.join(BASE, new_name)

        if not os.path.exists(old_path):
            print(f'  SKIP (not found): {old_name}')
            skipped += 1
            continue

        if os.path.exists(new_path):
            print(f'  SKIP (target exists): {new_name}')
            skipped += 1
            continue

        try:
            os.rename(old_path, new_path)
            print(f'  OK: {old_name}  ->  {new_name}')
            renamed += 1
        except Exception as e:
            print(f'  ERROR: {old_name} -> {e}')
            errors += 1

    print(f'\nDone: {renamed} renamed, {skipped} skipped, {errors} errors')


if __name__ == '__main__':
    main()
