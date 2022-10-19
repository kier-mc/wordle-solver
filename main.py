#!/usr/bin/python
from webapp import createApp

app = createApp()

if __name__ == "__main__":
	app.run(debug=True)