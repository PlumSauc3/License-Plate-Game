$(document).ready(function() {
	$(document).bind("mobileinit", function()
	{
		if (navigator.userAgent.indexOf("Android") != -1)
		{
			$.mobile.defaultPageTransition = 'none';
			$.mobile.defaultDialogTransition = 'none';
		}
	});

	$(".playgame").click(function() {
		$.mobile.pageContainer.pagecontainer("change", "#pggame", { transition: "none" });
		score = 0;
		lives = 3;
		newround();
		updatescore();
	});
	
	$("#help").click(function() {
		$.mobile.pageContainer.pagecontainer("change", "#pghelp", { transition: "none" });
	});
	
	$("#testing").click(function() {
		$.mobile.pageContainer.pagecontainer("change", "#gameover", { transition: "none" });
	});
	
	$(".back").click(function() {
		$.mobile.pageContainer.pagecontainer("change", "#pgmenu", { transition: "none" });
	});
});

