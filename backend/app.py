from flask import Flask, render_template
from trading_modules import get_data
from flask_graphql import GraphQLView
import graphene
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


class Symbol(graphene.ObjectType):
    id = graphene.ID()
    symbol= graphene.String()
    name = graphene.String()
    decimal = graphene.Float()

class Query(graphene.ObjectType):
    symbolsList = graphene.List(Symbol)

    def resolve_symbolsList(self, info):
        r = get_data.fcsapi()
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