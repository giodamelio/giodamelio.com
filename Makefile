THEME=hyde

watch:
	hugo server --port=3141 --theme=$(THEME) --buildDrafts --watch

