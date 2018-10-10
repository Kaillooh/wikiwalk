last_top = 0;
last_left = 0;
last_direction = 0;
n=0;
relations = loadRelations()
current = ""
previous = ""
goal = ""
time_step = 1000
i=1

function openContent(URL, left, top){
	var node = document.createElement("iframe");
	node.setAttribute("style", "width:400px;height:400px;left:"+left+"px;top:"+top+"px;position:absolute;")
	node.setAttribute("frameBorder", "0")
	node.setAttribute("scrolling", "no")
	node.setAttribute("class", "wiki_content")
	node.setAttribute("id", "wiki"+i)
	node.setAttribute("src", URL)
	document.body.appendChild(node)
	window.setTimeout("document.getElementById('wiki"+i+"').classList.add('visible')", 50)
	i++
}

function loadRelations(){
	var rels = new Object();
	rels['NapolC3A9on'] = ['Maximilien_Vox', 'Joseph_Fourier']
	rels['RenC3A9_Deroudille'] = ['Jacques_Vimard_(peintre)', 'Michel_Moskovtchenko', 'Jean_Dubuffet']
	rels['C389douard_Pignon'] = ['Jacques_Vimard_(peintre)', 'AndrC3A9_Lhote']
	rels['Paul_Delaroche'] = ['EugC3A8ne_Delacroix', 'Emmanuel_de_Pastoret']
	rels['Emmanuel_de_Pastoret'] = ['Paul_Delaroche', 'Joseph_Fourier']
	rels['Caspar_David_Friedrich'] = ['Edward_Hopper', 'Jean_Revol']
	rels['Michel_Moskovtchenko'] = ['RenC3A9_Deroudille', 'Maximilien_Vox']
	rels['Carl_Gustav_Carus'] = ['EugC3A8ne_Delacroix', 'FranC3A7ois-RenC3A9_de_Chateaubriand']
	rels['C389douard_Manet'] = ['EugC3A8ne_Delacroix', 'C389ric_Darragon']
	rels['Michel_Ciry'] = ['Edmond_Boissonnet', 'Albert_Decaris']
	rels['Jacques_Vimard_(peintre)'] = ['Alain_Borer', 'RenC3A9_Deroudille', 'C389douard_Pignon']
	rels['Camille_Henrot'] = ['Jean_de_Loisy_(commissaire_d27exposition)', 'Pierre_Huyghe']
	rels['Joseph_Beuys'] = ['Anish_Kapoor', 'Alain_Borer']
	rels['Albert_Decaris'] = ['Michel_Ciry', 'Albert_Besnard']
	rels['Jean_de_Loisy_(commissaire_d27exposition)'] = ['Camille_Henrot', 'Anish_Kapoor']
	rels['Albert_Besnard'] = ['Albert_Decaris', 'Alphonse_de_Lamartine']
	rels['Edmond_Boissonnet'] = ['AndrC3A9_Lhote', 'Michel_Ciry']
	rels['Edward_Hopper'] = ['C389ric_Darragon', 'Caspar_David_Friedrich']
	rels['C389ric_Darragon'] = ['C389douard_Manet', 'Edward_Hopper']
	rels['Anish_Kapoor'] = ['Jean_de_Loisy_(commissaire_d27exposition)', 'Joseph_Beuys']
	rels['FranC3A7ois-RenC3A9_de_Chateaubriand'] = ['Carl_Gustav_Carus', 'Joseph_Fourier']
	rels['Bertrand_Lavier'] = ['Dominique_Gonzalez-Foerster', 'AndrC3A9_Lhote']
	rels['EugC3A8ne_Delacroix'] = ['AndrC3A9_Lhote', 'Paul_Delaroche', 'Carl_Gustav_Carus', 'C389douard_Manet']
	rels['Dominique_Gonzalez-Foerster'] = ['Pierre_Huyghe', 'Bertrand_Lavier']
	rels['Jean_Revol'] = ['Caspar_David_Friedrich', 'Jean_Dubuffet']
	rels['Joseph_Fourier'] = ['NapolC3A9on', 'Alphonse_de_Lamartine', 'Emmanuel_de_Pastoret', 'FranC3A7ois-RenC3A9_de_Chateaubriand']
	rels['Alain_Borer'] = ['Joseph_Beuys', 'Jacques_Vimard_(peintre)']
	rels['Alphonse_de_Lamartine'] = ['Albert_Besnard', 'Joseph_Fourier']
	rels['Maximilien_Vox'] = ['Michel_Moskovtchenko', 'NapolC3A9on']
	rels['Pierre_Huyghe'] = ['Camille_Henrot', 'Dominique_Gonzalez-Foerster']
	rels['Jean_Dubuffet'] = ['Jean_Revol', 'RenC3A9_Deroudille']
	rels['AndrC3A9_Lhote'] = ['Bertrand_Lavier', 'Edmond_Boissonnet', 'EugC3A8ne_Delacroix', 'C389douard_Pignon']
	return rels
}

function openContentRandom(URL){
	left_pos = randomInt(0,window.innerWidth-400);
	top_pos = randomInt(0,window.innerHeight-400);
	openContent(URL, left_pos, top_pos)
}

function pick_child(parent){
	var children = relations[parent]

	if (children.length == 1){
		return children[0]
	}
	else {
		var child = children[randomInt(0, children.length)]
		if (child == previous){
			return pick_child(parent)
		} else {
			return child
		}
	}
}

function iterate_path(){
	if (current != goal){
		n--
		new_name = pick_child(current)
		previous = current
		current = new_name
		openContentRandom("generated/"+new_name+".html")
		window.setTimeout(iterate_path, time_step)
	}
}

function simulate_path() {
	current = "Joseph_Fourier"
	goal = "Camille_Henrot"
	openContentRandom("generated/"+current+".html")
	window.setTimeout(iterate_path, time_step)
}

function openContentCloseToLast(URL){
	radius = 50
	last_left = last_left+randomInt(-radius, radius)
	last_top = last_top+randomInt(-radius, radius)

	if (last_top > window.innerHeight-400)
		last_top = 0
	if (last_top < 0)
		last_top = window.innerHeight-400
	if (last_left > window.innerWidth-400)
		last_left = 0
	if (last_left < 0)
		last_left = window.innerWidth-400

	openContent(URL, last_left, last_top)
}

function randomInt(min, max){
	return min + Math.floor(Math.random() * (max-min));
}

function openNextFrame(){
	if (n > 0) {
		n--;
		openContentRandom("page_generator/Sol_LeWitt.html")
		window.setTimeout(openNextFrame, 500);
	}
}

function open_frames(number){
	n=number
	openContent("page_generator/Sol_LeWitt.html", 400, 100)
	window.setTimeout(openNextFrame, 500)
}