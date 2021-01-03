let golds;
let gps;
let minions;
let nb_minions;
let goldPerClick;



function inital() {
	let storage = localStorage.getItem('storage')
	if (storage) {
		storage = JSON.parse(storage);
		golds = storage.golds;
		gps = storage.gps;
		nb_minions = storage.nb_minions;
		goldPerClick = storage.goldPerClick;
		minions = JSON.parse(storage.minions);

	} else {


		golds = 0;
		gps = 0;
		nb_minions = 0;
		goldPerClick = 1;
		minions = [
			{ id: 1, name: "piou", cost: 10, gps: 0.1, owned: 0 },
            { id: 2, name: "tofu", cost: 750, gps: 7.5, owned: 0 },
            { id: 3, name: "blop", cost: 2500, gps: 25, owned: 0 },
            { id: 4, name: "Moon", cost: 10000, gps: 100, owned: 0}
		];
		sauvegarder()
	}	

} 
function sauvegarder() {
	localStorage.setItem('storage', JSON.stringify({golds, gps, nb_minions, goldPerClick, minions: JSON.stringify(minions)}))
	
}
function sound() {
var audio = new Audio('sound/kamas.mp3');
audio.play();
}

function addGold(x) {
	golds+=x;
	sound();
	displayGolds();
	sauvegarder();
}
function getGPC() {
	if (nb_minions === 50)
	{
		nb_minions = 0;
		goldPerClick *= 2;
	}
}

function getGPS() {
	gps = 0;
	minions.forEach(element => gps+=(element.gps * element.owned));
}

function goldsPerSeconds() {

	golds+=gps;
	displayGolds();
	sauvegarder();
}

function displayGolds() {
	document.getElementById("gold").innerText = (Math.round(100 * golds) / 100);
}

function displayGPS() {
	document.getElementById("gps").innerText = (Math.round(100 * gps) / 100);
}
function buyMinion(id) {
	let add_minion = minions.find(minion => minion.id === id)
	if (golds >= add_minion.cost) {
		add_minion.owned += 1
		golds -= add_minion.cost;
		gps += add_minion.gps;
		add_minion.cost *=1.15
		nb_minions++;
		getGPC();
		if (add_minion.owned === 25 || add_minion.owned === 50 || add_minion.owned === 100 || add_minion.owned === 250 || add_minion.owned === 1000)
		{
			add_minion.gps *= 2;
			getGPS();
		}
	}
	displayMinionCost(id);
	displayMinionGPS(id)
	displayOwned();
	displayGPS();
	sauvegarder();
}
function displayMinionCost(id) {
	document.getElementById("cost" + id).innerText = (Math.round(100 * minions.find(minion => minion.id === id).cost) / 100);
}
function displayMinionGPS(id) {
	document.getElementById("gps" + id).innerText = (Math.round(100 * minions.find(minion => minion.id === id).gps) / 100);
}
function displayOwned() {
	let display = "";
	minions.forEach(minion => display = display + "You have " + minion.owned +" " + minion.name + " in your inventory" + "<br>")
	document.getElementById("displayOwned").innerHTML = display;
}


	inital();
setInterval(function(){goldsPerSeconds()}, 1000);
