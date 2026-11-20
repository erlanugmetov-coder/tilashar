# Инструменты Тілашара

Все тесты — Playwright (`pip install playwright --break-system-packages && playwright install chromium`), окно 390×844, сеть блокируется (только file:). Пути внутри скриптов указывают на старую рабочую папку (`/home/claude/v53/out_fresh53.html`) — поправить на свой файл.

| Файл | Что делает |
|---|---|
| lint.py | тексты: нет чисел словами («двадцать пять» → «25») и др.; ждёт «ЧИСТО» |
| syn_check.py | близкие по смыслу слова не стоят вариантами в одном задании |
| voice_coverage.py | все казахские слова уроков темы есть в `SNDW` (MISSING []) — поменять номер темы |
| autoplay.py | автопрогон всех уроков темы до конца (FINAL OK) |
| order_check.py | порядок тем, прилёты в районы, открытие следующей темы |
| world_map.py | рендер всей карты города в png |
| card_shot.py | скриншоты карточек темы |
| smoke.py | открыть страницу, текст + ошибки |
| make_test.py | собрать тестовую ссылку из главного index.html (сид: Темы 1–3 пройдены) |
| voice_seg.py | `python3 voice_seg.py nX.mp3 N` — нарезать ответ ElevenLabs на N слов по паузам |
| voice_append.py | дописать нарезанные слова к спрайту (kkNN.wav/json → новый), потом ffmpeg → kkNN.mp3 |

Озвучка: ElevenLabs flow gVkuaI4IXBDJNZ6JCvvG, голос Pbk8E6dlpCANrnpOLIns, eleven_v3, «Слово.» по строке. Подробности — документ проекта `claude/tilashar-kak-prodolzhit.md`.

Спрайт: `k21.json` — карта слов текущего спрайта (то же, что SNDW). Несжатого k21.wav нет — получить из kk21.mp3: `ffmpeg -i kk21.mp3 -ac 1 -ar 22050 k21.wav`, затем voice_append.py (поменять k20→k21, k21→k22).
