var emit = function emit(eventName, data, target) {
	if (!target) target = document;
	var event = new CustomEvent(eventName, { detail: data });
	target.dispatchEvent(event);
}

function rgbToHsv({ r, g, b }) {
	r /= 255, g /= 255, b /= 255;

	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, v = max;

	var d = max - min;
	s = max == 0 ? 0 : d / max;

	if (max == min) {
		h = 0; // achromatic
	} else {
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}

		h /= 6;
	}

	return { h: h * 360, s: s * 100, v: v * 100 };
}

function hsvToRgb(hsv) {
	let h = hsv.h / 360,
		s = hsv.s / 100,
		v = 1;

	let r, g, b;

	let i = Math.floor(h * 6);
	let f = h * 6 - i;
	let p = v * (1 - s);
	let q = v * (1 - f * s);
	let t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}

	return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function rgbToHex({ r, g, b }) {
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const hsvToHex = (hsv) => rgbToHex(hsvToRgb(hsv));


/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb({ h, s, l }) {
	var r, g, b;

	if (s == 0) {
		r = g = b = l; // achromatic
	} else {
		var hue2rgb = function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255)
	};
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function rgbToHsl({ r, g, b }) {
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return { h, s, l };
}


const palettes = [
	[
		{
			"@name": "Copy-of-night-1",
			"@rgb": "2C3359",
			"@r": "44",
			"@g": "51",
			"@b": "89"
		},
		{
			"@name": "Copy-of-night-2",
			"@rgb": "37538C",
			"@r": "55",
			"@g": "83",
			"@b": "140"
		},
		{
			"@name": "Copy-of-night-3",
			"@rgb": "1A1E26",
			"@r": "26",
			"@g": "30",
			"@b": "38"
		},
		{
			"@name": "Copy-of-night-4",
			"@rgb": "F2F2F2",
			"@r": "242",
			"@g": "242",
			"@b": "242"
		},
		{
			"@name": "Copy-of-night-5",
			"@rgb": "F44526",
			"@r": "244",
			"@g": "69",
			"@b": "38"
		}
	],
	[
		{
			"@name": "2048Ladek-1",
			"@rgb": "B265B2",
			"@r": "178",
			"@g": "101",
			"@b": "178"
		},
		{
			"@name": "2048Ladek-2",
			"@rgb": "FFF2C3",
			"@r": "255",
			"@g": "242",
			"@b": "195"
		},
		{
			"@name": "2048Ladek-3",
			"@rgb": "FFAAFF",
			"@r": "255",
			"@g": "170",
			"@b": "255"
		},
		{
			"@name": "2048Ladek-4",
			"@rgb": "74CCBF",
			"@r": "116",
			"@g": "204",
			"@b": "191"
		},
		{
			"@name": "2048Ladek-5",
			"@rgb": "6EB2A8",
			"@r": "110",
			"@g": "178",
			"@b": "168"
		}
	],
	[
		{
			"@name": "My-Color-Theme-1",
			"@rgb": "655FE3",
			"@r": "101",
			"@g": "95",
			"@b": "227"
		},
		{
			"@name": "My-Color-Theme-2",
			"@rgb": "E3966B",
			"@r": "227",
			"@g": "150",
			"@b": "107"
		},
		{
			"@name": "My-Color-Theme-3",
			"@rgb": "5499E3",
			"@r": "84",
			"@g": "153",
			"@b": "227"
		},
		{
			"@name": "My-Color-Theme-4",
			"@rgb": "E3C83D",
			"@r": "227",
			"@g": "200",
			"@b": "61"
		},
		{
			"@name": "My-Color-Theme-5",
			"@rgb": "49E3E1",
			"@r": "73",
			"@g": "227",
			"@b": "225"
		}
	],
	[
		{
			"@name": "neon1-1",
			"@rgb": "B33230",
			"@r": "179",
			"@g": "50",
			"@b": "48"
		},
		{
			"@name": "neon1-2",
			"@rgb": "FFFF5E",
			"@r": "255",
			"@g": "255",
			"@b": "94"
		},
		{
			"@name": "neon1-3",
			"@rgb": "FF625E",
			"@r": "255",
			"@g": "98",
			"@b": "94"
		},
		{
			"@name": "neon1-4",
			"@rgb": "45B2FF",
			"@r": "69",
			"@g": "178",
			"@b": "255"
		},
		{
			"@name": "neon1-5",
			"@rgb": "3980B3",
			"@r": "57",
			"@g": "128",
			"@b": "179"
		}
	],
	[
		{
			"@name": "color-theme_44b38139ca8cb39f8ee346ac3c203118-1",
			"@rgb": "025373",
			"@r": "2",
			"@g": "83",
			"@b": "115"
		},
		{
			"@name": "color-theme_44b38139ca8cb39f8ee346ac3c203118-2",
			"@rgb": "0396A6",
			"@r": "3",
			"@g": "150",
			"@b": "166"
		},
		{
			"@name": "color-theme_44b38139ca8cb39f8ee346ac3c203118-3",
			"@rgb": "EED5B7",
			"@r": "238",
			"@g": "213",
			"@b": "183"
		},
		{
			"@name": "color-theme_44b38139ca8cb39f8ee346ac3c203118-4",
			"@rgb": "F29544",
			"@r": "242",
			"@g": "149",
			"@b": "68"
		},
		{
			"@name": "color-theme_44b38139ca8cb39f8ee346ac3c203118-5",
			"@rgb": "9BC0D0",
			"@r": "155",
			"@g": "192",
			"@b": "208"
		}
	],
	[
		{
			"@name": "Panorama-n°1-1",
			"@rgb": "2D2E40",
			"@r": "45",
			"@g": "46",
			"@b": "64"
		},
		{
			"@name": "Panorama-n°1-2",
			"@rgb": "223A86",
			"@r": "34",
			"@g": "42",
			"@b": "166"
		},
		{
			"@name": "Panorama-n°1-3",
			"@rgb": "F27405",
			"@r": "242",
			"@g": "116",
			"@b": "5"
		},
		{
			"@name": "Panorama-n°1-4",
			"@rgb": "F25C05",
			"@r": "242",
			"@g": "92",
			"@b": "5"
		},
		{
			"@name": "Panorama-n°1-5",
			"@rgb": "F2C5BB",
			"@r": "242",
			"@g": "197",
			"@b": "187"
		}
	]
	
].map(palette => palette.map(item => item["@rgb"]));

var canvas = document.getElementById('main');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var fieldWidth = 64;
var fieldHeight = 64;
var interval;

var rootAmount = 7;
var ctx = canvas.getContext('2d');

var seededRandom = fxrand;

const hexToRgb = function (hex) {
	return new Color (
		parseInt('0x'+hex.substring(1,3)),
		parseInt('0x'+hex.substring(3,5)),
		parseInt('0x'+hex.substring(5,7))
	);
}

var onBorder = function (head) {
	return (head.x >= fieldWidth ||
					head.x <= 0 ||
					head.y >= fieldHeight ||
					head.y <= 0);
}

class Tree {
	constructor(roots = [], lineWidth = 0.75, lineCap = "round") {
		this.lineWidth = lineWidth;
		this.lineCap = "round";
		this.roots = [];
		this.heads = [];
		this.joints = [];
		roots.forEach((item) => {
			this.roots.push(item);
			this.heads.push({
				x: item.x,
				y: item.y,
				root: item
			});
			this.joints.push({
				x: item.x,
				y: item.y
			});
		});

		this.paused = true;
		this.autoMode = false;
	}
	contains(head) {
		let out = false;
		this.joints.forEach((item) => {
			if (item.x == head.x && item.y == head.y) {
				out = true;
			}
		});
		return out;
	}
	addRoot(root) {
		this.roots.push(root);
		this.heads.push({
			x: root.x,
			y: root.y,
			root: root,
			distance: 0
		});
		this.joints.push({
			x: root.x,
			y: root.y,
			distance: 0
		});
	}
	generateRoots(amount, palette) {
		let disableRootOverflow = false;
		
		for (let i = 0; i < amount; i++) {
			let startColor, endColor;

			if (palette && palette.length) {
				startColor = hexToRgb('#' + palette[i % palette.length]);
				endColor = hexToRgb('#' + palette[(i + 3) % palette.length]);
			} else {
				startColor = new Color();
				endColor = new Color();
			}

			let newCoords = {
				x: Math.floor(seededRandom() * (fieldWidth - 1)) + 1,
				y: Math.floor(seededRandom() * (fieldHeight - 1)) + 1,
			};
			
			if (disableRootOverflow) {
				for (; ;) {
					if (this.roots.find(root => root.x == newCoords.x && root.y == newCoords.y)) {
						newCoords = {
							x: Math.floor(seededRandom() * (fieldWidth - 1)) + 1,
							y: Math.floor(seededRandom() * (fieldHeight - 1)) + 1,
						};
					} else {
						break;
					}
				}
			}

			this.addRoot({
				x: newCoords.x,
				y: newCoords.y,
				// x: Math.floor(seededRandom() * (fieldWidth - 1)) + 1,
				// y: Math.floor(seededRandom() * (fieldHeight - 1)) + 1,
				startColor: startColor,
				endColor: endColor,
				mass: seededRandom() * 0.85 + 0.15,
				
				// lineCap: "round"
				lineCap: ["round", "square"][Math.floor(seededRandom() * 2)]
			});
		}

		return this.roots;
	}
	reset() {
		this.heads.splice(0, this.heads.length);
		this.joints.splice(0, this.joints.length);
		this.roots.forEach((item) => {
			this.heads.push({
				x: item.x,
				y: item.y,
				root: item,
				distance: 0
			});
			this.joints.push({
				x: item.x,
				y: item.y,
				distance: 0
			});
		});
		this.autoMode = false;
	}
	clear(leaveRoots) {
		if (!leaveRoots) {
			this.roots.splice(0, this.roots.length);
		}
		this.heads.splice(0, this.heads.length);
		this.joints.splice(0, this.joints.length);
	}
	drawRoots(ctx) {
		ctx.lineWidth = this.lineWidth;

		//	Background gradient shadows
		this.roots.forEach((item, i) => {
			let sameIdx = -1;
			for (let j = 0; j < i; j++) {
				if (item.x == this.roots[j].x && item.y == this.roots[j].y) {
					sameIdx = j;
				}
			}
			// let sameIdx = arr.findIndex(r => r.x == item.x && r.y == item.y);
			if (sameIdx === -1 || sameIdx > i) {
				let rad = (2.5 * fieldWidth / (7 * Math.log10(this.roots.length)));

				let grad = ctx.createRadialGradient(item.x, item.y, 0, item.x, item.y, rad);
				let oppStartColor = new Color({
					r: 255 - (item.startColor.r + item.endColor.r) / 2,
					g: 255 - (item.startColor.g + item.endColor.g) / 2,
					b: 255 - (item.startColor.b + item.endColor.b) / 2,
				})
				grad.addColorStop(0, (new Color({
					...oppStartColor,
					a: 0.17
				})).toString());
				grad.addColorStop(1, (new Color({
					...oppStartColor,
					a: 0
				})).toString());
				// ctx.fillStyle = acol.toString();
				ctx.fillStyle = grad;
				ctx.shadowBlur = 0;

				drawCircle(item.x, item.y, rad, ctx);
			}
		})
		//	-------

		//	Draw roots
		this.roots.forEach((item, i) => {
			ctx.strokeStyle = item.startColor.toString();
			ctx.fillStyle = item.startColor.toString();
			ctx.lineCap = item.lineCap || "butt";

			ctx.shadowColor = item.startColor.toString();
			// ctx.lineWidth = (1 - item.mass) * 0.95 + 0.01;
			ctx.shadowBlur = 25 * item.mass;
			ctx.lineWidth = seededRandom() * 0.7 + 0.3;

			ctx.beginPath();
			ctx.moveTo(item.x, item.y);
			ctx.lineTo(item.x, item.y);
			ctx.stroke();
		})
	}
}

function drawCircle(x, y, radius, ctx) {
	ctx.beginPath();
	ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
	ctx.fill();
}

class Color {
	constructor(r, g, b, a) {
		if (typeof r == 'object' && r.r !== undefined && r.g !== undefined && r.b !== undefined) {
			g = r.g;
			b = r.b;
			a = r.a;
			r = r.r;
		}
		if (!r && r != 0)
			this.r = (seededRandom() * 255)|0;
		else
			this.r = r;

		if (!g && g != 0)
			this.g = (seededRandom() * 255)|0;
		else
			this.g = g;

		if (!b && b != 0)
			this.b = (seededRandom() * 255)|0;
		else
			this.b = b;
		
		if (a == undefined) {
			this.a = 1;
		} else {
			this.a = a
		}
	}
	toString() {
		return `rgba(${this.r|0}, ${this.g|0}, ${this.b|0}, ${this.a})`;
	}
}

let sbg = new Color({
	r: 0,
	g: 0,
	b: 0,
	a: .25
})

var draw = function(ctx, tree, bgColor) {
	ctx.setTransform(canvas.width / fieldWidth, 0, 0, canvas.height / fieldHeight, 0, 0);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, fieldWidth, fieldHeight);  
 
  tree.drawRoots(ctx);
}


var drawIter = function(ctx, head, tree, curRoot) {
	let outHeads = [
		{
			x: head.x - 1,
			y: head.y
		},
		{
			x: head.x,
			y: head.y + 1
		},
		{
			x: head.x + 1,
			y: head.y
		},
		{
			x: head.x,
			y: head.y - 1
		}
	]
	if (curRoot.lineCap == "round") {
		outHeads = [
			{
				x: head.x - 1,
				y: head.y - 1
			},
			{
				x: head.x - 1,
				y: head.y + 1
			},
			{
				x: head.x + 1,
				y: head.y + 1
			},
			{
				x: head.x + 1,
				y: head.y - 1
			}
		];
	}
	

	for (let lim = outHeads.length, i = 0; i < lim; i++) {
		if (tree.contains(outHeads[i]) || onBorder(outHeads[i])) {
			outHeads.splice(i, 1);
			lim--;
			i--;
		}
	}
	if (!outHeads.length) {
		return [];
	}

	for (let lim = outHeads.length, i = 0; i < lim; i++) {
		let p = seededRandom();
		if (p > curRoot.mass) {
			outHeads.splice(i, 1);
			lim--;
			i--;
		}
	}
	if (!outHeads.length) {
		return [head];
	}

	outHeads.forEach((item) => {
		item.distance = head.distance + 1;
		tree.joints.push(item);

		// let colorCoeff = 0.7 * (Math.abs((item.x - curRoot.x) / (fieldWidth/2)) + Math.abs((item.y - curRoot.y) / (fieldHeight/2)));
		// let colorCoeff = 1.8 * Math.pow(Math.pow(item.x - curRoot.x, 2) + Math.pow(item.y - curRoot.y, 2), 0.5) / fieldWidth;
		let ck = (1 - curRoot.mass * 0.5) * Math.pow(tree.roots.length, 1 / (Math.log10(tree.roots.length) + 1));
		let colorCoeff = ck * head.distance / fieldWidth;
		let color = new Color(curRoot.startColor.r * (1 - colorCoeff) + curRoot.endColor.r * colorCoeff,
													curRoot.startColor.g * (1 - colorCoeff) + curRoot.endColor.g * colorCoeff,
													curRoot.startColor.b * (1 - colorCoeff) + curRoot.endColor.b * colorCoeff);

		let colorCoeff2 = ck * (item.distance) / fieldWidth;
		let color2 = new Color(curRoot.startColor.r * (1 - colorCoeff2) + curRoot.endColor.r * colorCoeff2,
			curRoot.startColor.g * (1 - colorCoeff2) + curRoot.endColor.g * colorCoeff2,
			curRoot.startColor.b * (1 - colorCoeff2) + curRoot.endColor.b * colorCoeff2);

		let grad = ctx.createLinearGradient(head.x, head.y, item.x, item.y);
		grad.addColorStop(0, color.toString());
		grad.addColorStop(1, color2.toString());
		ctx.strokeStyle = grad;

		// ctx.strokeStyle = color.toString();
		ctx.lineCap = curRoot.lineCap;

		ctx.shadowColor = color.toString();
		ctx.shadowBlur = 20 * Math.pow(curRoot.mass, 2);

		let minlw = ((fieldWidth - 7) / (24 - 7)) * 0.03 + 0.02;
		ctx.lineWidth = (1 - curRoot.mass) * (1 - minlw) + minlw;
		// ctx.lineWidth = 0;

		ctx.beginPath();
		ctx.moveTo(head.x, head.y);
		ctx.lineTo(item.x, item.y);
		ctx.stroke();
	});

	return outHeads;
}

var drawTree = function (ctx, length, tree, fps) {
  let i = 0;
  interval = setInterval(() => {
  	let newHeads = [];

  	tree.heads.forEach((item, j) => {
  		let curRoot = item.root;

  		drawIter(ctx, item, tree, curRoot)
				.forEach((head) => {
					head.root = curRoot;
					newHeads.push(head);
				});
  	});

  	tree.heads = newHeads;
  	if (length == -1) {
  		if (!tree.heads.length) {
		  	clearInterval(interval);
		  	emit('drawEnd', {}, canvas);
  		}
		  else
		  	i++;
  	} else
	  if (i >= length || !tree.heads.length) {
	  	clearInterval(interval);
	  	emit('drawEnd', {}, canvas);
	  } else {
	  	i++;
	  }
  }, 1000 / fps);

	return interval;
}

document.addEventListener('DOMContentLoaded', async () => {
	let fps = 24;
	// let fps = 1000;
	let bgColor = "#000000";
	let tree = new Tree();

	let startHandler = () => {
		if (!tree.paused) return;
		tree.paused = false;
		drawTree(ctx, -1, tree, fps, fieldWidth);
	};

	let generateHandler = () => {
		clearInterval(interval);
		tree.paused = true;
		let amount = +rootAmount;
		tree.clear();

		let palette = palettes[Math.floor(seededRandom() * palettes.length)];
		let roots = tree.generateRoots(amount, palette);

		let colorSum = {
			r: 0,
			g: 0,
			b: 0
		};

		roots.forEach(root => {
			colorSum.r += (root.startColor.r + root.endColor.r) * root.mass * 2;
			colorSum.g += (root.startColor.g + root.endColor.g) * root.mass * 2;
			colorSum.b += (root.startColor.b + root.endColor.b) * root.mass * 2;
		})

		let avgcol = new Color({
			r: (colorSum.r / (2 * 255 * roots.length)) * 255,
			g: (colorSum.g / (2 * 255 * roots.length)) * 255,
			b: (colorSum.b / (2 * 255 * roots.length)) * 255,
		});
		let bcol = new Color({
			r: (255 - avgcol.r),
			g: (255 - avgcol.g),
			b: (255 - avgcol.b),
		})

		// let hslavg = rgbToHsl(avgcol);
		// hslavg.h = (hslavg.h + 0.5) % 1;
		// if (hslavg.s > 0.5) {
		// 	hslavg.s = (hslavg.s - 0.5);
		// }
		// hslavg.l = 1 - hslavg.l;

		// let bcol = new Color(hslToRgb(hslavg))
		bgColor = bcol.toString();

		document.body.style['background-color'] = bgColor;


		let isDark = Math.max(bcol.r, Math.max(bcol.g, bcol.b)) < (255 / 4);
		// let isDark = bcol.r + bcol.g + bcol.b > (255 * 3 / 3);

		if (isDark) {
			// sbg.r = 255 - bcol.r;
			// sbg.g = 255 - bcol.g;
			// sbg.b = 255 - bcol.b;
			sbg.r = 200;
			sbg.g = 200;
			sbg.b = 200;
			sbg.a = 0.19;
		} else {
			sbg.r = 0;
			sbg.g = 0;
			sbg.b = 0;
			sbg.a = 0.25;
		}

		canvas.style['box-shadow'] = `0 0 25px 0 ${sbg.toString()}`;


		draw(ctx, tree, bgColor);

		startHandler();
	}

	let generatePicHandler = () => {
		seededRandom(true);

		let minSize = 7;
		let maxSize = 24;
		let size = Math.floor(seededRandom() * (maxSize - minSize)) + minSize;
		fieldWidth = size;
		fieldHeight = size;

		// let coef = window.innerHeight / window.innerWidth;
		// fieldHeight = Math.round(size * coef);

		let maxRoots = size * size * 0.2;
		let minRoots = Math.floor(Math.pow(size, 0.5)) + 1;

		rootAmount = Math.floor(seededRandom() * (maxRoots - minRoots)) + minRoots;

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		generateHandler();
	};


	document.body.addEventListener('mousemove', (e) => {
		let hw = document.body.offsetWidth / 2;
		let hh = document.body.offsetHeight / 2;

		let maxShadowOffset = 8;

		let kw = -1 * (e.screenX - hw) / hw;
		let kh = -1 * (e.screenY - hh) / hh;

		let xshad = (kw * maxShadowOffset);
		let yshad = (kh * maxShadowOffset);

		canvas.style['box-shadow'] = `${xshad}px ${yshad}px 25px 0 ${sbg.toString()}`;
	})

	generatePicHandler()
})