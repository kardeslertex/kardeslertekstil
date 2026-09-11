"""Keep the owner-confirmed address consistent in published files.
Run normally to synchronize existing address occurrences; --check is read-only.
The two page generators read site/data/business.json directly.
"""
from pathlib import Path
import argparse
import json
import re

ROOT = Path(__file__).resolve().parents[1]
ADDRESS = json.loads((ROOT / 'data/business.json').read_text(encoding="utf-8"))['streetAddress']
PATTERN = re.compile(r'Fevzi Çakmak(?: Mahallesi)?, (?:Ulukapı (?:Sk\.|Sokak)|Manolya Sokak)(?: No:)? (?:11-12/A|11/A ve 12/A)')

def main():
    check = argparse.ArgumentParser()
    check.add_argument('--check', action='store_true')
    args = check.parse_args()
    changed = []
    for path in sorted(ROOT.rglob('*')):
        if path.suffix not in ('.html', '.txt') or not path.is_file():
            continue
        source = path.read_text(encoding="utf-8")
        updated = PATTERN.sub(ADDRESS, source)
        if updated != source:
            changed.append(str(path.relative_to(ROOT)))
            if not args.check:
                path.write_text(updated, encoding="utf-8")
    if args.check and changed:
        raise SystemExit('Outdated business address: ' + ', '.join(changed))
    print(('Checked' if args.check else 'Updated') + f' business address: {len(changed)} files need synchronization.')

if __name__ == '__main__':
    main()
