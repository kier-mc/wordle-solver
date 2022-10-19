#!/usr/bin/python
from flask import Flask

def createApp():
	app = Flask(__name__)

	app.config["SECRET_KEY"] = "65d97901d3a34a6bb3da575f7e7c0f05415253e9608440ca87470d0822a7726c"
	app.config["SESSION_COOKIE_SECURE"] = True
	app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

	from webapp.views import views

	app.register_blueprint(views, url_prefix="/")

	return app