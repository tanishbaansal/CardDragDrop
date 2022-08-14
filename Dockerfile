FROM tiangolo/uvicorn-gunicorn-starlette:python3.9

COPY ./backend/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./backend /app