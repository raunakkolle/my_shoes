// template variables
var navCategoryTemplate, categoryTemplate, shoesTemplate, shoeTemplate;

// storing the currently displayed category and shoe
var current_category = shoes_data.category[0];
var current_shoe = current_category.shoes[0];

// track active nav tab
var active_nav_tab = $('li.menu.active');

// helper function to display a template
function showTemplate(id, template, data) {
	var html = template(data);
	$(id).html(html);
}

// Remove 'active' class from current active tab
// Add 'active' class to tab id provided
function updateActiveNavTab(newActiveTabId) {
	// $('.nav-tabs .active').removeClass('active');
	active_nav_tab.removeClass('active');
	active_nav_tab = $(newActiveTabId);
	active_nav_tab.addClass('active');
}


// doc ready callback
$(document).ready(function () {
	
	// compile templates
	var source = $('#nav-cat-template').html();
	navCategoryTemplate = Handlebars.compile(source);
	showTemplate('#navbar-main', navCategoryTemplate, shoes_data);

	source = $('#category-template').html();
	categoryTemplate = Handlebars.compile(source);
	showTemplate('#content', categoryTemplate, shoes_data);

	source = $('#shoes-template').html();
	shoesTemplate = Handlebars.compile(source);

	source = $('#shoe-template').html();
	shoeTemplate = Handlebars.compile(source);
	
	// categories nav click handler
	$('a.nav-categories').click(function () {
		showTemplate('#content', categoryTemplate, shoes_data);
		updateActiveNavTab('#categories-tab');
		$('a.category-thumb').click(categoryHandler);
	});
	
	// category click handler
	$('a.nav-link, a.category-thumb').click(categoryHandler);
	
	// current category click handler
	$('a.nav-current-category').click(function () {
		showTemplate('#content', shoesTemplate, current_category);
		updateActiveNavTab('#current-category-tab');
		$('a.shoe-thumb').click(shoeHandler);

	});
	
	// current shoe click handler
	$('a.nav-current-shoe').click(function () {
		showTemplate('#content', shoeTemplate, current_shoe);
		updateActiveNavTab('#current-shoe-tab');
	});

});

// category click handler
function categoryHandler() {		
	// get category index clicked on
	var index = $(this).data('id');
		
	// set current category
	current_category = shoes_data.category[index];

	showTemplate('#content', shoesTemplate, current_category);

	updateActiveNavTab('#current-category-tab');
		
	// shoe click handler
	$('a.shoe-thumb').click(shoeHandler);

}

// shoe click handler
function shoeHandler() {
	var index = $(this).data('id');
		
	// set current shoe
	current_shoe = current_category.shoes[index];

	showTemplate('#content', shoeTemplate, current_shoe);

	updateActiveNavTab('#current-shoe-tab');
}