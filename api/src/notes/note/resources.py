from typing import List

from flask_restplus import Resource

from notes.api import api
from notes.note.factories import note_service
from notes.note.models import Note as NoteModel
from notes.note.schemas import NoteSchema, NoteFilterSchema, NoteCreationInputSchema
from notes.utilities import map_output, map_kwargs

notes_ns = api.namespace('notes')


@notes_ns.route('')
class Notes(Resource):

    @map_kwargs(NoteFilterSchema())
    @map_output(NoteSchema(many=True))
    def get(self, text: str, page: int, size: int) -> List[NoteModel]:
        if text:
            return note_service().search(text, page, size)
        return note_service().paginate(page, size)

    @map_kwargs(NoteCreationInputSchema())
    @map_output(NoteSchema())
    def post(self, title: str, body: str) -> NoteModel:
        return note_service().create(title, body)


@notes_ns.route('/<id>')
class Note(Resource):

    @map_output(NoteSchema())
    def get(self, id: str) -> NoteModel:
        return note_service().get(id)

    @map_kwargs(NoteCreationInputSchema())
    @map_output(NoteSchema())
    def put(self, id: str, title: str, body: str) -> NoteModel:
        return note_service().update(id, title, body)

    @map_kwargs(NoteCreationInputSchema())
    @map_output(NoteSchema())
    def delete(self, id: str) -> NoteModel:
        return note_service().delete(id)
