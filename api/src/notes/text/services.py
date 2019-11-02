from abc import ABC
from dataclasses import dataclass
from typing import List, TypeVar, Generic

T = TypeVar('T')

# TODO: Find how to associate generic of extended abstract class with type of member (method)
class ObjectProcessor(ABC, Generic[T]):
    def process(self, obj: T) -> T:
        pass


@dataclass
class TextProcessingPipeline(ObjectProcessor[str]):
    processors: List[ObjectProcessor[str]]

    def process(self, text: str) -> str:
        for processor in self.processors:
            text = processor.process(text)
        return text


class CorrectiveTransliterator(ObjectProcessor):
    def process(self, text: str) -> str:
        return text
