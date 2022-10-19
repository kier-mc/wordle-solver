from flask import Blueprint, render_template, jsonify, make_response, request
from webapp.wordle import Wordle

appname = "Wordle Solver"

views = Blueprint("views", __name__)

wordle = Wordle()

@views.route("/", methods=["GET"])
def home():
	return render_template("body.html", title=appname)

@views.route("/ajax", methods=["POST"])
def ajaxtest():
	jsdreamphone = dict(request.json)
	wordle.parse(jsdreamphone)
	print("DEBUG PRINTING:")
	print(wordle.dict_known)
	print(wordle.list_valid)
	print(wordle.list_wrong)
	resp = make_response(jsonify(wordle.solve()))
	resp.headers.add("Access-Control-Allow-Origin", "*")
	return resp