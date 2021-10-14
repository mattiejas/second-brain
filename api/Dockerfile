# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONUNBUFFERED=1
RUN pip install pipenv
WORKDIR /code
COPY Pipfile* /code/
RUN pipenv install --system --deploy --ignore-pipfile
COPY . /code/