from notes.pagination.factories import queryset_pagination_service
from notes.note.services import NoteService
from notes.text.factories import note_body_preprocessing_pipeline


def note_service() -> NoteService:
    return NoteService(
        pagination_service=queryset_pagination_service(),
        body_preprocessor=note_body_preprocessing_pipeline()
    )
