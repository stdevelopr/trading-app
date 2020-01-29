from flask import Flask, render_template
from trading_modules import get_data
from flask_graphql import GraphQLView
import graphene
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

import datetime
from graphene.types import Scalar
from graphql.language import ast

class DateT(Scalar):
    '''DateTime Scalar Description'''

    @staticmethod
    def serialize(dt):
        return dt

    @staticmethod
    def parse_literal(node):
        if isinstance(node, ast.StringValue):
            return datetime.datetime.strptime(
                node.value, "%Y-%m-%dT%H:%M:%S.%f")

    @staticmethod
    def parse_value(value):
        return datetime.datetime.strptime(value, "%Y-%m-%dT%H:%M:%S.%f")

class Hist300(graphene.ObjectType):
    o = graphene.String()
    h = graphene.String()
    l = graphene.String()
    c = graphene.Float()
    t = graphene.Field(DateT)
    tm = graphene.Field(DateT)

class Symbol(graphene.ObjectType):
    id = graphene.ID()
    symbol= graphene.String()
    name = graphene.String()
    decimal = graphene.Float()

class Query(graphene.ObjectType):
    symbolsList = graphene.List(Symbol)
    getHist300 = graphene.List(Hist300, symbol=graphene.String())

    def resolve_symbolsList(self, info):
        r = get_data.fcsapi()
        return r['response']

    def resolve_getHist300(self, info, symbol):
        r = get_data.hist_300(symbol)
        return r['response']


schema = graphene.Schema(query=Query)

app.add_url_rule("/graphql", view_func=GraphQLView.as_view(
    "graphql",
    schema = schema,
    graphiql=True 
))

@app.route("/")
def main():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)