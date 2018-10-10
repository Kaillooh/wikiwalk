#! /usr/bin/python3
# -*- coding: utf-8 -*-
__author__    = "Pierre Etheve"
__email__  = "pierre.etheve.lfdv@gmail.com"

def getTXT() :
	with open("relation_tree.dot", "r") as infile :
		return infile.read()

def getRelArray() : 
	rels = []
	for line in getTXT().splitlines() :
		if "{" in line or "}" in line :
			pass
		elif line == "" :
			pass
		else :
			bits = line.split('"')
			rels.append([bits[1],bits[3]])
			rels.append([bits[3],bits[1]])
	return rels

def arrayToDict(array) :
	dct = {}
	for item in array :
		if item[0] in dct.keys() :
			if item[1] not in dct[item[0]] :
				dct[item[0]].append(item[1])
		else :
			dct[item[0]] = [item[1]]
	return dct

def arrayToString(array) :
	out = "["
	for item in array :
		out += "'%s', "%item.replace("%", "")
	out = out[:-2]+"]"
	return out

def toJS(dct) :
	for k in dct.keys() :
		line = "rels['%s'] = %s"%(k.replace("%", ""), arrayToString(dct[k]))
		print(line)

def printJSDict() :
	dct = arrayToDict(getRelArray())
	toJS(dct)

def printNameArray() :
	dct = arrayToDict(getRelArray())
	names = dct.keys()
	names = list(set(names))
	print(arrayToString(names))

printJSDict()