from flask import Flask, request, json
import Slideo
import traceback

app = Flask(__name__)


@app.route("/call/<string:class_name>/<string:method_name>", methods=["POST"])
def call(class_name, method_name):

    if not hasattr(Slideo,class_name):
        return app.response_class(
            response=json.dumps({"Error": "Class not found"}),
            mimetype="application/json",
        )
    class_ = getattr(Slideo, class_name)

    if not hasattr(class_,method_name):
        return app.response_class(
            response=json.dumps({"Error": "Method not found"}),
            mimetype="application/json",
        )
    method = getattr(class_, method_name)

    try:
        response = method(request.json)
    except Exception as e:
        err = traceback.format_exception(etype=type(e), value=e, tb=e.__traceback__)
        return app.response_class(
            response=json.dumps({"Error": "Method error", "traceback": err}),
            mimetype="application/json",
        )

    return app.response_class(
        response=json.dumps(response), mimetype="application/json"
    )


if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
