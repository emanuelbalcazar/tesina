FROM python:3.8.3-slim

ADD . /nlp

WORKDIR /nlp

COPY requirements.txt requirements.txt

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

RUN pip3 install -r requirements.txt

RUN python3 download.py

CMD [ "python3", "./main.py"]
