from abc import ABC, abstractmethod
from typing import Iterable

from mongoengine import QuerySet


class PaginationService(ABC):
    @abstractmethod
    def paginate(self, collection: Iterable, page: int, size: int) -> Iterable:
        pass


class QuerySetPaginationService(PaginationService):
    def paginate(self, collection: QuerySet, page: int, size: int) -> QuerySet:
        # TODO: validate page and size
        start = page * size
        end = page * size + size
        return collection[start:end]
