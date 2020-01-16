;((document, window) => {
	"use strict";

	// const $ = document.querySelector.bind(document);
	// const $$ = document.querySelectorAll.bind(document);

	const $form = el('#frm-comment').node();
	const $output = el('#output').node();
	const $message = el('#comment-message');
	const $submit = el('.btn-submit').node();
	
	const $list = el('ul').new({'class':'outer-comment'}).append( $output );

	// Functions
	function formatDatetime(datetime) {
		return datetime.replace(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/, '$3. $2. $1 $4:$5');
	}

	function replaceTemplate(id, name, date, text, parent, parentName = "") {
		let reply = (parent > 0) ? `<a href="#comment-${parent}" class="reply" data-id="${parent}">↳ ${parentName}</a> ` : "";
		let template = `<div class='comment-row' id="comment-${id}">							
							<div class='comment-info'><span class='posted-by'>${name}</span> &middot; <span class='posted-at'>${formatDatetime(date)}</span></div>
							<div class='comment-text'>${reply}${text}</div>
							<div><a class='btn-reply' data-id="${id}">Odpovědět</a></div>
						</div>`;
		return template;
	}

	function newComment(item, data) {
		let template = replaceTemplate(item.id, item.name, item.date, item.comment, item.parent_id);

		const $item = el("li").new().html(template).append( $list.node() );
		const $reply = el('ul').new().append( $item.node() );

		listReplies(item, data, $reply);
	}

	function listComment() {

		fetch('./comment-list.php')
		 .then(response => {
			
			$list.html("");

			response.json().then(data => {
				data.forEach(comment => {
					if (comment.parent_id == 0) {
						newComment(comment, data);
					}
				});
			 });

		 }).catch(error => {
			// Handle error
			console.log(error);
		 });
	}
	
	function listReplies(parent, data, list) {
		data.forEach(comment => {
			if (parent.id == comment.parent_id) {

				let template = replaceTemplate(comment.id, comment.name, comment.date, comment.comment, comment.parent_id, parent.name);

				const $item = el("li").new().html(template).append( list.node() );
				const $reply = el('ul').new().append( $item.node() );

				listReplies(comment, data, $reply);
			}
		});
	}

	const getFormData = form => {

		// Setup our serialized data
		let formData = new FormData();
	
	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {

		var field = form.elements[i];

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		// If a multi-select, get all selections
		if (field.type === 'select-multiple') {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				formData.append(field.name, field.options[n].value);
			}
		}

		// Convert field data to a query string
		else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			formData.append(field.name, field.value);
		}
	}

	return formData;
	}

	// Event Handlers
	const submitHandler = e => {
		console.log("Submited!");
		// console.log(e);
		e.preventDefault();
		e.stopPropagation();

		let $comment = el("#comment").node();
		let $name = el("#name").node();

		if($comment.value == "") { $comment.focus(); return; }
		if($name.value == "") { $name.focus(); return; }
		
		let origContent = $submit.value;

		$submit.setAttribute("disabled", true);
		$submit.value = "Odesílá se...";

		$message.css().remove('msg-success');
		$message.css().remove('msg-error');
		$message.html("");

		// console.log(formData);
		// return;

		fetch("./comment-add.php", {
			method: 'POST',
			body: getFormData($form),
		  })
		 .then(response => {
			if (response.ok) {
		
				$message.css().add('msg-success');
				$message.html('Komentář úspěšně přidán!');
				
				el("#name").node().value = "";
				el("#comment").node().value = "";
				el("#commentId").node().value = "";
				
				listComment();
			} else {
				$message.css().add('msg-error');
				$message.html('Chyba při přidávání komentáře!');
				return false;
			}
			console.log(response);
		 }).catch(error => {
			// Handle error
			console.log(error);
		 });
		 
		 setTimeout(() => {
			$submit.removeAttribute("disabled");
			$submit.value = origContent;
		}, 1000);

		setTimeout(() => {
			$message.css().remove('msg-error');
			$message.css().remove('msg-success');
			$message.html("");
		}, 5000);
	}

	const replyHandler = e => {

		if (!e.target.matches('.btn-reply')) return;

		e.preventDefault();

		let id = e.target.dataset.id;

		el('#commentId').node().value = id;
		el("#comment").node().focus();
	}

	const replyOverHandler = e => {
		if (!e.target.matches('.reply')) return;
		e.preventDefault();

		let parent = e.target.dataset.id;
		let parentCSS = el("#comment-"+parent).css();

		if(e.type == "mouseover") {
			console.log("mouseover");
			parentCSS.add("comment-active");
		} else if(e.type == "mouseout") {
			console.log("mouseleave");
			parentCSS.remove("comment-active");
		}
	}

	// Events
	$form.addEventListener("submit", submitHandler);
	// $submit.addEventListener("click", submitHandler);
	$output.addEventListener("click", replyHandler);
	$output.addEventListener("mouseover", replyOverHandler)
	$output.addEventListener("mouseout", replyOverHandler)

	// Run
	listComment();

})(document, window);
