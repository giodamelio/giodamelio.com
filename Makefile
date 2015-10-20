watch:
	hugo server --port=3141 --buildDrafts --watch

publish-http:
	rsync -r public/ websites@104.236.129.166:blog.giodamelio.com

