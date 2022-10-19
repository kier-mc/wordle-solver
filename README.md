<h1>Wordle Solver</h1>
<h2>A front end tool to solve Wordle, running on Python/Flask</h2>
<h3>Dependencies</h3>
<ul>
<li>Python 3.10.5</li>
<li>Flask 2.1.3</li>
</ul>
<h3>Utilisation</h3>
<ol>
<li>Make sure you have the required dependencies installed and clone the repository</li>
<li>Run "main.py" to initialise the server and navigate to localhost:5000</li>
<li>Open up an iteration of <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank">Wordle</a> and make a guess</li>
<ul>
<li>TIP: Words that contain commonly-used letters or many vowels are good starting choices e.g. "SLATE", "TREAD"</li>
</ul>
<li>Analyse the feedback and enter the letters into the corresponding sections</li>
<ul>
<li>Letters with a known position (green) should be entered into the first section in the order they appear</li>
<li>Letters that are valid but in the wrong position (yellow) should be entered into the next section</li>
<li>Any letters that do not appear (grey) should be entered into the final section</li>
</ul>
<li>Press "Submit" to return a list of words that match the criteria</li>
<li>Repeat the process to reduce the list of words until you find the correct one</li>
</ol>
<h3>Limitations</h3>
<ol>
<li>The valid letters are not indexed, so if you tried a word such as "SLATE" and received feedback that "L" was valid but not in the right position, the tool will still return words where the second letter is "L" i.e. word[1] == "L"</li>
<li>The tool does not currently make any allocations for letters appearing more than once such as "ADDED"</li>
</ol>
<h3>Technical</h3>
<p>
The tool returns user feedback to the Flask back end using an async/await callback function, which is parsed and compared to a JSON file containing around 5000 different words. The output is then JSONified and returned to the front end, where it is parsed once more, iterated upon and pushed to the page.
</p>
