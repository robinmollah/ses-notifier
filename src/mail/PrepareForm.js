module.exports = function(form_obj){
	const fields = form_obj.fields;

	for(let key of Object.keys(fields)){
		console.log(key, fields[key].value);
	}

	let properties = Object.keys(fields).map((item,index) => item + " : " + fields[item].value);

	return properties.join("\n");
}

