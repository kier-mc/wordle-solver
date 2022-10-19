import json

class Wordle():
	def __init__(self):
		self.dict_known = dict()
		self.list_valid = list()
		self.list_wrong = list()
		self.list_words = list()

	def parse(self, payload: dict) -> None:
		# Clear all values when method called
		self.dict_known.clear()
		self.list_valid.clear()
		self.list_wrong.clear()
		# Iterate over JSON payload
		for key, value in payload.items():
			# Expected data format is a JSON object/dictionary containing key/value pairs, where the key contains a letter, an underscore and two trailing digits
			if key[0].lower() == "k" and value != "":
				self.dict_known[int(key[-2:])] = value
			if key[0].lower() == "v" and value != "":
				self.list_valid.append(str(value.lower()))
			if key[0].lower() == "w" and value != "":
				self.list_wrong.append(str(value.lower()))

	def solve(self) -> list:
		# Clear wordlist when method called to avoid result repetition
		self.list_words.clear()
		# Iterate over dictionary file and append results to wordlist
		with open("webapp\solver\dictionary_trimmed.json", "r") as f:
			dictionary = json.load(f)
			for word in dictionary:
				self.list_words.append(word)
		# Create a copy of the list as a tuple for iteration, so original can be modified during the loop
		iterlist = tuple(self.list_words)
		for word in iterlist:
			# Check word against known letters and their indices and remove if not exact
			if not all (self.dict_known[key] == word[key] for key in self.dict_known.keys()):
				self.list_words.remove(word)
			# Remove word if it doesn't contain all letters declared as valid
			if not all ([letter in word for letter in self.list_valid]) and word in self.list_words:
				self.list_words.remove(word)
			# Remove word if any letter has been declared as wrong
			if any ([letter in word for letter in self.list_wrong]) and word in self.list_words:
				self.list_words.remove(word)

		return self.list_words