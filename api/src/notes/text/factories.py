from notes.text.services import CorrectiveTransliterator, TextProcessingPipeline


def corrective_transiterator() -> CorrectiveTransliterator:
    return CorrectiveTransliterator()


def note_body_preprocessing_pipeline() -> TextProcessingPipeline:
    return TextProcessingPipeline(
        processors=[corrective_transiterator()]
    )
