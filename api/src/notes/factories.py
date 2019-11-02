from flask import Flask, Blueprint
from flask_cors import CORS
from flask_restplus import Api

from notes.note.resources import notes_ns


def flask_application(api: Api) -> Flask:
    application = Flask('notes')

    CORS(app=application, origins='*')

    api.add_namespace(notes_ns)
    blueprint = Blueprint(
        name='notes',
        import_name='notes',
        url_prefix='/api/v1'
    )
    api.init_app(blueprint)
    application.register_blueprint(blueprint)

    return application
