from marshmallow import Schema


class BaseSchema(Schema):
    meta = {
        'strict': True
    }
