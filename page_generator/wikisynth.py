#! /usr/bin/python3
# -*- coding: utf-8 -*-
__author__    = "Pierre Etheve"
__email__  = "pierre.etheve.lfdv@gmail.com"

from getHTML import getHTML

def getLocalHTML(path) :
	with open(path, 'r') as infile :
		return infile.read()

def getFirstIntersection(start, end, txt) :
	intersection = ""
	for bit in txt.split(start)[1:] :
		intersection+=bit

	intersection = intersection.split(end)[0]
	return start+intersection+end

def getOverview(HTML) :
	interest_zone = getFirstIntersection("infobox_v3", "toc", HTML)
	interest_zone = getFirstIntersection("</p></div>", "toc", interest_zone)
	interest_zone = getFirstIntersection("<p>", "<div", interest_zone)
	interest_zone = interest_zone[:-4]
	return interest_zone

def getSection(title, HTML) :
	interest_zone = getFirstIntersection("mw-headline", "</body>", HTML)
	# print(interest_zone)
	i=0
	for bit in interest_zone.split("<h2>") :
		i+=1
		# print("BIT #%d : \n%s\n\n"%(i, bit))
		if title in bit :
			return "<h2>"+bit

def generate_short(name) :
	out = ""
	HTML = getHTML("https://fr.wikipedia.org/wiki/%s"%name)
	head = getLocalHTML("head.txt")
	out+=head

	out += "\n\n"
	out += getFirstIntersection("<h1", "</h1>", getFirstIntersection("<body", "</body>", HTML))
	# out += getFirstIntersection("<div id=\"bodyContent", ">", HTML)
	# out += getFirstIntersection("<div id=\"mw-content-text", "put\">", HTML)
	out += "\n\n"
	out += '<div id="bodyContent" class="mw-body-content"><div id="mw-content-text" lang="fr" dir="ltr" class="mw-content-ltr"><div class="mw-parser-output">'
	out += "\n\n"
	out += getOverview(HTML)
	# out += getSection("Prix", HTML)
	out += "\n\n"
	out += "</div></div>"
	out += "\n\n"
	out += "</body>"

	with open("gen/%s.html"%name.replace("%", ""), "w") as outfile :
		outfile.write(out)

names = ['Bertrand_Lavier', 'Jean_Dubuffet', 'Fran%C3%A7ois-Ren%C3%A9_de_Chateaubriand', 'Michel_Ciry', 'Paul_Delaroche', 'Michel_Moskovtchenko', 'Joseph_Beuys', '%C3%89ric_Darragon', 'Jean_de_Loisy_(commissaire_d%27exposition)', 'Jean_Revol', 'Dominique_Gonzalez-Foerster', 'Edmond_Boissonnet', 'Alphonse_de_Lamartine', 'Alain_Borer', 'Napol%C3%A9on', 'Pierre_Huyghe', 'Anish_Kapoor', 'Edward_Hopper', 'Albert_Decaris', 'Caspar_David_Friedrich', 'Joseph_Fourier', 'Emmanuel_de_Pastoret', 'Ren%C3%A9_Deroudille', '%C3%89douard_Manet', 'Carl_Gustav_Carus', '%C3%89douard_Pignon', 'Albert_Besnard', 'Maximilien_Vox', 'Andr%C3%A9_Lhote', 'Camille_Henrot', 'Jacques_Vimard_(peintre)', 'Eug%C3%A8ne_Delacroix']

for name in names :
	print("Generating content for %s..."%name)
	generate_short(name)