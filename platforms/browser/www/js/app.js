$('.collection')
	.on('click', '.collection-item', function(){
		var $badge = $('.badge', this);
		if ($badge.length === 0 ) {
			$badge = $('<span class="badge brown-text"> 0 </span>')
			.appendTo(this);

		}
	$badge.text(parseInt($badge.text()) + 1);
});

$('.modal-trigger').leanModal();

$('.scan-qrcode').on('click',function(){
		cordova.plugins.barcodeScanner.scan(function(resultado) {
		if(resultado.text) {
			Materialize.toast('Mesa'+resultado.tex,2000);
			$('#numero-mesa').val(resultado.text);
	} },function(error) {
		Materialize.toast('Erro:'+ error,3000,'red-text');
	});
});

$('.vibra-kiki').on('click',function(){

	navigator.vibrate([1000, 500, 1000]);

});

$('.acao-finalizar').on('click', function() {
	var dados = {mesa: $('#numero-mesa').val(),
	pedido: $('#resumo').text()};
	$.ajax({ url:'http://143.106.241.1/cti22/sodecenoura/api/pedido',
	type:"post",
	data: dados,
	error: function(erro) {
		Materialize.toast(erro.responseText,2000);
	},
	success: function(resp) {
		Materialize.toast(resp.data.pedido,2000);
	}
	});
});