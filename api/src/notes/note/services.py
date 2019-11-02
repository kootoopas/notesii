from dataclasses import dataclass
from datetime import datetime
from typing import List

from notes.note.models import Note
from notes.pagination.services import PaginationService
from notes.text.services import ObjectProcessor


@dataclass
class NoteService:

    pagination_service: PaginationService
    body_preprocessor: ObjectProcessor[str]

    def get(self, id: str) -> Note:
        return Note.objects.with_id(id)

    def paginate(self, page: int, size: int) -> List[Note]:
        return list(self.pagination_service.paginate(Note.objects().order_by('-_id'), page, size))

    def search(self, text: str, page: int, size: int) -> List[Note]:
        return list(
            self.pagination_service.paginate(Note.objects.search_text(text).order_by('$text_score'), page, size)
        )

    def create(self, title: str, body: str) -> Note:
        date = datetime.utcnow()
        return Note(
            title=title,
            body=self.body_preprocessor.process(body),
            creation_date=date,
            modification_date=date
        ).save()

    def update(self, id: str, title: str, body: str) -> Note:
        if title is None:
            raise ValueError('note title should be specified')
        if body is None:
            raise ValueError('note body should be specified')

        note = Note.objects.with_id(id)

        if note is None:
            raise RuntimeError('id {} does not match any note'.format(id))

        note.title = title
        note.body = self.body_preprocessor.process(body)
        note.modification_date = datetime.utcnow()
        note.save()
        return note

    def delete(self, id: str) -> Note:
        note = Note.objects.with_id(id)
        note.delete()
        return note
