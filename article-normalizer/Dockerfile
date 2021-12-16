FROM kuralabs/python3-dev

ADD . /nlp

WORKDIR /nlp

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

RUN python3 download.py

CMD [ "python3", "main.py"]
