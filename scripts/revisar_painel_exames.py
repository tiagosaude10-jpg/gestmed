from pathlib import Path
import base64
import zlib

parts_dir = Path(__file__).with_name('painel_exames_parts')
parts = [parts_dir / f'part{i}.txt' for i in range(1, 6)]
missing = [str(part) for part in parts if not part.exists()]
if missing:
    raise FileNotFoundError('Partes ausentes: ' + ', '.join(missing))

payload = ''.join(part.read_text(encoding='utf-8').strip() for part in parts)
source = zlib.decompress(base64.b64decode(payload)).decode('utf-8')
exec(compile(source, 'painel_exames_payload.py', 'exec'))

# Aplica sempre a camada final validada: vacinas completas e orientação clara
# sobre HBsAg, impedindo que o painel antigo volte em futuras atualizações.
patch_path = Path(__file__).with_name('corrigir_painel_exames_vacinas.py')
patch_source = patch_path.read_text(encoding='utf-8')
exec(compile(patch_source, str(patch_path), 'exec'))
