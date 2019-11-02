FROM python:3.7.5-buster

COPY ./src /api
COPY ./requirements.txt /api/requirements.txt
RUN pip install -r /api/requirements.txt

ENV PYTHONPATH=/api
WORKDIR /api
CMD ["python", "notes/entrypoint.py"]
