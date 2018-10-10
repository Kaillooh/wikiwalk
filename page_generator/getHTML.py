import urllib.request

def getHTML(url) :
	mystr=""
	
	try :
		with urllib.request.urlopen(url) as fp :
			mybytes = fp.read()
			mystr = mybytes.decode("utf8")
	except :
		mystr="ERROR DURING DECODING"

	return mystr