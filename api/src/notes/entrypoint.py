import os
from warnings import warn

from mongoengine import connect

from notes.api import api
from notes.factories import flask_application

if __name__ == '__main__':
    missing_env_vars = list(
        {'NOTES_MONGO_URL', 'NOTES_HOST', 'NOTES_PORT', 'NOTES_DEBUG'}.difference(os.environ.keys())
    )
    if missing_env_vars:
        warn('Starting app with defaults for env var(s) {}.'.format(', '.join(missing_env_vars)))

    with connect(host=os.getenv('NOTES_MONGO_URL', 'mongodb://0.0.0.0:27017/notes')):
        flask_application(api).run(
            host=os.getenv('NOTES_HOST', '0.0.0.0'),
            port=int(os.getenv('NOTES_PORT', 8000)),
            debug=os.getenv('NOTES_DEBUG', 'True').lower() is 'true'
        )
