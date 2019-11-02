from marshmallow import fields

from notes.common.schemas import BaseSchema


class NoteSchema(BaseSchema):
    id = fields.Str()
    title = fields.Str()
    body = fields.Str()
    creation_date = fields.DateTime()
    modification_date = fields.DateTime()


class NoteCreationInputSchema(BaseSchema):
    title = fields.Str()
    body = fields.Str()


class NoteFilterSchema(BaseSchema):
    text = fields.Str(
        missing=None
    )
    page = fields.Int()
    size = fields.Int()
