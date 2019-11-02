from typing import Callable, Any

from flask import jsonify
from marshmallow.utils import _Missing
from webargs.flaskparser import use_kwargs

from notes.common.schemas import BaseSchema


def map_kwargs(schema: BaseSchema) -> Callable:
    def decorator(func: Callable) -> Callable:
        @use_kwargs(schema)
        def wrapper(*args: Any, **kwargs: Any) -> None:
            # TODO: Recursively check nested dirs for _Missing and replace with None.
            for key in kwargs:
                if isinstance(kwargs[key], _Missing):
                    kwargs[key] = None
            return func(*args, **kwargs)
        return wrapper
    return decorator


def map_output(schema: BaseSchema) -> Callable:
    def decorator(func: Callable) -> Callable:
        def wrapper(*args: Any, **kwargs: Any) -> str:
            output = func(*args, **kwargs)
            return jsonify((schema.dump(output)))
        return wrapper
    return decorator
