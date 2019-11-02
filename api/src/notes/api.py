from flask_restplus import Api

"""Exists in separate file to avoid circular reference issue between api and resources."""
api = Api(
    title='notes api',
    version='0.1'
)
