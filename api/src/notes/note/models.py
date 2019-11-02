from mongoengine import Document, fields

from notes.common.models import BaseMeta


class Note(Document, BaseMeta):
    title = fields.StringField()
    body = fields.StringField()
    creation_date = fields.DateTimeField()
    modification_date = fields.DateTimeField()

    meta = {**BaseMeta.meta, 'indexes': [
        {'fields': ['$title', "$body"],
            'default_language': 'english',
            'weights': {'title': 100, 'body': 20}
        }
    ]}
