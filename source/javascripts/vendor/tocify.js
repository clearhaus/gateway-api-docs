$(function() {
  var toc = $("#toc").tocify({
    context: "section#doc-content",
    selectors: "h1, h2",
    showAndHide: false
  });

  $('table', $('#doc-content')).each(function () {
    $(this).addClass("table table-condensed");
  });
});
